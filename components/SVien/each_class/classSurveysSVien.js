import { Text, View, FlatList } from 'react-native'
import React, { Component, useState } from 'react'
import { TouchableOpacity } from 'react-native';

import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import api from "../../api";
import { useEffect } from "react";

const ClassSurveysSVien = ({ route }) => {

      const { params } = route;

      console.log("Survey params.....",params)

      const dispatch = useDispatch();
      const navigation = useReactNavigation();

      function viewAssignment(name) {
            console.log("Viewing " + name)
      }

      // 0 - upcoming, 1 - past due, 2 - completed
      const [mode, setModeBtn] = useState(0);

      const today = new Date()
      // console.log("Today: ", today)


      const [grouped_upcoming, setUpcoming] = useState({});
      const [grouped_pastdue, setPastDue] = useState({});
      const [grouped_completed, setCompleted] = useState({});

      // Hàm nhóm bài tập theo ngày
      const groupByDate = (assignments) => {
            return assignments.reduce((acc, assignment) => {
            const date = parseDate(assignment.due_date).toLocaleDateString();
            if (!acc[date]) {
            acc[date] = [];
            }
            acc[date].push(assignment);
            return acc;
            }, {});
      };

      const fetchAssignments = async () => {
            try {
                  const token = params.token;
                  const classId = params.classInfo.id;

                  const [completedRes, pastDueRes, upcomingRes] = await Promise.all([
                        api.post('/it5023e/get_student_assignments', { token, type: "COMPLETED", class_id: classId }),
                        api.post('/it5023e/get_student_assignments', { token, type: "PASS_DUE", class_id: classId }),
                        api.post('/it5023e/get_student_assignments', { token, type: "UPCOMING", class_id: classId }),
                  ]);

                  // Lưu kết quả vào state
                  setCompleted(groupByDate(completedRes.data.data));
                  setPastDue(groupByDate(pastDueRes.data.data));
                  setUpcoming(groupByDate(upcomingRes.data.data));

                  console.log("Completed.....", completedRes.data.data);
                  console.log("Upcoming.....", upcomingRes.data.data);
                  console.log("Pastdue.....", pastDueRes.data.data);
            } catch (error) {
                  console.error("Failed to fetch assignments: ", error);
            }
      };

      // Gọi API mỗi khi vào tab này
      useEffect(() => {
            fetchAssignments();
      }, []);

      
      const parseDate = (dateString) => {
            const [day, month] = dateString.split(' thg ').map(Number);
            const year = new Date().getFullYear();
            // console.log(new Date(year, month - 1, day + 1))
            return new Date(year, month - 1, day + 1);
      };


      const sortedDates_upcoming = Object.keys(grouped_upcoming).sort((a, b) => new parseDate(b) - new parseDate(a));
      const sortedDates_pastdue = Object.keys(grouped_pastdue).sort((a, b) => new parseDate(b) - new parseDate(a));
      const sortedDates_completed = Object.keys(grouped_completed).sort((a, b) => new parseDate(b) - new parseDate(a));

      function goSubmitSurvey(item, mode) {
            dispatch(
                  navigate({
                        screen: "ClassSubmitSurveysSVien",
                        params: {
                              assignment: item,
                              mode: mode // only mode == 0 (upcoming) is submitable
                        },
                  })
            );
      }

      return (
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
                                                <TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row" onPress={() => goSubmitSurvey(assignment, mode)}>
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
                                                <TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row" onPress={() => goSubmitSurvey(assignment, mode)}>
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
                                                <TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row" onPress={() => goSubmitSurvey(assignment, mode)}>
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

export default ClassSurveysSVien; 