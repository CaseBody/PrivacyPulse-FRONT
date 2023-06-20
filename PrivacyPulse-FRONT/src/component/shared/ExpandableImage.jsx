import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { useState } from "react";

const ExpandableImage = ({ src, title, ...otherProps }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<img
				src={src}
				{...otherProps}
				onClick={() => setIsExpanded(true)}
				style={otherProps.style ? { ...otherProps.style, cursor: "pointer" } : { cursor: "pointer" }}
			/>
			<Modal
				open={isExpanded}
				onClose={() => setIsExpanded(false)}
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<Paper
					sx={{
						width: { xs: "100%", md: 850 },
						height: { xs: "100%", md: "auto" },
						position: "absolute",
						display: "flex",
						flexDirection: "column",
						padding: 3,
						gap: 3,
					}}
					elevation={8}
				>
					<Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
						<Typography variant="h3">{title ?? "Image"}</Typography>
						<IconButton onClick={() => setIsExpanded(false)}>
							<ClearIcon sx={{ width: 40, height: 40 }} />
						</IconButton>
					</Box>
					<img src={src} {...otherProps} style={{ width: "100%", height: "100%" }} />
				</Paper>
			</Modal>
		</>
	);
};

export default ExpandableImage;
