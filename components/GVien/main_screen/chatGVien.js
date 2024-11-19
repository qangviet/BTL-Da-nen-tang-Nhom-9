import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LogoHust from "./../../logo";

const ChatGVien = () => {
      return (
            <View className="h-full">
                  <View className="bg-red-700 pt-8 pb-3 relative">
                        <View className="flex justify-center items-center">
                              <LogoHust width={140} height={25}></LogoHust>
                        </View>
                  </View>
            </View>
      )
}

export default ChatGVien;