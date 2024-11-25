import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { goBack } from "../../../redux/navigationSlice";
import { useNavigation } from "@react-navigation/native";
import api from "../../api";



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
function formatDateTime(dateString) {
    const date = new Date(dateString);

    // Lấy giờ, phút, giây
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Lấy ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Kết hợp thành chuỗi định dạng
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

const NotiSVien = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.navigation);
	const param = useSelector((state) => state.navigation.params);
	const navigation = useNavigation();
	useEffect(() => {
		if (state.currentScreen !== "NotiSVien") {
			navigation.navigate(state.currentScreen);
		}
	}, [state.currentScreen]);

    const [notifications, setNotifications] = useState([]);


    const fetchNotifications = async () => {
		try {
			const response = await api.post("/it5023e/get_notifications", {
				token: param.token,
				index: 0,
				count: 4,
			});
	
			const data = response.data.data;
	
			// Chuyển đổi dữ liệu từ API thành định dạng cần dùng
			const formattedData = data.map((item) => ({
				id: item.id,
				title: item.title_push_notification,
				content: item.type,
				date: formatDateTime(item.sent_time),
				description: item.message,
				status: item.status === "UNREAD" ? "unread" : "read",
			}));
	
			// Cập nhật state
			setNotifications(formattedData);
		} catch (error) {
			console.error("Error fetching notifications:", error);
		}
	};
	
    useEffect(() => {
        fetchNotifications();
    }, [param.token]);

	const goBackScreen = () => {
		dispatch(goBack());
	};
	// Hàm gọi API để đánh dấu thông báo đã đọc
	const markNotificationAsRead = async (notificationId) => {
		try {
			// Gọi API để đánh dấu thông báo đã đọc
			const response = await api.post("/it5023e/mark_notification_as_read", {
				token: param.token, // Lấy token từ param
				notification_id: notificationId, // ID của thông báo
			});

			// Kiểm tra phản hồi từ API
			if (response.status === 200) {
				console.log("Notification marked as read successfully");
				// Gọi lại hàm fetchNotifications để cập nhật danh sách
				await fetchNotifications();
			} else {
				console.error("Failed to mark notification as read:", response.data);
			}
		} catch (error) {
			console.error("Error marking notification as read:", error);
		}
	};

	const [modalViewNoti, setModalViewNoti] = useState(false);
	const [selectedNoti, setSelectedNoti] = useState(null);

	// const openModalViewNoti = (index) => {
	// 	setSelectedNoti(notifications[index]);
	// 	setModalViewNoti(true);
	// };

	// const closeModelViewNoti = () => {
	// 	setModalViewNoti(false);
	// };
	// Cập nhật hàm openModalViewNoti để gọi markNotificationAsRead
	const openModalViewNoti = async (index) => {
		const selectedNotification = notifications[index]; // Lấy thông báo được chọn
		setSelectedNoti(selectedNotification); // Lưu thông báo để hiển thị trong modal
		setModalViewNoti(true); // Hiển thị modal

		// Nếu thông báo chưa đọc, gọi API để đánh dấu đã đọc
		if (selectedNotification.status === "unread") {
			await markNotificationAsRead(selectedNotification.id);
		}
	};

	// Hàm đóng modal
	const closeModelViewNoti = () => {
		setModalViewNoti(false);
	};

	return (
		<>
			<View className="bg-red-700 pt-10 pb-3">
				<View className="relative ">
					<View className="top-1 left-4 absolute">
						<TouchableOpacity onPress={goBackScreen}>
							<Ionicons name="arrow-back" size={24} color="white" />
						</TouchableOpacity>
					</View>
					<Text className="text-xl font-semibold self-center text-white">Thông báo</Text>
				</View>
			</View>
			<ScrollView className="bg-[#dee1e1]" showsVerticalScrollIndicator={false}>
				<View className="my-6">
					{notifications.map((item, index) => {
						//console.log("Rendering notifications:", notifications);
						const lstyle = item.status === "read" ? styles.read : styles.unread;
						return (
							<View
								key={index}
								className={`my-3 mx-3 pt-2 pb-4 px-4 rounded-xl border border-gray-500 relative ${lstyle[0]}`}
								onPress={() => openModalViewNoti(index)}
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
								<TouchableOpacity onPress={() => openModalViewNoti(index)}>
									<Text className="underline text-blue-500 text-base self-center">
										Chi tiết
									</Text>
								</TouchableOpacity>
								<View className={lstyle[1]}>
									<Text className={lstyle[2]}>{lstyle[3]}</Text>
								</View>
							</View>
						);
					})}
				</View>
			</ScrollView>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalViewNoti}
				onRequestClose={closeModelViewNoti}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						justifyContent: "center",
					}}
				>
					<View className="h-3/4 pl-8 pr-8 m-8 rounded-lg bg-white ">
						<View className="mt-4">
							<TouchableOpacity
								onPress={() => closeModelViewNoti()}
								className="self-end"
							>
								<Ionicons
									name="close-outline"
									size={28}
									color="gray"
									className=""
								/>
							</TouchableOpacity>
							<Text className="text-lg  self-center font-bold mb-4">
								{selectedNoti ? selectedNoti.title : ""}
							</Text>
						</View>
						<ScrollView
							className="mb-5"
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
						>
							<Text className="text-lg self-center text-justify">
								{selectedNoti ? selectedNoti.description : ""}
							</Text>
						</ScrollView>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default NotiSVien;
