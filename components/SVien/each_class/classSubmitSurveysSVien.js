import { Text, View, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import LogoHust from '../../logo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";

const ClassSubmitSurveysSVien = () => {

      const dispatch = useDispatch();
      const navigation = useReactNavigation();

      const currentScreen = useSelector((state) => state.navigation.currentScreen);
      const params = useSelector((state) => state.navigation.params);

      useEffect(() => {
            if (currentScreen !== "ClassSubmitSurveysSVien") {
                  navigation.navigate(currentScreen);
            }
      }, [currentScreen]);

      function goBack() {
            dispatch(goBackMavigation());
            // console.log("Go back!");
      }

      const survey = params.assignment;
      console.log(survey);

      const [show_file, setFile] = useState(false);
      const [submitVisible, setsubmitVisible] = useState(false);

      return (
            <View>
                  <View className="bg-red-700 pt-10 pb-5 relative">
                        <View className="absolute left-3 top-8">
                              <TouchableOpacity onPress={() => goBack()}>
                                    <FontAwesome name="long-arrow-left" size={26} color="white" />
                              </TouchableOpacity>
                        </View>
                        <View className="flex justify-center items-center">
                              <LogoHust width={110} height={21}></LogoHust>
                              <Text className="text-white text-[24px] pt-3">SUBMIT SURVEY</Text>
                        </View>
                  </View>
                  {survey && <View className="mt-5 ml-10 mr-10">
                        <TextInput
                              className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg"
                              placeholder={survey.name}
                              placeholderTextColor="crimson"
                              style={{ color: 'crimson' }}
                              editable={false}
                        />

                        {survey.description && <TextInput
                              className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg mt-4 h-20"
                              placeholder={survey.description}
                              placeholderTextColor="crimson"
                              style={{ color: 'crimson', justifyContent: 'flex-start' }}
                              editable={false}
                        />}

                        {survey.file && <TouchableOpacity className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-72 self-center" onPress={() => setFile(true)}>
                              <Text className="self-center italic font-bold text-white text-base">{survey.file}</Text>
                        </TouchableOpacity>}

                        <TextInput
                              className="font-medium border 
                                    border-red-700 px-5 py-3 text-lg mt-4 h-40"
                              placeholder="Trả lời"
                              placeholderTextColor="crimson"
                              style={{ color: 'crimson', justifyContent: 'flex-start' }}
                        />

                        <View>
                              <Text className="mt-2 text-lg italic font-bold text-red-700 self-center">Hoặc</Text>
                        </View>

                        <TouchableOpacity className="rounded-lg bg-red-700 h-10 justify-center mt-3 w-56 self-center" onPress={() => setFile(true)}>
                              <Text className="self-center italic font-bold text-white text-base">Tải tài liệu lên</Text>
                        </TouchableOpacity>

                        {show_file && (<Text className="self-center mt-1 text-s">Bai1.docx</Text>)}


                        <TouchableOpacity className="rounded-lg bg-red-700 h-10 justify-center mt-5 w-32 self-center" onPress={() => setsubmitVisible(true)}>
                              <Text className="self-center italic font-bold text-white text-base">Submit</Text>
                        </TouchableOpacity>

                  </View>}
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
                                    <Text className="self-center text-xl text-red-700 mt-5">Nộp bài tập thành công!</Text>
                              </View>
                        </View>

                  </Modal>
            </View>
      )
}

export default ClassSubmitSurveysSVien;