import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust, LogoBK } from "./../../logo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "../../../redux/navigationSlice";
import api from "../../api";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation as useReactNavigation, useFocusEffect } from "@react-navigation/native";

const ChatSVien = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.navigation);
	const navigation = useNavigation();
	const param = useSelector((state) => state.navigation.params);
	console.log("Chat param:....", param);

	useEffect(() => {
		if (state.currentScreen !== "ChatSVien") {
			navigation.navigate(state.currentScreen);
		}
	}, [state.currentScreen]);

	const gotoNotification = () => {
		dispatch(
			navigate({
				screen: "NotiSVien",
				params: param,
			})
		);
	};

	const [noti_count, setNotiCount] = useState(0);

	const fetchCountNoti = async () => {
		try {
		  const response = await api.post("/it5023e/get_unread_notification_count", {
			token: param.token,
		  });
	
		  if (response.data.meta.code === "1000") {
			const notiCount = response.data.data;
			setNotiCount(notiCount);
		  } else {
			console.error("API error:", response.data);
		  }
		} catch (error) {
		  console.error("Error fetching notifications:", error?.message || error);
		}
	  };
	
	  // Tự động gọi API mỗi khi màn hình HomeSVien được focus
	  useFocusEffect(
		useCallback(() => {
		  fetchCountNoti();
		}, []) // Không cần dependencies vì chỉ chạy khi focus
	  );

	return (
		<View className="bg-[#dfe1e2]">
			<View className="bg-red-700 pt-10 pb-4 relative z-10">
				<View className="flex justify-center items-center">
					<Text className="text-xl text-white font-semibold">Nhắn tin</Text>
				</View>
				<View className="absolute right-4 top-10">
				<TouchableOpacity onPress={gotoNotification}>
							<View className="relative">
								{noti_count > 0 && (
									<View
										className="bg-red-500 rounded-full h-6 w-6 
								flex justify-center items-center absolute z-10 -right-3 -top-3"
									>
										<Text className="text-white text-[11px]">{noti_count > 10 ? "10+" : noti_count}</Text>
									</View>
								)}

								<Ionicons name="notifications" size={24} color="white" />
							</View>
						</TouchableOpacity>
				</View>
				<View className="absolute left-5 top-14">
					<LogoBK width={32} height={48} className="mx-auto"></LogoBK>
				</View>
			</View>
			<View className="justify-center self-center flex-1">
				<Text className="text-lg self-center italic text-red-600 font-bold">Chức năng đang được phát triển</Text>
			</View>
		</View>
	);
};

export default ChatSVien;
