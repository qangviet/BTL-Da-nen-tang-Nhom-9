import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LogoHust from "../../logo";

import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";

const HomeSVien = () => {
      const dispatch = useDispatch();
      const navigation = useReactNavigation();

      const currentScreen = useSelector((state) => state.navigation.currentScreen);
      useEffect(() => {
            if (currentScreen !== "HomeSVien") {
                  navigation.navigate(currentScreen);
            }
      }, [currentScreen]);

      const goToMyClasses = () => {
            dispatch(
                  navigate({
                        screen: "MyClassesScreenSVien",
                        params: {}
                  })
            );
            console.log("Go to: Danh sách lớp")
      }

      const goToRegisterClasses = () => {
            dispatch(
                  navigate({
                        screen: "RegisterClassScreenSVien",
                        params: {}
                  })
            );
            console.log("Go to: Đăng ký lớp")
      }

      return (
            <View className="h-full">
                  <View className="bg-red-700 pt-8 pb-3 relative">
                        <View className="flex justify-center items-center">
                              <LogoHust width={140} height={25}></LogoHust>
                        </View>
                        <View className="absolute right-3 top-8">
                              <TouchableOpacity>
                                    <FontAwesome name="bell" size={20} color="white" />
                              </TouchableOpacity>
                        </View>
                  </View>

                  <View className="flex-1">
                        <TouchableOpacity onPress={() => goToMyClasses()} className="m-10 h-20 self-center justify-center border">
                              <Text>Danh sách lớp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => goToRegisterClasses()} className="h-20 self-center justify-center border">
                              <Text>Đăng ký lớp</Text>
                        </TouchableOpacity>
                  </View>

            </View>
      )
}

export default HomeSVien;