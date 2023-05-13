import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import Page from "./component/shared/Page";

function App() {
	const navigate = useNavigate();
	const { isLoggedIn, user } = useAuth();

	return (
		<Page>
			<p className="read-the-docs">This is the home page.</p>
			{isLoggedIn && (
				<p>
					<b>Welcome back {user.userName}</b>
				</p>
			)}
			<p onClick={() => navigate("/register")}>Register</p>
			<p onClick={() => navigate("/login")}>Login</p>
		</Page>
	);
}

export default App;
