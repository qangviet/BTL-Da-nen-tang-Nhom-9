import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

const handleLoginPress = (navigation) => {
    // Xử lý khi nhấn nút Đăng nhập
    navigation.navigate("LoginScreen");
};

const handleRegisterPress = (navigation) => {
    // Xử lý khi nhấn nút Đăng ký
    navigation.navigate("RegisterScreen");
};

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View className="bg-red-700 h-full w-full">
                <View className="flex items-center mt-40">
                    <Text className="text-white text-6xl font-extrabold">HUST</Text>
                </View>
                <View className="flex items-center my-20">
                    <Text className="text-white text-3xl font-bold">Welcome to AIIHust</Text>
                </View>
                <View className="flex flex-row items-center justify-center gap-8 mt-20">
                    <TouchableOpacity
                        className="bg-white rounded-md px-5 py-2"
                        onPress={() => handleLoginPress(navigation)}
                    >
                        <Text className="text-red-700 font-bold text-xl">Đăng nhập</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white rounded-md px-8 py-2"
                        onPress={() => handleRegisterPress(navigation)}
                    >
                        <Text className="text-red-700 font-bold text-xl">Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
