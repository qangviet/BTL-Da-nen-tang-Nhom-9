import HomeScreen from "./components/home.js";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/login.js";
import RegisterScreen from "./components/register.js";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Trang chủ", headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: "Đăng nhập", headerShown: false }}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ title: "Đăng ký", headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>

        // <View className="flex-1 items-center justify-center bg-red-500">
        //     <Text className="text-white">Open up App.js to start working on your app!</Text>
        // </View>
    );
};
export default App;
