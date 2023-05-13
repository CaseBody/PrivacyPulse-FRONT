import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
	const navigate = useNavigate();

	window.localStorage.removeItem("userName");
	window.localStorage.removeItem("user");
	window.localStorage.removeItem("privateKey");
	window.localStorage.removeItem("token");

	useEffect(() => {
		navigate("/login");
	}, []);
};

export default LogoutPage;
