import * as React from "react";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { Provider } from "react-redux";
import { store } from "./redux/store";

import MainNavigation from "./components/navigation/mainNavigation";
import HomeScreen from "./components/Home/home";
const App = () => {
	return (
		<HomeScreen />
		// <Provider store={store}>
		// 	<MainNavigation />
		// </Provider>
	);
};
export default App;
