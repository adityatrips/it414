// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "*",
	},
});

// Middleware
app.use(express.static("public"));
app.use(express.json());

// Socket.IO configuration
io.on("connection", (socket) => {
	console.log("New user connected");

	socket.on("chatMessage", (msg) => {
		io.emit("chatMessage", msg); // Broadcast to all clients
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
