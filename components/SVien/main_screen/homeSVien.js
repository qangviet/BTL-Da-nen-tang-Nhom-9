import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation, useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LogoHust, LogoBK } from "../../logo";
import { useToast } from "react-native-toast-notifications";
import api from "../../api";
import { useIsFocused } from "@react-navigation/native";
const HomeSVien = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const navigation = useReactNavigation();
	const param = useSelector((state) => state.navigation.params);

	console.log(param);

	const currentScreen = useSelector((state) => state.navigation.currentScreen);

	const [USER, setUSER] = useState({});
	const [avtLink, setAvtLink] = useState("");

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

	useEffect(() => {
		if (currentScreen !== "TabMainSVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	const fetchUSER = async () => {
		try {
			const response = await api.post("/it4788/get_user_info", {
				token: param.token,
				user_id: param.userInfo.id,
			});

			// Xử lý dữ liệu và cập nhật state
			if (response.data.code === "1000") {
				const fetchedUSER = {
					id: response.data.data.id,
					name: response.data.data.name,
					email: response.data.data.email,
					avatar: response.data.data.avatar,
					phoneNumber: "0355064807",
					dob: "03/01/2003",
					khoaVien: "Trường Công nghệ Thông tin và Truyền thông",
					he: "Kỹ sư chính quy - k66",
					class: "Khoa học máy tính 06 - K66",
				};
				if (fetchedUSER.avatar != null) {
					const avt_link =
						"https://drive.google.com/thumbnail?id=" +
						fetchedUSER.avatar.split("/d/")[1].split("/")[0] +
						"&sz=w1000";
					setAvtLink(avt_link);
				}
				console.log("fetchedUSER: ", fetchedUSER);
				setUSER(fetchedUSER);
			} else {
				console.error("Error fetching classes: ", response.data.meta.message);
			}
		} catch (error) {
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
	};
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			fetchUSER();
		}
	}, [isFocused]);

	const goToMyClasses = () => {
		dispatch(
			navigate({
				screen: "MyClassesScreenSVien",
				params: param,
			})
		);
		console.log("Go to: Danh sách lớp");
	};

	const goToRegisterClass = () => {
		dispatch(
			navigate({
				screen: "RegisterClassScreenSVien",
				params: param,
			})
		);
		console.log("Go to: Quản lý lớp");
	};

	const gotoNotification = () => {
		dispatch(
			navigate({
				screen: "NotiSVien",
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
			</View>
			<ScrollView>
				<View>
					<View className="mt-7 mb-4 mx-4">
						<View className="flex flex-row justify-between items-center ">
							<View className="flex flex-row gap-x-2 items-center">
								<View>
									{avtLink === "" ? (
										<Image
											className="w-16 h-16 rounded-full mt-1 mr-2"
											source={require("../../../assets/avt.jpg")}
										/>
									) : (
										<Image className="w-16 h-16 rounded-full mt-1 mr-2" source={{ uri: avtLink }} />
									)}
								</View>
								{param && param.userInfo ? (
									<View>
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
									<TouchableOpacity onPress={functionIsDeveloping}>
										<Image
											source={require("../../../assets/calendar_icon.png")}
											style={{ width: 60, height: 60 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3 w-28">
									<Text className="self-center text-base font-bold">Thời khóa biểu</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Tra cứu thời khóa biểu, lịch thi
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
								<View className="pt-3 w-28">
									<Text className="self-center text-base font-bold">Đồ án</Text>
									<Text className="self-center text-sm font-[650]">Thông tin các đồ án</Text>
								</View>
							</View>
						</View>
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
								<View className="pt-3 w-28">
									<Text className="self-center text-base font-bold">Danh sách lớp</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Thông tin các lớp của sinh viên
										</Text>
									</View>
								</View>
							</View>
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={goToRegisterClass}>
										<Image
											source={require("../../../assets/dklop_icon.png")}
											style={{ width: 70, height: 70 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3 w-28">
									<Text className="self-center text-base font-bold">Đăng ký lớp</Text>
									<Text className="self-center text-sm font-[650]">Đăng ký lớp cho học kỳ</Text>
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
								<View className="pt-3 w-28">
									<Text className="self-center text-base font-bold">Thông báo tin tức</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Các thông báo quan trọng
										</Text>
									</View>
								</View>
							</View>
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={functionIsDeveloping}>
										<Image
											source={require("../../../assets/ketquaht_icon.png")}
											style={{ width: 77, height: 77 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3 w-28">
									<Text className="self-center text-base font-bold">Kết quả học tập</Text>
									<Text className="self-center text-sm font-[650]">Thông tin kết quả học tập</Text>
								</View>
							</View>
						</View>
						<View className="flex flex-row justify-center mb-5 ">
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={functionIsDeveloping}>
										<Image
											source={require("../../../assets/bieumau.png")}
											style={{ width: 78, height: 78 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3 w-28">
									<Text className="self-center text-base font-bold">Biểu mẫu online</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Bảng điểm, chứng nhận sv, giấy giới thiệu...
										</Text>
									</View>
								</View>
							</View>
							<View className="flex items-center basis-[45%]">
								<View className="shadow-lg bg-white rounded-xl flex justify-center items-center w-[100px] h-[100px]">
									<TouchableOpacity onPress={functionIsDeveloping}>
										<Image
											source={require("../../../assets/hocphi.png")}
											style={{ width: 75, height: 75 }}
										/>
									</TouchableOpacity>
								</View>
								<View className="pt-3 w-28">
									<Text className="self-center text-base font-bold">Học phí</Text>
									<View className="flex flex-row justify-center items-center">
										<Text className="text-center text-sm font-[650] flex-wrap">
											Thông tin chi tiết về học phí
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

export default HomeSVien;
