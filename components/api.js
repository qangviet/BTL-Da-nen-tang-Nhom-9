import axios from "axios";

// Base URL cho API server
const api = axios.create({
	baseURL: "http://157.66.24.126:8080", // Thay URL Postman của bạn ở đây
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
