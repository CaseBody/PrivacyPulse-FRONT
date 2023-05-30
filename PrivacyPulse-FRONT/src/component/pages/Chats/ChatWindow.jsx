import { Avatar, Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { API_URL } from "../../../constants/links";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useEncryption from "../../../hooks/useEncryption";
import { HubConnectionBuilder } from "@microsoft/signalr";

const ChatWindow = ({ chat }) => {
	if (!chat) return;
	const { user, authFetch } = useAuth();

	const [message, setMessage] = useState("");

	const { encryptMessage: encryptIncomingMessage, decryptMessage } = useEncryption(user.publicKey, user.privateKey);
	const { encryptMessage: encryptOutgoingMessage } = useEncryption(chat.publicKey, user.privateKey);

	const [connection, setConnection] = useState(null);

	const [messages, setMessages] = useState([
		{ fromUserId: 10, sendDate: "24-05-2023", message: "Hallo, dit is een test bericht!!" },
		{ fromUserId: 7, sendDate: "24-05-2023", message: "Mooi bericht, dit is een reactie op jouw bericht!!s" },
		{ fromUserId: 7, sendDate: "24-05-2023", message: "Bababouy" },
	]);

	useEffect(() => {
		authFetch("chats/" + chat.id, { method: "GET" })
			.then((r) => r.json())
			.then((messages) => setMessages(messages));
	}, [chat]);

	useEffect(() => {
		const newConnection = new HubConnectionBuilder().withUrl(`${API_URL}hubs/chat`).withAutomaticReconnect().build();

		setConnection(newConnection);
	}, [chat]);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then((result) => {
					console.log("Connected!");

					connection.send("Connect", chat.id, user.token);

					connection.on("new", (message) => {
						console.log(message);
					});
				})
				.catch((e) => console.log("Connection failed: ", e));
		}
	}, [connection]);

	const sendMessage = async (message) => {
		const incoming = await encryptIncomingMessage(message);
		const outgoing = await encryptOutgoingMessage(message);

		if (connection.connectionStarted) {
			try {
				await connection.send("SendMessage", chat.id, incoming, outgoing, user.token);
			} catch (e) {
				console.log(e);
			}
		} else {
			alert("No connection to server yet.");
		}
	};

	return (
		<Box sx={{ width: "80%", height: "100%", display: "flex", flexDirection: "column" }}>
			<Paper
				elevation={12}
				sx={{ width: "100%", height: 72, borderRadius: 0, display: "flex", justifyContent: "space-between" }}
			>
				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Avatar sx={{ width: 50, height: 50, margin: 1 }} src={`${API_URL}users/${chat.userId}/profilePicture`} />
					<Typography sx={{ fontSize: 18, fontWeight: "bold" }}>{chat.username}</Typography>
				</Box>
				<IconButton aria-label="delete" color="primary.dark" onClick={() => AcceptRequest(request.id)}>
					<DeleteForeverIcon sx={{ width: 40, height: 30 }} />
				</IconButton>
			</Paper>
			<Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
				{messages.map((m) => {
					return (
						<Paper
							sx={{
								mt: 1,
								mr: 2,
								ml: 2,
								padding: 1,
								maxWidth: "40%",
								alignSelf: user.id == m.fromUserId ? "flex-end" : "flex-start",
							}}
						>
							<Typography>{m.message}</Typography>
						</Paper>
					);
				})}
			</Box>
			<Paper
				elevation={12}
				sx={{
					width: "100%",
					height: 100,
					borderRadius: 0,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: 1,
				}}
			>
				<TextField
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Send a message.."
					sx={{ width: "60%" }}
				></TextField>
				<IconButton
					aria-label="delete"
					color="primary.dark"
					onClick={() => sendMessage(message).catch((e) => console.log(e))}
				>
					<SendIcon sx={{ width: 30, height: 30 }} />
				</IconButton>
			</Paper>
		</Box>
	);
};

export default ChatWindow;
