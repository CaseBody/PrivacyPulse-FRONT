import Page from "../../shared/Page";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../constants/links";

const ProfilePage = () => {
  const { isLoggedIn, user, authFetch } = useAuth();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(file);

    const formData = new FormData();

    formData.append('File', file);

    const response = authFetch(`users/uploadProfileImage`, { method: "PUT",body: formData });

    if (response) {
      enqueueSnackbar("Image has successfully been uploaded", { variant: "success" })
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

  // console.log(user);
  // console.log(id);
  // console.log(profile);

  return (
    <Page title="Profile">
      <Box
        display={"flex"}
        sx={{ height: "92vh", width: "100%" }}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Paper
          elevation={6}
          sx={{
            height: { xs: "100%", md: "75%" },
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
            {isLoggedIn && user.id === id && (
              <input
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

            <Typography variant="h3" mt={2}>
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
    </Page>
  );
};

export default ProfilePage;
