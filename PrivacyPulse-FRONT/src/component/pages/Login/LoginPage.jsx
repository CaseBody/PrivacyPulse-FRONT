import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Page from "../../shared/Page";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { Box, Button, Container, Link, Paper, TextField, Typography, InputAdornment } from "@mui/material";
import { sizing } from "@mui/system";
import { PRIVACY_COLOR, PULSE_COLOR } from "../../../constants/colors";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants/links";

const LoginPage = () => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const [usernameError, setUsernameError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = () => {
		if (username === "") setUsernameError("Please enter a username");

		if (password === "") setPasswordError("Please enter a password");

		if (username !== "" && password !== "") {
			fetch(`${API_URL}auth/login`, {
				method: "POST",
				body: JSON.stringify({
					username,
					password,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
				.then((response) => {
					return new Promise((resolve) => {
						if (response.ok) {
							response.json().then((json) =>
								resolve({
									status: response.status,
									ok: response.ok,
									json,
								})
							);
						} else {
							resolve({
								status: response.status,
								ok: response.ok,
								json: response,
							});
						}
					});
				})
				.then(({ status, json, ok }) => {
					if (!ok) {
						json.text().then((text) => enqueueSnackbar(text, { variant: "error" }));
						return;
					}

					console.log(json);
					window.localStorage.setItem("user", json.user);
					window.localStorage.setItem("userName", json.userName);
					window.localStorage.setItem("privateKey", json.privateKey);
					window.localStorage.setItem("token", json.token);

					navigate("/");
				});
		}
	};

	return (
		<Page title="Login">
			<Box sx={{ height: "92vh", width: "100%" }} justifyContent="center" alignItems="center" display="flex">
				<Paper elevation={6} sx={{ minHeight: { xs: "100%", md: "55%" }, width: { xs: "100%", md: "35%" } }}>
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
								<Grid xs={12} md={11} spacing={1}>
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
								<Grid xs={12} md={11}>
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
								Don't have an account? <Link href="/register">Register</Link>
							</Typography>
							<Button variant="outlined" sx={{ margin: 5, padding: 1, width: "50%" }} onClick={login}>
								Login
							</Button>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Page>
	);
};

export default LoginPage;
