import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LogoHust, LogoBK } from "../../logo";
import { useToast } from "react-native-toast-notifications";
const HomeGVien = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const navigation = useReactNavigation();
	const param = useSelector((state) => state.navigation.params)
	//console.log(param)

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	useEffect(() => {
		if (currentScreen !== "HomeGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);
	const state = useSelector((state) => state.navigation);
	console.log("Current screen: ", state.currentScreen);
	console.log("Params: ", state.params);

	const goToMyClasses = () => {
		dispatch(
			navigate({
				screen: "MyClassesScreenGVien",
				params: param,
			})
		);
		console.log("Go to: Danh sách lớp");
	};

	const gotoManagementClass = () => {
		dispatch(
			navigate({
				screen: "ManageClassesScreenGVien",
				params: param,
			})
		);
		console.log("Go to: Quản lý lớp");
	};

	const gotoNotification = () => {
		dispatch(
			navigate({
				screen: "NotiGVien",
				params: param,
			})
		);
		console.log("Go to: Thông báo");
	};

	const functionIsDeveloping = () => {
		toast.show("Chức năng đang được phát triển", {
			animationType: "slide-in",
			duration: 1000,
		});
	};
	return (
		<>
			<View className="bg-[#dfe1e2]">
				{/* <NavigationContainer independent={true}> */}
				<View className="bg-red-700 pt-10 pb-5 relative z-10">
					<View className="flex justify-center items-center">
						<LogoHust width={130} height={25}></LogoHust>
					</View>
					{/* <View className="absolute right-4 top-12">
						<TouchableOpacity onPress={gotoNotification}>
							<View className="relative">
								<View
									className="bg-red-500 rounded-full h-6 w-6 
								flex justify-center items-center absolute z-10 -right-3 -top-3"
								>
									<Text className="text-white text-[11px]">10+</Text>
								</View>
								<Ionicons name="notifications" size={24} color="white" />
							</View>
						</TouchableOpacity>
					</View> */}
					<View className="absolute left-5 top-14">
						<LogoBK width={32} height={48} className="mx-auto"></LogoBK>
					</View>
				</View>
			</View>
			<ScrollView>
				<View>
					<View className="mt-7 mb-4 mx-4">
						<View className="flex flex-row justify-between items-center ">
							<View className="flex flex-row gap-x-2 items-center">
								<View>
									<Ionicons
										name="person-circle-sharp"
										size={60}
										color="#b5b5b5"
									/>
								</View>
								{param && param.userInfo ? 
								(<View>
									<Text className="font-bold text-lg">{param.userInfo.name}</Text>
									<Text className="text-sm">{param.role === 1 ? "Sinh viên" : "Giảng viên"}</Text>
								</View>
								) : (
								<Text className="text-red-500">Không tìm thấy thông tin người dùng</Text>
								)}
							</View>
							<View className="mr-1">
								<TouchableOpacity>
									<Ionicons name="calendar-outline" size={22} color="#b91c1c" />
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View className="mx-2">
						<View className="flex flex-row justify-center mb-5 ">
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={goToMyClasses}>
										<Image
											source={require("../../../assets/dslop_icon.png")}
											style={{ width: 78, height: 78 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3">
									<Text className="self-center text-base font-bold">
										Danh sách lớp
									</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Thông tin các lớp của dạy
										</Text>
									</View>
								</View>
							</View>
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={gotoManagementClass}>
										<Image
											source={require("../../../assets/dklop_icon.png")}
											style={{ width: 70, height: 70 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3">
									<Text className="self-center text-base font-bold">
										Quản lý lớp
									</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Tạo các lớp mới và quản lý lớp
										</Text>
									</View>
								</View>
							</View>
						</View>
						<View className="flex flex-row justify-center mb-5 ">
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={functionIsDeveloping}>
										<Image
											source={require("../../../assets/calendar_icon.png")}
											style={{ width: 60, height: 60 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3">
									<Text className="self-center text-base font-bold">
										Lịch dạy
									</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Tra cứu lịch dạy
										</Text>
									</View>
								</View>
							</View>
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={functionIsDeveloping}>
										<Image
											source={require("../../../assets/thesis_icon.png")}
											style={{ width: 70, height: 70 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3 ">
									<Text className="self-center text-base font-bold">Đồ án</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Thông tin các đồ án hướng dẫn
										</Text>
									</View>
								</View>
							</View>
						</View>
						<View className="flex flex-row justify-center mb-5 ">
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={functionIsDeveloping}>
										<Image
											source={require("../../../assets/news_icon.png")}
											style={{ width: 70, height: 70 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3">
									<Text className="self-center text-base font-bold">
										Thông báo tin tức
									</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Các thông báo quan trọng
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</>
	);
};

export default HomeGVien;
