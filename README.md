
# 🌐 PeerLink - P2P File Sharing Application

![Screenshot 2025-06-23 164330](https://github.com/user-attachments/assets/200e3464-8d6c-407e-9602-d4f5ad10b734)



PeerLink is a peer-to-peer file sharing platform built with Java and Next.js, enabling secure, direct file transfers between users using simple invite codes. The system uses multithreaded Java servers for concurrent file serving, enhancing performance and scalability.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📤 Drag and Drop | Intuitive file upload interface |
| 🔗 Invite Codes | Share files via simple port-based codes |
| ⚡ Direct P2P | Files transfer directly between peers |
| 🧵 Multithreaded | Concurrent handling of multiple transfers |
| 🌈 Responsive UI | Built with Next.js + TailwindCSS |
| 🔄 Cross-Platform | Works across different operating systems |
| 🔐 (Future) Encryption | Planned security enhancements |

## 🏗️ Project Structure

```
PeerLink/
├── Backend/ # Backend (Java with Spring Boot)
│ └── main/java/p2p/
│ ├── controller/ # API endpoints (HTTP handlers)
│ ├── service/ # Business logic (includes multithreaded file server)
│ ├── utils/ # Utility classes (e.g., code generation)
│ └── App.java # Main server entry point
├── Frontend/ # Frontend (Next.js app)
│ └── src/
│ ├── app/ # App routes
│ └── components/ # Upload/Download/InviteCode components
├── pom.xml # Maven configuration for backend
└── README.md # Project overview and documentation
```
## 🚀 Getting Started
Prerequisites
Java 11+
Node.js 18+ and npm
Maven (for Java builds)

## Installation
    #Backend Setup
        bash
      mvn clean package
      java -jar target/p2p-1.0-SNAPSHOT.jar
  
    #🖥️ Frontend Setup
        bash
      cd Frontend
      npm install
      npm run dev
   

## 🔄 How It Works

### 📤 Upload Flow
1. User selects file via drag-and-drop UI  
2. File sent to Java server via `/upload` endpoint  
3. Backend assigns unique port (invite code)  
4. Multithreaded file server starts on assigned port  

### 🔗 Sharing Flow
1. Host shares invite code (port number) with recipient  
2. Recipient enters code in their PeerLink interface  

### 📥 Download Flow
1. Frontend sends `GET /download/{port}` request  
2. Java backend proxies to the appropriate file server  
3. File streams directly via socket connection  

## ⚙️ Technical Highlights

### Multithreading Architecture
PeerLink leverages Java's concurrency features:  
- `ExecutorService` for thread management  
- Dedicated threads per file transfer  
- Concurrent upload/download support  
- Optimized throughput under load  

## 🔐 Security Notice

> **Warning**  
> This is currently a demo project with limited security:  
> 
> 🚫 No authentication system  
> 🚫 No file encryption  
> 🚫 No HTTPS/TLS support  

### Recommended Production Enhancements:
- ✅ Implement TLS/HTTPS  
- ✅ Add file encryption  
- ✅ Integrate JWT/OAuth authentication  
- ✅ Configure firewall rules for port security  

## 🤝 Contributing
We welcome contributions! Please fork the repository and submit pull requests.
