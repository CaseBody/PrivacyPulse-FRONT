import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	CircularProgress,
	Divider,
	IconButton,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { API_URL } from "../../../constants/links";
import Tooltip from "@mui/material/Tooltip";
import chatImg from "../../../../src/assets/chat.png";
import msgImg from "../../../../src/assets/send-message.png";
import redHeart from "../../../../src/assets/red-heart.png";
import heart from "../../../../src/assets/heart.png";
import SharePostModal from "./SharePostModal";

const Post = ({ data }) => {
	const { isLoggedIn, authFetch } = useAuth();
	const [liked, setLiked] = useState(false);
	const [shareModalOpen, setShareModalOpen] = useState(false);

	const toggleHeart = () => {
		setLiked(!liked);
		const id = data.id;

		if (liked){
			FetchDislikePost(id);
		} 
		if (!liked){
			FetchLikePost(id);
		}
	};

  const FetchLikePost = (id) => {
    authFetch(`posts/${id}/like`, { method: "POST" })
  };
  
  const FetchDislikePost = (id) => {
    authFetch(`posts/${id}/dislike`, { method: "DELETE" })
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

  }, []);

	return (
		<>
			<Box
				display={"flex"}
				sx={{ height: "100%", width: "100%", marginTop: { xs: 6, md: 0 } }}
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
			>
				<Divider sx={{ width: "50%", marginTop: "30px", marginBottom: "30px" }}></Divider>
				<Paper
					elevation={1}
					sx={{
						height: { xs: "100%", md: "75%" },
						width: { xs: "100%", md: "50%" },
					}}
				>
					<Box display={"flex"} sx={{ height: "8.75vh", width: "100%" }} justifyContent="center" alignItems="center">
						<Tooltip title={data.username}>
							<IconButton sx={{ p: 0 }}>
								<Avatar src={`${API_URL}users/${data.userId}/profilePicture`} />
							</IconButton>
						</Tooltip>

						<Typography sx={{ fontSize: 20, fontWeight: "bold", marginLeft: "10px" }}>{data.username}</Typography>
					</Box>

					<Box sx={{ height: "40vh", width: "100%" }}>
						<img
							src={"data:image/png;base64," + data.image}
							style={{ height: "100%", width: "100%", objectFit: "cover" }}
							alt="postImg"
						/>
					</Box>

					<Box sx={{ height: "15vh", width: "100%" }}>
						<Typography sx={{ height: "100%", width: "100%", p: 2 }}>{data.body}</Typography>
					</Box>

					<Box display={"flex"} justifyContent={"space-between"} sx={{ height: "5vh", width: "100%" }} alignItems="center">
						<Box
							display={"flex"}
							sx={{
								height: { xs: "70%", md: "85%", xl: "100%" },
								width: { xs: "10%", md: "7.5%", xl: "5.5%" },
								marginLeft: "12.5px",
								marginBottom: "10px",
							}}
							alignItems="center"
							onClick={toggleHeart}
						>
							{liked ? (
								<Tooltip title="Liked">
									<img src={redHeart} alt="red-heart" style={{ height: "80%", width: "80%", marginRight: "7.5px" }} />
								</Tooltip>
							) : (
								<Tooltip title="Like">
									<img src={heart} alt="black-heart" style={{ height: "80%", width: "80%", marginRight: "7.5px" }} />
								</Tooltip>
							)}
							<Tooltip title="Add Comment">
								<img src={chatImg} style={{ height: "60%", width: "80%", marginRight: "12.5px" }} alt="chatImg" />
							</Tooltip>

							<Tooltip title="Send">
								<img
									onClick={() => {
										setShareModalOpen(true);
									}}
									src={msgImg}
									style={{ height: "60%", width: "80%" }}
									alt="msgImg"
								/>
							</Tooltip>
						</Box>
						<Typography sx={{ mr: 2 }}>
							{new Date(data.postedAt).toLocaleDateString(undefined, { hour: "2-digit", minute: "2-digit" })}
						</Typography>
					</Box>
				</Paper>
			</Box>
			<SharePostModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} postId={data.id} />
		</>
	);
};

export default Post;
