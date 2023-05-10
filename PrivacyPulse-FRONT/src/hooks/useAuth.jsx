import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/links";

const useAuth = () => {
	const navigate = useNavigate();

	const userName = window.localStorage.getItem("userName");
	const avatar = window.localStorage.getItem("avatar");
	const token = window.localStorage.getItem("token");

	if (!avatar || !userName || !token) {
		navigate("/login");
	}

	const authFetch = (url, body, useCustomUrl) => {
		return fetch(useCustomUrl ? url : `${API_URL}${url}`, {
			...body,
			headers: body?.headers
				? { Accept: "application/json", ...body.headers, Bearer: token }
				: { Accept: "application/json", Bearer: token },
		}).then((response) => {
			if (response.status == 401) {
				window.localStorage.removeItem("userName");
				window.localStorage.removeItem("avatar");
				window.localStorage.removeItem("token");

				navigate("/login");
				return new Promise((r) => r(null));
			}

			return response.json();
		});
	};

	return {
		user: {
			userName,
			avatar,
			token,
		},
		authFetch,
	};
};
