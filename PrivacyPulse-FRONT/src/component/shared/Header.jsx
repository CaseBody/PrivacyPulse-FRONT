import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import useAuth from "../../hooks/useAuth";
import { PRIVACY_COLOR, PULSE_COLOR } from "../../constants/colors";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/links";
import { useEffect } from "react";

function Header() {
	const { isLoggedIn, user, authFetch } = useAuth();
	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [menuId, setMenuId] = useState(null);

	const [friendRequestNotifs, setFriendRequestNotifs] = useState(0);

	const pages = ["Chats", "Friends"];
	const settings = [
		{ label: "Profile", link: `/users/${user.id}/profile` },
		{ label: "Settings", link: "/settings" },
		{ label: "Logout", link: "/logout" },
	];

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleProfileMenuOpen = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const fetchNotifs = () => {
		authFetch("friendRequests/open", { method: "GET" })
			.then((r) => r.json())
			.then((number) => setFriendRequestNotifs(number));
	};

	useEffect(() => {
		if (isLoggedIn) {
			fetchNotifs();
			setInterval(fetchNotifs, 10000);
		}
	}, []);

	return (
		<AppBar position="fixed">
			<Container maxWidth="xxl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							textDecoration: "none",
							color: PRIVACY_COLOR,
						}}
					>
						Privacy
					</Typography>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							textDecoration: "none",
							color: PULSE_COLOR,
						}}
					>
						Pulse
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						{isLoggedIn && (
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
						)}
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={() => {
										handleCloseNavMenu();
										navigate(`/${page}`);
									}}
								>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							display: { xs: "flex", md: "none" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: PRIVACY_COLOR,
							textDecoration: "none",
						}}
					>
						Privacy
					</Typography>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: PULSE_COLOR,
							textDecoration: "none",
						}}
					>
						Pulse
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						{isLoggedIn && (
							<>
								<Tooltip title="Chats">
									<IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => navigate("/chats")}>
										<Badge color="error">
											<ChatIcon />
										</Badge>
									</IconButton>
								</Tooltip>
								<Tooltip title="Friends">
									<IconButton size="large" color="inherit" onClick={() => navigate("/friends")}>
										<Badge badgeContent={friendRequestNotifs} color="error">
											<PeopleIcon />
										</Badge>
									</IconButton>
								</Tooltip>
							</>
						)}
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						></IconButton>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Account">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar src={`${API_URL}users/${user?.id}/profilePicture`} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{isLoggedIn ? (
								settings.map((setting) => (
									<MenuItem
										key={setting.label}
										onClick={() => {
											handleCloseUserMenu();
											navigate(setting.link);
										}}
									>
										<Typography textAlign="center">{setting.label}</Typography>
									</MenuItem>
								))
							) : (
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center" onClick={() => navigate("/login")}>
										Login
									</Typography>
								</MenuItem>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Header;
