import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust, LogoBK } from "./../../logo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../../../redux/navigationSlice";

const ChatGVien = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.navigation);
	const navigation = useNavigation();

	useEffect(() => {
		if (state.currentScreen !== "ChatGVien") {
			navigation.navigate(state.currentScreen);
		}
	}, [state.currentScreen]);

	const gotoNotification = () => {
		dispatch(
			navigate({
				screen: "NotiGVien",
				params: {},
			})
		);
	};

	return (
		<View className="h-full">
			<View className="bg-red-700 pt-10 pb-5 relative z-10">
				<View className="flex justify-center items-center">
					<Text className="text-xl text-white font-semibold">Nhắn tin</Text>
				</View>
				<View className="absolute right-4 top-12">
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
				</View>
				<View className="absolute left-5 top-14">
					<LogoBK width={32} height={48} className="mx-auto"></LogoBK>
				</View>
			</View>
		</View>
	);
};

export default ChatGVien;
