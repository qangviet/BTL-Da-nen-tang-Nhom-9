import React from "react";
import { View, Text } from "react-native";
import { Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyClassesScreenSVien from "../SVien/main_screen/myClassesSVien";
import ClassScreenSVien from "../SVien/each_class/tabClassSVien";
import TabMainSVien from "../SVien/main_screen/tabMainSVien";
import ClassSubmitSurveysSVien from "../SVien/each_class/classSubmitSurveysSVien";
import ClassDocsScreenSVien from "../SVien/each_class/classDocsSVien";
import NotiSVien from "../SVien/main_screen/notiSVien";
import ChangePassword from "../changePassword";
import RegisterClassScreenSVien from "../SVien/main_screen/registerClassSVien";
import { CircleSnail } from "react-native-progress";
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();

const SVienNavigation = () => {
	const visible = useSelector((state) => state.loading.isLoading);
	return (
		<>
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
						name="ClassDocsScreenSVien"
						component={ClassDocsScreenSVien}
						options={{
							headerShown: false,
							title: "ClassDocsScreenSVien",
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
					<Stack.Screen
						name="ChangePassword"
						component={ChangePassword}
						options={{
							headerShown: false,
							title: "ChangePassword",
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
			<Modal animationType="fade" visible={visible} transparent={true}>
				<View className="w-full h-full flex justify-center bg-black/50">
					<View className="bg-transparent py-6 mx-12 rounded-2xl justify-center items-center bg-white">
						<CircleSnail
							color={["red", "green", "blue"]}
							size={40}
							thickness={4}
							duration={1000}
							spinDuration={5000}
						/>
						<Text className="text-gray-700 py-1 mt-3">Vui lòng đợi ...</Text>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default SVienNavigation;
