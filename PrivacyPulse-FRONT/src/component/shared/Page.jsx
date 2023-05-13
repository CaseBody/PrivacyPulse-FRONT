import { Container, Toolbar } from "@mui/material";
import Header from "./Header";

const Page = ({ title, children, noHeader }) => {
	document.title = title ? `PrivacyPulse - ${title}` : "PrivacyPulse";

	return (
		<Container maxWidth="xxl" disableGutters sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
			{!noHeader && (
				<>
					<Header />
					<Toolbar />
				</>
			)}
			{children}
		</Container>
	);
};

export default Page;
