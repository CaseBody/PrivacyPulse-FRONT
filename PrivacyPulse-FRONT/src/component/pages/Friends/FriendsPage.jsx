import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	CircularProgress,
	IconButton,
	Modal,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Page from "../../shared/Page";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { API_URL } from "../../../constants/links";
import { useSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
import SearchFriendsModal from "./SearchFriendsModal";

const FriendsPage = () => {
	const { isLoggedIn, authFetch } = useAuth();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [friendRequests, setFriendRequests] = useState(null);
	const [friends, setFriends] = useState(null);

	const [modalOpen, setModalOpen] = useState(false);

	const fetchFriends = () => {
		authFetch("friends", { method: "GET" })
			.then((r) => r.json())
			.then((data) => setFriends(data));
	};

	const fetchFriendRequests = () => {
		authFetch("friendRequests", { method: "GET" })
			.then((r) => r.json())
			.then((data) => setFriendRequests(data));
	};

	const AcceptRequest = (id) => {
		authFetch("friendRequests/" + id + "/accept", { method: "PUT" }).then((r) => {
			if (r.ok) {
				fetchFriends();
				fetchFriendRequests();
				enqueueSnackbar("Friend added", { variant: "success" });
			} else {
				enqueueSnackbar("Error occured while accepting request", { variant: "error" });
			}
		});
	};

	const DenyRequest = (id) => {
		authFetch("friendRequests/" + id + "/deny", { method: "PUT" }).then((r) => {
			fetchFriendRequests();
			if (!r.ok) {
				enqueueSnackbar("Error occured while denying request", { variant: "error" });
			}
		});
	};

	useEffect(() => {
		if (!isLoggedIn) navigate("/login");

		fetchFriendRequests();
		fetchFriends();
	}, []);

	return (
		<>
			<Page title="Friends">
				<Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Paper
						elevation={6}
						sx={{
							width: { xs: "100%", md: "75%" },
							minHeight: "100px",
							margin: { sx: 0, md: 8 },
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							borderRadius: { xs: 0, md: 1 },
						}}
					>
						<Typography
							variant="h3"
							sx={{ width: "100%", padding: 2, paddingBottom: 0, textAlign: { xs: "center", md: "left" } }}
						>
							Friend requests
						</Typography>

						<Box display="flex" width="100%" flexWrap="wrap" columnGap={3} rowGap={3} padding={{ xs: 0, md: 3 }} margin={3}>
							{friendRequests ? (
								friendRequests.map((request) => (
									<Paper
										key={request.userId}
										elevation={24}
										sx={{ width: { xs: "100%", md: "31.5%" }, minWidth: 300, height: 100, display: "flex" }}
									>
										<Box height="100%" width="75%" display="flex" alignItems={"center"}>
											<Avatar
												sx={{ width: 66, height: 66, margin: 1 }}
												src={`${API_URL}users/${request.userId}/profilePicture`}
											/>
											<Box>
												<Typography sx={{ fontSize: 20, fontWeight: "bold" }}>{request.username}</Typography>
												<Typography variant="caption" sx={{ fontSize: 15 }}>
													{request.mutualFriends} mutual friends
												</Typography>
											</Box>
										</Box>
										<Box
											height="100%"
											width="25%"
											display="flex"
											flexDirection="column"
											alignItems="flex-end"
											justifyContent="center"
											padding={1}
										>
											<IconButton aria-label="delete" color="primary.dark" onClick={() => AcceptRequest(request.id)}>
												<CheckIcon />
											</IconButton>
											<IconButton aria-label="delete" color="primary.dark" onClick={() => DenyRequest(request.id)}>
												<ClearIcon />
											</IconButton>
										</Box>
									</Paper>
								))
							) : (
								<CircularProgress color="inherit" />
							)}
						</Box>
					</Paper>

					<Paper
						elevation={6}
						sx={{
							width: { xs: "100%", md: "75%" },
							minHeight: "100px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							borderRadius: { xs: 0, md: 1 },
						}}
					>
						<Box
							sx={{
								width: "100%",
								padding: 2,
								paddingBottom: 0,
								textAlign: { xs: "center", md: "left" },
								display: "flex",
								justifyContent: { md: "space-between", xs: "center" },
								alignItems: "center",
							}}
						>
							<Typography variant="h3">Friends</Typography>
							<IconButton aria-label="add" color="primary.dark" onClick={() => setModalOpen(true)}>
								<AddIcon sx={{ width: 45, height: 45 }} />
							</IconButton>
						</Box>
						<Box
							display="flex"
							width="100%"
							flexWrap="wrap"
							gap={3}
							margin={3}
							padding={2}
							justifyContent={{ md: "flex-start", xs: "center" }}
						>
							{friends ? (
								friends.map((friend) => (
									<Card
										key={friend.userId}
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: { md: "15.2%", xs: "65%" },
											minWidth: 150,
										}}
									>
										<CardActionArea onClick={() => navigate(`/users/${friend.userId}/profile`)}>
											<Box display="flex" flexDirection="column" padding={2} justifyContent={"center"} alignItems={"center"}>
												<Avatar
													sx={{ width: 66, height: 66, margin: 1 }}
													src={`${API_URL}users/${friend.userId}/profilePicture`}
												/>
												<Box>
													<Typography sx={{ fontSize: 20, fontWeight: "bold" }}>{friend.username}</Typography>
												</Box>
											</Box>
										</CardActionArea>
									</Card>
								))
							) : (
								<CircularProgress color="inherit" />
							)}
						</Box>
					</Paper>
				</Box>
			</Page>
			<SearchFriendsModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				reFetchFriends={fetchFriends}
				reFetchRequests={fetchFriendRequests}
			/>
		</>
	);
};

export default FriendsPage;
