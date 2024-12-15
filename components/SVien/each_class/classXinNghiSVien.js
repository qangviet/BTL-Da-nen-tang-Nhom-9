import { Text, View, TextInput, Button, Modal, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { goBack as goBackNavigation } from "../../../redux/navigationSlice.js";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api";
import { startLoading, stopLoading } from "../../../redux/loadingSlice.js";
const ClassXinNghiSVien = ({ navigation, route }) => {
	const { params } = route;
	console.log("Xin nghi params....", params);
	const dispatch = useDispatch();

	const [LichSuDiemDanh, setAttendanceHistory] = useState([]); // State để lưu lịch sử điểm danh

	// Hàm gọi API để lấy lịch sử điểm danh
	const fetchAttendanceHistory = async () => {
		try {
			dispatch(startLoading());
			const response = await api.post("/it5023e/get_attendance_record", {
				token: params.token,
				class_id: params.classInfo.id,
			});

			if (response.data.meta.code === "1000") {
				const absentDates = response.data.data.absent_dates;
				const formattedData = absentDates.map((date, index) => ({
					id: index,
					date: date,
					status: "Vắng",
				}));
				setAttendanceHistory(formattedData);
			} else {
				console.error("Error fetching attendance history:", response.data.meta.message);
			}
			dispatch(stopLoading());
		} catch (error) {
			dispatch(stopLoading());
			console.error("Failed to fetch attendance history:", error);
		}
	};

	// Hàm xử lý khi người dùng ấn vào lịch sử điểm danh

	const DateDiemDanh = ({ item }) => (
		<View className="justify-between h-10 flex-row">
			<Text className="self-center ml-8 text-base">
				Buổi {item.id + 1}: {item.date}
			</Text>
			<Text className="self-center mr-8 text-base">{item.status}</Text>
		</View>
	);

	function goBack() {
		dispatch(goBackNavigation());
		// console.log("Go back!");
	}

	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show_timepicker, setShow] = useState(false);
	const [historyVisible, sethistoryVisible] = useState(false);
	const [submitVisible, setsubmitVisible] = useState(false);

	const [file, setFile] = useState(null); // State để lưu file
	const [reason, setReason] = useState("");
	const [title, setTitle] = useState("");

	// console.log("Date......", date.toLocaleDateString("en-CA"));
	// console.log("Lí do.....", reason);
	// console.log("Tiêu đề....", title);

	const handleFilePick = async () => {
		try {
			dispatch(startLoading());
			const response = await DocumentPicker.getDocumentAsync({
				type: "*/*",
				copyToCacheDirectory: true,
			});

			if (response.assets && response.assets.length > 0) {
				const { name, size, uri, mimeType } = response.assets[0];
				const fileToUpload = { name, size, uri, type: mimeType };
				setFile(fileToUpload);
				console.log("File đã chọn:", fileToUpload);
			} else {
				console.log("File selection canceled.");
				console.log(response);
			}
			dispatch(stopLoading());
		} catch (error) {
			dispatch(stopLoading());
			console.error("Error picking file:", error);
		}
	};

	const handleSubmitAbsenseRequest = async () => {
		dispatch(startLoading());
		if (!file) {
			alert("Vui lòng tải tài liệu lên!")
			dispatch(stopLoading());
			return;
		}
		const fileUri = file.uri;
		// Kiểm tra xem file có tồn tại không
		const fileInfo = await FileSystem.getInfoAsync(fileUri);
		if (!fileInfo.exists) {
			console.error("File not found!");
			return;
		}

		const formData = new FormData();
		formData.append("file", {
			uri: fileUri,
			name: file.name,
			type: file.type,
		});

		formData.append("token", params.token);
		formData.append("classId", params.classInfo.id);
		formData.append("title", title);
		formData.append("date", date.toLocaleDateString("en-CA"));
		formData.append("reason", reason);

		console.log("Posttt......", formData);

		try {
			dispatch(startLoading());
			const response = await axios.post("http://157.66.24.126:8080/it5023e/request_absence", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			dispatch(stopLoading());
			if (response.data.meta.code === "1000") {
				console.log("Request absense:", response.data);
				alert("Xin nghỉ thành công");
				goBack();
				//setsubmitVisible(true);
			}
		} catch (error) {
			dispatch(stopLoading());
			console.error("Upload failed:", error.response ? error.response.data : error.message);
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	return (
		<View>
			<TouchableOpacity
				className="bg-white p-3 shadow border border-gray-200 flex-row justify-center"
				onPress={() => {
					fetchAttendanceHistory();
					sethistoryVisible(true);
				}}
			>
				<Text className="text-lg text-red-700">Lịch sử điểm danh</Text>
			</TouchableOpacity>
			<View>
				<Text className="text-2xl text-red-700 self-center mt-5 mb-5">Xin nghỉ</Text>
				<View className="ml-10 mr-10">
					<TextInput
						className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg"
						placeholder="Tiêu đề"
						placeholderTextColor="crimson"
						value={title}
						onChangeText={(text) => setTitle(text)}
						style={{ color: "crimson" }}
					/>

					<TextInput
						className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg mt-4 h-40"
						placeholder="Lý do"
						placeholderTextColor="crimson"
						value={reason}
						onChangeText={(text) => setReason(text)}
						style={{ color: "crimson", justifyContent: "flex-start" }}
					/>

					<TouchableOpacity
						className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-72 self-center"
						onPress={handleFilePick}
					>
						<Text className="self-center italic font-bold text-white text-base">Tải minh chứng</Text>
					</TouchableOpacity>

					{file && <Text className="self-center mt-1 text-s">Minh chứng: {file.name}</Text>}

					<View className="flex-row justify-between ml-1 mr-1">
						<Text className="text-base mt-5">Ngày xin nghỉ:</Text>
						<TouchableOpacity
							onPress={() => showMode("date")}
							className="border border-red-700 w-48 justify-center self-center mt-4 h-9 flex-row">
							<Text className="text-red-700 mt-1 mr-16 text-base">										{date.toLocaleDateString("en-CA")}</Text>
							<View className="mt-2">
								<FontAwesome name="caret-down" size={14} color="gray" />
							</View>
						</TouchableOpacity>

						{show_timepicker && (
							<DateTimePicker
								testID="dateTimePicker"
								value={date}
								mode={mode}
								is24Hour={true}
								display="default"
								onChange={onChange}
							/>
						)}

					</View>
					<TouchableOpacity
						className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-32 self-center"
						onPress={handleSubmitAbsenseRequest}
					>
						<Text className="self-center italic font-bold text-white text-base">Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Modal animationType="fade" transparent={true} visible={historyVisible}>
				<View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
					<View className="bg-white h-4/6 w-11/12 self-center rounded-2xl mt-32">
						<TouchableOpacity onPress={() => sethistoryVisible(false)} className="h-9 justify-center">
							<Ionicons name="close-outline" size={28} color="gray" className="self-end mt-2 mr-3" />
						</TouchableOpacity>
						<Text className="self-center text-lg text-red-700">Lịch sử điểm danh</Text>
						<View className="justify-between mt-3 h-10 flex-row">
							<Text className="self-center ml-16 text-base font-bold">Buổi học</Text>
							<Text className="self-center mr-8 text-base font-bold">Trạng thái</Text>
						</View>
						<FlatList
							className="mb-5"
							data={LichSuDiemDanh}
							renderItem={({ item }) => <DateDiemDanh item={item} />}
							keyExtractor={(item) => item.id}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default ClassXinNghiSVien;
