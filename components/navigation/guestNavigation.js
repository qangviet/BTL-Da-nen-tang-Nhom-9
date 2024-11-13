import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../login";
import RegisterScreen from "../register";
import MyClassesScreenGVien from "../GVien/main_screen/myClassesGVien";

const Stack = createNativeStackNavigator();

const GuestNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="LoginScreen">
				<Stack.Screen
					name="RegisterScreen"
					component={RegisterScreen}
					options={{
						headerShown: false,
						title: "Đăng ký",
					}}
				/>
				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
					options={{
						headerShown: false,
						title: "Đăng nhập",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default GuestNavigation;
