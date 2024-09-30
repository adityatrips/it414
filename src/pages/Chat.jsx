import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import io from "socket.io-client";

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [content, setContent] = useState("");
	const [username, setUsername] = useState("");
	const socket = io(import.meta.env.VITE_API_URL);

	useEffect(() => {
		// Get username from local storage
		const user = localStorage.getItem("username");
		if (user) {
			setUsername(user);
		}

		// Fetch initial messages from API
		// const fetchMessages = async () => {
		// 	try {
		// 		const response = await axios.get(
		// 			`${import.meta.env.VITE_API_URL}/api/messages`
		// 		);
		// 		setMessages(response.data);
		// 	} catch (error) {
		// 		console.error("Error fetching messages:", error);
		// 	}
		// };

		// fetchMessages();

		// Listen for new messages from the socket
		socket.on("newMessage", (message) => {
			setMessages((prev) => [...prev, message]);
		});

		// Clean up the socket connection on component unmount
		return () => {
			socket.disconnect();
		};
	}, [socket]);

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (content) {
			try {
				const messageData = { username, message: content };
				await axios.post(
					`${import.meta.env.VITE_API_URL}/api/messages`,
					messageData
				);
				socket.emit("send_message", messageData);
				setContent("");
			} catch (error) {
				console.error("Error sending message:", error);
			}
		}
	};

	return (
		<div className="flex flex-col min-h-[calc(100vh-6rem)] pb-5">
			<div className="flex-1 overflow-auto">
				{messages.map((msg, index) => (
					<div
						key={index}
						className="p-2 bg-gray-200 rounded mb-2"
					>
						<strong>{msg.username}:</strong> {msg.message}
					</div>
				))}
			</div>
			<div className="flex ">
				<Input
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="border p-2 w-full mr-2"
					placeholder="Type a message..."
					required
				/>
				<Button onClick={handleSendMessage}>Send</Button>
			</div>
		</div>
	);
};

export default Chat;
