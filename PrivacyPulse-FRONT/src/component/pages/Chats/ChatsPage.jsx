import { Avatar, Box, Card, CardActionArea, Divider, IconButton, Paper, Typography } from "@mui/material";
import Page from "../../shared/Page";
import { API_URL } from "../../../constants/links";
import AddIcon from "@mui/icons-material/Add";
import CreateChatModal from "./CreateChatModal";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import ChatWindow from "./ChatWindow";
import DeleteChatModal from "./DeleteChatModal";

const ChatsPage = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const [chats, setChats] = useState([]);
	const [selectedChat, setSelectedChat] = useState(null);
	const { authFetch } = useAuth();

	const fetchChats = () => {
		authFetch("chats", { method: "GET" })
			.then((r) => r.json())
			.then((data) => {
				setChats(data);
				setSelectedChat(null);
			});
	};

	useEffect(() => {
		fetchChats();
	}, []);

	return (
		<>
			<Page title="Chats">
				<Box sx={{ width: "100%", height: { xs: "91vh", md: "92.7vh" }, display: "flex" }}>
					<Paper
						elevation={6}
						sx={{
							width: { xs: "100%", md: "20%" },
							height: "100%",
							borderRadius: 0,
							display: { xs: selectedChat ? "none" : "flex", md: "flex" },
							flexDirection: "column",
							borderRight: 0.5,
						}}
					>
						<Box sx={{ display: "flex", margin: 1, justifyContent: "center", alignItems: "center" }}>
							<Typography sx={{ fontSize: 28 }}>Chats</Typography>
							<IconButton aria-label="add" color="primary.dark" onClick={() => setModalOpen(true)}>
								<AddIcon sx={{ width: 40, height: 40 }} />
							</IconButton>
						</Box>
						{chats.map((chat) => (
							<>
								<Divider />
								<Card
									key={chat.id}
									sx={{
										display: "flex",
										width: "100%",
									}}
								>
									<CardActionArea onClick={() => setSelectedChat(chat)}>
										<Box display="flex" padding={1} alignItems={"center"}>
											<Avatar
												sx={{ width: 60, height: 60, margin: 1 }}
												src={`${API_URL}users/${chat.userId}/profilePicture`}
											/>
											<Box>
												<Typography sx={{ fontSize: 18, fontWeight: "bold" }}>{chat.username}</Typography>
											</Box>
										</Box>
									</CardActionArea>
								</Card>
							</>
						))}
					</Paper>
					<ChatWindow
						chat={selectedChat}
						openDeleteModal={() => setDeleteModalOpen(true)}
						close={() => setSelectedChat(null)}
					/>
				</Box>
			</Page>
			<CreateChatModal isOpen={modalOpen} onClose={() => setModalOpen(false)} reFetchChats={fetchChats} />
			<DeleteChatModal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				reFetchChats={fetchChats}
				setSelectedChat={setSelectedChat}
				selectedChat={selectedChat}
			/>
		</>
	);
};

export default ChatsPage;
