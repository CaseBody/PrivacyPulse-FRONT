import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Page from "../../shared/Page";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { API_URL } from "../../../constants/links";
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip";
import postImg from "../../../../src/assets/Justin.jpeg";
import chatImg from "../../../../src/assets/chat.png";
import msgImg from "../../../../src/assets/send-message.png";
import redHeart from "../../../../src/assets/red-heart.png";
import heart from "../../../../src/assets/heart.png";

const Post = () => {
  const { isLoggedIn, user, authFetch } = useAuth();
  const [liked, setLiked] = useState(false);

  const toggleHeart = () => {
    setLiked(!liked);
  }

  return (
    <Box
      display={"flex"}
      sx={{ height: "70vh", width: "100%" }}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Paper
        elevation={1}
        sx={{
          height: { xs: "100%", md: "75%" },
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Box
          display={"flex"}
          sx={{ height: "12.5%", width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip title={user.userName}>
            <IconButton sx={{ p: 0 }}>
              <Avatar src={`${API_URL}users/${user?.id}/profilePicture`} />
            </IconButton>
          </Tooltip>

          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            {user.userName}
          </Typography>
        </Box>

        <Box sx={{ height: "55%", width: "100%", backgroundColor: "blue" }}>
          <img
            src={postImg}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            alt="postImg"
          />
        </Box>

        <Box sx={{ height: "20%", width: "100%" }}>
          <Typography sx={{ height: "100%", width: "100%", p: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            exercitationem labore qui corporis error unde ratione excepturi
            neque inventore sint, magnam accusantium tempore blanditiis, rerum
            pariatur voluptate molestiae ipsum atque?
          </Typography>
        </Box>

        <Box
          display={"flex"}
          sx={{ height: "10%", width: "100%" }}
          alignItems="center"
        >
          <Box
            onClick={toggleHeart}
            sx={{ height: "100%", width: { xs: "12.5%", md: "8%", xl: "5.5%" } }}
          >
            {liked ? (
              <Tooltip title="Liked">
                <img
                  src={redHeart}
                  alt="red-heart"
                  style={{ height: "100%", width: "100%" }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Like">
                <img
                  src={heart}
                  alt="black-heart"
                  style={{ height: "100%", width: "100%" }}
                />
              </Tooltip>
            )}
          </Box>

          <Tooltip title="Add Comment">
            <img
              src={chatImg}
              style={{ height: "80%", width: "5%" }}
              alt="chatImg"
            />
          </Tooltip>

          <Tooltip title="Send">
            <img
              src={msgImg}
              style={{ height: "80%", width: "5%" }}
              alt="msgImg"
            />
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};

export default Post;
