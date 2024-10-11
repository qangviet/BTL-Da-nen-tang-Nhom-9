import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import LogoHust from "./logo";
const RegisterClassScreen = ({ navigation }) => {
    return (
        <View>
            <View className="bg-red-700 pt-14 pb-5 relative">
                <View className="absolute left-3 top-14">
                    <TouchableOpacity>
                        <FontAwesome name="long-arrow-left" size={26} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex justify-center items-center">
                    <LogoHust></LogoHust>
                    <Text className="text-white text-[28px] pt-5">REGISTER FOR CLASS</Text>
                </View>
            </View>
            <View></View>
        </View>
    );
};
export default RegisterClassScreen;
