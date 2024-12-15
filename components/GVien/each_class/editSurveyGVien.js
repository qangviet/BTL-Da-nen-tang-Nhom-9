import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust } from "../../logo";
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { navigate } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { goBack as goBackMavigation } from "../../../redux/navigationSlice.js";
import api from "../../api";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { startLoading, stopLoading } from "../../../redux/loadingSlice";
const EditSurveyGVien = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const currentScreen = useSelector((state) => state.navigation.currentScreen);

	const params = useSelector((state) => state.navigation.params);
	const survey = params.survey;
	const token = params.token;

	console.log("Edit survey: ", params.survey);

	useEffect(() => {
		setFile(null);
		// Theo dõi thay đổi currentScreen để sync với navigation system
		if (currentScreen) {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	function goBack() {
		dispatch(stopLoading());
		dispatch(goBackMavigation());
	}

	const [surveyTitle, setSurveyTitle] = useState("");
	const [questions, setQuestions] = useState([""]);
	const [file, setFile] = useState(null); // State để lưu file

	const [endDate, setEndDate] = useState(dayjs());
	useEffect(() => {
		survey ? setEndDate(survey.deadline) : setEndDate(dayjs());
	}, [survey]);

	const [modalEndDate, setModalEndDate] = useState(false);
	const [modalConfirmSave, setModalConfirmSave] = useState(false);
	const [modalConfirmDelete, setModalConfirmDelete] = useState(false);

	const openModalEndDate = () => {
		setModalEndDate(true);
	};
	const closeModalEndDate = () => {
		setModalEndDate(false);
	};

	const openModalConfirmSave = () => {
		if (file) 
		{
			setModalConfirmSave(true);
		}
		else {
			alert("Vui lòng tải tài liệu lên!")
		}
	};
	const openModalConfirmDelete = () => {
		setModalConfirmDelete(true);
	};

	const closeModalConfirmSave = () => {
		setModalConfirmSave(false);
	};

	const closeModalConfirmDelete = () => {
		setModalConfirmDelete(false);
	};

	const formatDate = (date) => {
		return dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
	};

	const formatDate_display = (date) => {
		return dayjs(date).format("YYYY-MM-DD HH:mm");
	};

	function handleLinkPressed(url) {
		console.log("Open link");
	}

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

	const handleSave = async () => {
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
			alert("Vui lòng tải tài liệu lên!")
			dispatch(stopLoading());
			return;
		}

		const formData = new FormData();
		formData.append("file", {
			uri: fileUri,
			name: file.name,
			type: file.type,
		});

		formData.append("token", token);
		formData.append("assignmentId", survey.id);
		formData.append("deadline", formatDate(endDate));
		formData.append("description", survey.description);

		console.log("Survey....", survey);

		try {
			console.log("Token...", token);
			console.log("AssignmentId...", survey.id);
			const response = await axios.post("http://157.66.24.126:8080/it5023e/edit_survey", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.data.meta.code === "1000") {
				dispatch(stopLoading());
				goBack();
				alert("Chỉnh sửa bài kiểm tra thành công!");
			} else {
				console.error("API error:", response.data.meta.message);
			}
		} catch (error) {
			console.error("Network error:", error);
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
	};

	async function handleDelete() {
		dispatch(startLoading());
		try {
			const response = await api.post("/it5023e/delete_survey", {
				token: token,
				survey_id: survey.id,
			});

			if (response.data.meta.code === "1000") {
				dispatch(stopLoading());
				goBack();
				alert("Xóa bài kiểm tra thành công!");
			} else {
				dispatch(stopLoading());
				console.error("API error:", response.data.meta.message);
			}
		} catch (error) {
			dispatch(stopLoading());
			console.error("Network error:", error);
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
	}

	return (
		<>
			{survey && (
				<View>
					<View className="bg-red-700 pt-10 pb-5 relative">
						<View className="absolute left-3 top-8">
							<TouchableOpacity onPress={() => goBack()}>
								<FontAwesome name="long-arrow-left" size={26} color="white" />
							</TouchableOpacity>
						</View>
						<View className="flex justify-center items-center">
							<LogoHust width={110} height={21}></LogoHust>
							<Text className="text-white text-[24px] pt-3">EDIT SURVEY</Text>
						</View>
					</View>
					<View className="mt-10 w-[85%] mx-auto">
						<TextInput
							placeholder="Tên bài kiểm tra*"
							placeholderTextColor={"#e86456"}
							defaultValue={survey.title}
							className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
						/>
						<TextInput
							style={{
								textAlignVertical: "top",
							}}
							placeholder="Mô tả"
							multiline={true}
							numberOfLines={5}
							placeholderTextColor={"#e86456"}
							defaultValue={survey.description}
							className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
						/>
						<Text className="self-center text-lg font-semibold text-red-600 italic">Hoặc</Text>
						<View>
							{/* {survey.file_url && <View className="flex-row justify-center">
							<Text className="self-center mt-3 mr-2">Link tài liệu: </Text>
							<TouchableOpacity onPress={() => handleLinkPressed(survey.file_url)}>
								<Text className="self-center text-blue-500 mt-3 underline">Google Drive</Text>
							</TouchableOpacity>
						</View>} */}
							<TouchableOpacity
								className="px-3 py-2 rounded-2xl bg-red-600 w-[60%] mx-auto mt-2"
								onPress={handleFilePick}
							>
								<View className="self-center flex flex-row items-center gap-x-2">
									<Text className="text-white font-semibold text-lg italic">Tải tài liệu lên</Text>
									<Entypo name="triangle-up" size={24} color="white" />
								</View>
							</TouchableOpacity>
							{file && <Text className="mt-3 text-center text-gray-700">Tệp đã chọn: {file.name}</Text>}
						</View>
						<View className="pt-4">
							<View className="flex flex-row items-center gap-x-2">
								<Text className="text-base text-red-500 font-semibold w-[70px]">Hạn nộp:</Text>
								<TouchableOpacity
									className="px-4 py-2 border border-red-300 rounded-lg w-44"
									onPress={openModalEndDate}
								>
									{
										<Text className="text-red-500">
											{survey ? formatDate_display(endDate) : "Chọn ngày"}
										</Text>
									}
								</TouchableOpacity>
								<TouchableOpacity
									className="bg-red-600 px-4 py-2 rounded-lg"
									onPress={openModalEndDate}
								>
									<Text className="text-white font-bold">Chọn</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View className="flex flex-row mt-10 justify-center gap-x-5">
							<View>
								<TouchableOpacity
									className="px-8 py-2 rounded-xl bg-red-600"
									onPress={openModalConfirmSave}
								>
									<Text className="text-lg text-white font-bold italic self-center">Lưu</Text>
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									className="px-8 py-2 rounded-xl bg-red-600"
									onPress={openModalConfirmDelete}
								>
									<Text className="text-lg text-white font-bold italic self-center">Xóa</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			)}
			{survey && (
				<Modal isVisible={modalEndDate} onBackdropPress={closeModalEndDate}>
					<View className="px-6 bg-gray-200 rounded-lg pb-5">
						<View className="mt-2">
							<DateTimePicker
								mode="single"
								date={endDate}
								initialView="day"
								timePicker={true}
								onChange={(params) => {
									setEndDate(params.date);
								}}
							/>
						</View>

						<View className="flex flex-row gap-x-1 items-center">
							<Text>Thời gian kết thúc:</Text>
							<Text className="text-md font-semibold">{formatDate_display(endDate)}</Text>
						</View>
						<View className="flex justify-end flex-row mt-4 mb-2">
							<TouchableOpacity
								className="bg-blue-500 py-2 w-[30%] rounded-lg"
								onPress={closeModalEndDate}
							>
								<Text className="text-white font-mediu self-center">Xong</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}

			<Modal isVisible={modalConfirmSave} onBackdropPress={closeModalConfirmSave}>
				<View className="bg-gray-200 rounded-md pb-5">
					<View className="flex flex-row justify-end items-center mt-3 px-3">
						<TouchableOpacity onPress={() => closeModalConfirmSave()} className="h-9">
							<Ionicons name="close-outline" size={30} color="gray" className="mt-2 mr-3" />
						</TouchableOpacity>
					</View>
					<View className="border-t border-gray-400 justify-center"></View>
					<View>
						<Text className="text-xl font-bold px-5 py-3 self-center">Xác nhận sửa đổi bài tập ?</Text>
					</View>
					<View className="flex flex-row justify-end px-3 gap-x-5 pt-3">
						<TouchableOpacity className="px-3 py-2 bg-blue-500 rounded-lg" onPress={() => handleSave()}>
							<Text className="text-lg text-gray-300">Lưu</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="px-3 py-2 bg-red-600 rounded-lg"
							onPress={() => closeModalConfirmSave()}
						>
							<Text className="text-white text-lg">Không</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<Modal isVisible={modalConfirmDelete} onBackdropPress={closeModalConfirmDelete}>
				<View className="bg-gray-200 rounded-md pb-5">
					<View className="flex flex-row justify-end items-center mt-3 px-3">
						<TouchableOpacity onPress={() => closeModalConfirmDelete()} className="h-9">
							<Ionicons name="close-outline" size={30} color="gray" className="mt-2 mr-3" />
						</TouchableOpacity>
					</View>
					<View className="border-t border-gray-400"></View>
					<View className="justify-center">
						<Text className="self-center text-xl font-bold px-5 py-3">Xác nhận xóa bài tập ?</Text>
					</View>
					<View className="flex flex-row justify-end px-3 gap-x-5 pt-3">
						<TouchableOpacity className="px-3 py-2 bg-blue-500 rounded-lg" onPress={() => handleDelete()}>
							<Text className="text-lg text-gray-300">Xóa</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="px-3 py-2 bg-red-600 rounded-lg"
							onPress={() => closeModalConfirmDelete()}
						>
							<Text className="text-white text-lg">Không</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</>
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
		Color: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
});

export default EditSurveyGVien;
