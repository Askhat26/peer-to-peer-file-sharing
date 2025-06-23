PeerLink - P2P File Sharing Application
PeerLink is a peer-to-peer file sharing platform built with Java and Next.js, enabling secure, direct file transfers between users using simple invite codes.
The system uses multithreaded Java servers for concurrent file serving, enhancing performance and scalability.

PeerLink/
├── Backend/
│   └── main/java/p2p/
│       ├── controller/     # API endpoints (HTTP handlers)
│       ├── service/        # Business logic (includes multithreaded file server)
│       ├── utils/          # Utility classes (e.g., code generation)
│       └── App.java        # Main server entry point
├── Frontend/                     # Next.js frontend app
│   └── src/
│       ├── app/            # App routes
│       └── components/     # Upload/Download/InviteCode components
├── pom.xml                 # Maven config
└── README.md


✨ Features
✅ Drag and drop file uploads

✅ File sharing via invite codes (port numbers)

✅ File downloading via invite codes

✅ Responsive UI (Next.js + TailwindCSS)

✅ Direct P2P transfers (no storage in backend)

✅ Multithreaded file servers to support concurrent sharing

🔐 (Optional) Encryption support (future)

🌐 Cross-platform support

🚦 Prerequisites
Java 11+

Node.js 18+ and npm

Maven (for Java builds


🛠️ Manual Setup
🔧 Backend Setup
mvn clean package
java -jar target/p2p-1.0-SNAPSHOT.jar

🧑‍💻 Frontend Setup
cd Frontend
npm install
npm run dev

🔄 How It Works
Upload Flow
User selects file (UI)

File sent to Java server via /upload

Backend assigns a unique port (invite code)

Backend starts a multithreaded file server on that port

Sharing Flow
The host shares the invite code (port) with the recipient

Download Flow
Recipient enters the invite code in UI

The frontend sends GET /download/{port}

Java backend proxies the request to the file server

File is streamed directly via socket connection

⚙️ Multithreading Support
PeerLink uses Java’s ExecutorService and Thread classes to:

Spawn dedicated file servers for each file transfer

Handle each incoming download request via a separate thread

Ensure multiple users can upload/download concurrently

This ensures high throughput and better responsiveness under load.


🔐 Security Considerations
Currently this is a demo project, so:

❌ No authentication or login

❌ No encryption on files

❌ No HTTPS or secure token system

✅ For production-ready use, consider:

✅ TLS encryption (HTTPS)

✅ File encryption before sending

✅ Port whitelisting/firewall rules

✅ Authentication with JWT or OAuth
