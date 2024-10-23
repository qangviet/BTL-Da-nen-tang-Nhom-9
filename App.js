import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/login.js";
import RegisterScreen from "./components/register.js";
import RegisterClassScreen from "./components/registerClass.js";
import ClassManagementScreen from "./components/manageClass.js";
import CreateClassScreen from "./components/createClass.js";
import EditClassScreen from "./components/editClass.js";
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <EditClassScreen></EditClassScreen>
        // <NavigationContainer>
        //     <Stack.Navigator initialRouteName="RegisterScreen">
        //         {/* <Stack.Screen
        //             name="Home"
        //             component={HomeScreen}
        //             options={{ title: "Trang chủ", headerShown: false }}
        //         /> */}
        //         <Stack.Screen
        //             name="RegisterScreen"
        //             component={RegisterScreen}
        //             options={{ title: "Đăng ký", headerShown: false }}
        //         />
        //         <Stack.Screen
        //             name="LoginScreen"
        //             component={LoginScreen}
        //             options={{ title: "Đăng nhập", headerShown: false }}
        //         />
        //         <Stack.Screen
        //             name="RegisterClassScreen"
        //             component={RegisterClassScreen}
        //             options={{ title: "Đăng ký lớp", headerShown: false }}
        //         />
        //     </Stack.Navigator>
        // </NavigationContainer>
    );
};
export default App;
