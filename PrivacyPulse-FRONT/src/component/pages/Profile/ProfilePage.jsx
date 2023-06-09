import Page from "../../shared/Page";
import Post from "./Post";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../constants/links";
import AddPostModal from "../Profile/AddPostModal";

const ProfilePage = () => {
  const { isLoggedIn, user, authFetch } = useAuth();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const formData = new FormData();

    formData.append("File", file);

    const response = authFetch(`users/uploadProfileImage`, {
      method: "PUT",
      body: formData,
    });

    if (response) {
      enqueueSnackbar("Image has successfully been uploaded", {
        variant: "success",
      });
      setTimeout(function () {
        location.reload();
      }, 500);
    } else {
      enqueueSnackbar("There was an error while uploading the image", {
        variant: "error",
      });
    }
  };

  const FetchProfile = () => {
    authFetch(`users/${id}/profile`, { method: "GET" })
      .then((r) => r.json())
      .then((data) => setProfile(data));
  };

  const UpdateBio = (biography) => {
    authFetch(`users/updateBio?bio=${biography}`, { method: "PUT" });
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    FetchProfile();
  }, []);

  return (
    <Page title="Profile">
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: { xs: 0, md: 2.5 } }}
      >
        <Box
          display={"flex"}
          sx={{ height: "90vh", width: "100%" }}
          justifyContent="space-evenly"
          alignItems="center"
          flexDirection="column"
        >
          <Paper
            elevation={6}
            sx={{
              height: { xs: "100%", md: "90%" },
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Box
              display={"flex"}
              padding={7}
              sx={{
                width: "100%",
                height: "70%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box 
                display={"flex"}
                sx={{ width: "100%", flexDirection: "column", alignItems: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={() => setModalOpen(true)}
                >
                  <Typography>Add Post</Typography>
                </Button>

                <AddPostModal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                />
              </Box>

              {isLoggedIn && user.id === id && (
                <input
                  style={{ display: "none" }}
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleImageUpload}
                />
              )}

              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  disabled={isLoggedIn && user.id === id ? false : true}
                >
                  <Avatar
                    src={`${API_URL}users/${id}/profilePicture`}
                    sx={{
                      width: "300px",
                      height: "300px",
                    }}
                  ></Avatar>
                </IconButton>
              </label>

              <Typography variant="h3" mt={5} mb={5}>
                {profile?.username}
              </Typography>
            </Box>

            <Box
              display={"flex"}
              padding={7}
              sx={{
                width: "100%",
                height: "30%",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                placeholder="Write you're own biography here..."
                multiline
                rows={7}
                sx={{
                  marginBottom: 8,
                }}
                inputProps={{
                  onBlur: (e) => {
                    const biography = e.target.value;
                    UpdateBio(biography);
                  },
                }}
                disabled={user.id != id}
                defaultValue={profile?.biography}
              />
            </Box>
          </Paper>
        </Box>

        <Post />
        <Post />
      </Box>
    </Page>
  );
};

export default ProfilePage;
