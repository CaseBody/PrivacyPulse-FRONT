import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/links";

const useAuth = () => {
	const navigate = useNavigate();

	const userName = window.localStorage.getItem("userName");
	const user = window.localStorage.getItem("user");
	const token = window.localStorage.getItem("token");
	const privateKey = window.localStorage.getItem("privateKey");

	const authFetch = (url, body, useCustomUrl) => {
		return fetch(useCustomUrl ? url : `${API_URL}${url}`, {
			...body,
			headers: body?.headers
				? { Accept: "application/json", ...body.headers, Bearer: token }
				: { Accept: "application/json", Bearer: token },
		}).then((response) => {
			if (response.status == 401) {
				window.localStorage.removeItem("userName");
				window.localStorage.removeItem("user");
				window.localStorage.removeItem("privateKey");
				window.localStorage.removeItem("token");

				navigate("/login");
				return new Promise((r) => r(null));
			}

			return response;
		});
	};

	return {
		isLoggedIn: userName && privateKey && token,
		user: {
			id: user,
			userName,
			privateKey,
			token,
		},
		authFetch,
	};
};

export default useAuth;
