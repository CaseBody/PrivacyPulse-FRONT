import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/links";

const useAuth = () => {
	const userName = window.localStorage.getItem("userName");
	const user = window.localStorage.getItem("user");
	const token = window.localStorage.getItem("token");
	const privateKey = window.localStorage.getItem("privateKey");
	const publicKey = window.localStorage.getItem("publicKey");

	const authFetch = (url, body, useCustomUrl, noContentType) => {
		const defaultHeader = noContentType
			? { Accept: "application/json" }
			: { Accept: "application/json", "Content-Type": "application/json" };
		return fetch(useCustomUrl ? url : `${API_URL}${url}`, {
			...body,
			headers: body?.headers ? { ...defaultHeader, ...body.headers, Bearer: token } : { ...defaultHeader, Bearer: token },
		}).then((response) => {
			if (response.status == 401) {
				window.localStorage.removeItem("userName");
				window.localStorage.removeItem("user");
				window.localStorage.removeItem("privateKey");
				window.localStorage.removeItem("token");
				window.localStorage.removeItem("publicKey");

				window.location.href = "/login";
				return new Promise((r) => r(null));
			}

			return response;
		});
	};

	return {
		isLoggedIn: userName && privateKey && token && publicKey,
		user: {
			id: user,
			userName,
			privateKey,
			publicKey,
			token,
		},
		authFetch,
	};
};

export default useAuth;
