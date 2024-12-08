import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
	name: "navigation",
	initialState: {
		currentScreen: "",
		previousScreen: null,
		params: {},
		history: [],
	},
	reducers: {
		navigate: (state, action) => {
			state.previousScreen = state.currentScreen;
			state.currentScreen = action.payload.screen;
			state.params = action.payload.params || {};
			state.history.push({
				screen: action.payload.screen,
				params: action.payload.params,
			});
		},
		updateParams: (state, action) => {
			state.params = {
				...state.params,
				...action.payload,
			};
			state.history[state.history.length - 1].params = state.params;
		},
		goBack: (state) => {
			if (state.history.length > 1) {
				state.history.pop();
				const previous = state.history[state.history.length - 1];
				state.currentScreen = previous.screen;
				state.params = previous.params;
			}
		},
		logOut: (state) => {
			state.currentScreen = "";
			state.previousScreen = null;
			state.params = {};
			state.history = [];
		},
	},
});

export const { navigate, goBack, logOut, updateParams } = navigationSlice.actions;
export default navigationSlice.reducer;
