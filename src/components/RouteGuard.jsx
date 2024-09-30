import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, []);

	return children;
};

RouteGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

export default RouteGuard;
