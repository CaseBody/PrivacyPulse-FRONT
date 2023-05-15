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
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants/links";

const ProfilePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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
            width: { xs: "100%", md: "75%" },
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
              alt="Profile pic"
              src=""
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
            <Typography>Biography</Typography>
            <TextField
              label="Biography"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  height: "150px",
                },
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Page>
  );
};

export default ProfilePage;
