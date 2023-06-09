import {
  Box,
  Paper,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Modal,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../constants/links";

const AddPostModal = ({ isOpen, onClose }) => {
  const { authFetch } = useAuth();
  const [postImage, setPostImage] = useState(null);
  const [postBody, setPostBody] = useState('');

  const CreatePost = () => {
    const postData = new FormData();
    postData.append("body", postBody);
    postData.append("image", postImage);

    authFetch("posts/create", {
      method: "POST",
      body: postData,
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
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
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h3">Add Post</Typography>
          <Tooltip title="Close Modal">
            <IconButton
              sx={{ p: 0, width: 48, height: 48 }}
              size="large"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={(event) => {
            const file = event.target.files[0];
            setPostImage(file);
          }}
        />

        <TextField
          label="Body"
          placeholder="Body of you're post..."
          onChange={(e) => setPostBody(e.target.value)}
        ></TextField>

        <button onClick={CreatePost}>Submit</button>
      </Paper>
    </Modal>
  );
};

export default AddPostModal;
