import { Container } from "@mui/material";

const Page = ({ title, children }) => {
	document.title = title ? `PrivacyPulse - ${title}` : "PrivacyPulse";

	return (
		<Container maxWidth="xxl" sx={{ padding: 0, width: "100vw", minHeight: "100vh", backgroundColor: "background.default" }}>
			{children}
		</Container>
	);
};

export default Page;
