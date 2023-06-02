import { useNavigate } from "react-router";
import Page from "../../shared/Page";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Box, CircularProgress, FormControlLabel, FormGroup, Switch, Tooltip, Typography } from "@mui/material";

const SettingsPage = () => {
	const navigate = useNavigate();
	const { isLoggedIn, authFetch } = useAuth();
	const [settings, setSettings] = useState(null);
	const [initialState, setInitialState] = useState(null);

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
			});
		}
	}, [settings]);

	return (
		<Page title={"Settings"}>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
				{settings ? (
					<>
						<Typography variant="h2" sx={{ mb: 3 }}>
							Settings
						</Typography>
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
		</Page>
	);
};

export default SettingsPage;
