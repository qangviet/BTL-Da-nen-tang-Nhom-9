import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyClassesScreenSVien from "../SVien/main_screen/myClassesSVien";
import ClassScreenSVien from "../SVien/each_class/tabClassSVien";
import TabMainSVien from "../SVien/main_screen/tabMainSVien";
import ClassSubmitSurveysSVien from "../SVien/each_class/classSubmitSurveysSVien";
import NotiSVien from "../SVien/main_screen/notiSVien";
import RegisterClassScreenSVien from "../SVien/main_screen/registerClassSVien";
const Stack = createNativeStackNavigator();

const SVienNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="TabMainSVien">
				<Stack.Screen
					name="MyClassesScreenSVien"
					component={MyClassesScreenSVien}
					options={{
						headerShown: false,
						title: "MyClassesScreenSVien",
					}}
				/>
				<Stack.Screen
					name="ClassScreenSVien"
					component={ClassScreenSVien}
					options={{
						headerShown: false,
						title: "ClassScreenSVien",
					}}
				/>
				<Stack.Screen
					name="RegisterClassScreenSVien"
					component={RegisterClassScreenSVien}
					options={{
						headerShown: false,
						title: "RegisterClassScreenSVien",
					}}
				/>
				<Stack.Screen
					name="ClassSubmitSurveysSVien"
					component={ClassSubmitSurveysSVien}
					options={{
						headerShown: false,
						title: "ClassSubmitSurveysSVien",
					}}
				/>
				<Stack.Screen
					name="TabMainSVien"
					component={TabMainSVien}
					options={{
						headerShown: false,
						title: "TabMainSVien",
					}}
				/>
				<Stack.Screen
					name="NotiSVien"
					component={NotiSVien}
					options={{
						headerShown: false,
						title: "NotiSVien",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default SVienNavigation;
