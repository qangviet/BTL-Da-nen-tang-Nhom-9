import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyClassesScreenGVien from "../GVien/main_screen/myClassesGVien";
import ClassScreenGVien from "../GVien/each_class/tabClassGVien";
import CreateSurveyGVien from "../GVien/each_class/createSurveyGVien";
import EditSurveyGVien from "../GVien/each_class/editSurveyGVien";
import UploadMaterialGVien from "../GVien/each_class/uploadMaterials.js";
import EditMaterialGVien from "../GVien/each_class/editMaterials.js";
import TabMainGVien from "../GVien/main_screen/tabMainGVien";
import ManageClassesScreenGVien from "../GVien/main_screen/manageClassGVien";
import CreateClassScreenGVien from "../GVien/main_screen/createClassGVien";
import EditClassScreenGVien from "../GVien/main_screen/editClassGVien";
import NotiGVien from "../GVien/main_screen/notiGVien";
import ChangePassword from "../changePassword.js";
import ClassDocsScreenGVien from "../GVien/each_class/classDocsGVien.js";
import { CircleSnail } from "react-native-progress";
import { useSelector } from "react-redux";
import { Modal, View, Text } from "react-native";
const Stack = createNativeStackNavigator();

const GVienNavigation = () => {
	const visible = useSelector((state) => state.loading.isLoading);
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="TabMainGVien">
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
					<Stack.Screen
						name="UploadMaterialGVien"
						component={UploadMaterialGVien}
						options={{
							headerShown: false,
							title: "Tạo tài liệu",
						}}
					/>
					<Stack.Screen
						name="EditMaterialGVien"
						component={EditMaterialGVien}
						options={{
							headerShown: false,
							title: "Sửa tài liệu",
						}}
					/>

					<Stack.Screen
						name="ManageClassesScreenGVien"
						component={ManageClassesScreenGVien}
						options={{
							headerShown: false,
							title: "ManageClassesScreenGVien",
						}}
					/>

					<Stack.Screen
						name="TabMainGVien"
						component={TabMainGVien}
						options={{
							headerShown: false,
							title: "TabMainGVien",
						}}
					/>

					<Stack.Screen
						name="CreateClassScreenGVien"
						component={CreateClassScreenGVien}
						options={{
							headerShown: false,
							title: "CreateClassScreenGVien",
						}}
					/>

					<Stack.Screen
						name="ClassDocsScreenGVien"
						component={ClassDocsScreenGVien}
						options={{
							headerShown: false,
							title: "ClassDocsScreenGVien",
						}}
					/>

					<Stack.Screen
						name="EditClassScreenGVien"
						component={EditClassScreenGVien}
						options={{
							headerShown: false,
							title: "EditClassScreenGVien",
						}}
					/>
					<Stack.Screen
						name="NotiGVien"
						component={NotiGVien}
						options={{
							headerShown: false,
							title: "NotiGVien",
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

export default GVienNavigation;
