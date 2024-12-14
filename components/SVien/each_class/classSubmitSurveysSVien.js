import { Text, View, FlatList, TouchableOpacity, TextInput, Modal } from "react-native";
import React, { Component, useState, useEffect } from "react";
import { LogoHust } from "../../logo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import api from "../../api";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { startLoading, stopLoading } from "../../../redux/loadingSlice";
const ClassSubmitSurveysSVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const params = useSelector((state) => state.navigation.params);
	console.log("Submit survey params.......", params);

	useEffect(() => {
		setFileUpload(null);
		if (currentScreen !== "ClassSubmitSurveysSVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	function goBack() {
		dispatch(goBackMavigation());
		// console.log("Go back!");
	}

	const [file, setFileUpload] = useState(null); // State để lưu file
	console.log("file: ", file);

	const survey = params.assignment;
	const mode = params.mode;
	console.log(survey);

	// const [show_file, setFile] = useState(false);
	const [submitVisible, setsubmitVisible] = useState(false);
	const [textResponse, setTextResponse] = useState("");

	const handleFilePick = async () => {
		try {
			dispatch(startLoading());
			console.log(">>>> Picking file");
			const response = await DocumentPicker.getDocumentAsync({
				type: "*/*",
				copyToCacheDirectory: true,
			});

			if (response.assets && response.assets.length > 0) {
				const { name, size, uri, mimeType } = response.assets[0];
				const fileToUpload = { name, size, uri, type: mimeType };
				setFileUpload(fileToUpload);
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

	const handleSubmit = async () => {
		//setsubmitVisible(true)
		console.log("File...:", file);
		const fileUri = file.uri;
		// Kiểm tra xem file có tồn tại không
		dispatch(startLoading());
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

		formData.append("token", params.token);
		formData.append("assignmentId", params.assignment.id);
		formData.append("textResponse", textResponse);

		console.log("token...", params.token);
		console.log("assignmentId...", params.assignment.id);
		console.log("textResponse...", textResponse);
		console.log("Posttt......", formData);

		try {
			const response = await axios.post("http://157.66.24.126:8080/it5023e/submit_survey", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			dispatch(stopLoading());
			console.log("Upload success:", response.data);
			alert("Nộp bài thành công!");
			goBack();
		} catch (error) {
			dispatch(stopLoading());
			console.error("Upload failed:", error.response ? error.response.data : error.message);
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
	};

	return (
		<View>
			<View className="bg-red-700 pt-10 pb-5 relative">
				<View className="absolute left-3 top-8">
					<TouchableOpacity onPress={() => goBack()}>
						<FontAwesome name="long-arrow-left" size={26} color="white" />
					</TouchableOpacity>
				</View>
				<View className="flex justify-center items-center">
					<LogoHust width={110} height={21}></LogoHust>
					<Text className="text-white text-[24px] pt-3">SUBMIT SURVEY</Text>
				</View>
			</View>
			{survey && (
				<View className="mt-5 ml-10 mr-10">
					<TextInput
						className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg"
						placeholder={survey.title}
						placeholderTextColor="crimson"
						style={{ color: "crimson" }}
						editable={false}
					/>

					{survey.description && (
						<TextInput
							className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg mt-4 h-20"
							placeholder={survey.description}
							placeholderTextColor="crimson"
							style={{ color: "crimson", justifyContent: "flex-start" }}
							editable={false}
						/>
					)}

					{survey.file && (
						<TouchableOpacity
							className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-72 self-center"
							// onPress={() => setFile(true)}
						>
							<Text className="self-center italic font-bold text-white text-base">{survey.file}</Text>
						</TouchableOpacity>
					)}

					{mode == 0 && (
						<TextInput
							className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg mt-4 h-40"
							placeholder="Trả lời"
							placeholderTextColor="crimson"
							style={{ color: "crimson", justifyContent: "flex-start" }}
						/>
					)}
					{mode == 1 && (
						<TextInput
							className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg mt-4 h-40"
							placeholder="Trả lời"
							placeholderTextColor="crimson"
							editable={false}
							value={textResponse}
							onChangeText={(text) => setTextResponse(text)}
							style={{ color: "crimson", justifyContent: "flex-start" }}
						/>
					)}
					{mode == 2 && (
						<TextInput
							className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg mt-4 h-40"
							placeholder="Trả lời"
							placeholderTextColor="crimson"
							editable={false}
							defaultValue={survey.your_ans}
							style={{ color: "crimson", justifyContent: "flex-start" }}
						/>
					)}

					<View>
						<Text className="mt-2 text-lg italic font-bold text-red-700 self-center">Hoặc</Text>
					</View>

					{mode == 0 && (
						<TouchableOpacity
							className="rounded-lg bg-red-700 h-10 justify-center mt-3 w-56 self-center"
							onPress={handleFilePick}
						>
							<View className="self-center flex flex-row items-center gap-x-2">
								<Text className="self-center italic font-bold text-white text-base">
									Tải tài liệu lên
								</Text>
							</View>
						</TouchableOpacity>
					)}
					{mode == 1 && (
						<TouchableOpacity
							className="rounded-lg bg-red-700 h-10 justify-center mt-3 w-56 self-center"
							disabled={true}
						>
							<Text className="self-center italic font-bold text-white text-base">Tải tài liệu lên</Text>
						</TouchableOpacity>
					)}
					{mode == 2 && (
						<TouchableOpacity
							className="rounded-lg bg-red-700 h-10 justify-center mt-3 w-56 self-center"
							disabled={true}
						>
							{survey.your_file !== "" && (
								<Text className="self-center italic font-bold text-white text-base">
									{survey.your_file}
								</Text>
							)}
							{survey.your_file === "" && (
								<Text className="self-center italic font-bold text-white text-base">
									Tải tài liệu lên
								</Text>
							)}
						</TouchableOpacity>
					)}

					{file && <Text className="self-center mt-1 text-s">Tệp đã chọn: {file.name}</Text>}

					{mode == 0 && (
						<TouchableOpacity
							className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-32 self-center"
							onPress={handleSubmit}
						>
							<Text className="self-center italic font-bold text-white text-base">Submit</Text>
						</TouchableOpacity>
					)}
					{(mode == 1 || mode == 2) && (
						<TouchableOpacity
							className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-32 self-center"
							disabled={true}
						>
							<Text className="self-center italic font-bold text-white text-base">Submit</Text>
						</TouchableOpacity>
					)}
				</View>
			)}
			<Modal animationType="fade" transparent={true} visible={submitVisible}>
				<View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
					<View className="bg-white h-1/5 w-9/12 self-center rounded-2xl mt-72">
						<View>
							<TouchableOpacity
								onPress={() => setsubmitVisible(false)}
								className="h-9 justify-center self-end"
							>
								<Ionicons name="close-outline" size={28} color="gray" className="self-end mt-2 mr-3" />
							</TouchableOpacity>
						</View>
						<Text className="self-center text-xl text-red-700 mt-5">Nộp bài tập thành công!</Text>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default ClassSubmitSurveysSVien;
