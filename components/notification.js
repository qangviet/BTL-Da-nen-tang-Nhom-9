import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const styles = {
	read: [
		"bg-white",
		"px-2 py-1 bg-green-200 absolute bottom-4 right-3 rounded-lg",
		"text-green-500 text-xs",
		"Đã đọc",
	],
	unread: [
		"bg-[#f2f6fa]",
		"px-2 py-1 bg-yellow-200 absolute bottom-4 right-3 rounded-lg",
		"text-yellow-500 text-xs",
		"Chưa đọc",
	],
};

const NotificationScreen = ({ notifications }) => {
	const testData = [
		{
			title: "Test thông báo",
			content: "Nội dung thông báo Nội dung thông báo Nội dung thông báo Nội dung thông báo",
			date: "19/11/2024",
			description: "Mô tả thông báo",
			status: "unread",
		},
		{
			title: "Test thông báo",
			content: "Nội dung thông báo",
			date: "19/11/2024",
			description: "Mô tả thông báo",
			status: "read",
		},
		{
			title: "Test thông báo",
			content: "Nội dung thông báo",
			date: "19/11/2024",
			description: "Mô tả thông báo",
			status: "unread",
		},
		{
			title: "Test thông báo",
			content: "Nội dung thông báo",
			date: "19/11/2024",
			description: "Mô tả thông báo",
			status: "unread",
		},
		{
			title: "Test thông báo",
			content: "Nội dung thông báo",
			date: "19/11/2024",
			description: "Mô tả thông báo",
			status: "read",
		},
	];

	return (
		<>
			<View className="bg-red-700 pt-10 pb-3">
				<View className="relative ">
					<View className="top-1 left-4 absolute">
						<TouchableOpacity>
							<Ionicons name="arrow-back" size={24} color="white" />
						</TouchableOpacity>
					</View>
					<Text className="text-xl font-semibold self-center text-white">Thông báo</Text>
				</View>
			</View>
			<ScrollView className="bg-[#dee1e1]" showsVerticalScrollIndicator={false}>
				<View className="my-6">
					{testData.map((item, index) => {
						const lstyle = item.status === "read" ? styles.read : styles.unread;
						return (
							<View
								className={`my-3 mx-3 pt-2 pb-4 px-4 rounded-xl border border-gray-500 relative ${lstyle[0]}`}
							>
								<View className="flex flex-row justify-between pt-2 pb-2">
									<Text className="text-base text-red-600">eHUST</Text>
									<Text className="text-base text-gray-600 font-[200]">
										{item.date}
									</Text>
								</View>
								<Text className="text-lg font-bold pb-4">{item.title}</Text>
								<View className="border-t border-gray-400 mb-4"></View>
								<Text className="text-base text-gray-900 mb-3">{item.content}</Text>
								<Text className="underline text-blue-500 text-base self-center">
									Chi tiết
								</Text>
								<View className={lstyle[1]}>
									<Text className={lstyle[2]}>{lstyle[3]}</Text>
								</View>
							</View>
						);
					})}
				</View>
			</ScrollView>
		</>
	);
};

export default NotificationScreen;
