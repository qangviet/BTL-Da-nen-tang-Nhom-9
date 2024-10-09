import React, { useState } from "react";

import { TouchableOpacity, StyleSheet, Image, View, Text, TextInput, SafeAreaView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const RegisterScreen = () => {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [role, setRole] = useState("");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Teacher', value: 'Giảng viên'},
        {label: 'Student', value: 'Sinh viên'}
    ]);
    const [isFocused, setIsFocused] = useState(false);


    return (
        <SafeAreaView>
            <View className="bg-red-700 h-full">
                <View className="flex items-center mt-20">
                    <Image source={require('../assets/logo.png')} style={styles.logo}/>
                </View>
                <View className="flex items-center my-10">
                    <Text className="text-white text-3xl font-bold">Welcome to AIIHust</Text>
                </View>
                <View className="mx-8 flex gap-y-5">
                    <View className="flex flex-row items-center justify-center gap-x-4">
                        <TextInput
                            className="basis-[35%] font-medium 
                         border-white rounded-xl px-5 py-3 text-lg"
                            value={first_name}
                            onChangeText={setFirst_name}
                            placeholder="Họ"
                            placeholderTextColor="white"
                            style={[
                                isFocused ? styles.inputFocused : styles.input,
                            ]}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}

                        />
                        <TextInput
                            className="basis-[55%] font-medium 
                        border border-white rounded-xl px-5 py-3 text-lg"
                            value={last_name}
                            onChangeText={setLast_name}
                            placeholder="Tên"
                            placeholderTextColor="white"
                        />
                    </View>
                    <View>
                        <TextInput
                            className="font-medium border border-white 
                            rounded-lg px-5 py-3 text-lg"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            placeholderTextColor="white"
                        />
                    </View>
                    <View>
                        <TextInput
                            className="font-medium border border-white 
                            rounded-lg px-5 py-3 text-lg"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Mật khẩu"
                            placeholderTextColor="white"
                        />
                    </View>
                    <DropDownPicker
                        style={styles.dropdown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="  Chọn vai trò"
                        placeholderStyle={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: 500
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: "crimson",
                            borderColor: 'white',
                            borderWidth: 1,
                            marginTop: 20
                        }}
                        listItemLabelStyle={{
                            color: "white",
                            fontSize: 18
                        }}
                        itemSeparator={true}
                        itemSeparatorStyle={{
                            backgroundColor: "white"
                        }}
                        labelStyle={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 500,
                            paddingLeft: 7
                        }}
                        arrowIconStyle={{
                            width: 20,
                            height: 20,
                            // backgroundColor: 'white'
                        }}


                        />
                </View>
                <TouchableOpacity style={styles.loginButton} className="my-5">
                    <Text style={styles.loginButtonText}>ĐĂNG KÝ</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 30,
        marginTop: 50,
    },

    loginButton: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        width: "85%",
        alignItems: "center",
        alignSelf: 'center'
    },

    dropdown: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
    },

    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent',
    },

    inputFocused: {
        borderColor: 'white', // Màu sắc khi focus
        borderWidth: 3,
    },
})