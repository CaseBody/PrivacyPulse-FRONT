import {
	Avatar,
	Box,
	Button,
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

const DeleteChatModal = ({ isOpen, onClose, reFetchChats, setSelectedChat, selectedChat }) => {
	const [users, setUsers] = useState(null);
	const [query, setQuery] = useState("");
	const [disabled, setDisabled] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const { authFetch } = useAuth();

	const reFetch = () => {
		authFetch(`chats/find${query != "" ? "?name=" + query : ""}`)
			.then((r) => r.json())
			.then((data) => setUsers(data));
	};

	const deleteChat = () => {
		setDisabled(true);

		authFetch(`chats/${selectedChat.id}`, { method: "DELETE" }).then((r) => {
			if (r.ok) {
				enqueueSnackbar("Chat deleted successfully", { variant: "success" });
			} else {
				enqueueSnackbar("Error deleting chat", { variant: "error" });
			}

			setSelectedChat(null);
			onClose();
			reFetchChats();

			setDisabled(false);
		});
	};

	return (
		<Modal open={isOpen} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Paper
				sx={{
					width: { xs: "100%", md: 550 },
					height: { xs: "100%", md: "auto" },
					position: "absolute",
					display: "flex",
					flexDirection: "column",
					padding: 3,
					gap: 3,
				}}
				elevation={8}
			>
				<Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
					<Typography variant="h3">Delete chat</Typography>
					<IconButton onClick={onClose}>
						<ClearIcon sx={{ width: 40, height: 40 }} />
					</IconButton>
				</Box>
				<Typography>
					Are you sure you want to delete this chat? The chat will be permanently deleted for both users.
				</Typography>
				<Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 2 }}>
					<Button onClick={deleteChat} variant="outlined" color="error" loading={disabled}>
						Delete
					</Button>
					<Button onClick={() => onClose()} variant="outlined" loading={disabled}>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
};

export default DeleteChatModal;
