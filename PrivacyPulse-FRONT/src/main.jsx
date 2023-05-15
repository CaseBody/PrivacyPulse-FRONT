import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginPage from "./component/pages/Login/LoginPage.jsx";
import RegisterPage from "./component/pages/Register/RegisterPage.jsx";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import LogoutPage from "./component/pages/Logout/LogoutPage.jsx";
import ProfilePage from "./component/pages/Profile/ProfilePage.jsx";

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
		path: "/profile",
		element: <ProfilePage />,
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
