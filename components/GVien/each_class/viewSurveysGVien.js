import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";

import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

import { navigate } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import api from "../../api";
import axios from "axios";
import { Linking } from 'react-native';

const ViewSurveysGVien = ({ params, survey }) => {

	console.log(">>> Viewing responses of: ", survey);
	console.log("Param: ", params);

	const dispatch = useDispatch();

	const [RESPONSES, setRESPONSES] = useState([]);

	const [tempGrade, setTempGrade] = useState(null);

	const [studentId, setStudentId] = useState("");

	async function fetchResponses() {
		try {
			const response = await api.post('/it5023e/get_survey_response', {
				token: params.token,
				survey_id: survey.id,
			});

			if (response.data.meta.code === "1000") {
				const fetchedResponses = response.data.data.map((item) => ({
					id: item.id,
					survey_id: item.assignment_id,
					submission_time: item.submission_time,
					grade: item.grade,
					file_url: item.file_url,
					text_response: item.text_response,
					student_id: item.student_account.student_id,
					account_id: item.student_account.account_id,
					student_name: item.student_account.first_name + " " + item.student_account.last_name
				}));
				setRESPONSES(fetchedResponses);
				
			} else {
				console.error('API error:', response.data.meta.message);
			}
		} catch (error) {
			console.error('Network error:', error);
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
	}
	useEffect(() => {
		fetchResponses();
	}, [survey]);

	console.log("Responses: ", RESPONSES);

	const [viewSubmitted, setViewSubmitted] = useState(-1);
	const openModalViewSubmitted = (index) => {
		setViewSubmitted(index);
		setTempGrade(RESPONSES[index].grade);
		setStudentId(RESPONSES[index].account_id);
		// console.log(RESPONSES[index].grade);
	};
	const closeModalSubmitted = () => {
		setViewSubmitted(-1);
		setTempGrade(null);
	};

	//Xem bai lam	
	const openMaterial = (url) => {
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

	function goEditSurvey() {
		dispatch(
			navigate({
				screen: "EditSurveyGVien",
				params: {
					token: params.token,
					survey: survey
				}
			})
		);
	}

	function formateTime(isoDateString) {
		const parts = isoDateString.split('T');
		const datePart = parts[0]
		const timePart = parts[1].split(':');
		const hours = timePart[0];
		const minutes = timePart[1];
		const formattedTime = `${datePart} ${hours}h${minutes}`;
		return formattedTime;
	}

	async function gradingResponse(cur_response) {
		console.log(tempGrade);
		// console.log(cur_response.id);
		if (0 <= tempGrade && tempGrade <= 10)
			{
				const message = `Bài tập ${survey.title} - Lớp ${params.class.name} - Điểm : ${tempGrade}/10`
				console.log("Diem tam thoi:...", tempGrade);
				console.log("Student Id:...", studentId);
				console.log("Message:...", message);
				console.log("Token:", params.token)
				try {
					const response = await axios.post('http://157.66.24.126:8080/it5023e/send_notification', {
						token: params.token,
						message: message,
						toUser: studentId,
						type: "ASSIGNMENT_GRADE"
					  }, {
						headers: {
						  'Content-Type': 'multipart/form-data',
						}
					  });
		
					if (response.data.meta.code === "1000") {
						console.log("Đã chấm điểm thành công!...")
					} else {
						console.error('API error:', response.data.meta.message);
					}
				} catch (error) {
					console.error('Network error:', error);
					console.error("API call failed: ", error);
					console.error("Error fetching class list:", error);
					console.error("Error Data:", error.response.data);
					console.error("Error Status:", error.response.status);
				}
	
				
			} else alert("Điểm phải là số từ 0 đến 10!");

		try {
			const response = await api.post('/it5023e/get_survey_response', {
				token: params.token,
				survey_id: survey.id,
				grade: {
					score: tempGrade,
					submission_id: cur_response.id
				}
			});

			if (response.data.meta.code === "1000") {
				closeModalSubmitted();
				fetchResponses();
			} else {
				console.error('API error:', response.data.meta.message);
			}
		} catch (error) {
			alert("Điểm phải là số từ 0 đến 10!");
			console.error('Network error:', error);
			console.error("API call failed: ", error);
			console.error("Error fetching class list:", error);
			console.error("Error Data:", error.response.data);
			console.error("Error Status:", error.response.status);
		}
		
	
	}

	return (
		<View className="h-[91%]">
			<View>
				<View className="bg-slate-500 pt-3 px-4 gap-y-1 shadow-lg pb-2 flex flex-row border-b-2 border-gray-300">
					<View>
						<Text className="text-2xl font-extrabold text-white">{survey.title}</Text>
						<View className="flex flex-row items-center gap-x-1 text-white">
							<Text className="text-lg font-bold w-20 text-white">Hạn nộp: </Text>
							<Text className="text-lg text-white">{formateTime(survey.deadline)}</Text>
						</View>
					</View>
					<View className="flex justify-center items-center w-40">
						<TouchableOpacity className="px-2 py-1" onPress={() => goEditSurvey()}>
							<Text className="italic underline text-lg text-white">Chỉnh sửa</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View className="py-[1px]">
					<View className="border-b border-gray-700">
						<Text className="px-4 text-lg py-2 font-bold bg-white">
							Bài làm của sinh viên ({RESPONSES.length})
						</Text>
					</View>
				</View>
			</View>
			<ScrollView>
				<ScrollView horizontal={true}>
					<View className="bg-white">
						{RESPONSES.map((item, index) => (
							<View
								key={index}
								//onPress={() => openModalViewSubmitted(index)}
								className="flex flex-row items-center border-b border-gray-400"
							>
								{/* <View>
									<Text className="w-20 px-3 py-2 text-base ">{item.student_id}</Text>
								</View> */}
								<Text className="w-[220px] px-3 py-2 text-base border-l border-r border-slate-400">
									{item.student_id} - {item.student_name}
								</Text>
								<Text className="w-[100px] px-3 py-2 text-base border-r border-slate-400">
									{item.grade == null ? "-" : item.grade} / 10
								</Text>
								<TouchableOpacity
									className="px-3 flex justify-end w-20"

									onPress={() => openModalViewSubmitted(index)}
								>
									<Text className="text-blue-600 underline text-base font-medium">
										Xem
									</Text>
								</TouchableOpacity>
							</View>
						))}
					</View>
				</ScrollView>
			</ScrollView>
			{viewSubmitted !== -1 && (
				<Modal isVisible={viewSubmitted !== -1} onBackdropPress={closeModalSubmitted}>
					<View className="mx-2 bg-gray-200 rounded-lg">
						<View className="flex flex-row justify-end items-center mt-3 px-3">
							<TouchableOpacity onPress={() => closeModalSubmitted()} className="h-9">
								<Ionicons
									name="close-outline"
									size={30}
									color="gray"
									className="mt-2 mr-3"
								/>
							</TouchableOpacity>
						</View>
						<View className="border-t mt-1 border-gray-400"></View>
						<View>
							<View className="mx-4 mt-3">
								<Text className="text-xl mt-1 pl-2 font-semibold">
									{RESPONSES[viewSubmitted].student_name} -{" "}
									{RESPONSES[viewSubmitted].student_id}
								</Text>
								<Text className="text-base mt-4 px-2">
									{RESPONSES[viewSubmitted].text_response}
								</Text>
							</View>
							<View className="flex flex-row px-4 mt-3">
								<TouchableOpacity className="px-2 py-2" onPress={() => openMaterial(RESPONSES[viewSubmitted].file_url)}>
									<Text className="underline text-blue-600 text-base textlg">
										{RESPONSES[viewSubmitted].file_url}
									</Text>
								</TouchableOpacity>
							</View>
							<View className="flex flex-row justify-center pt-8 gap-x-1">
								<Text className="text-lg">Điểm:  </Text>
								<TextInput className="text-sm px-3 border border-gray-600" defaultValue={(RESPONSES[viewSubmitted].grade != null ? RESPONSES[viewSubmitted].grade.toString() : "")} onChangeText={(text) => setTempGrade(text)}/>
								<Text className="text-lg">
									/ 10
								</Text>
							</View>
							<TouchableOpacity className="px-4 py-2 rounded-lg bg-red-600 w-[30%] mx-auto mt-10 mb-10" onPress={() => gradingResponse(RESPONSES[viewSubmitted])}>
								<Text className="text-white text-lg font-bold self-center">
									Save
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}
		</View>
	);
};

export default ViewSurveysGVien;
