import React, { useState } from "react";

import {
	TouchableOpacity,
	StyleSheet,
	Image,
	View,
	Text,
	TextInput,
	SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import api from "./api";

const RegisterScreen = ({ navigation }) => {
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [role, setRole] = useState("");

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Teacher", value: "Giảng viên" },
		{ label: "Student", value: "Sinh viên" },
	]);

	const [focusIndex, setFocusIndex] = useState(null);

	//API call - register
	const handleRegister = async () => {
		// Kiểm tra các trường nhập liệu
		if (!first_name || !last_name || !email || !password || !value) {
			alert("Vui lòng nhập đầy đủ thông tin!");
			return;
		}
	
		// Tạo dữ liệu gửi đi
		const requestBody = {
			ho: first_name,
			ten: last_name,
			email: email,
			password: password,
			uuid: Math.floor(Math.random() * 900000) + 100000, // UUID 6 chữ số ngẫu nhiên
			role: value === "Giảng viên" ? "TEACHER" : "STUDENT", // Teacher/Student -> GIẢNG VIÊN/SINH VIÊN
		};
	
		try {
			// Gửi yêu cầu POST đến API server
			console.log("Sending request:", requestBody); // Log request để kiểm tra
			const response = await api.post("/it4788/signup", requestBody);
	
			// Log phản hồi
			console.log("Response Data:", response.data);
	
			// Kiểm tra phản hồi từ server
			if (response.status === 200) {
				const verifyCode = response.data.verify_code;
				const verifyResponse = await api.post("/it4788/check_verify_code", {
					email: email,
					verify_code: verifyCode,
				  });
				if (verifyResponse.status === 200) {
					alert("Đăng ký thành công!");
					navigation.navigate("LoginScreen"); // Chuyển hướng đến màn hình đăng nhập
				}
				else {
					alert(`Đăng ký không thành công: ${verifyResponse.data.message || "Không xác định"}`);
				}
			} else {
				alert(`Đăng ký không thành công: ${response.data.message || "Không xác định"}`);
			}
		} catch (error) {
			// Xử lý lỗi
			if (error.response) {
				console.error("Error Response:", error.response); // Log chi tiết phản hồi lỗi
				alert(`Lỗi: ${error.response.data?.message || error.response.statusText || "Không xác định"}`);
			} else if (error.request) {
				console.error("Error Request:", error.request); // Log chi tiết request không thành công
				alert("Không nhận được phản hồi từ server.");
			} else {
				console.error("Error Message:", error.message); // Log thông báo lỗi
				alert("Có lỗi xảy ra: " + error.message);
			}
		}
	};


	return (
		<View
			className="bg-red-700 h-full"
			style={{ justifyContent: "center", alignItems: "center" }}
		>
			<View className="flex items-center mt-0">
				<Image source={require("../assets/logo.png")} style={styles.logo} />
			</View>
			<View className="flex items-center my-10">
				<Text className="text-white text-3xl font-bold">Welcome to AIIHust</Text>
			</View>
			<View className="mx-8 flex gap-y-5">
				<View className="flex flex-row items-center justify-center gap-x-4">
					<TextInput
						className="basis-[35%] font-medium 
                        border-white rounded-xl px-5 py-3 text-lg"
						value={first_name}
						onChangeText={setFirst_name}
						placeholder="Họ"
						placeholderTextColor="white"
						onFocus={() => setFocusIndex(0)}
						style={[focusIndex == 0 ? styles.inputFocused : styles.input]}
					/>
					<TextInput
						className="basis-[55%] font-medium 
                        border-white rounded-xl px-5 py-3 text-lg"
						value={last_name}
						onChangeText={setLast_name}
						placeholder="Tên"
						placeholderTextColor="white"
						onFocus={() => setFocusIndex(1)}
						style={[focusIndex == 1 ? styles.inputFocused : styles.input]}
					/>
				</View>
				<View>
					<TextInput
						className="font-medium border-white 
                        rounded-lg px-5 py-3 text-lg"
						value={email}
						onChangeText={setEmail}
						placeholder="Email"
						placeholderTextColor="white"
						onFocus={() => setFocusIndex(2)}
						style={[focusIndex == 2 ? styles.inputFocused : styles.input]}
					/>
				</View>
				<View>
					<TextInput
						className="font-medium border-white 
                        rounded-lg px-5 py-3 text-lg"
						value={password}
						onChangeText={setPassword}
						placeholder="Mật khẩu"
						placeholderTextColor="white"
						onFocus={() => setFocusIndex(3)}
						style={[focusIndex == 3 ? styles.inputFocused : styles.input]}
					/>
				</View>
				<DropDownPicker
					onFocus={() => setFocusIndex(4)}
					style={[focusIndex == 4 ? styles.dropdownFocused : styles.dropdown]}
					// style={styles.dropdown}
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					placeholder="  Chọn vai trò"
					placeholderStyle={{
						color: "white",
						fontSize: 18,
						fontWeight: 500,
					}}
					dropDownContainerStyle={{
						backgroundColor: "crimson",
						borderColor: "white",
						borderWidth: 1,
						marginTop: 20,
					}}
					listItemLabelStyle={{
						color: "white",
						fontSize: 18,
					}}
					itemSeparator={true}
					itemSeparatorStyle={{
						backgroundColor: "white",
					}}
					labelStyle={{
						color: "white",
						fontSize: 18,
						fontWeight: 500,
						paddingLeft: 7,
					}}
					arrowIconStyle={{
						width: 20,
						height: 20,
						// backgroundColor: 'white'
					}}
				/>
			</View>
			<TouchableOpacity style={styles.loginButton} className="my-5" onPress={handleRegister}>
				<Text style={styles.loginButtonText}>ĐĂNG KÝ</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
				<Text style={{ color: "white" }}>Hoặc đăng nhập bằng username/password</Text>
			</TouchableOpacity>
		</View>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	logo: {
		width: 150,
		height: 30,
		marginTop: 50,
	},

	loginButton: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 15,
		width: "85%",
		alignItems: "center",
		alignSelf: "center",
	},

	loginButtonText: {
		color: "#b91c1c",
		fontSize: 16,
		fontWeight: "bold",
	},

	dropdown: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#dbd9d9",
	},

	dropdownFocused: {
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: "white",
	},

	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#dbd9d9",
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		fontSize: 18,
		color: "white",
		backgroundColor: "transparent",
	},

	inputFocused: {
		borderColor: "white", // Màu sắc khi focus
		borderWidth: 2,
	},
});
