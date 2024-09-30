import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

axios.defaults.baseURL = "";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Navbar />
				<div className="container mx-auto">
					<App />
				</div>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
