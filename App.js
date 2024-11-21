import * as React from "react";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastProvider } from "react-native-toast-notifications";
import MainNavigation from "./components/navigation/mainNavigation";
import NotificationScreen from "./components/notification";
import NotiSVien from "./components/SVien/main_screen/notiSVien";
const App = () => {
	return (
		// <NotiSVien></NotiSVien>
		<NotificationScreen></NotificationScreen>
		// <Provider store={store}>
		// 	<ToastProvider>
		// 		<MainNavigation />
		// 	</ToastProvider>
		// </Provider>
	);
};
export default App;
