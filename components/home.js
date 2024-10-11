import React, { useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, SafeAreaView } from "react-native";

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
                    <Image source={require('../assets/logo.png')} style={styles.logo}/>
                </View>
                <View className="flex justify-center items-center">
                    <Image className="w-24 h-36" source={require('../assets/logoBK.png')} />
                </View>
                <View className="flex items-center mt-16">
                    <Text className="text-white text-3xl font-bold">Welcome to AllHust</Text>
                </View>
                <View className="flex flex-row items-center justify-center gap-8 mt-5">
                    <TouchableOpacity
                        className="bg-white rounded-md px-5 py-2"
                        onPress={() => handleLoginPress(navigation)}
                    >
                        <Text className="text-red-700 font-bold text-xl">Đăng nhập</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white rounded-md px-6 py-2"
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

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 30,
        marginBottom: 80,
    },
})