import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust } from "./../../logo";

import ClassDocs from "./classDocsGVien.js";
import ClassSurveys from "./classSurveysGVien.js";
import ClassDiemDanhGVien from "./classDiemDanhGVien.js";
import CreateSurveyGVien from "./createSurveyGVien.js";

import { navigate } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { goBack as goBackMavigation } from "../../../redux/navigationSlice.js";
import api from "../../API/api.js";

const ClassScreenGVien = ({ route }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const params = useSelector((state) => state.navigation.params);

	console.log("Den trang tabClassSvien", params);

	// 0 - docs, 1 - surveys, 2 - diemdanh
	const [tabMode, setTabMode] = useState(0);

	const state = useSelector((state) => state.navigation);
	useEffect(() => {
		// Theo dõi thay đổi currentScreen để sync với navigation system
		if (state.currentScreen !== "ClassScreenGVien") {
			navigation.navigate(state.currentScreen);
		}
	}, [state.currentScreen]);

	function goBack() {
		dispatch(goBackMavigation());
		// console.log("Go back!");
	}

	// useEffect(() => {
	// 	api.get("/it5023e/get_material_info")
	// 		.then((response) => {
	// 			console.log("get_material_info: ", response.data);
	// 			console.log(response);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error: ", error);
	// 		});
	// 	console.log("get_material_info");
	// }, [state.currentScreen]);

	const Tab = createMaterialTopTabNavigator();

	const TabNavigator = () => {
		return (
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: "white", // Màu nền
						height: 40, // Chiều cao tab bar
					},
					tabBarLabelStyle: {
						fontSize: 14,
						marginTop: 0,
						marginBottom: 10,
					},
					tabBarIndicatorStyle: {
						backgroundColor: "red", // Màu của chỉ báo
						height: 4, // Chiều cao của chỉ báo
						width: 5,
						borderRadius: 100,
						marginLeft: 63,
						marginBottom: 3,
					},
				}}
			>
				<Tab.Screen
					name="Tài liệu"
					component={ClassDocs}
					// listeners={() => ({
					// 	swipeEnd: (e) => {
					// 		setTabMode(0);
					// 	},
					// })}
				/>
				<Tab.Screen
					name="Bài tập"
					component={ClassSurveys}
					// listeners={() => ({
					// 	swipeEnd: (e) => {
					// 		setTabMode(1);
					// 	},
					// })}
				/>
				<Tab.Screen
					name="Điểm danh"
					component={ClassDiemDanhGVien}
					// listeners={() => ({
					// 	swipeEnd: (e) => {
					// 		setTabMode(2);
					// 	},
					// })}
				/>
			</Tab.Navigator>
		);
	};

	const [changeScreen, setChangeScreen] = React.useState(false);

	const openCreateSurveys = () => {
		dispatch(
			navigate({
				screen: "CreateSurveyGVien",
				params: params,
			})
		);
		console.log("Go to: Create survey");
	};

	return (
		<>
			<NavigationContainer independent={true}>
				<View className="bg-red-700 pt-8 pb-3 relative">
					<View className="absolute left-3 top-8">
						<TouchableOpacity onPress={() => goBack()}>
							<FontAwesome name="long-arrow-left" size={26} color="white" />
						</TouchableOpacity>
					</View>
					<View className="flex justify-center items-center">
						<LogoHust width={140} height={25}></LogoHust>
					</View>
					<View className="absolute right-3 top-8">
						<TouchableOpacity onPress={openCreateSurveys}>
							<FontAwesome name="plus" size={24} color="white" />
						</TouchableOpacity>
					</View>

					{params.classInfo ? (
						<View>
							<Text className="mt-4 ml-2 mr-2 text-xl self-center text-white font-bold">
								{params.classInfo.name}
							</Text>
							<Text className="mt-1 ml-2 mr-2 self-center text-white">
								{params.classInfo.teacher}
							</Text>
						</View>
					) : null}
				</View>

				<TabNavigator />
			</NavigationContainer>
		</>
	);
};

const styles = StyleSheet.create({});

export default ClassScreenGVien;
