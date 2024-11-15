import * as React from "react";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { Provider } from "react-redux";
import { store } from "./redux/store";

import MainNavigation from "./components/navigation/mainNavigation";

const App = () => {
    return (
        <Provider store={store}>
            <MainNavigation />
        </Provider>
    );
};
export default App;
