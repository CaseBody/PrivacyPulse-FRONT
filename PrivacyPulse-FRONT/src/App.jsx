import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./App.css";
import useAuth from "./hooks/useAuth";
import Page from "./component/shared/Page";

function App() {
	const navigate = useNavigate();
	const { isLoggedIn, user } = useAuth();

	return (
		<Page>
			<Typography className="read-the-docs">This is the home page.</Typography>
			{isLoggedIn && (
				<Typography>
					<b>Welcome back {user.userName}</b>
				</Typography>
			)}
			<Typography onClick={() => navigate("/register")}>Register</Typography>
			<Typography onClick={() => navigate("/login")}>Login</Typography>
		</Page>
	);
}

export default App;
