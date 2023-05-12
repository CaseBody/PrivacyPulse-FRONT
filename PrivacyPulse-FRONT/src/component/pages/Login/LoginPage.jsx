import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Page from "../../shared/Page";
import { Box, Container, Paper } from "@mui/material";
import { sizing } from "@mui/system";

const LoginPage = () => {
	return (
		<Page title="Login">
			<Box sx={{ height: "100vh", width: "100%", padding: 0 }} justifyContent="center" alignItems="center" display="flex">
				<Paper elevation={2} sx={{ height: { xs: "100%", md: "75%" }, width: { xs: "100%", md: "40%" } }}></Paper>
			</Box>
		</Page>
	);
};

export default LoginPage;
