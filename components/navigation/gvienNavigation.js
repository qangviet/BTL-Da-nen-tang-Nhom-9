import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyClassesScreenGVien from "../GVien/main_screen/myClassesGVien";
import ClassScreenGVien from "../GVien/each_class/tabClassGVien";
import CreateSurveyGVien from "../GVien/each_class/createSurveyGVien";
import EditSurveyGVien from "../GVien/each_class/editSurveyGVien";

const Stack = createNativeStackNavigator();

const GVienNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="MyClassesScreenGVien">
				<Stack.Screen
					name="MyClassesScreenGVien"
					component={MyClassesScreenGVien}
					options={{
						headerShown: false,
						title: "Danh sách lớp học",
					}}
				/>
				<Stack.Screen
					name="ClassScreenGVien"
					component={ClassScreenGVien}
					options={{
						headerShown: false,
						title: "Hiển thị lớp học",
					}}
				/>
				<Stack.Screen
					name="CreateSurveyGVien"
					component={CreateSurveyGVien}
					options={{
						headerShown: false,
						title: "Tạo bài tập",
					}}
				/>
				<Stack.Screen
					name="EditSurveyGVien"
					component={EditSurveyGVien}
					options={{
						headerShown: false,
						title: "Sửa bài tập",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default GVienNavigation;
