import React, { useState } from "react";
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

const ViewSurveysGVien = ({ idSurvey }) => {

	const navigation = useNavigation();
	const dispatch = useDispatch();

	// Fetch data
	const data = {
		id: "1",
		name: "Bài tập Đa tảng nền",
		description: "des",
		start: "4/11/2024 - 12:00",
		end: "5/11/2024 - 20:00",
		file: "",
		submitted: [
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
			{
				mssv: "20215515",
				name: "Trương Quang Việt",
				grade: "",
				maxGrade: "10",
				description: "Em xin nộp bài ạ",
				file: "file_nop_bai.pdf",
			},
		],
	};

	const [viewSubmitted, setViewSubmitted] = useState(-1);
	const openModalViewSubmitted = (index) => {
		setViewSubmitted(index);
	};
	const closeModalSubmitted = () => {
		setViewSubmitted(-1);
	};

	function goEditSurvey() {
		dispatch(
			navigate({
				screen: "EditSurveyGVien",
				params: {
					survey: data
				}
			})
		);
	}

	return (
		<View className="h-[91%]">
			<View>
				<View className="bg-slate-500 pt-3 px-4 gap-y-1 shadow-lg pb-2 flex flex-row border-b-2 border-gray-300">
					<View>
						<Text className="text-2xl font-extrabold text-white">{data.name}</Text>
						<View className="flex flex-row items-center gap-x-1">
							<Text className="text-lg font-bold w-20 text-white">Bắt đầu: </Text>
							<Text className="text-lg text-white">{data.start}</Text>
						</View>
						<View className="flex flex-row items-center gap-x-1 text-white">
							<Text className="text-lg font-bold w-20 text-white">Kết thúc: </Text>
							<Text className="text-lg text-white">{data.start}</Text>
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
							Bài làm của sinh viên ({data.submitted.length})
						</Text>
					</View>
				</View>
			</View>
			<ScrollView>
				<ScrollView horizontal={true}>
					<View className="bg-white">
						{data.submitted.map((item, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => openModalViewSubmitted(index)}
								className="flex flex-row items-center border-b border-gray-400"
							>
								<View>
									<Text className="w-28 px-3 py-2 text-base ">{item.mssv}</Text>
								</View>
								<Text className="w-[240px] px-3 py-2 text-base border-l border-r border-slate-400">
									{item.name}
								</Text>
								<Text className="w-[100px] px-3 py-2 text-base border-r border-slate-400">
									{item.grade === "" ? "-" : item.grade} / {item.maxGrade}
								</Text>
								<TouchableOpacity
									className="px-3 flex justify-end w-20"
									onPress={() => openModalViewSubmitted(index)}
								>
									<Text className="text-blue-600 underline text-base font-medium">
										Xem
									</Text>
								</TouchableOpacity>
							</TouchableOpacity>
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
						<View className="border-t border-gray-400"></View>
						<View>
							<View className="mx-4">
								<Text className="text-xl mt-1 pl-2 font-semibold">
									{data.submitted[viewSubmitted].name} -{" "}
									{data.submitted[viewSubmitted].mssv}
								</Text>
								<Text className="text-base mt-4 px-2">
									{data.submitted[viewSubmitted].description}
								</Text>
							</View>
							<View className="flex flex-row px-4 mt-5">
								<TouchableOpacity className="px-2 py-2">
									<Text className="underline text-blue-600 text-base textlg">
										{data.submitted[viewSubmitted].file}
									</Text>
								</TouchableOpacity>
							</View>
							<View className="flex flex-row justify-center pt-8 gap-x-1">
								{data.submitted[viewSubmitted].grade === "" ? (
									<>
										<Text className="text-lg">Điểm:</Text>
										<View className="border border-gray-600">
											<TextInput className="text-lg px-2" />
										</View>
										<Text className="text-lg">
											/{data.submitted[viewSubmitted].maxGrade}
										</Text>
									</>
								) : (
									<Text className="text-lg mt-4 pl-2 font-semibold">
										Điểm: {data.submitted[viewSubmitted].grade} /{" "}
										{data.submitted[viewSubmitted].maxGrade}
									</Text>
								)}
							</View>
							<TouchableOpacity className="px-4 py-2 rounded-lg bg-red-600 w-[30%] mx-auto mt-10 mb-10">
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
