const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, Collection } = require('discord.js');
require('dotenv').config();

// Mảng tạm để lưu ID người dùng đã link account
const linkedUserIds = [];

// Tạo slash commands
const commands = [
    new SlashCommandBuilder()
        .setName('link-account')
        .setDescription('Liên kết tài khoản để nhận tin nhắn riêng từ bot'),
    new SlashCommandBuilder()
        .setName('status')
        .setDescription('Kiểm tra trạng thái liên kết tài khoản'),
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Kiểm tra độ trễ của bot')
].map(command => command.toJSON());

// Tạo client Discord bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

// Sự kiện khi bot sẵn sàng
client.once('ready', async () => {
    console.log(`🤖 Bot đã sẵn sàng! Đăng nhập với tên: ${client.user.tag}`);

    // Đăng ký slash commands
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    
    try {
        console.log('🔄 Đang đăng ký slash commands...');
        
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );
        
        console.log('✅ Đã đăng ký slash commands thành công!');
    } catch (error) {
        console.error('❌ Lỗi khi đăng ký slash commands:', error);
    }

    // Tìm channel đầu tiên có thể gửi tin nhắn
    const guild = client.guilds.cache.first();
    if (guild) {
        // Tìm channel text đầu tiên
        const channel = guild.channels.cache.find(ch =>
            ch.type === 0 && // TEXT_CHANNEL
            ch.permissionsFor(guild.members.me).has('SendMessages')
        );

        if (channel) {
            try {
                await channel.send('🎉 Xin chào mọi người! Bot đã được khởi động thành công! 👋\n💡 Hãy thử gõ `/` để xem các lệnh có sẵn!');
                console.log(`✅ Đã gửi lời chào vào channel: ${channel.name}`);
            } catch (error) {
                console.error('❌ Lỗi khi gửi tin nhắn:', error);
            }
        } else {
            console.log('⚠️ Không tìm thấy channel nào để gửi tin nhắn');
        }
    } else {
        console.log('⚠️ Bot chưa tham gia server nào');
    }
});

// Xử lý slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, user } = interaction;
    const userId = user.id;

    switch (commandName) {
        case 'link-account':
            // Kiểm tra xem user đã link chưa
            if (linkedUserIds.includes(userId)) {
                await interaction.reply({
                    content: '⚠️ Bạn đã link account rồi!',
                    ephemeral: true
                });
                console.log(`🔗 User ${user.tag} (${userId}) đã link account trước đó`);

                // Gửi tin nhắn riêng cho người dùng
                try {
                    await user.send('👋 Xin chào! Tôi đây này bạn đã liên kết với tôi rồi! 🤖');
                    console.log(`📨 Đã gửi tin nhắn riêng cho ${user.tag}`);
                } catch (error) {
                    console.error(`❌ Lỗi khi gửi tin nhắn riêng cho ${user.tag}:`, error);
                }
            } else {
                // Thêm user ID vào mảng
                linkedUserIds.push(userId);
                await interaction.reply({
                    content: '✅ Đã link account thành công! ID của bạn đã được lưu.',
                    ephemeral: true
                });
                console.log(`🔗 User ${user.tag} (${userId}) đã link account thành công`);
                console.log(`📝 Danh sách ID đã link: [${linkedUserIds.join(', ')}]`);

                // Gửi tin nhắn riêng cho người dùng
                try {
                    await user.send('👋 Xin chào! Tôi là bot và tôi sẽ nhắn bạn ở đây nhé! 🤖');
                    console.log(`📨 Đã gửi tin nhắn riêng cho ${user.tag}`);
                } catch (error) {
                    console.error(`❌ Lỗi khi gửi tin nhắn riêng cho ${user.tag}:`, error);
                }
            }
            break;

        case 'status':
            const isLinked = linkedUserIds.includes(userId);
            await interaction.reply({
                content: isLinked 
                    ? '✅ Tài khoản của bạn đã được liên kết!'
                    : '❌ Tài khoản của bạn chưa được liên kết. Sử dụng `/link-account` để liên kết.',
                ephemeral: true
            });
            break;

        case 'ping':
            const ping = Date.now() - interaction.createdTimestamp;
            await interaction.reply({
                content: `🏓 Pong! Độ trễ: ${ping}ms`,
                ephemeral: true
            });
            break;

        default:
            await interaction.reply({
                content: '❌ Lệnh không được hỗ trợ!',
                ephemeral: true
            });
            break;
    }
});

// Xử lý tin nhắn (giữ lại để tương thích ngược)
client.on('messageCreate', async (message) => {
    // Bỏ qua tin nhắn từ bot
    if (message.author.bot) return;

    // Xử lý tin nhắn riêng (DM)
    if (message.channel.type === 1) { // DM_CHANNEL
        const userId = message.author.id;

        // Kiểm tra xem user đã link account chưa
        if (linkedUserIds.includes(userId)) {
            // Phản hồi tin nhắn riêng
            await message.reply(`📨 Tôi đã nhận được tin nhắn của bạn: "${message.content}"`);
            console.log(`📨 Nhận tin nhắn riêng từ ${message.author.tag}: ${message.content}`);
        } else {
            await message.reply('⚠️ Bạn cần link account trước bằng cách gõ `/link-account` trong server!');
        }
        return;
    }

    // Kiểm tra lệnh /link-account (chỉ trong server) - giữ lại để tương thích
    if (message.content.toLowerCase() === '/link-account') {
        await message.reply('💡 Hãy sử dụng slash command `/link-account` thay vì gõ text! Gõ `/` để xem menu lệnh.');
    }
});

// Xử lý lỗi
client.on('error', console.error);

// Đăng nhập bot
client.login(process.env.DISCORD_TOKEN);
