import {
  Box,
  Paper,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../constants/links";
import AddPostModal from "./AddPostModal";

const AddPost = ({ isOpen, onClose }) => {
	const { isLoggedIn, user, authFetch } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

	const [modalOpen, setModalOpen] = useState(false);

    return (
      <Box
        display={"flex"}
        sx={{
          height: "10vh",
          width: "100%",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          elevation={6}
          sx={{
            height: { xs: "150%", md: "80%" },
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Box
            display={"flex"}
            sx={{ height: "100%", width: "100%" }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <TextField sx={{ width: "50%" }}></TextField>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
            >
              <Typography>Add Post</Typography>
            </Button>
          </Box>
        </Paper>

        <AddPostModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </Box>
    );
};

export default AddPost;