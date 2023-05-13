import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Page from "../../shared/Page";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { Box, Button, Container, Link, Paper, TextField, Typography, InputAdornment } from "@mui/material";
import { sizing } from "@mui/system";
import { PRIVACY_COLOR, PULSE_COLOR } from "../../../constants/colors";
import { useSnackbar } from "notistack";
import { API_URL } from "../../../constants/links";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const [usernameError, setUsernameError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const register = () => {
		const userNameValid = username.length >= 5;
		const passwordValid = password.length >= 7;

		if (!userNameValid) setUsernameError("Please enter a username longer than 5 charachters");

		if (!passwordValid) setPasswordError("Please enter a password longer than 7 charachters");

		if (userNameValid && passwordValid) {
			fetch(`${API_URL}auth/register`, {
				method: "POST",
				body: JSON.stringify({
					username,
					password,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}).then((res) => {
				if (!res.ok) {
					res.text().then((text) => enqueueSnackbar(text, { variant: "error" }));
					return;
				}

				enqueueSnackbar("Account created", { variant: "success" });
				navigate("/login");
			});
		}
	};

	return (
		<Page title="Register" noHeader>
			<Box disableGutters sx={{ height: "100vh", width: "100%" }} justifyContent="center" alignItems="center" display="flex">
				<Paper elevation={6} sx={{ height: { xs: "100%", md: "55%" }, width: { xs: "100%", md: "35%" } }}>
					<Box
						sx={{
							width: "100%",
							height: "100%",
							alignItems: "center",
							display: "flex",
							flexDirection: "column",
							justifyContent: { xs: "center", md: "space-between" },
						}}
					>
						<Box display={"flex"} padding={7}>
							<Typography variant="h3" color={PRIVACY_COLOR} fontWeight={"bold"}>
								Privacy
							</Typography>
							<Typography variant="h3" color={PULSE_COLOR} fontWeight={"bold"}>
								Pulse
							</Typography>
						</Box>

						<Box
							sx={{
								alignItems: "center",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Grid container spacing={3} justifyContent={"center"} xs={12}>
								<Grid sx={12} md={11} spacing={1}>
									<TextField
										label="Username"
										fullWidth
										error={usernameError}
										helperText={usernameError}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<AccountCircleIcon />
												</InputAdornment>
											),
										}}
										onChange={(e) => {
											setUsername(e.target.value);
											setUsernameError(null);
										}}
									/>
								</Grid>
								<Grid sx={12} md={11}>
									<TextField
										label="Password"
										type="password"
										fullWidth
										error={passwordError}
										helperText={passwordError}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<KeyIcon />
												</InputAdornment>
											),
										}}
										onChange={(e) => {
											setPassword(e.target.value);
											setPasswordError(null);
										}}
									/>
								</Grid>
							</Grid>
							<Typography marginTop={2}>
								Already have an account? <Link href="/login">Login</Link>
							</Typography>
							<Button variant="outlined" sx={{ margin: 5, padding: 1, width: "50%" }} onClick={register}>
								Create account
							</Button>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Page>
	);
};

export default RegisterPage;
