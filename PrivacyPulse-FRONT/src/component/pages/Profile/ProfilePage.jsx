import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Page from "../../shared/Page";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { sizing } from "@mui/system";
import { PRIVACY_COLOR, PULSE_COLOR } from "../../../constants/colors";
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
              height: "60%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={`${API_URL}users/${id}/profilePicture`}
              sx={{
                width: "250px",
                height: "250px",
              }}
            />
            <Typography variant="h3" mt={2}>
              Username
            </Typography>
          </Box>

          <Box
            display={"flex"}
            padding={7}
            sx={{
              width: "100%",
              height: "40%",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography>
              Biography of <b>Username</b>:
            </Typography>
            <TextField
              placeholder="Write you're own biography here..."
              multiline
              rows={6}
              maxRows={4}
            />
          </Box>
        </Paper>
      </Box>
    </Page>
  );
};

export default ProfilePage;
