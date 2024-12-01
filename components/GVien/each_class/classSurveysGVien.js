import { Modal, Text, View, FlatList } from "react-native";
import React, { Component, useState } from "react";
import { TouchableOpacity } from "react-native";
import ViewSurveysGVien from "./viewSurveysGVien";
import api from "../../api";
import { useEffect } from "react";
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { Platform } from "react-native";


const ClassSurveysGVien = ({ route }) => {

	const { params } = route;
	console.log();
	console.log("ClassSurvey");
	// console.log(params);

	// 0 - upcoming, 1 - past due
	const [mode, setModeBtn] = useState(0);

	const today = new Date()
	// console.log("Today: ", today)
	const [SURVEYS, setSURVEYS] = useState([]);
	const [chosenSurvey, setChosenSurvey] = useState(null);
	const token = params.token;
	const class_id = params.class.id;
	console.log(params)

	// let SURVEYS = [];

	let grouped_upcoming = {};
	let grouped_pastdue = {};
	let sortedDates_upcoming = [];
	let sortedDates_pastdue = [];

	useEffect(() => {
		async function fetchSurveys() {
			try {
				const response = await api.post('/it5023e/get_all_surveys', {
					token: token,
					class_id: class_id,
				});

				if (response.data.meta.code === "1000") {
					const fetchedSurveys = response.data.data.map((item) => ({
						id: item.id,
						title: item.title,
						description: item.description,
						lecturer_id: item.lecturer_id,
						deadline: item.deadline,
						file_url: item.file_url,
						class_id: item.class_id
					}));
					setSURVEYS(fetchedSurveys);
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

		fetchSurveys();
	}, [mode]);

	const parseDate = (dateString) => new Date(dateString);

	console.log(SURVEYS);

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
		const parts = isoDateString.split('T');
		const timePart = parts[0];
		return timePart;
	}

	function extractTime(isoDateString) {
		const parts = isoDateString.split('T');
		const timePart = parts[1].split(':');
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

	const [modalVisible, setModalVisible] = useState(false);
	const [fileUrl, setFileUrl] = useState('');
	const [eachUrl, setEachUrl] = useState('');
	const [eachFileName, setEachFileName] = useState('');

	const openModal = (url) => {
		setEachUrl(url);
		setFileUrl(url);
		setModalVisible(true);
	  };

	//Copy to clipboard
	const copyToClipboard = async () => {
		// Sao chép URL vào bộ nhớ tạm
		await Clipboard.setStringAsync(fileUrl);
		alert('URL đã được sao chép vào bộ nhớ tạm');
	  };
	  //Download
	const downloadFile = async () => {
	const fileUrl = 'https://drive.google.com/uc?id=1Jbd7cfFoiFIFunilKn7NqW7eLcmmnXle&export=download';
	const fileUri = `${FileSystem.documentDirectory}1.png`; // Đường dẫn lưu file
	
	try {
		const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);
		console.log('File downloaded to:', uri);
		alert('File đã tải xuống thành công!');
	} catch (error) {
		console.error('Error downloading file:', error);
		alert('Lỗi khi tải file!');
	}
	};

	// Hàm chuyển URI Google Drive sang URI tải xuống
	function convertURL(driveUri) {
		// Sử dụng biểu thức chính quy để lấy fileId từ URI
		const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
		const matches = driveUri.match(regex);
		
		if (matches && matches[1]) {
		const fileId = matches[1];
		// Tạo URI tải xuống
		const downloadUri = `https://drive.google.com/uc?export=download&id=${fileId}`;
		return downloadUri;
		} else {
		throw new Error('Không thể lấy fileId từ URI Google Drive');
		}
	}

	const downloadFromUrl = async () => {
		console.log("file name:...",eachFileName);
		const filename = `${eachFileName}.pdf`;
		const result = await FileSystem.downloadAsync(
		  convertURL(eachUrl),
		  FileSystem.documentDirectory + filename
		);
		console.log("Saving...", result.uri);
		console.log(eachUrl);
	
		save(result.uri);
	  };
	
	  
	//   const save = async (uri, filename, mimetype) => {
	// 	if (Platform.OS === "android") {
	// 	  const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
	// 	  if (permissions.granted) {
	// 		const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
	// 		await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
	// 		  .then(async (uri) => {
	// 			await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
	// 		  })
	// 		  .catch(e => console.log(e));
	// 	  } else {
	// 		shareAsync(uri);
	// 	  }
	// 	} else {
	// 	  shareAsync(uri);
	// 	}
	//   };
	const save = (uri) =>{
		shareAsync(uri);
	};

	// console.log(mode);
	return viewSurvey !== -1 ? (
		<View className="justify-between">
			<ViewSurveysGVien token={token} survey={chosenSurvey}/>
			<View className="justify-center items-center bg-white h-[9%] border-t border-gray-400">
				<TouchableOpacity className="bg-red-600 rounded-lg p-2 w-24" onPress={() => setViewSurvey(-1)}>
					<Text className="self-center text-white font-bold">Đóng</Text>
				</TouchableOpacity>
			</View>
		</View>
	) : (

		<View>
			<View className="flex flex-row justify-between p-3">
				{['Sắp tới', 'Quá hạn'].map((label, index) => (
					<TouchableOpacity
						key={index}
						className={`flex-1 mx-2 rounded-lg h-6 justify-center ${mode === index ? 'bg-red-600' : 'bg-gray-300'}`}
						onPress={() => setModeBtn(index)}>
						<Text className={`text-center ${mode === index ? 'text-white' : 'text-black'}`}>{label}</Text>
					</TouchableOpacity>
				))}
			</View>

			<View>

				{mode === 0 && <FlatList
					data={sortedDates_upcoming}

					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<View className="mb-2">
							<Text className="text-lg ml-3 mb-2 font-bold">{extractDate(item)}</Text>
							{grouped_upcoming[item].map((survey, index) => (
								<TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row" onPress={() => handleOpenSurvey(index, survey)}>
									<View>
										<Text className="text-base">{survey.title}</Text>
										<Text className="text-s mt-1 italic">Đóng lúc {extractTime(survey.deadline)}</Text>
									</View>
									<TouchableOpacity
									onPress={() => {
										openModal(survey.file_url);
										setEachFileName(survey.id); 
									  }}
									className="self-center"
									>
									<Text className="text-blue-500 underline text-base">File đính kèm</Text>
									</TouchableOpacity>
								</TouchableOpacity>
							))}
						</View>
					)}
				/>}

				{mode === 1 && <FlatList
					data={sortedDates_pastdue}

					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<View className="mb-2">
							<Text className="text-lg ml-3 mb-2 font-bold">{extractDate(item)}</Text>
							{grouped_pastdue[item].map((survey, index) => (
								<TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row" onPress={() => handleOpenSurvey(index, survey)}>
									<View>
										<Text className="text-base">{survey.title}</Text>
										<Text className="text-s mt-1 italic">Đóng lúc {extractTime(survey.deadline)}</Text>
									</View>
									<Text className="self-center text-base">{survey.grade}</Text>
									<TouchableOpacity
									onPress={() => {
										openModal(survey.file_url);
										setEachFileName(survey.id); 
									  }}
									className="self-center"
									>
									<Text className="text-blue-500 underline text-base">File đính kèm</Text>
									</TouchableOpacity>
								</TouchableOpacity>
							))}
						</View>
					)}
				/>}
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
				<View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
					<Text style={{ fontSize: 18, marginBottom: 10 }}>Tệp đính kèm</Text>
					<Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{fileUrl}</Text>

					{/* Nút sao chép URL */}
					<TouchableOpacity
					onPress={copyToClipboard}
					style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
					>
					<Text style={{ color: 'white', textAlign: 'center' }}>Sao chép URL</Text>
					</TouchableOpacity>

					{/* Nút đóng Modal */}
					<TouchableOpacity
					onPress={() => setModalVisible(false)}
					style={{ backgroundColor: 'gray', padding: 10, borderRadius: 5, marginTop: 10 }}
					>
					<Text style={{ color: 'white', textAlign: 'center' }}>Đóng</Text>
					</TouchableOpacity>

					{/* Nút tải */}
					<TouchableOpacity
					onPress={downloadFromUrl}
					style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
					>
					<Text style={{ color: 'white', textAlign: 'center' }}>Tải xuống</Text>
					</TouchableOpacity>
				</View>
				</View>
			</Modal>

		</View>
	)
};

export default ClassSurveysGVien;
