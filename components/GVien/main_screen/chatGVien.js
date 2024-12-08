import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust, LogoBK } from "./../../logo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../../../redux/navigationSlice";

const ChatGVien = ({ route }) => {
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
				<View className="absolute left-5 top-14">
					<LogoBK width={32} height={48} className="mx-auto"></LogoBK>
				</View>
			</View>
		</View>
	);
};

export default ChatGVien;
