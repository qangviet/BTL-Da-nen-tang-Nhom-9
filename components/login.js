import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";

const handleLoginPress = () => {
    // Xử lý khi nhấn nút Đăng nhập
    console.log("Nút Đăng nhập được nhấn");
    // Điều hướng đến màn hình đăng nhập, ví dụ:
    // navigation.navigate('LoginScreen');
};

const handleRegisterPress = () => {
    // Xử lý khi nhấn nút Đăng ký
    console.log("Nút Đăng ký được nhấn");
    // Điều hướng đến màn hình đăng ký, ví dụ:
    // navigation.navigate('RegisterScreen');
};

const LoginScreen = () => {
    return (
        <SafeAreaView>
            <View className="bg-red-700 h-full w-full">
                <View className="mt-20 flex justify-center flex-row">
                    <Text className="w-[200px] h-[100px] bg-white text-center">Icon</Text>
                </View>
                <View className="flex items-center mt-2">
                    <Text className="text-white text-5xl font-extrabold">HUST</Text>
                </View>
                <View className="mt-10 flex items-center">
                    <Text className="font-thin text-white line-clamp-1">
                        Đăng nhập với tài khoản QLĐT
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
