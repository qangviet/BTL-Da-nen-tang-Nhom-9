const BASE_URL = "http://157.66.24.126:8080";

const api = {
	// Hàm helper để xử lý response
	handleResponse: async (response) => {
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Something went wrong");
		}
		return response.json();
	},

	// GET request
	get: async (endpoint) => {
		try {
			const response = await fetch(`${BASE_URL}${endpoint}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					// Thêm authorization header nếu cần
					// 'Authorization': `Bearer ${token}`
				},
			});
			return api.handleResponse(response);
		} catch (error) {
			throw error;
		}
	},

	// POST request
	post: async (endpoint, data) => {
		try {
			const response = await fetch(`${BASE_URL}${endpoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			return api.handleResponse(response);
		} catch (error) {
			throw error;
		}
	},

	// PUT request
	put: async (endpoint, data) => {
		try {
			const response = await fetch(`${BASE_URL}${endpoint}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			return api.handleResponse(response);
		} catch (error) {
			throw error;
		}
	},

	// DELETE request
	delete: async (endpoint) => {
		try {
			const response = await fetch(`${BASE_URL}${endpoint}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			return api.handleResponse(response);
		} catch (error) {
			throw error;
		}
	},
};

export default api;
