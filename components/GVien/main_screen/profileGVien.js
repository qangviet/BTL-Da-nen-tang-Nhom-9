import {
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Modal,
	ScrollView,
	Image,
	StyleSheet,
	ImageBackground,
	DrawerLayoutAndroid,
	Button,
} from "react-native";
import React, { useRef, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust, LogoBK } from "../../logo";
import { Ionicons } from "@expo/vector-icons";

const ProfileGVien = () => {
	let drawer = useRef(null);
	// let drawer = null;

	console.log(drawer);

	const [drawerPosition, setDrawerPosition] = useState("right");

	const logOut = () => {
		console.log("LOGGING OUT!");
	};

	const navigationView = () => (
		<ImageBackground source={require("../../../assets/drawer.jpg")} style={styles.imageDrawer}>
			<View className="m-20">
				<LogoHust width={140} height={25}></LogoHust>
			</View>
			<TouchableOpacity className="m-10 flex-row justify-start" onPress={() => logOut()}>
				<Ionicons name="log-out-outline" size={30} color={"white"} />
				<Text className="text-white text-lg ml-5">Đăng xuất</Text>
			</TouchableOpacity>
		</ImageBackground>
	);

	const openRightDrawer = () => {
		console.log("Open drawer");
		drawer.current.openDrawer();
		// drawer = useRef(null);
	};

	const USER = {
		name: "Lường Mạnh Tú",
		phoneNumber: "0355064807",
		email: "tu.lm215500@sis.hust.edu.vn",
		mssv: "20215500",
		dob: "03/01/2003",
		personalEmail: "tu.manhluong3103@gmail.com",
		khoaVien: "Trường Công nghệ Thông tin và Truyền thông",
		he: "Kỹ sư chính quy - k66",
		class: "Khoa học máy tính 06 - K66",
	};

	return (
		<DrawerLayoutAndroid
			ref={drawer}
			drawerWidth={300}
			drawerPosition={drawerPosition}
			renderNavigationView={navigationView}
		>
			<View className="h-full">
				<View className="bg-red-700 pt-10 pb-5 relative z-10">
					<View className="flex justify-center items-center">
						<Text className="text-xl text-white font-semibold">
							Thông tin giảng viên
						</Text>
					</View>
					<View className="absolute right-4 top-12">
						<TouchableOpacity onPress={openRightDrawer}>
							<View className="relative">
								<Ionicons name="ellipsis-vertical" size={24} color="white" />
							</View>
						</TouchableOpacity>
					</View>
					<View className="absolute left-5 top-14">
						<LogoBK width={32} height={48} className="mx-auto"></LogoBK>
					</View>
				</View>
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					className="h-full"
				>
					<View style={styles.shadow}>
						<ImageBackground
							source={require("../../../assets/bg.jpg")}
							style={styles.image}
						>
							<View className="bg-white p-2 m-4 flex-1 flex-row justify-between rounded-xl">
								<Image
									className="w-[25%] h-full rounded-lg"
									source={require("../../../assets/avt.jpg")}
								/>
								<View className="flex-1 pl-3">
									<Text className="flex-1 text-lg font-bold mb-2">
										{USER.name}
									</Text>
									<Text className="flex-1">Sđt: {USER.phoneNumber}</Text>
									<Text className="flex-1">Email: {USER.email}</Text>
								</View>
							</View>
						</ImageBackground>
					</View>
					<View className="bg-white m-5 border border-gray-200 rounded-xl h-full flex-1">
						<View className="flex-row justify-between h-16 pl-4 pt-4 pr-4">
							<View className="h-full w-[45%] justify-start">
								<Text className="text-xs mb-1">Mã sinh viên:</Text>
								<Text className="text-sm font-bold mb-3">{USER.mssv}</Text>
								<View className="w-full h-px bg-gray-300" />
							</View>
							<View className="h-full w-[45%] justify-start">
								<Text className="text-xs mb-1">Ngày sinh:</Text>
								<Text className="text-sm font-bold mb-3">{USER.dob}</Text>
								<View className="w-full h-px bg-gray-300" />
							</View>
						</View>

						<View className="flex-row justify-between h-20 pl-4 pt-4 pr-4">
							<View className="h-full w-[45%] justify-start">
								<Text className="text-xs mb-1">Email cá nhân:</Text>
								<Text className="text-sm font-bold mb-3">{USER.email}</Text>
								<View className="w-full h-px bg-gray-300" />
							</View>
							<View className="h-full w-[45%] justify-start">
								<Text className="text-xs mb-1">Số điện thoại:</Text>
								<Text className="text-sm font-bold mb-3">{USER.phoneNumber}</Text>
								<View className="w-full h-px bg-gray-300" />
							</View>
						</View>

						<View className="justify-between h-16 pl-4 pt-4 pr-4">
							<View className="h-full w-full justify-start">
								<Text className="text-xs mb-1">Khoa/Viện:</Text>
								<Text className="text-sm font-bold mb-3">{USER.khoaVien}</Text>
								<View className="w-full h-px bg-gray-300" />
							</View>
						</View>

						<View className="justify-between h-16 pl-4 pt-4 pr-4">
							<View className="h-full w-full justify-start">
								<Text className="text-xs mb-1">Hệ:</Text>
								<Text className="text-sm font-bold mb-3">{USER.he}</Text>
								<View className="w-full h-px bg-gray-300" />
							</View>
						</View>

						<View className="justify-start pl-4 pt-4 pr-4">
							<View className="w-full justify-start">
								<Text className="text-xs mb-1">Lớp:</Text>
								<Text className="text-sm font-bold mb-3">{USER.class}</Text>
								<View className="w-full h-px bg-gray-300" />
							</View>
						</View>

						<View className="pl-4 pt-4 pr-4 h-full">
							<View className="w-full">
								<Text className="text-xs mb-1">QR Code:</Text>
								<Image
									resizeMode="contain"
									className="self-center h-52"
									source={require("../../../assets/qrcode.png")}
								/>
							</View>

							<View className="w-full mb-4">
								<Text className="text-xs mb-2">Barcode:</Text>
								<Image
									className="self-center w-full"
									source={require("../../../assets/barcode.png")}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</DrawerLayoutAndroid>
	);
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 130,
		resizeMode: "cover",
	},
	imageDrawer: {
		width: "auto",
		height: "100%",
	},
	shadow: {
		width: "100%", // Chiếm toàn bộ chiều rộng
		height: 130, // Chiều cao của hình nền
		elevation: 10, // Độ sâu bóng (Android)
		overflow: "hidden", // Đảm bảo không có phần nào ra ngoài
	},
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	navigationContainer: {
		backgroundColor: "#ecf0f1",
	},
	paragraph: {
		padding: 16,
		fontSize: 15,
		textAlign: "center",
	},
});

export default ProfileGVien;
