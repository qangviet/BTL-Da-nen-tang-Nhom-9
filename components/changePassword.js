import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { goBack } from "../redux/navigationSlice";
import { LogoHust } from "./logo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import api from "./api";
import { startLoadding, stopLoading } from "../redux/loadingSlice";
const ChangePassword = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const state = useSelector((state) => state.navigation);
	const param = useSelector((state) => state.navigation.params);
	token = param.token;
	console.log("Change pass param:...", param);
	useEffect(() => {
		if (state.currentScreen !== "ChangePassword") {
			navigation.navigate(state.currentScreen);
		}
	}, [state.currentScreen]);

	useEffect(() => {
		const backAction = () => {
			dispatch(goBack());
			return true;
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

		return () => backHandler.remove(); // Cleanup khi component unmount
	}, []);

	const handleChangePassword = async () => {
		if (!currentPassword || !newPassword || !confirmPassword) {
			Alert.alert("Lỗi", "Làm ơn điền đầy đủ thông tin");
			return;
		}

		if (newPassword !== confirmPassword) {
			Alert.alert("Lỗi", "Mật khẩu mới không khớp");
			return;
		}
		console.log("CHANGE PASSWORD!");
		console.log("MK cu...", currentPassword);
		console.log("MK moi...", newPassword);
		try {
			// Gọi API đăng xuất
			dispatch(startLoadding());
			const response = await api.post("/it4788/change_password", {
				token: param.token,
				old_password: currentPassword,
				new_password: newPassword,
			});

			// Kiểm tra phản hồi từ API
			if (response.data.code === "1000") {
				console.log(response.data.message);
				Alert.alert("Thành công", "Đã đổi mật khẩu xong");
				goBackToHome();
			} else {
				console.log("Logout failed:", response.data.message);
			}
			dispatch(stopLoading());
		} catch (error) {
			dispatch(stopLoading());
			const errorMessage = error.response.data.message;
			console.error("Error logging out:", errorMessage);
			Alert.alert("Lỗi", errorMessage);
		}

		// // Add your password change logic here
		// // Fetch data
		// Alert.alert("Thành công", "Đã đổi mật khẩu xong");
		// goBackToHome();
	};
	const goBackToHome = () => {
		dispatch(goBack());
	};
	return (
		<View className="flex-1 bg-white">
			<View className="bg-red-700 pt-8 pb-5 relative">
				<View className="absolute left-3 top-8">
					<TouchableOpacity onPress={() => goBackToHome()}>
						<FontAwesome name="long-arrow-left" size={26} color="white" />
					</TouchableOpacity>
				</View>
				<View className="flex justify-center items-center">
					<LogoHust width={140} height={25}></LogoHust>
				</View>
			</View>
			<View className="px-5">
				<Text
					className="text-2xl font-bold text-red-600 
                    text-center mt-7 mb-12"
				>
					Thay đổi mật khẩu
				</Text>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Current Password"
						secureTextEntry={!showCurrentPassword}
						value={currentPassword}
						onChangeText={setCurrentPassword}
					/>
					<TouchableOpacity
						style={styles.eyeIcon}
						onPress={() => setShowCurrentPassword(!showCurrentPassword)}
					>
						<Icon name={showCurrentPassword ? "eye" : "eye-slash"} size={20} color="#666" />
					</TouchableOpacity>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="New Password"
						secureTextEntry={!showNewPassword}
						value={newPassword}
						onChangeText={setNewPassword}
					/>
					<TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNewPassword(!showNewPassword)}>
						<Icon name={showNewPassword ? "eye" : "eye-slash"} size={20} color="#666" />
					</TouchableOpacity>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Confirm New Password"
						secureTextEntry={!showConfirmPassword}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
					<TouchableOpacity
						style={styles.eyeIcon}
						onPress={() => setShowConfirmPassword(!showConfirmPassword)}
					>
						<Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="#666" />
					</TouchableOpacity>
				</View>
				<View className="w-[70%] mx-auto">
					<TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
						<Text className="text-white text-lg font-bold">Đổi mật khẩu</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	inputContainer: {
		marginBottom: 20,
		position: "relative",
	},
	input: {
		height: 50,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 16,
	},
	eyeIcon: {
		position: "absolute",
		right: 15,
		top: 15,
	},
	changeButton: {
		backgroundColor: "#f01d71",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 20,
	},
});

export default ChangePassword;
