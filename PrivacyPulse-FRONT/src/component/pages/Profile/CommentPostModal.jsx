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
import SendIcon from "@mui/icons-material/Send";


const CommentPostModal = ({ isOpen, onClose, postId }) => {
  const { isLoggedIn, user, authFetch } = useAuth();
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [commentData, setCommentData] = useState(false);
  const [allSelectedComments, setAllSelectedComments] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const addComment = () => {
    setDisabled(true);

    authFetch("comment/add", {
      method: "POST",
      body: JSON.stringify(commentData),
    }).then((r) => {
      if (r.ok) {
        enqueueSnackbar("Comment successfully added to the post", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Error adding comment to post", { variant: "error" });
      }
    });
    
    onClose();
    setDisabled(false);
  }

  const handleCommentData = (body) => {
    setCommentData({
      CommentId: postId,
      Body: body,
    });
  };

  const FetchComments = (postId) => {
    authFetch(`comments/${postId}/get`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((data) => {
        setAllSelectedComments(data);
      });
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    FetchComments(postId);
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper
        sx={{
          width: { xs: "100%", md: 900 },
          height: { xs: "100%", md: 750 },
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
          <Typography variant="h3">Add Comments</Typography>
          <IconButton onClick={onClose}>
            <ClearIcon sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Box>
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <TextField
            onChange={(e) => handleCommentData(e.target.value)}
            label="Comment text"
            placeholder="Write comment text"
            sx={{
              width: "70%",
            }}
            value={commentData.Body || ""}
          />

          <Button
            variant="outlined"
            size="large"
            sx={{
              width: "25%",
            }}
            endIcon={<SendIcon />}
            onClick={addComment}
          >
            Create Post
          </Button>
        </Box>
        <Box
          width="100%"
          sx={{
            overflowX: "hidden",
            "&::-webkit-scrollbar": {},
          }}
        >
          <Box display="flex" flexWrap="wrap" gap={1}></Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CommentPostModal;
