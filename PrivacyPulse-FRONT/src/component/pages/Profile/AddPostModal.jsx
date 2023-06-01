import {
  Box,
  Paper,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../constants/links";

const AddPostModal = ({ isOpen, onClose }) => {
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
        </Box>

        <TextField
          label="Title"
          placeholder="Title of you're post..."
        />

        <Box
          width="100%"
          sx={{
            overflowX: "hidden",
            "&::-webkit-scrollbar": {},
          }}
        >
          <Box display="flex" flexWrap="wrap" gap={1}>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddPostModal;
