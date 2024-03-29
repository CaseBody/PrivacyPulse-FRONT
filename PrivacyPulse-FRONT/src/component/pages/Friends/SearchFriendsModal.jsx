import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	CircularProgress,
	IconButton,
	Modal,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { API_URL } from "../../../constants/links";
import ClearIcon from "@mui/icons-material/Clear";
import { useSnackbar } from "notistack";

const SearchFriendsModal = ({ isOpen, onClose, reFetchFriends, reFetchRequests }) => {
	const [users, setUsers] = useState(null);
	const [query, setQuery] = useState("");
	const [disabled, setDisabled] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const { authFetch } = useAuth();

	const reFetch = () => {
		authFetch(`friends/find${query != "" ? "?name=" + query : ""}`)
			.then((r) => r.json())
			.then((data) => setUsers(data));
	};

	const addFriend = (id) => {
		setDisabled(true);

		authFetch(`friendRequests?addedUserId=${id}`, { method: "POST" }).then((r) => {
			if (r.ok) {
				enqueueSnackbar("Friend request send to user successfully", { variant: "success" });
			} else {
				enqueueSnackbar("Error sending friend request", { variant: "error" });
			}

			onClose();
			setQuery("");
			reFetch();
			reFetchFriends();
			reFetchRequests();

			setDisabled(false);
		});
	};

	useEffect(() => {
		const getData = setTimeout(() => {
			reFetch();
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
				<Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
					<Typography variant="h3">Add friend</Typography>
					<IconButton onClick={onClose}>
						<ClearIcon sx={{ width: 40, height: 40 }} />
					</IconButton>
				</Box>
				<TextField onChange={(e) => setQuery(e.target.value)} label="Username" placeholder="Search for users..." />
				<Box
					width="100%"
					sx={{
						overflowX: "hidden",
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
										height: 142,
										minWidth: 150,
									}}
								>
									<CardActionArea disabled={disabled} onClick={() => addFriend(user.id)}>
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
