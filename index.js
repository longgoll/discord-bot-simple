const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Mảng tạm để lưu ID người dùng đã link account
const linkedUserIds = [];

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
                await channel.send('🎉 Xin chào mọi người! Bot đã được khởi động thành công! 👋');
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

// Xử lý tin nhắn
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

    // Kiểm tra lệnh /link-account (chỉ trong server)
    if (message.content.toLowerCase() === '/link-account') {
        const userId = message.author.id;

        // Kiểm tra xem user đã link chưa
        if (linkedUserIds.includes(userId)) {
            await message.reply('⚠️ Bạn đã link account rồi!');
            console.log(`🔗 User ${message.author.tag} (${userId}) đã link account trước đó`);

            // Gửi tin nhắn riêng cho người dùng
            try {
                await message.author.send('👋 Xin chào! Tôi đây này bạn đã liên kết với tôi rồi! 🤖');
                console.log(`📨 Đã gửi tin nhắn riêng cho ${message.author.tag}`);
            } catch (error) {
                console.error(`❌ Lỗi khi gửi tin nhắn riêng cho ${message.author.tag}:`, error);
                await message.reply('⚠️ Không thể gửi tin nhắn riêng cho bạn. Vui lòng kiểm tra cài đặt quyền riêng tư!');
            }
        } else {
            // Thêm user ID vào mảng
            linkedUserIds.push(userId);
            await message.reply('✅ Đã link account thành công! ID của bạn đã được lưu.');
            console.log(`🔗 User ${message.author.tag} (${userId}) đã link account thành công`);
            console.log(`📝 Danh sách ID đã link: [${linkedUserIds.join(', ')}]`);

            // Gửi tin nhắn riêng cho người dùng
            try {
                await message.author.send('👋 Xin chào! Tôi là bot và tôi sẽ nhắn bạn ở đây nhé! 🤖');
                console.log(`📨 Đã gửi tin nhắn riêng cho ${message.author.tag}`);
            } catch (error) {
                console.error(`❌ Lỗi khi gửi tin nhắn riêng cho ${message.author.tag}:`, error);
                await message.followUp('⚠️ Không thể gửi tin nhắn riêng cho bạn. Vui lòng kiểm tra cài đặt quyền riêng tư!');
            }
        }
    }
});

// Xử lý lỗi
client.on('error', console.error);

// Đăng nhập bot
client.login(process.env.DISCORD_TOKEN);
