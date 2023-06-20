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

const SharePostModal = ({ isOpen, onClose, postId }) => {
	const [users, setUsers] = useState(null);
	const [query, setQuery] = useState("");
	const [disabled, setDisabled] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const { authFetch } = useAuth();

	const reFetch = () => {
		authFetch(`chats/existing${query != "" ? "?name=" + query : ""}`)
			.then((r) => r.json())
			.then((data) => setUsers(data));
	};

	const sharePost = (id) => {
		setDisabled(true);

		authFetch(`posts/${postId}/share?userChatId=${id}`, { method: "POST" }).then((r) => {
			if (r.ok) {
				enqueueSnackbar("Post shared with user successfully", { variant: "success" });
			} else {
				enqueueSnackbar("Error sharing post", { variant: "error" });
			}

			onClose();
			setQuery("");
			reFetch();

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
					<Typography variant="h3">Share with friend</Typography>
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
									<CardActionArea disabled={disabled} onClick={() => sharePost(user.id)}>
										<Box display="flex" flexDirection="column" padding={2} justifyContent={"center"} alignItems={"center"}>
											<Avatar
												sx={{ width: 66, height: 66, margin: 1 }}
												src={`${API_URL}users/${user.userId}/profilePicture`}
											/>
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

export default SharePostModal;
