import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/Button";
const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();

	return (
		<div className="h-24 flex justify-between px-10 items-center">
			<Link
				to="/"
				className="font-[900] text-xl"
			>
				IT414
			</Link>

			<ul className="flex gap-5">
				{!isAuthenticated ? (
					<div className="flex items-center gap-3">
						<Link to="/">
							<Button variant="secondary">Login</Button>
						</Link>
						<Link to="/signup">
							<Button variant="outline">Signup</Button>
						</Link>
					</div>
				) : (
					<div className="flex items-center gap-3">
						<Link to="/chat">Chat</Link>
						<Button
							onClick={logout}
							variant="destructive"
						>
							Logout
						</Button>
					</div>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
