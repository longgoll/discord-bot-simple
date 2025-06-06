# Discord Bot - Gửi Tin Nhắn Vào Channel

Một Discord bot đơn giản được viết bằng Node.js và discord.js có thể gửi tin nhắn vào các channel khác nhau.

## 🚀 Tính năng

- ✅ Gửi tin nhắn đơn giản vào channel
- ✅ Gửi embed message với thiết kế đẹp
- ✅ Lên lịch gửi tin nhắn tự động
- ✅ Liệt kê tất cả text channels
- ✅ Hệ thống lệnh dễ sử dụng

## 📋 Yêu cầu

- Node.js (phiên bản 16.9.0 trở lên)
- npm hoặc yarn
- Discord bot token

## 🛠️ Cài đặt

1. Clone hoặc tải xuống dự án này
2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Tạo Discord bot:
   - Truy cập [Discord Developer Portal](https://discord.com/developers/applications)
   - Tạo một application mới
   - Tạo bot và copy token
   - Cấp quyền cần thiết cho bot (Send Messages, Read Message History, etc.)

4. Cấu hình file `.env`:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   ```

5. Mời bot vào server Discord của bạn

## 🎮 Cách sử dụng

### Chạy bot

```bash
# Chạy phiên bản đầy đủ (khuyến nghị)
npm start

# Hoặc chạy phiên bản đơn giản
npm run dev
```

### Các lệnh có sẵn

| Lệnh | Mô tả | Ví dụ |
|------|-------|-------|
| `!send <channel> <message>` | Gửi tin nhắn vào channel | `!send general Hello World!` |
| `!embed <channel> <title> <description>` | Gửi embed message | `!embed announcements "Thông báo" "Nội dung thông báo"` |
| `!schedule <channel> <phút> <message>` | Lên lịch gửi tin nhắn | `!schedule general 5 "Tin nhắn sau 5 phút"` |
| `!channels` | Hiển thị danh sách channels | `!channels` |
| `!help` | Hiển thị trợ giúp | `!help` |

### Ví dụ sử dụng

```
!send general Chào mọi người!
!embed announcements "Thông báo quan trọng" "Đây là một thông báo quan trọng cho tất cả mọi người"
!schedule general 10 "Đây là tin nhắn tự động sau 10 phút"
!channels
```

## 📁 Cấu trúc dự án

```
discord-bot/
├── index.js          # Bot đơn giản
├── bot.js            # Bot nâng cao với class
├── messageSender.js  # Class quản lý gửi tin nhắn
├── package.json      # Dependencies và scripts
├── .env             # Cấu hình bot token
└── README.md        # Hướng dẫn này
```

## 🔧 Tùy chỉnh

Bạn có thể tùy chỉnh bot bằng cách:

1. Thay đổi prefix trong file `bot.js` (mặc định là `!`)
2. Thêm các lệnh mới vào class `DiscordBot`
3. Tùy chỉnh màu sắc và thiết kế embed
4. Thêm các tính năng mới như reaction, slash commands, etc.

## ⚠️ Lưu ý

- Đảm bảo bot có đủ quyền để gửi tin nhắn vào channel
- Không chia sẻ Discord bot token với người khác
- Channel name phải chính xác (không có # ở đầu)

## 🆘 Hỗ trợ

Nếu bạn gặp vấn đề, hãy kiểm tra:

1. Bot token có đúng không
2. Bot có được mời vào server không
3. Bot có quyền gửi tin nhắn không
4. Tên channel có chính xác không

## 📝 License

MIT License - Bạn có thể sử dụng tự do cho mục đích cá nhân và thương mại.
