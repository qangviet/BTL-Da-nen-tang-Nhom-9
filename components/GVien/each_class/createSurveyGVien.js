import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust } from "../../logo";
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import Modal from "react-native-modal";

import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { goBack as goBackNavigation } from "../../../redux/navigationSlice.js";
import * as DocumentPicker from "expo-document-picker";
import api from "../../api";
import * as FileSystem from "expo-file-system";
import { startLoading, stopLoading } from "../../../redux/loadingSlice.js";
const CreateSurveyGVien = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const param = useSelector((state) => state.navigation.params);
	//console.log("da den trang createSurvey", param)
	const [surveyTitle, setSurveyTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState(dayjs());
	const [endDate, setEndDate] = useState(dayjs());
	const [file, setFile] = useState(null); // State để lưu file
	const [questions, setQuestions] = useState([""]);

	const handleFilePick = async () => {
		dispatch(startLoading());
		try {
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
		} catch (error) {
			console.error("Error picking file:", error);
		}
		dispatch(stopLoading());
	};

	const handleSubmit = async () => {
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
			dispatch(stopLoading());
			return;
		}

		const formData = new FormData();
		formData.append("file", {
			uri: fileUri,
			name: file.name,
			type: file.type,
		});

		formData.append("token", param.token);
		formData.append("classId", param.class.id);
		formData.append("title", surveyTitle);
		formData.append("deadline", formatDate(endDate));
		formData.append("description", description);

		console.log("token", param.token);
		console.log("classID", param.class.id);
		console.log("Title", surveyTitle);
		console.log("deadline", formatDate(endDate));
		console.log("description", description);
		console.log("Posttt......", formData);

		try {
			const response = await axios.post("http://157.66.24.126:8080/it5023e/create_survey", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Upload success:", response.data);
			dispatch(stopLoading());
			goBack();
			alert("Tạo bài kiểm tra thành công!");
		} catch (error) {
			dispatch(stopLoading());
			console.error("Upload failed:", error.response ? error.response.data : error.message);
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
	};

	useEffect(() => {
		// Theo dõi thay đổi currentScreen để sync với navigation system
		if (currentScreen) {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);
	console.log(currentScreen);
	function goBack() {
		dispatch(goBackNavigation());
		// console.log("Go back!");
	}

	const addQuestion = () => {
		setQuestions([...questions, ""]);
	};

	const handleQuestionChange = (text, index) => {
		const newQuestions = questions.slice();
		newQuestions[index] = text;
		setQuestions(newQuestions);
	};

	const [modalStartDate, setModalStartDate] = useState(false);
	const [modalEndDate, setModalEndDate] = useState(false);
	const [checkDate, setCheckDate] = useState([false, false]);
	const openModalStartDate = () => {
		setModalStartDate(true);
	};
	const openModalEndDate = () => {
		setModalEndDate(true);
	};
	const closeModalStartDate = () => {
		setModalStartDate(false);
	};
	const closeModalEndDate = () => {
		setModalEndDate(false);
	};

	const formatDate = (date) => {
		return dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
	};

	const formatDate_display = (date) => {
		return dayjs(date).format("YYYY-MM-DD HH:mm");
	};

	return (
		<View>
			<View>
				<View className="bg-red-700 pt-10 pb-5 relative">
					<View className="absolute left-3 top-8">
						<TouchableOpacity onPress={() => goBack()}>
							<FontAwesome name="long-arrow-left" size={26} color="white" />
						</TouchableOpacity>
					</View>
					<View className="flex justify-center items-center">
						<LogoHust width={140} height={25}></LogoHust>
						<Text className="text-white text-[24px] pt-3">CREATE SURVEY</Text>
					</View>
				</View>
				<View className="mt-10 w-[85%] mx-auto">
					<TextInput
						placeholder="Tên bài kiểm tra*"
						placeholderTextColor={"#e86456"}
						className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
						value={surveyTitle}
						onChangeText={(text) => setSurveyTitle(text)}
					/>
					<TextInput
						style={{
							textAlignVertical: "top",
						}}
						placeholder="Mô tả"
						multiline={true}
						numberOfLines={5}
						placeholderTextColor={"#e86456"}
						className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
						value={description}
						onChangeText={(text) => setDescription(text)}
					/>
					<Text className="self-center text-lg font-semibold text-red-600 italic">Hoặc</Text>
					<View>
						<TouchableOpacity
							className="px-3 py-2 rounded-2xl bg-red-600 w-[60%] mx-auto mt-3"
							onPress={handleFilePick}
						>
							<View className="self-center flex flex-row items-center gap-x-2">
								<Text className="text-white font-semibold text-lg italic">Tải tài liệu lên</Text>
								<Entypo name="triangle-up" size={24} color="white" />
							</View>
						</TouchableOpacity>
						{/* Hiển thị tên file dưới nút tải */}
						{file && <Text className="mt-3 text-center text-gray-700">Tệp đã chọn: {file.name}</Text>}
					</View>

					<View className="pt-4">
						<View className="flex flex-row items-center gap-x-2">
							<Text className="text-base text-red-500 font-semibold">Hạn nộp:</Text>
							<TouchableOpacity
								className="px-4 py-2 border border-red-300 rounded-lg w-44"
								onPress={openModalEndDate}
							>
								{
									<Text className="text-red-500">
										{checkDate[1] ? formatDate_display(endDate) : "Chọn ngày"}
									</Text>
								}
							</TouchableOpacity>
							<TouchableOpacity className="bg-red-500 px-4 py-2 rounded-lg" onPress={openModalEndDate}>
								<Text className="text-white">Chọn</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View>
						<TouchableOpacity className="px-8 py-2 rounded-xl bg-red-600 mx-auto mt-10">
							<Text className="text-lg text-white font-bold italic self-center" onPress={handleSubmit}>
								Submit
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<Modal isVisible={modalEndDate} onBackdropPress={closeModalEndDate}>
				<View className="h-[60%] px-6 bg-gray-200 rounded-lg">
					<View className="mt-2">
						<DateTimePicker
							mode="single"
							date={endDate}
							initialView="day"
							timePicker={true}
							onChange={(params) => {
								setEndDate(params.date);
								setCheckDate((prev) => [prev[0], true]);
							}}
						/>
					</View>

					{checkDate[1] && (
						<View className="flex flex-row gap-x-1 items-center">
							<Text>Thời gian kết thúc:</Text>
							<Text className="text-md font-semibold">{formatDate_display(endDate)}</Text>
						</View>
					)}
					<View className="flex justify-end flex-row mt-4 mb-2">
						<TouchableOpacity className="bg-blue-500 py-2 w-[30%] rounded-lg" onPress={closeModalEndDate}>
							<Text className="text-white font-mediu self-center">Xong</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
});

export default CreateSurveyGVien;
