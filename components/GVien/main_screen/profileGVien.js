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
import React, { useRef, useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust, LogoBK } from "../../logo";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { logoutAct } from "../../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import api from "../../api";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import { navigate } from "../../../redux/navigationSlice";
const ProfileGVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();
	const param = useSelector((state) => state.navigation.params);
	token = param.token;
	// console.log("Param: ", param);
	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	let drawer = useRef(null);
	const isFocused = useIsFocused(); // Hook để kiểm tra screen có đang focus hay không
	useEffect(() => {
		if (isFocused && drawer.current) {
			drawer.current.closeDrawer();
		}
	}, [isFocused]);
	useEffect(() => {
		if (currentScreen !== "TabMainGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	const drawerPosition = "right";

	const logOut = async () => {
		console.log("LOGGING OUT!");
		try {
			// Gọi API đăng xuất
			const response = await api.post("/it4788/logout", { token });

			// Kiểm tra phản hồi từ API
			if (response.data.code === "1000") {
				console.log(response.data.message);
				dispatch(logoutAct());
			} else {
				console.log("Logout failed:", response.data.message);
			}
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	const [USER, setUSER] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [reload, setReload] = useState(false);
	useEffect(() => {
		// Gọi API để lấy danh sách lớp học
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
					setUSER(fetchedUSER);
					if (fetchedUSER.avatar != null) {
						setAvtLink(
							"https://drive.google.com/thumbnail?id=" +
								fetchedUSER.avatar.split("/d/")[1].split("/")[0] +
								"&sz=w1000"
						);
					}
					console.log("USER: ", fetchedUSER);
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

		fetchUSER();
	}, [reload]);

	// console.log(USER);

	const [avtLink, setAvtLink] = useState("");
	//

	const navigationView = () => (
		<ImageBackground source={require("../../../assets/drawer.jpg")} style={styles.imageDrawer}>
			<View className="m-20">
				<LogoHust width={140} height={25}></LogoHust>
			</View>
			<TouchableOpacity className="m-10 flex-row justify-start" onPress={() => changePassword()}>
				<AntDesign name="key" size={30} color="white" />
				<Text className="text-white text-lg ml-5">Đổi mật khẩu</Text>
			</TouchableOpacity>
			<TouchableOpacity className="m-10 flex-row justify-start" onPress={() => logOut()}>
				<Ionicons name="log-out-outline" size={30} color={"white"} />
				<Text className="text-white text-lg ml-5">Đăng xuất</Text>
			</TouchableOpacity>
		</ImageBackground>
	);

	const handleFilePick = async () => {
		try {
			const response = await DocumentPicker.getDocumentAsync({
				type: "image/*",
				copyToCacheDirectory: true,
			});

			if (response.assets && response.assets.length > 0) {
				const { name, size, uri, mimeType } = response.assets[0];
				const fileToUpload = { name, size, uri, type: mimeType };
				setImageFile(fileToUpload);
				console.log("File đã chọn:", fileToUpload);
			} else {
				console.log("File selection canceled.");
				console.log(response);
			}
		} catch (error) {
			console.error("Error picking file:", error);
		}
	};

	function editAvt() {
		console.log("Edit Avt");
		setModalVisible(true);
	}

	async function saveImage() {
		console.log("Saving image");
		if (imageFile == null) {
			alert("Hãy chọn ảnh mới!");
			return;
		}
		const fileUri = imageFile.uri;
		// Kiểm tra xem file có tồn tại không
		const fileInfo = await FileSystem.getInfoAsync(fileUri);
		console.log(fileInfo);
		if (!fileInfo.exists) {
			console.error("File not found!");
			return;
		}

		const formData = new FormData();
		formData.append("token", param.token);
		formData.append("file", {
			uri: fileUri,
			name: imageFile.name,
			type: imageFile.type,
		});

		try {
			const response = await axios.post("http://157.66.24.126:8080/it4788/change_info_after_signup", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			alert("Cập nhật ảnh thành công!");
			setImageFile(null);
			setModalVisible(false);
			setReload(!reload);
		} catch (error) {
			console.error("Upload failed:", error.response ? error.response.data : error.message);
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
	}

	if (!isFocused) {
		return null;
	}

	const changePassword = () => {
		dispatch(navigate({ screen: "ChangePassword", params: { token: param.token } }));
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
						<Text className="text-xl text-white font-semibold">Thông tin giảng viên</Text>
					</View>
					<View className="absolute right-4 top-12">
						<TouchableOpacity onPress={() => drawer.current.openDrawer()}>
							{/* <View className="relative"> */}
							<Ionicons name="ellipsis-vertical" size={24} color="white" />
							{/* </View> */}
						</TouchableOpacity>
					</View>
					<View className="absolute left-5 top-14">
						<LogoBK width={32} height={48} className="mx-auto"></LogoBK>
					</View>
				</View>
				{USER && (
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						className="h-full"
					>
						<View style={styles.shadow}>
							<ImageBackground source={require("../../../assets/bg.jpg")} style={styles.image}>
								<View className="bg-white p-2 m-4 flex-1 flex-row justify-between rounded-xl">
									<View className="relative w-[25%] h-full">
										{avtLink === "" ? (
											<Image
												className="w-full h-full rounded-lg"
												source={require("../../../assets/avt.jpg")}
											/>
										) : (
											<Image className="w-full h-full rounded-lg" source={{ uri: avtLink }} />
										)}
										<TouchableOpacity
											className="absolute -bottom-1 -right-3"
											onPress={() => editAvt()}
										>
											<MaterialIcons name="edit" size={24} color="black" />
										</TouchableOpacity>
									</View>
									<View className="flex-1 pl-4">
										<Text className="flex-1 text-lg font-bold mb-2">{USER.name}</Text>
										<Text className="flex-1">Sđt: {USER.phoneNumber}</Text>
										<Text className="flex-1">Email: {USER.email}</Text>
									</View>
								</View>
							</ImageBackground>
						</View>
						<View className="bg-white m-5 border border-gray-200 rounded-xl h-full flex-1">
							<View className="justify-between h-16 pl-4 pt-4 pr-4">
								<View className="h-full w-full justify-start">
									<Text className="text-xs mb-1">Email cá nhân:</Text>
									<Text className="text-sm font-bold mb-3">{USER.email}</Text>
									<View className="w-full h-px bg-gray-300" />
								</View>
							</View>

							<View className="flex-row justify-between h-20 pl-4 pt-4 pr-4">
								<View className="h-full w-[45%] justify-start">
									<Text className="text-xs mb-1">Ngày sinh:</Text>
									<Text className="text-sm font-bold mb-3">{USER.dob}</Text>
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
				)}
			</View>
			<Modal animationType="fade" transparent={true} visible={modalVisible}>
				<View
					style={{
						flex: 1,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						justifyContent: "center",
					}}
				>
					<View className="h-3/5 pl-8 pr-8 m-8 rounded-lg bg-white ">
						<View className="mt-4">
							<TouchableOpacity
								onPress={() => {
									setModalVisible(false);
									setImageFile(null);
								}}
								className="self-end"
							>
								<Ionicons name="close-outline" size={28} color="gray" className="" />
							</TouchableOpacity>
							<View className="mt-3 mb-5">
								<View className="border border-gray-300 h-64 justify-center rounded-lg">
									<Image
										className="w-[95%] h-[95%] rounded-lg self-center"
										source={{
											uri: imageFile != null ? imageFile.uri : avtLink,
										}}
									/>
								</View>
								<TouchableOpacity
									className="bg-red-600 w-1/2 h-8 self-center mt-3 justify-center rounded-lg"
									onPress={() => handleFilePick()}
								>
									<Text className="text-white self-center font-bold">Tải ảnh lên</Text>
								</TouchableOpacity>
							</View>
							<View className="self-center flex-row">
								<TouchableOpacity
									className="mr-8 bg-sky-600 p-2 w-20 rounded-lg"
									onPress={() => {
										setModalVisible(false);
										setImageFile(null);
									}}
								>
									<Text className="self-center text-white font-bold">Hủy</Text>
								</TouchableOpacity>
								<TouchableOpacity
									className="bg-red-600 p-2 w-20 rounded-lg"
									onPress={() => saveImage()}
								>
									<Text className="self-center text-white font-bold">Lưu</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
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
