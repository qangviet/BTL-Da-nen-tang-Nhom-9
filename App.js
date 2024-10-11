import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/login.js";
import RegisterScreen from "./components/register.js";
import RegisterClassScreen from "./components/registerClass.js";
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="RegisterScreen">
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ title: "Đăng ký", headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: "Đăng nhập", headerShown: false }}
                />
                <Stack.Screen
                    name="RegisterClassScreen"
                    component={RegisterClassScreen}
                    options={{ title: "Đăng ký lớp", headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
