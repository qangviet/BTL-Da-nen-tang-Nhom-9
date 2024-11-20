import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LogoHust from "./../../logo.js";

import ClassDocs from "./classDocsSVien.js";
import ClassSurveys from "./classSurveysSVien.js";
import ClassXinNghi from "./classXinNghiSVien.js";

import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";

const ClassScreenSVien = () => {

      const dispatch = useDispatch();
      const navigation = useReactNavigation();

      const currentScreen = useSelector((state) => state.navigation.currentScreen);
      const params = useSelector((state) => state.navigation.params);

      useEffect(() => {
            if (currentScreen !== "RegisterClassScreenSVien") {
                  navigation.navigate(currentScreen);
            }
      }, [currentScreen]);

      function goBack() {
            dispatch(goBackMavigation());
            // console.log("Go back!");
      }

      const Tab = createMaterialTopTabNavigator();

      const TabNavigator = () => {
            return (
                  <Tab.Navigator
                        screenOptions={{
                              tabBarStyle: {
                                    backgroundColor: 'white', // Màu nền
                                    height: 40, // Chiều cao tab bar
                              },
                              tabBarLabelStyle: {
                                    fontSize: 14,
                                    marginTop: 0,
                                    marginBottom: 10,

                              },
                              tabBarIndicatorStyle: {
                                    backgroundColor: 'red', // Màu của chỉ báo
                                    height: 4, // Chiều cao của chỉ báo
                                    width: 5,
                                    borderRadius: 100,
                                    marginLeft: 63,
                                    marginBottom: 3
                              },
                              // tabBarActiveTintColor: 'blac', // Màu chữ khi tab đang chọn
                              // tabBarInactiveTintColor: 'gray', // Màu chữ khi tab không chọn
                        }}
                  >
                        <Tab.Screen name="Tài liệu" component={ClassDocs} />
                        <Tab.Screen name="Bài tập" component={ClassSurveys} />
                        <Tab.Screen name="Xin Nghỉ" component={ClassXinNghi} />
                  </Tab.Navigator>
            );
      };

      return (
            <NavigationContainer independent={true}>
                  <View className="bg-red-700 pt-8 pb-3 relative">
                        <View className="absolute left-3 top-8">
                              <TouchableOpacity onPress={() => goBack()}>
                                    <FontAwesome name="long-arrow-left" size={26} color="white" />
                              </TouchableOpacity>
                        </View>
                        <View className="flex justify-center items-center">
                              <LogoHust width={140} height={25}></LogoHust>
                        </View>

                        {params.classInfo ? (
                              <View>
                                    <Text className="mt-4 ml-2 mr-2 text-xl self-center text-white font-bold">
                                          {params.classInfo.name}
                                    </Text>
                                    <Text className="mt-1 ml-2 mr-2 self-center text-white">
                                          {params.classInfo.teacher}
                                    </Text>
                              </View>
                        ) : null}
                  </View>

                  <TabNavigator />
            </NavigationContainer>
      )
}

const styles = StyleSheet.create({

});

export default ClassScreenSVien;