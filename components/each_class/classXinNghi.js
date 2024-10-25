import { Text, View, TextInput, Button, Modal } from 'react-native'
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ClassSurveys = ({ navigation }) => {

      const [date, setDate] = useState(new Date());
      const [mode, setMode] = useState('date');
      const [show_modal, setShow] = useState(false);
      const [show_file, setFile] = useState(false)

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
                  <TouchableOpacity className="bg-white p-3 shadow border border-gray-200 flex-row justify-center">
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
                                    {show_modal && (
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
                              <TouchableOpacity className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-32 self-center">
                                    <Text className="self-center italic font-bold text-white text-base">Submit</Text>
                              </TouchableOpacity>

                        </View>
                  </View>
                  <Modal className="h-52 w-48 bg-white">

                  </Modal>
            </View >
      )
}

export default ClassSurveys;