# End-to-End Encrypted Chat Application

## Project Structure

```
client/   - React frontend (UI, encryption, socket.io client)
server/   - Node.js/Express backend (API, socket.io, auth, file handling)
db/       - PostgreSQL schema, migrations, seed scripts
uploads/  - Encrypted file storage (if using local disk)
```

## Features
- User authentication (JWT, optional 2FA)
- End-to-end encrypted messaging (asymmetric key exchange, symmetric message encryption)
- Real-time chat (Socket.IO)
- Group and private chats
- Secure file sharing (encrypted before upload)
- Modern, responsive UI (React + Tailwind)

<img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/45754db1-5b69-4cb1-9b48-892ed104bdf9" />
