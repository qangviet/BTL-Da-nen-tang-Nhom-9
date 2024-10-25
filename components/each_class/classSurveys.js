import { Text, View, FlatList } from 'react-native'
import React, { Component, useState } from 'react'
import { TouchableOpacity } from 'react-native';

const ClassSurveys = ({ navigation }) => {

      function viewAssignment(name) {
            console.log("Viewing " + name)
      }
      const [mode, setModeBtn] = useState(0);

      const ASSIGNMENTs = [
            { id: "0", name: "Bài tập Idk", description: 'des', start: '10 thg 4', end: '12 thg 4', status: 'Completed', grade: '10/10' },
            { id: "1", name: "Bài tập Đa tảng nền", description: 'des', start: '11 thg 4', end: '12 thg 4', status: 'Completed', grade: '10/10' },
            { id: "2", name: "Bài tập Tảng đa nền", description: 'des', start: '12 thg 4', end: '14 thg 4', status: 'Completed', grade: '10/10' },
            { id: "3", name: "Bài tập Nền tảng đa", description: 'des', start: '13 thg 4', end: '14 thg 4', status: 'Completed', grade: '10/10' },
            { id: "4", name: "Bài tập Nền đa tảng", description: 'des', start: '14 thg 4', end: '16 thg 4', status: 'Completed', grade: '10/10' },
            { id: "5", name: "Bài tập Tảng nền đa", description: 'des', start: '15 thg 4', end: '17 thg 4', status: 'Completed', grade: '10/10' },
            { id: "6", name: "Bài tập Đa nền tảng", description: 'des', start: '16 thg 4', end: '18 thg 4', status: 'Completed', grade: 'None' },
            { id: "7", name: "Bài tập Đa nền tảng", description: 'des', start: '16 thg 10', end: '18 thg 10', status: 'Completed', grade: 'None' },
            { id: "8", name: "Bài tập Đa nền tảng", description: 'des', start: '16 thg 10', end: '18 thg 10', status: 'Completed', grade: 'None' },
            { id: "9", name: "Bài tập Đa nền tảng", description: 'des', start: '20 thg 10', end: '24 thg 10', status: 'Not completed', grade: 'None' },
            { id: "10", name: "Bài tập Đa nền tảng", description: 'des', start: '21 thg 10', end: '24 thg 10', status: 'Not completed', grade: 'None' },
            { id: "11", name: "Bài tập Đa nền tảng", description: 'des', start: '22 thg 10', end: '25 thg 10', status: 'Not completed', grade: 'None' },
            { id: "12", name: "Bài tập Đa nền tảng", description: 'des', start: '22 thg 10', end: '26 thg 11', status: 'Not completed', grade: 'None' },
            { id: "13", name: "Bài tập Đa nền tảng", description: 'des', start: '23 thg 10', end: '27 thg 11', status: 'Not completed', grade: 'None' },
            { id: "14", name: "Bài tập Đa nền tảng", description: 'des', start: '24 thg 10', end: '28 thg 11', status: 'Not completed', grade: 'None' },
            { id: "15", name: "Bài tập Đa nền tảng", description: 'des', start: '24 thg 10', end: '29 thg 11', status: 'Not completed', grade: 'None' },
      ]

      const parseDate = (dateString) => {
            const [day, month] = dateString.split(' thg ').map(Number);
            const year = new Date().getFullYear();
            return new Date(year, month - 1, day + 1);
      };

      const groupAssignmentsByDate = (assignments) => {
            const grouped = {};

            assignments.forEach((assignment) => {
                  const date = assignment.end;
                  if (!grouped[date]) {
                        grouped[date] = [];
                  }
                  grouped[date].push(assignment.name);
            });

            return grouped;
      };

      const groupedAssignments = groupAssignmentsByDate(ASSIGNMENTs);
      const sortedDates = Object.keys(groupedAssignments).sort((a, b) => new parseDate(b) - new parseDate(a));

      function setMode(index) {
            setModeBtn(index);


      }

      return (
            <View>
                  <View className="flex flex-row justify-between p-3">
                        {['Sắp tới', 'Quá hạn', 'Đã hoàn thành'].map((label, index) => (
                              <TouchableOpacity
                                    key={index}
                                    className={`flex-1 mx-2 rounded-lg h-6 justify-center ${mode === index ? 'bg-blue-300' : 'bg-gray-300'}`}
                                    onPress={() => setMode(index)}>
                                    <Text className="text-center">{label}</Text>
                              </TouchableOpacity>
                        ))}
                  </View>

                  <View>

                        <FlatList
                              data={sortedDates}
                              keyExtractor={(item) => item}
                              renderItem={({ item }) => (
                                    <View className="mb-4">
                                          <Text className="text-lg ml-3 mb-2 font-bold">{item}</Text>
                                          {groupedAssignments[item].map((assignmentName, index) => (
                                                <TouchableOpacity key={index} className="bg-white p-4 mb-2 ml-2 mr-2 rounded-lg shadow justify-between border border-gray-200 flex-row">
                                                      <View>
                                                            <Text className="text-base">{assignmentName}</Text>
                                                            <Text className="text-s mt-1 italic">Đóng lúc 11h59</Text>
                                                      </View>
                                                      <Text className="self-center text-base">10/10</Text>
                                                </TouchableOpacity>
                                          ))}
                                    </View>
                              )}
                        />

                  </View>

            </View>
      )
};

export default ClassSurveys; 