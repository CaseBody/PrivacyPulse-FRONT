import Page from "../../shared/Page";
import { Box, Paper, TextField, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../constants/links";

const ProfilePage = () => {
  const { isLoggedIn, authFetch } = useAuth();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const FetchProfile = () => {
    authFetch(`users/${id}/profile`, { method: "GET" })
      .then((r) => r.json())
      .then((data) => setProfile(data));
  };

  const UpdateBio = (biography) => {
    authFetch(`users/updateBio?bio=${biography}`, { method: "PUT" })
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    FetchProfile();
  }, []);

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
            <Avatar
              src={`${API_URL}users/${id}/profilePicture`}
              sx={{
                width: "300px",
                height: "300px",
              }}
            />
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
              defaultValue={profile?.biography}
            />
          </Box>
        </Paper>
      </Box>
    </Page>
  );
};

export default ProfilePage;