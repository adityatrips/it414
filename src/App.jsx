import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const socket = io(import.meta.env.VITE_API_URL); // Make sure this matches your server port

function App() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [username, setUsername] = useState("");

	useEffect(() => {
		socket.on("chatMessage", (msg) => {
			setMessages((prev) => [...prev, msg]);
		});

		return () => {
			socket.off("chatMessage");
		};
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		if (input && username) {
			const message = { user: username, text: input };
			socket.emit("chatMessage", message);
			setInput("");
		}
	};

	return (
		<div className="App">
			<ul className="flex flex-col gap-2">
				{messages.map((msg, index) => (
					<li
						className="rounded bg-gray-200 pr-5 flex gap-5"
						key={index}
					>
						<div className="rounded py-2 w-[20%] bg-gray-400 text-center text-white">
							{msg.user}
						</div>
						<div className="py-2">{msg.text}</div>
					</li>
				))}
			</ul>
			<form
				className="flex pb-5 gap-5 fixed bottom-0 right-0 left-0 px-10 h-14"
				onSubmit={sendMessage}
			>
				<Input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-1/4"
					placeholder="Enter your username..."
				/>
				<Input
					type="text"
					value={input}
					onChange={(e) => {
						if (RegExp(/[a-zA-Z0-9]*/gi).test(e.target.value)) {
							setInput(e.target.value);
						} else {
							console.error("Not allowed");
						}
					}}
					placeholder="Type a message..."
				/>
				<Button type="submit">Send</Button>
			</form>
		</div>
	);
}

export default App;
