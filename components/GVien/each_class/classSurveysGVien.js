import { Modal, Text, View, FlatList } from "react-native";
import React, { Component, useState } from "react";
import { TouchableOpacity } from "react-native";
import ViewSurveysGVien from "./viewSurveysGVien";
import api from "../../api";
import { useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Platform } from "react-native";
import { Linking } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/loadingSlice";
const ClassSurveysGVien = ({ route }) => {
	const { params } = route;
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const focused = useIsFocused();
	// console.log();
	// console.log("ClassSurvey");
	// console.log(params);

	// 0 - upcoming, 1 - past due
	const [mode, setModeBtn] = useState(0);
	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const today = new Date();
	// console.log("Today: ", today)
	const [SURVEYS, setSURVEYS] = useState([]);
	const [chosenSurvey, setChosenSurvey] = useState(null);
	// const token = params.token;
	// const class_id = params.class.id;
	// console.log(params)

	// let SURVEYS = [];

	useEffect(() => {
		if (currentScreen !== "ClassScreenGVien") {
			if (focused) {
				navigation.navigate(currentScreen);
			}
		}
	}, [currentScreen]);

	let grouped_upcoming = {};
	let grouped_pastdue = {};
	let sortedDates_upcoming = [];
	let sortedDates_pastdue = [];

	useEffect(() => {
		async function fetchSurveys() {
			try {
				dispatch(startLoading());
				const response = await api.post("/it5023e/get_all_surveys", {
					token: params.token,
					class_id: params.class.id,
				});

				if (response.data.meta.code === "1000") {
					const fetchedSurveys = response.data.data.map((item) => ({
						id: item.id,
						title: item.title,
						description: item.description,
						lecturer_id: item.lecturer_id,
						deadline: item.deadline,
						file_url: item.file_url,
						class_id: item.class_id,
					}));
					setSURVEYS(fetchedSurveys);
					dispatch(stopLoading());
				} else {
					dispatch(stopLoading());
					console.error("API error:", response.data.meta.message);
				}
			} catch (error) {
				// console.error('Network error:', error);
				// console.error("API call failed: ", error);
				// console.error("Error fetching class list:", error);
				// console.error("Error Data:", error.response.data);
				// console.error("Error Status:", error.response.status);
				dispatch(stopLoading());
				console.error(
					`Error fetching get_all_surveys - Api get_all_surveys - Data: token: ${params.token}, class_id: ${params.class.id}`,
					error
				);
			}
		}

		fetchSurveys();
	}, [mode]);

	const parseDate = (dateString) => new Date(dateString);

	// console.log(SURVEYS);

	function groupSurveys(SURVEYS) {
		SURVEYS.forEach((survey) => {
			const deadline = parseDate(survey.deadline);
			if (deadline > today) {
				if (!grouped_upcoming[survey.deadline]) {
					grouped_upcoming[survey.deadline] = [];
				}
				grouped_upcoming[survey.deadline].push(survey);
			} else if (deadline < today) {
				if (!grouped_pastdue[survey.deadline]) {
					grouped_pastdue[survey.deadline] = [];
				}
				grouped_pastdue[survey.deadline].push(survey);
			}
		});
	}

	function extractDate(isoDateString) {
		const parts = isoDateString.split("T");
		const timePart = parts[0];
		return timePart;
	}

	function extractTime(isoDateString) {
		const parts = isoDateString.split("T");
		const timePart = parts[1].split(":");
		const hours = timePart[0];
		const minutes = timePart[1];
		const formattedTime = `${hours}h${minutes}`;
		return formattedTime;
	}

	function handleOpenSurvey(index, survey) {
		setViewSurvey(index);
		setChosenSurvey(survey);
		// console.log("Chosen: ", survey);
	}

	groupSurveys(SURVEYS);

	sortedDates_upcoming = Object.keys(grouped_upcoming).sort((a, b) => new parseDate(b) - new parseDate(a));
	sortedDates_pastdue = Object.keys(grouped_pastdue).sort((a, b) => new parseDate(b) - new parseDate(a));

	// console.log("Upcoming:", grouped_upcoming);
	// console.log("Past Due:", grouped_pastdue);
	// console.log();
	console.log("Sorted Upcoming:", sortedDates_upcoming);
	console.log("Sorted Past Due:", sortedDates_pastdue);

	const [viewSurvey, setViewSurvey] = useState(-1);
	//const [is_open, setIsOpen] = useState(false);

	// const openModal = (url) => {
	// 	setEachUrl(url);
	// 	setFileUrl(url);
	// 	setModalVisible(true);
	// 	setIsOpen(true);
	//   };
	const openDriveDocument = (url) => {
		console.log("Mo tai lieu...");
		//setIsOpen(true);
		try {
			Linking.openURL(url).catch((err) => {
				console.error("Failed to open URL: ", err);
				alert("Error Không thể mở tài liệu.");
			});
		} catch (error) {
			console.error("Error parsing drive URI: ", error);
			alert("Error", "Không thể lấy URL từ tài liệu Google Drive.");
		}
	};

	return viewSurvey !== -1 ? (
		<View className="justify-between">
			<ViewSurveysGVien params={params} survey={chosenSurvey} />
			<View className="justify-center items-center bg-white h-[9%] border-t border-gray-400">
				<TouchableOpacity className="bg-red-600 rounded-lg p-2 w-24" onPress={() => setViewSurvey(-1)}>
					<Text className="self-center text-white font-bold">Đóng</Text>
				</TouchableOpacity>
			</View>
		</View>
	) : (
		<View>
			<View className="flex flex-row justify-between p-3">
				{["Sắp tới", "Quá hạn"].map((label, index) => (
					<TouchableOpacity
						key={index}
						className={`flex-1 mx-2 rounded-lg h-6 justify-center ${
							mode === index ? "bg-red-600" : "bg-gray-300"
						}`}
						onPress={() => setModeBtn(index)}
					>
						<Text className={`text-center ${mode === index ? "text-white" : "text-black"}`}>{label}</Text>
					</TouchableOpacity>
				))}
			</View>

			<View>
				{mode === 0 && (
					<FlatList
						data={sortedDates_upcoming}
						keyExtractor={(item) => item}
						renderItem={({ item }) => (
							<View className="mb-2">
								<Text className="text-lg ml-3 mb-2 font-bold">{extractDate(item)}</Text>
								{grouped_upcoming[item].map((survey, index) => (
									<TouchableOpacity
										key={index}
										className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row"
										onPress={() => handleOpenSurvey(index, survey)}
									>
										<View>
											<Text className="text-base">{survey.title}</Text>
											<Text className="text-s mt-1 italic">
												Đóng lúc {extractTime(survey.deadline)}
											</Text>
										</View>
										<TouchableOpacity
											onPress={() => {
												openDriveDocument(survey.file_url);
												//setEachFileName(survey.id);
											}}
											className="self-center"
										>
											<Text className="text-blue-500 underline text-base">File đính kèm</Text>
										</TouchableOpacity>
									</TouchableOpacity>
								))}
							</View>
						)}
					/>
				)}

				{mode === 1 && (
					<FlatList
						data={sortedDates_pastdue}
						keyExtractor={(item) => item}
						renderItem={({ item }) => (
							<View className="mb-2">
								<Text className="text-lg ml-3 mb-2 font-bold">{extractDate(item)}</Text>
								{grouped_pastdue[item].map((survey, index) => (
									<TouchableOpacity
										key={index}
										className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row"
										onPress={() => handleOpenSurvey(index, survey)}
									>
										<View>
											<Text className="text-base">{survey.title}</Text>
											<Text className="text-s mt-1 italic">
												Đóng lúc {extractTime(survey.deadline)}
											</Text>
										</View>
										<Text className="self-center text-base">{survey.grade}</Text>
										<TouchableOpacity
											onPress={() => {
												openDriveDocument(survey.file_url);
												//setEachFileName(survey.id);
											}}
											className="self-center"
										>
											<Text className="text-blue-500 underline text-base">File đính kèm</Text>
										</TouchableOpacity>
									</TouchableOpacity>
								))}
							</View>
						)}
					/>
				)}
			</View>
		</View>
	);
};

export default ClassSurveysGVien;
