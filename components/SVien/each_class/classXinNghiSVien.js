import { Text, View, TextInput, Button, Modal, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ClassXinNghi = ({ navigation }) => {

      const LichSuDiemDanh = [
            { id: 0, date: '15/10/2024', status: 'Có mặt' },
            { id: 1, date: '16/10/2024', status: 'Có mặt' },
            { id: 2, date: '17/10/2024', status: 'Có mặt' },
            { id: 3, date: '18/10/2024', status: 'Có mặt' },
            { id: 4, date: '19/10/2024', status: 'Có mặt' },
            { id: 5, date: '20/10/2024', status: 'Có mặt' },
            { id: 6, date: '21/10/2024', status: 'Có mặt' },
            { id: 7, date: '22/10/2024', status: 'Có mặt' },
            { id: 8, date: '23/10/2024', status: 'Có mặt' },
            { id: 9, date: '24/10/2024', status: 'Có mặt' },
            { id: 10, date: '25/10/2024', status: 'Có mặt' },
            { id: 11, date: '26/10/2024', status: 'Có mặt' },
            { id: 12, date: '27/10/2024', status: 'Có mặt' },
            { id: 13, date: '28/10/2024', status: 'Có mặt' },
            { id: 14, date: '29/10/2024', status: 'Có mặt' },
            { id: 15, date: '30/10/2024', status: 'Có mặt' },
            { id: 16, date: '31/10/2024', status: 'Có mặt' },
      ]

      const DateDiemDanh = ({ item }) => (
            <View className="justify-between h-10 flex-row">
                  <Text className="self-center ml-8 text-base">Buổi {item.id + 1}:  {item.date}</Text>
                  <Text className="self-center mr-8 text-base">{item.status}</Text>
            </View>
      );

      const [date, setDate] = useState(new Date());
      const [mode, setMode] = useState('date');
      const [show_timepicker, setShow] = useState(false);
      const [show_file, setFile] = useState(false)
      const [historyVisible, sethistoryVisible] = useState(false);
      const [submitVisible, setsubmitVisible] = useState(false);

      const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);
      };

      const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);

      };

      return (
            <View>
                  <TouchableOpacity className="bg-white p-3 shadow border border-gray-200 flex-row justify-center" onPress={() => sethistoryVisible(true)}>
                        <Text className="text-lg text-red-700">
                              Lịch sử điểm danh
                        </Text>
                  </TouchableOpacity>
                  <View>
                        <Text className="text-2xl text-red-700 self-center mt-5 mb-5">Xin nghỉ</Text>
                        <View className="ml-10 mr-10">
                              <TextInput
                                    className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg"
                                    placeholder="Tiêu đề"
                                    placeholderTextColor="crimson"
                                    style={{ color: 'crimson' }}
                              />

                              <TextInput
                                    className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg mt-4 h-40"
                                    placeholder="Lý do"
                                    placeholderTextColor="crimson"
                                    style={{ color: 'crimson', justifyContent: 'flex-start' }}
                              />

                              <TouchableOpacity className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-72 self-center" onPress={() => setFile(true)}>
                                    <Text className="self-center italic font-bold text-white text-base">Tải minh chứng</Text>
                              </TouchableOpacity>

                              {show_file && (<Text className="self-center mt-1 text-s">Minh_chứng.jpg</Text>)}

                              <View className="flex-row justify-between ml-1 mr-1">
                                    <Text className="text-base mt-5">Ngày xin nghỉ:</Text>
                                    <TouchableOpacity onPress={() => showMode('date')} className="border border-red-700 w-48 justify-between self-center mt-4 h-9 flex-row">
                                          <Text className="text-red-700 mt-1 ml-5 text-base">{date.toLocaleDateString()}</Text>

                                          <FontAwesome className="mt-2 mr-5" name="caret-down" size={14} color="gray" />
                                    </TouchableOpacity>
                                    {show_timepicker && (
                                          <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode={mode}
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChange}
                                          />
                                    )}
                              </View>
                              <TouchableOpacity className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-32 self-center" onPress={() => setsubmitVisible(true)}>
                                    <Text className="self-center italic font-bold text-white text-base">Submit</Text>
                              </TouchableOpacity>

                        </View>
                  </View>
                  <Modal
                        animationType="fade"
                        transparent={true}
                        visible={historyVisible}
                  >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                              <View className="bg-white h-4/6 w-11/12 self-center rounded-2xl mt-32">
                                    <TouchableOpacity onPress={() => sethistoryVisible(false)} className="h-9 justify-center">
                                          <Ionicons name="close-outline" size={28} color="gray" className="self-end mt-2 mr-3" />
                                    </TouchableOpacity>
                                    <Text className="self-center text-lg text-red-700">Lịch sử điểm danh</Text>
                                    <View className="justify-between mt-3 h-10 flex-row">
                                          <Text className="self-center ml-16 text-base font-bold">Buổi học</Text>
                                          <Text className="self-center mr-8 text-base font-bold">Trạng thái</Text>
                                    </View>
                                    <FlatList
                                          className="mb-5"
                                          data={LichSuDiemDanh}
                                          renderItem={({ item }) => <DateDiemDanh item={item} />}
                                          keyExtractor={item => item.id}
                                    />

                              </View>
                        </View>

                  </Modal>
                  <Modal
                        animationType="fade"
                        transparent={true}
                        visible={submitVisible}
                  >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                              <View className="bg-white h-1/5 w-9/12 self-center rounded-2xl mt-72">
                                    <View>
                                          <TouchableOpacity onPress={() => setsubmitVisible(false)} className="h-9 justify-center self-end">
                                                <Ionicons name="close-outline" size={28} color="gray" className="self-end mt-2 mr-3" />
                                          </TouchableOpacity>
                                    </View>
                                    <Text className="self-center text-xl text-red-700 mt-5">Nộp đơn thành công</Text>
                              </View>
                        </View>

                  </Modal>
            </View >
      )
}

export default ClassXinNghi;