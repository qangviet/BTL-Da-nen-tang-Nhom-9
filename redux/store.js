import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import authReducer from "./authSlice";
import loadingReducer from "./loadingSlice";
export const store = configureStore({
	reducer: {
		auth: authReducer,
		navigation: navigationReducer,
		loading: loadingReducer,
		// Thêm các reducer khác nếu cần
	},
});
