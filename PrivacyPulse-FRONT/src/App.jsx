import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";

function App() {
	const navigate = useNavigate();
	const { isLoggedIn, user } = useAuth();

	return (
		<>
			<p className="read-the-docs">This is the home page.</p>
			{isLoggedIn && (
				<p>
					<b>Welcome back {user.userName}</b>
				</p>
			)}
			<p onClick={() => navigate("/bar")}>Header</p>
			<p onClick={() => navigate("/login")}>Login</p>
		</>
	);
}

export default App;
