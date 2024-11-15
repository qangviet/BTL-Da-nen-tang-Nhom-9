import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import authReducer from "./authSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		navigation: navigationReducer,
		// Thêm các reducer khác nếu cần
	},
});
