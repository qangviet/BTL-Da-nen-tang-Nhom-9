import { Text, View, FlatList } from 'react-native'
import React, { Component, useState } from 'react'
import { TouchableOpacity } from 'react-native';

import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import api from "../../api";
import { useEffect } from "react";
import { Linking } from 'react-native';

const ClassSurveysSVien = ({ route }) => {

      const { params } = route;

      console.log("Survey params.....",params)

      const dispatch = useDispatch();
     
      const navigation = useReactNavigation();
    //   const currentScreen = useSelector((state) => state.navigation.currentScreen);

    //   useEffect(() => {
    //         fetchCompletedSurveys();
    //     }, [currentScreen]);

      function viewAssignment(name) {
            console.log("Viewing " + name)
      }

      // 0 - upcoming, 1 - past due, 2 - completed
      const [mode, setModeBtn] = useState(0);

      function extractDate(isoDateString) {
        const parts = isoDateString.split('T');
		return parts[0];
    }
    
      function extractTime(isoDateString) {
		const parts = isoDateString.split('T');
		const timePart = parts[1].split(':');
		const hours = timePart[0];
		const minutes = timePart[1];
		const formattedTime = `${hours}h${minutes}`;
		return formattedTime;
	}

      const today = new Date()
      // console.log("Today: ", today)


      const [grouped_upcoming, setUpcoming] = useState({});
      const [grouped_pastdue, setPastDue] = useState({});
      const [grouped_completed, setCompleted] = useState({});

      const parseDate = (dateString) => {
            return new Date(dateString); // ISO-8601 compliant
        };
        
      const fetchCompletedSurveys = async () => {
            try {
                const token = params.token;
                const classId = params.classInfo.id;

                const response = await api.post("/it5023e/get_student_assignments", {
                  token: token,
                  class_id: classId,
                  type: "COMPLETED",
            });

            if (response.data.meta.code === "1000") {
                  console.log("Completed Response: ", response.data)
                  setCompleted(response.data.data);
            } else {
                  console.error("Error fetching classes: ", response.data.meta.message);
            }
            } catch (error) {
                console.error("Failed to fetch assignments: ", error);
            }
        };

        const fetchUpcomingSurveys = async () => {
            try {
                const token = params.token;
                const classId = params.classInfo.id;

                const response = await api.post("/it5023e/get_student_assignments", {
                  token: token,
                  class_id: classId,
                  type: "UPCOMING",
            });

            if (response.data.meta.code === "1000") {
                  console.log("Upcoming Response: ", response.data)
                  setUpcoming(response.data.data);
            } else {
                  console.error("Error fetching classes: ", response.data.meta.message);
            }
            } catch (error) {
                console.error("Failed to fetch assignments: ", error);
            }
        };

        const fetchPastDueSurveys = async () => {
            try {
                const token = params.token;
                const classId = params.classInfo.id;

                const response = await api.post("/it5023e/get_student_assignments", {
                  token: token,
                  class_id: classId,
                  type: "PASS_DUE",
            });

            if (response.data.meta.code === "1000") {
                  console.log("Past due: ", response.data)
                  setPastDue(response.data.data);
            } else {
                  console.error("Error fetching classes: ", response.data.meta.message);
            }
            } catch (error) {
                console.error("Failed to fetch assignments: ", error);
            }
        };
      // Gọi API mỗi khi vào tab này
      useEffect(() => {
            fetchCompletedSurveys();
            fetchUpcomingSurveys();
            fetchPastDueSurveys();
      }, [mode]);

      
      // const parseDate = (dateString) => {
      //       const [day, month] = dateString.split(' thg ').map(Number);
      //       const year = new Date().getFullYear();
      //       // console.log(new Date(year, month - 1, day + 1))
      //       return new Date(year, month - 1, day + 1);
      // };

      console.log("Upcoming.....", grouped_upcoming[0]);
      console.log("Pastdue.....", grouped_pastdue[0]);
      console.log("Completed.....", grouped_completed[0]);
      console.log("Test..............",extractDate("2024-11-30T21:05:00")); // Output: "2024-11-30"


      const sortedDates_upcoming = Object.keys(grouped_upcoming).sort((a, b) => new parseDate(b) - new parseDate(a));
      const sortedDates_pastdue = Object.keys(grouped_pastdue).sort((a, b) => new parseDate(b) - new parseDate(a));
      const sortedDates_completed = Object.keys(grouped_completed).sort((a, b) => new parseDate(b) - new parseDate(a));

      function goSubmitSurvey(item, mode) {
            dispatch(
                  navigate({
                        screen: "ClassSubmitSurveysSVien",
                        params: {
                              assignment: item,
                              mode: mode, // only mode == 0 (upcoming) is submitable
                              token: params.token
                        },
                  })
            );
      }
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

      return (
            <View>
                <View className="flex flex-row justify-between p-3">
                    {['Sắp tới', 'Quá hạn', 'Đã hoàn thành'].map((label, index) => (
                        <TouchableOpacity
                            key={index}
                            className={`flex-1 mx-2 rounded-lg h-6 justify-center ${mode === index ? 'bg-red-600' : 'bg-gray-300'}`}
                            onPress={() => {
                                if (mode === index) {
                                    // Nếu đang ở tab hiện tại, gọi API tương ứng
                                    if (index === 0) fetchUpcomingSurveys();
                                    if (index === 1) fetchPastDueSurveys();
                                    if (index === 2) fetchCompletedSurveys();
                                } else {
                                    // Đổi tab
                                    setModeBtn(index);
                                }
                            }}>
                            <Text className={`text-center ${mode === index ? 'text-white' : 'text-black'}`}>{label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
        
                <View>
                    {mode === 0 && (
                        <FlatList
                            data={Object.values(grouped_upcoming)} // Sử dụng dữ liệu trực tiếp
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (  
                                <View>
                                <Text className="text-lg ml-3 mb-2 font-bold">{extractDate(item.deadline)}</Text>  
                                    <TouchableOpacity
                                        className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row"
                                        onPress={() => goSubmitSurvey(item, mode)}>
                                        <View>
                                            <Text className="text-base">{item.title}</Text>
                                            <Text className="text-s mt-1 italic">Đóng lúc {extractTime(item.deadline)}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                openDriveDocument(item.file_url);
                                                //setEachFileName(survey.id); 
                                                }}
                                            className="self-center"
                                            >
                                            <Text className="text-blue-500 underline text-base">File đính kèm</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
        
                    {mode === 1 && (
                        <FlatList
                            data={Object.values(grouped_pastdue)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Text className="text-lg ml-3 mb-2 font-bold">{extractDate(item.deadline)}</Text>  
                                    <TouchableOpacity
                                        className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row"
                                        onPress={() => goSubmitSurvey(item, mode)}>
                                        <View>
                                            <Text className="text-base">{item.title}</Text>
                                            <Text className="text-s mt-1 italic">Đóng lúc {extractTime(item.deadline)}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                openDriveDocument(item.file_url);
                                                //setEachFileName(survey.id); 
                                                }}
                                            className="self-center"
                                            >
                                            <Text className="text-blue-500 underline text-base">File đính kèm</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
        
                    {mode === 2 && (
                        <FlatList
                            data={Object.values(grouped_completed)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Text className="text-lg ml-3 mb-2 font-bold">{extractDate(item.deadline)}</Text>  
                                    <TouchableOpacity
                                        className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row"
                                        onPress={() => goSubmitSurvey(item, mode)}>
                                        <View>
                                            <Text className="text-base">{item.title}</Text>
                                            <Text className="text-s mt-1 italic">Đóng lúc {extractTime(item.deadline)}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                openDriveDocument(item.file_url);
                                                //setEachFileName(survey.id); 
                                                }}
                                            className="self-center"
                                            >
                                            <Text className="text-blue-500 underline text-base">File đính kèm</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
                </View>
            </View>
        )
        
};

export default ClassSurveysSVien; 