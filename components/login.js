import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Ở đây bạn sẽ thêm logic xác thực đăng nhập thực tế
        if (username === "user" && password === "password") {
            navigation.replace("Home");
        } else if (username === "" || password === "") {
            alert("Chưa nhập đủ thông tin!");
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.elevation}>
                    <Image source={require("../assets/logo.png")} style={styles.logo} />
                </View>
                <Text style={styles.title}>Đăng nhập với tài khoản QLDT</Text>

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

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fingerprintButton}>
                    <Ionicons name="finger-print" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C8102E",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    elevation: {
        elevation: 2,
    },

    logo: {
        width: 150,
        height: 30,
        marginBottom: 80,
    },

    title: {
        color: "white",
        fontSize: 18,
        marginBottom: 50,
        textAlign: "center",
    },

    input: {
        width: "90%",
        backgroundColor: "#C8102E",
        borderRadius: 25,
        padding: 10,
        marginBottom: 15,
        color: "white",
        borderWidth: 1,
        borderColor: "white",
    },

    loginButton: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        width: "90%",
        alignItems: "center",
    },

    loginButtonText: {
        color: "#C8102E",
        fontSize: 16,
        fontWeight: "bold",
    },

    fingerprintButton: {
        marginVertical: 15,
        alignItems: "center",
    },

    forgotPassword: {
        color: "white",
        marginTop: 10,
    },
});
