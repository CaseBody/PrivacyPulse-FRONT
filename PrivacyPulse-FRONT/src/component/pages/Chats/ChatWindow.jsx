import { Avatar, Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { API_URL } from "../../../constants/links";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useEncryption from "../../../hooks/useEncryption";
import { HubConnectionBuilder } from "@microsoft/signalr";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ChatWindow = ({ chat, openDeleteModal, close }) => {
	if (!chat) return;
	const { user, authFetch } = useAuth();

	const [message, setMessage] = useState("");

	const { encryptMessage: encryptIncomingMessage, decryptMessage } = useEncryption(user.publicKey, user.privateKey);
	const { encryptMessage: encryptOutgoingMessage } = useEncryption(chat.publicKey, user.privateKey);

	const [connection, setConnection] = useState(null);

	const [messages, setMessages] = useState([]);

	const messageEndRef = useRef(null);

	console.log(messages);

	useEffect(() => {
		authFetch("chats/" + chat.id, { method: "GET" })
			.then((r) => r.json())
			.then((messages) => {
				setMessages([]);

				messages.forEach((message) => {
					if (message.type == "SystemMessage") {
						setMessages((state) => [
							...state,
							{
								isSystem: true,
								message: message.text,
							},
						]);
					} else if (message.type == "SharedPost") {
						setMessages((state) => [
							...state,
							{
								isSystem: false,
								fromUserId: message.fromUserId,
								sendDate: message.sendDate,
								sharedPost: {
									username: message.sharedPost.username,
									userId: message.sharedPost.userId,
									image: message.sharedPost.image,
								},
							},
						]);
					} else {
						decryptMessage(message.message).then((decrypted) => {
							setMessages((state) => [
								...state,
								{
									fromUserId: message.fromUserId,
									message: decrypted,
									sendDate: message.sendDate,
									isSystem: false,
								},
							]);
						});
					}
				});

				setTimeout(() => {
					messageEndRef.current.scrollIntoView({ behavior: "smooth" });
				}, 200);
			});
	}, [chat]);

	useEffect(() => {
		connection?.stop();

		const newConnection = new HubConnectionBuilder().withUrl(`${API_URL}hubs/chat`).withAutomaticReconnect().build();

		setConnection(newConnection);
	}, [chat]);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then((result) => {
					connection.send("Connect", chat.id, user.token);

					connection.on("new", async (forUserId, cipherText, fromUserId, sendDate) => {
						if (forUserId == user.id) {
							const message = await decryptMessage(cipherText);
							setMessages((state) => [
								...state,
								{
									fromUserId,
									message,
									sendDate,
								},
							]);

							setTimeout(() => {
								messageEndRef.current.scrollIntoView({ behavior: "smooth" });
							}, 100);
						}
					});
				})
				.catch((e) => console.log("Connection failed: ", e));
		}
	}, [connection]);

	const sendMessage = async (message) => {
		const incoming = await encryptIncomingMessage(message);
		const outgoing = await encryptOutgoingMessage(message);

		try {
			setMessage("");
			await connection.send("SendMessage", chat.id, incoming, outgoing, user.token);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Box sx={{ width: { xs: "100%", md: "80%" }, height: "100%", display: "flex", flexDirection: "column" }}>
			<Paper
				elevation={12}
				sx={{ width: "100%", height: 72, borderRadius: 0, display: "flex", justifyContent: "space-between" }}
			>
				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<IconButton sx={{ display: { xs: "", md: "none" } }} onClick={close}>
						<ArrowBackIosNewIcon sx={{ width: 40, height: 40 }} />
					</IconButton>
					<Avatar sx={{ width: 50, height: 50, margin: 1 }} src={`${API_URL}users/${chat.userId}/profilePicture`} />
					<Typography sx={{ fontSize: 18, fontWeight: "bold" }}>{chat.username}</Typography>
				</Box>
				<IconButton aria-label="delete" color="primary.dark" onClick={() => openDeleteModal()}>
					<DeleteForeverIcon sx={{ width: 40, height: 30 }} />
				</IconButton>
			</Paper>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					overflowY: "scroll",
					padding: 2,
					overflowX: "hidden",
					"&::-webkit-scrollbar": { display: "none" },
				}}
			>
				{messages.map((m) => {
					return (
						<Paper
							elevation={m.isSystem ? 16 : 3}
							sx={{
								mt: 1,
								mr: 2,
								ml: 2,
								padding: 1,
								maxWidth: m.isSystem ? "65%" : "40%",
								wordWrap: "wrap",
								alignSelf: m.isSystem ? "center" : user.id == m.fromUserId ? "flex-end" : "flex-start",
								borderTopLeftRadius: user.id == m.fromUserId || m.isSystem ? "auto" : 15,
								borderTopRightRadius: user.id != m.fromUserId || m.isSystem ? "auto" : 15,
							}}
						>
							<Typography sx={{ wordWrap: "break-word" }}>{m.message}</Typography>
							{m.sharedPost && (
								<Box>
									<Box
										sx={{ gap: 1, mb: 1, display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}
									>
										<Avatar src={`${API_URL}users/${m.sharedPost.userId}/profilePicture`} />

										<Typography>Shared post from {m.sharedPost.username}</Typography>
									</Box>
									<Box>
										<img
											src={"data:image/png;base64," + m.sharedPost.image}
											style={{ height: "100%", width: "100%", objectFit: "cover" }}
											alt="postImg"
										/>
									</Box>
								</Box>
							)}
							{!m.isSystem && (
								<Typography sx={{ fontSize: 10, width: "100%", textAlign: user.id != m.fromUserId ? "start" : "end" }}>
									{new Date(m.sendDate).toLocaleDateString(undefined, { hour: "2-digit", minute: "2-digit" })}
								</Typography>
							)}
						</Paper>
					);
				})}
				<div ref={messageEndRef}></div>
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
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Send a message.."
					sx={{ width: "60%" }}
					onKeyUp={(ev) => {
						if (ev.key === "Enter") {
							sendMessage(message);
							ev.preventDefault();
						}
					}}
				></TextField>
				<IconButton aria-label="delete" color="primary.dark" onClick={() => sendMessage(message)}>
					<SendIcon sx={{ width: 30, height: 30 }} />
				</IconButton>
			</Paper>
		</Box>
	);
};

export default ChatWindow;
