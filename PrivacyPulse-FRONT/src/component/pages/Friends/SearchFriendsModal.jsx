import { Avatar, Box, Card, CardActionArea, CircularProgress, Modal, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { API_URL } from "../../../constants/links";

const SearchFriendsModal = ({ isOpen, onClose }) => {
	const [users, setUsers] = useState(null);
	const [query, setQuery] = useState("");
	const { authFetch } = useAuth();

	useEffect(() => {
		const getData = setTimeout(() => {
			authFetch(`friends/find${query != "" ? "?name=" + query : ""}`)
				.then((r) => r.json())
				.then((data) => setUsers(data));
		}, 800);

		return () => clearTimeout(getData);
	}, [query]);

	return (
		<Modal open={isOpen} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Paper
				sx={{
					width: { xs: "100%", md: 550 },
					height: { xs: "100%", md: 350 },
					position: "absolute",
					display: "flex",
					flexDirection: "column",
					padding: 3,
					gap: 3,
				}}
				elevation={8}
			>
				<Typography variant="h3">Add friend</Typography>
				<TextField onChange={(e) => setQuery(e.target.value)} label="Username" placeholder="Search for users..." />
				<Box
					width="100%"
					sx={{
						"overflow-x": "hidden",
						"&::-webkit-scrollbar": {},
					}}
				>
					<Box display="flex" flexWrap="wrap" gap={1}>
						{users ? (
							users.map((user) => (
								<Card
									key={user.id}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										width: "32%",
										minWidth: 150,
									}}
								>
									<CardActionArea onClick={() => navigate(`/users/${user.id}/profile`)}>
										<Box display="flex" flexDirection="column" padding={2} justifyContent={"center"} alignItems={"center"}>
											<Avatar sx={{ width: 66, height: 66, margin: 1 }} src={`${API_URL}users/${user.id}/profilePicture`} />
											<Box>
												<Typography sx={{ fontSize: 20, fontWeight: "bold" }}>{user.username}</Typography>
											</Box>
										</Box>
									</CardActionArea>
								</Card>
							))
						) : (
							<CircularProgress color="inherit" />
						)}
					</Box>
				</Box>
			</Paper>
		</Modal>
	);
};

export default SearchFriendsModal;
