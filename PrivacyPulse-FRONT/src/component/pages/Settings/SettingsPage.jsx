import { useNavigate } from "react-router";
import Page from "../../shared/Page";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Box, CircularProgress, FormControlLabel, FormGroup, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

const SettingsPage = () => {
	const navigate = useNavigate();
	const { isLoggedIn, authFetch } = useAuth();
	const [settings, setSettings] = useState(null);
	const [initialState, setInitialState] = useState(null);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (!isLoggedIn) navigate("/login");

		authFetch("settings", { method: "GET" })
			.then((r) => r.json())
			.then((data) => {
				setSettings(data), setInitialState(data);
			});
	}, []);

	useEffect(() => {
		if (settings && settings != initialState) {
			authFetch("settings", {
				method: "POST",
				body: JSON.stringify(settings),
			}).then((r) => {
				if (!r.ok) {
					r.text().then((text) => enqueueSnackbar(text.replace(/['"]+/g, ""), { variant: "error" }));
				}
			});
		}
	}, [settings]);

	return (
		<Page title={"Settings"}>
			{settings ? (
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3, gap: 2 }}>
					{settings ? (
						<>
							<Typography variant="h2" sx={{ mb: 3 }}>
								Settings
							</Typography>
							<TextField
								label="Username"
								onBlur={(e) =>
									setSettings((s) => {
										return { ...s, username: e.target.value };
									})
								}
								defaultValue={settings.username}
							/>
							<FormGroup>
								<Tooltip title="A private profile is only visible to friends." placement="right">
									<FormControlLabel
										control={
											<Switch
												onChange={(e) =>
													setSettings((s) => {
														return { ...s, privateProfile: e.target.checked };
													})
												}
												checked={settings.privateProfile || false}
											/>
										}
										label={"Private Profile"}
									/>
								</Tooltip>
							</FormGroup>
						</>
					) : (
						<CircularProgress color="inherit" />
					)}
				</Box>
			) : (
				<CircularProgress />
			)}
		</Page>
	);
};

export default SettingsPage;
