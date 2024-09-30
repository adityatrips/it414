import { createContext, useContext, useState } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = async (username, password) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/auth/login`,
				{
					username,
					password,
				}
			);
			setIsAuthenticated(true);
			localStorage.setItem("username", response.data.username); // Save username
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const signup = async (username, password) => {
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
				username,
				password,
			});
			await login(username, password);
		} catch (error) {
			console.error("Signup failed:", error);
		}
	};

	const logout = () => {
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
