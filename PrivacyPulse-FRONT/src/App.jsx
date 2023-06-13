import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./App.css";
import useAuth from "./hooks/useAuth";
import Page from "./component/shared/Page";
import Post from "./component/pages/Profile/Post";

function App() {
	const navigate = useNavigate();
	const { isLoggedIn, authFetch, user } = useAuth();
	const [posts, setPosts] = useState(null);

	useEffect(() => {
		if (!isLoggedIn) navigate("/login");

		authFetch(`users/feed`, {
			method: "GET",
			Headers: {
				"Content-Type": "application/json",
			},
		})
			.then((r) => r.json())
			.then((data) => {
				setPosts(data);
			})
			.catch(() => {
				console.log("Error fetching posts data");
			});
	}, []);

	return (
		<Page>
			<Typography className="read-the-docs">This is the home page.</Typography>
			{isLoggedIn && (
				<Typography>
					<b>Welcome back {user.userName}</b>
				</Typography>
			)}
			{posts?.map((data) => (
				<Post data={data} />
			))}
		</Page>
	);
}

export default App;
