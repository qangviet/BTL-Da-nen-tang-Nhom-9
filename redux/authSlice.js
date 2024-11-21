import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: null,
		role: 0, // 0 - Guest, 1 - GVien, 2 - SVien
	},
	reducers: {
		loginAct: (state, action) => {
			state.token = action.payload.token;
			state.role = action.payload.role;
		},
		logoutAct: (state) => {
			state.token = null;
			state.role = 0;
		},
	},
});

export const { loginAct, logoutAct } = authSlice.actions;
export default authSlice.reducer;
