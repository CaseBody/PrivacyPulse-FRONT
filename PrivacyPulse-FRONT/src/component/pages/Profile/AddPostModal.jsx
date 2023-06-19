import { Box, Paper, TextField, Typography, Avatar, IconButton, Modal, Tooltip, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const AddPostModal = ({ isOpen, onClose }) => {
	const { authFetch } = useAuth();
	const [postImage, setPostImage] = useState(null);
	const [fileName, setFileName] = useState("");
	const [postBody, setPostBody] = useState();

	const CreatePost = () => {
		if (postImage && postBody) {
			const postData = new FormData();
			console.log(postImage);
			postData.append("body", postBody);
			postData.append("image", postImage);

			authFetch(
				"posts/create",
				{
					method: "POST",
					body: postData,
				},
				false,
				true
			).then((response) => {
				if (response.ok) {
					enqueueSnackbar("Post has successfully been created", {
						variant: "success",
					});
					onClose();
					setPostImage(null);
					setFileName("");
					setPostBody("");
				} else {
					enqueueSnackbar("There was an error while creating the post", {
						variant: "error",
					});
				}
			});
		} else {
			enqueueSnackbar("Fill in all the required fields", {
				variant: "error",
			});
		}
	};

	return (
		<Modal open={isOpen} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Paper
				sx={{
					width: { xs: "100%", md: 750 },
					height: { xs: "100%", md: 500 },
					position: "absolute",
					display: "flex",
					flexDirection: "column",
					padding: 3,
					gap: 3,
				}}
				elevation={8}
			>
				<Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
					<Typography variant="h3">Add Post</Typography>
					<Tooltip title="Close Modal">
						<IconButton sx={{ p: 0, width: 48, height: 48 }} size="large" onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Tooltip>
				</Box>

				<div>
					<input
						accept="image/*"
						id="button-post-image"
						type="file"
						style={{ display: "none" }}
						onChange={(event) => {
							const file = event.target.files[0];
							setPostImage(file);
							setFileName(file.name);
						}}
					/>
					<label htmlFor="button-post-image">
						<Button
							variant="outlined"
							component="span"
							size="large"
							sx={{
								width: "30%",
							}}
							endIcon={<PhotoCameraIcon />}
						>
							Upload Image
						</Button>
					</label>
					{fileName && <Typography mt={3}>Selected file: {fileName}</Typography>}
				</div>

				<TextField
					label="Body"
					placeholder="Body of you're post..."
					multiline
					rows={7}
					onChange={(e) => setPostBody(e.target.value)}
				></TextField>

				<Button
					variant="outlined"
					size="large"
					sx={{
						width: "30%",
					}}
					endIcon={<SendIcon />}
					onClick={CreatePost}
				>
					Create Post
				</Button>
			</Paper>
		</Modal>
	);
};

export default AddPostModal;
