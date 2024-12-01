import { Modal, Text, View, FlatList } from "react-native";
import React, { Component, useState } from "react";
import { TouchableOpacity } from "react-native";
import ViewSurveysGVien from "./viewSurveysGVien";
import api from "../../api";
import { useEffect } from "react";
import { Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';

const ClassSurveysGVien = ({ route }) => {

	const { params } = route;
	console.log("ClassSurvey");
	console.log(params);

	function viewAssignment(name) {
		console.log("Viewing " + name)
	}

	// 0 - upcoming, 1 - past due, 2 - completed
	const [mode, setModeBtn] = useState(0);

	const today = new Date()
	// console.log("Today: ", today)
	const [assignment, setAssignments] = useState([]);
	const token = params.token;
	const class_id = params.class.id;


	let grouped_upcoming = {};
	let grouped_pastdue = {};
	let grouped_completed = {};

	useEffect(() => {
		async function fetchAssignments() {
		try {
			const response = await api.post('/it5023e/get_all_surveys', {
			token: token,
			class_id: class_id,
			});

			if (response.data.meta.code === "1000") {
			const data = response.data.data;
			setAssignments(data);
			groupAssignments(data);
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

		fetchAssignments();
	}, []);

	const parseDate = (dateString) => new Date(dateString);

	console.log(assignment)
	const [groupedUpcoming, setGroupedUpcoming] = useState({});
	const [groupedPastdue, setGroupedPastdue] = useState({});

	const copyToClipboard = async () => {
		// Sao chép URL vào bộ nhớ tạm
		await Clipboard.setStringAsync(fileUrl);
		alert('URL đã được sao chép vào bộ nhớ tạm');
	  };

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
	  


	function groupAssignments(data) {
		let upcoming = {};
		let pastdue = {};
	  
		data.forEach((assignment) => {
		  const deadline = parseDate(assignment.deadline);
	  
		  if (deadline > today) {
			if (!upcoming[assignment.deadline]) {
			  upcoming[assignment.deadline] = [];
			}
			upcoming[assignment.deadline].push(assignment);
		  } else {
			if (!pastdue[assignment.deadline]) {
			  pastdue[assignment.deadline] = [];
			}
			pastdue[assignment.deadline].push(assignment);
		  }
		});

		setGroupedUpcoming(upcoming);
		setGroupedPastdue(pastdue);
	  }
	
	

	const [viewSurvey, setViewSurvey] = useState(-1);

	const [modalVisible, setModalVisible] = useState(false);
	const [fileUrl, setFileUrl] = useState('');
	const [viewMode, setViewMode] = useState("web"); // "web" hoặc "download"

	

	const openModal = (url) => {
		setFileUrl(url);
		setModalVisible(true);
	  };



	console.log("Upcoming:", groupedUpcoming);
	console.log("Past Due:", groupedPastdue);

	return viewSurvey !== -1 ? (
		<View className="justify-between">
			<ViewSurveysGVien idSurvey={viewSurvey} />
			<View className="justify-center items-center bg-white h-[9%] border-t border-gray-400">
				<TouchableOpacity className="bg-red-600 rounded-lg p-2 w-24" onPress={() => setViewSurvey(-1)}>
					<Text className="self-center text-white font-bold">Đóng</Text>
				</TouchableOpacity>
			</View>
		</View>
	) : (
		// return (
		<View>
			<View className="flex flex-row justify-between p-3">
			{['Sắp tới', 'Quá hạn'].map((label, index) => (
			<TouchableOpacity
				key={index}
				className={`flex-1 mx-2 rounded-lg h-6 justify-center ${mode === index ? 'bg-red-600' : 'bg-gray-300'}`}
				onPress={() => setModeBtn(index)}
			>
				<Text className={`text-center ${mode === index ? 'text-white' : 'text-black'}`}>{label}</Text>
			</TouchableOpacity>
			))}

			</View>

			<View>

			{mode === 0 && (
			<FlatList
				data={Object.keys(groupedUpcoming)}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
				<View className="mb-2">
					<Text className="text-lg ml-3 mb-2 font-bold">{item}</Text>
					{groupedUpcoming[item].map((assignment, index) => (
					<TouchableOpacity
					key={index}
					className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row"
					onPress={() => setViewSurvey(index)}
				  >
					<View>
					  <Text className="text-base font-bold">{assignment.title}</Text>
					  <Text className="text-s mt-1 italic">Hạn: {assignment.deadline}</Text>
					</View>
				  
					{/* Thêm phần này để gọi openModal */}
					<TouchableOpacity
					  onPress={() => openModal(assignment.file_url)}
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
				data={Object.keys(groupedPastdue)}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
				<View className="mb-2">
					<Text className="text-lg ml-3 mb-2 font-bold">{item}</Text>
					{groupedPastdue[item].map((assignment, index) => (
					<TouchableOpacity
					key={index}
					className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row"
					onPress={() => setViewSurvey(index)}
				>
					<View>
					<Text className="text-base">{assignment.title}</Text>
					<Text className="text-s mt-1 italic">Hạn: {assignment.deadline}</Text>
					</View>
					{/* Thêm phần này để gọi openModal */}
					<TouchableOpacity
					  onPress={() => openModal(assignment.file_url)}
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
              onPress={downloadFile}
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
