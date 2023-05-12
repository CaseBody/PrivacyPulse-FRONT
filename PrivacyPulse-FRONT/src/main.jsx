import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App.jsx";
import Bar from "./component/Bar.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginPage from "./component/pages/Login/LoginPage.jsx";
import RegisterPage from "./component/pages/Register/RegisterPage.jsx";

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
		path: "/bar",
		element: <Bar />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<ThemeProvider theme={darkTheme}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</ThemeProvider>
);
