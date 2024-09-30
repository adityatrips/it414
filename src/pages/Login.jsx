import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardContent,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();

	return (
		<div className="flex flex-col min-h-[calc(100vh-6rem)] justify-center">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						Already a user? Welcome back! 👉🏻👈🏻
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<Input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<Input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						clasName="border p-2 mb-4 w-full"
						required
					/>
				</CardContent>
				<CardFooter>
					<Button
						className="w-full"
						onClick={() => login(username, password)}
					>
						Login
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
