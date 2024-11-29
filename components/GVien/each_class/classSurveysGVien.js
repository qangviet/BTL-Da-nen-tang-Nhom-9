import { Text, View, FlatList } from "react-native";
import React, { Component, useState } from "react";
import { TouchableOpacity } from "react-native";
import ViewSurveysGVien from "./viewSurveysGVien";
import api from "../../api";
import { useEffect } from "react";

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

  function groupAssignments(assignment) {
    assignment.forEach((assignment) => {
      const deadline = parseDate(assignment.deadline);
      if (deadline > today) {
        if (!grouped_upcoming[assignment.deadline]) {
          grouped_upcoming[assignment.deadline] = [];
        }
        grouped_upcoming[assignment.deadline].push(assignment);
      } else if (deadline < today) {
        if (!grouped_pastdue[assignment.deadline]) {
          grouped_pastdue[assignment.deadline] = [];
        }
        grouped_pastdue[assignment.deadline].push(assignment);
      } else {
        if (!grouped_completed[assignment.deadline]) {
          grouped_completed[assignment.deadline] = [];
        }
        grouped_completed[assignment.deadline].push(assignment);
      }
    });

    console.log("Upcoming:", grouped_upcoming);
    console.log("Past Due:", grouped_pastdue);
    console.log("Completed:", grouped_completed);
  }


	// ASSIGNMENTs.forEach((assignment) => {
	// 	const date = assignment.end;
	// 	if (assignment.status == 'Completed') {
	// 		if (!grouped_completed[date]) {
	// 			grouped_completed[date] = [];
	// 		}
	// 		grouped_completed[date].push(assignment);
	// 	} else if (new parseDate(date) > today) {
	// 		if (!grouped_upcoming[date]) {
	// 			grouped_upcoming[date] = [];
	// 		}
	// 		grouped_upcoming[date].push(assignment);
	// 	} else if (new parseDate(date) < today) {
	// 		if (!grouped_pastdue[date]) {
	// 			grouped_pastdue[date] = [];
	// 		}
	// 		grouped_pastdue[date].push(assignment);
	// 	}

	// });

	const sortedDates_upcoming = Object.keys(grouped_upcoming).sort((a, b) => new parseDate(b) - new parseDate(a));
	const sortedDates_pastdue = Object.keys(grouped_pastdue).sort((a, b) => new parseDate(b) - new parseDate(a));
	const sortedDates_completed = Object.keys(grouped_completed).sort((a, b) => new parseDate(b) - new parseDate(a));

	const [viewSurvey, setViewSurvey] = useState(-1);

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
				{['Sắp tới', 'Quá hạn', 'Đã hoàn thành'].map((label, index) => (
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
							<Text className="text-lg ml-3 mb-2 font-bold">{item}</Text>
							{grouped_upcoming[item].map((assignment, index) => (
								<TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row" onPress={() => setViewSurvey(index)}>
									<View>
										<Text className="text-base">{assignment.name}</Text>
										<Text className="text-s mt-1 italic">Đóng lúc 11h59</Text>
									</View>
									<Text className="self-center text-base">{assignment.grade}</Text>
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
							<Text className="text-lg ml-3 mb-2 font-bold">{item}</Text>
							{grouped_pastdue[item].map((assignment, index) => (
								<TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row">
									<View>
										<Text className="text-base">{assignment.name}</Text>
										<Text className="text-s mt-1 italic">Đóng lúc 11h59</Text>
									</View>
									<Text className="self-center text-base">{assignment.grade}</Text>
								</TouchableOpacity>
							))}
						</View>
					)}
				/>}

				{mode === 2 && <FlatList
					data={sortedDates_completed}

					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<View className="mb-2">
							<Text className="text-lg ml-3 mb-2 font-bold">{item}</Text>
							{grouped_completed[item].map((assignment, index) => (
								<TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row">
									<View>
										<Text className="text-base">{assignment.name}</Text>
										<Text className="text-s mt-1 italic">Đóng lúc 11h59</Text>
									</View>
									<Text className="self-center text-base">{assignment.grade}</Text>
								</TouchableOpacity>
							))}
						</View>
					)}
				/>}

			</View>

		</View>
	)
};

export default ClassSurveysGVien;
