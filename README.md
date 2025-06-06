# Discord Bot - Link Account & Private Messaging

Một Discord bot được viết bằng Node.js và discord.js có thể link account người dùng và giao tiếp qua tin nhắn riêng.

## 🚀 Tính năng

- ✅ **Link Account**: Người dùng có thể link account bằng lệnh `/link-account`
- ✅ **Private Messaging**: Bot có thể gửi và nhận tin nhắn riêng (DM)
- ✅ **User Management**: Lưu trữ danh sách người dùng đã link account
- ✅ **Auto Greeting**: Tự động gửi lời chào khi bot khởi động
- ✅ **Security**: Chỉ người dùng đã link mới có thể chat riêng với bot

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
   - Cấp quyền cần thiết cho bot:
     - Send Messages
     - Read Message History
     - Use Slash Commands (tùy chọn)

4. Cấu hình file `.env`:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   ```

5. Mời bot vào server Discord của bạn với link có quyền phù hợp

## 🎮 Cách sử dụng

### Chạy bot

```bash
npm start
```

### Hướng dẫn sử dụng

#### Bước 1: Link Account
Trong server Discord, gõ lệnh:
```
/link-account
```

Bot sẽ:
- ✅ Lưu ID của bạn vào hệ thống
- 📨 Gửi tin nhắn xác nhận trong server  
- 💬 Gửi tin nhắn chào hỏi riêng cho bạn

#### Bước 2: Chat riêng với Bot
Sau khi link thành công:
- Mở DM với bot
- Gửi bất kỳ tin nhắn nào
- Bot sẽ phản hồi lại tin nhắn của bạn

### Các tính năng chính

| Tính năng | Mô tả | Vị trí |
|-----------|-------|--------|
| `/link-account` | Link account để sử dụng bot | Server channels |
| Chat riêng | Giao tiếp trực tiếp với bot | Direct Messages |
| Auto greeting | Bot tự động chào hỏi khi khởi động | Server channels |

## 📁 Cấu trúc dự án

```
discord-bot/
├── index.js         # File chính của bot
├── package.json     # Dependencies và scripts
├── .env            # Cấu hình bot token (cần tạo)
└── README.md       # Hướng dẫn này
```

## 🔧 Luồng hoạt động

1. **Bot khởi động** → Gửi lời chào vào channel đầu tiên
2. **User gõ `/link-account`** → Bot lưu ID và gửi DM chào hỏi
3. **User chat riêng với bot** → Bot phản hồi (chỉ với user đã link)

## 💡 Ví dụ sử dụng

### Trong Server:
```
User: /link-account
Bot: ✅ Đã link account thành công! ID của bạn đã được lưu.
```

### Trong DM:
```
User: Xin chào bot!
Bot: 📨 Tôi đã nhận được tin nhắn của bạn: "Xin chào bot!"
```

## ⚠️ Lưu ý quan trọng

- **Quyền riêng tư**: Đảm bảo cài đặt Discord cho phép bot gửi DM
- **Bảo mật**: Chỉ người dùng đã link account mới có thể chat riêng
- **Token**: Không chia sẻ Discord bot token với người khác
- **Data**: Dữ liệu người dùng chỉ lưu trong bộ nhớ tạm (mất khi restart)

## 🔍 Troubleshooting

### Bot không phản hồi DM?
- Kiểm tra cài đặt quyền riêng tư Discord
- Đảm bảo đã link account trước

### Bot không hoạt động?
1. Kiểm tra bot token trong file `.env`
2. Đảm bảo bot được mời vào server
3. Kiểm tra quyền của bot trong server

### Lỗi khi gửi DM?
- Bot sẽ thông báo lỗi trong server
- Kiểm tra cài đặt "Direct Messages" trong Discord

## 🚀 Phát triển thêm

Có thể mở rộng bot với:
- Lưu trữ dữ liệu vào database
- Thêm nhiều lệnh tương tác
- Slash commands thay vì text commands
- Webhook integration
- Scheduled messages

## 📝 License

MIT License - Sử dụng tự do cho mục đích cá nhân và thương mại.
