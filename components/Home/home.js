import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust, LogoBK } from "../logo";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const HomeScreen = () => {
	const Tab = createMaterialTopTabNavigator();

	const class_name = "Phát triển ứng dụng đa nền tảng";
	const class_teacher = "Nguyễn Tiến Thành";

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
					// tabBarActiveTintColor: 'blac', // Màu chữ khi tab đang chọn
					// tabBarInactiveTintColor: 'gray', // Màu chữ khi tab không chọn
				}}
			>
				{/* <Tab.Screen name="Tài liệu" component={ClassDocs} />
				<Tab.Screen name="Bài tập" component={ClassSurveys} />
				<Tab.Screen name="Xin Nghỉ" component={ClassDiemDanhGVien} /> */}
			</Tab.Navigator>
		);
	};

	return (
		<>
			<View>
				{/* <NavigationContainer independent={true}> */}
				<View className="bg-red-700 pt-12 pb-5 relative">
					<View className="flex justify-center items-center">
						<LogoHust width={130} height={25}></LogoHust>
					</View>
					<View className="absolute right-4 top-12">
						<TouchableOpacity>
							<Ionicons name="notifications" size={24} color="white" />
						</TouchableOpacity>
					</View>
					<View className="absolute left-5 top-12">
						<LogoBK width={40} height={60} className="mx-auto"></LogoBK>
					</View>
				</View>
				<View className="mt-7 mb-4 mx-4">
					<View className="flex flex-row justify-between items-center ">
						<View className="flex flex-row gap-x-2 items-center">
							<View>
								<Ionicons name="person-circle-sharp" size={60} color="#b5b5b5" />
							</View>
							<View>
								<Text className="font-bold text-lg">Trương Quang Việt</Text>
								<Text className="text-sm">Sinh viên</Text>
							</View>
						</View>
						<View className="mr-1">
							<TouchableOpacity>
								<Ionicons name="calendar-outline" size={22} color="#b91c1c" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View>
					<View className="px-3 py-3 drop-shadow-lg">
						<View>
							<FontAwesome5 name="chalkboard-teacher" size={24} color="#b91c1c" />
						</View>
						<View>
							<Text>Lớp sinh viên</Text>
							<Text>Thông tin về lớp của sv</Text>
						</View>
					</View>
				</View>
			</View>
			{/* <Text className="mt-2 ml-2 mr-2 text-lg">{class_name}</Text> */}

			{/* Tabs: Tài liệu, Bài tập, Xin nghỉ/Điểm danh */}
			{/* <TabNavigator /> */}
			{/* </NavigationContainer> */}
		</>
	);
};

export default HomeScreen;
