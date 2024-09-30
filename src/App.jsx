import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import RouteGuard from "./components/RouteGuard";

const App = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/chat");
		} else {
			navigate("/");
		}
	}, [isAuthenticated]);

	return (
		<Routes>
			<Route
				path="/"
				element={<Login />}
			/>
			<Route
				path="/signup"
				element={<Signup />}
			/>
			<Route
				path="/chat"
				element={
					<RouteGuard>
						<Chat />
					</RouteGuard>
				}
			/>
		</Routes>
	);
};

export default App;
