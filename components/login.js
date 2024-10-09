import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styled } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <StyledView className="flex-1 bg-red-700 p-4 justify-center">
            <StyledText className="text-white text-base font-thin mb-8 text-center">
                Đăng nhập với tài khoản QLĐT
            </StyledText>

            <StyledView className="relative my-4">
                <StyledTextInput
                    className="bg-transparent text-white border border-white 
                    rounded-full py-3 px-12 text-base font-medium"
                    placeholder="Email hoặc mã số SV/CB"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#e6e8e6"
                />
                <View
                    className="flex-1 justify-center items-center absolute 
                left-5 top-1/2 -translate-y-3"
                >
                    <Ionicons name="person" size={22} color="white" />
                </View>
            </StyledView>

            <StyledView className="relative my-3">
                <StyledTextInput
                    className="bg-transparents border border-white text-white 
                    rounded-full py-3 px-12 text-base font-medium"
                    placeholder="Mật khẩu"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#e6e8e6"
                />
                <View className="absolute top-1/2 -translate-y-[10px] left-5">
                    <Fontisto name="locked" size={20} color="white" />
                </View>
                <View className="absolute top-1/2 right-4 -translate-y-[10px]">
                    <Ionicons name="eye-off-outline" size={20} color="white" />
                </View>
            </StyledView>

            <StyledTouchableOpacity className="bg-white my-5  rounded-md flex-row justify-center items-center">
                <StyledText className="text-red-600 font-bold">ĐĂNG NHẬP</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
}
