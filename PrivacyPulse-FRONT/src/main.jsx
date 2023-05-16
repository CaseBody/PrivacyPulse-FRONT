import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme.js";
import LoginPage from "./component/pages/Login/LoginPage.jsx";
import RegisterPage from "./component/pages/Register/RegisterPage.jsx";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import LogoutPage from "./component/pages/Logout/LogoutPage.jsx";
import ProfilePage from "./component/pages/Profile/ProfilePage.jsx";
import FriendsPage from "./component/pages/Friends/FriendsPage.jsx";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/users/:id/profile",
    element: <ProfilePage />,
  },
  {
    path: "/friends",
    element: <FriendsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<ThemeProvider theme={darkTheme}>
		<React.StrictMode>
			<CssBaseline />
			<SnackbarProvider>
				<RouterProvider router={router} />
			</SnackbarProvider>
		</React.StrictMode>
	</ThemeProvider>
);
