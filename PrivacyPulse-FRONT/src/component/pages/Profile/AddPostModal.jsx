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
          // value={Image}
        />

        <TextField
          label="Title"
          placeholder="Title of you're post..."
          // value={Body}
        ></TextField>
      </Paper>
    </Modal>
  );
};

export default AddPostModal;
