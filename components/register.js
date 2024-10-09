import React, { useState } from "react";

import { StyleSheet, Image, View, Text, TextInput, SafeAreaView } from "react-native";

import SelectDropdown from "react-native-select-dropdown";

const emojisWithIcons = [
    { title: "happy", icon: "emoticon-happy-outline" },
    { title: "cool", icon: "emoticon-cool-outline" },
    { title: "lol", icon: "emoticon-lol-outline" },
    { title: "sad", icon: "emoticon-sad-outline" },
    { title: "cry", icon: "emoticon-cry-outline" },
    { title: "angry", icon: "emoticon-angry-outline" },
    { title: "confused", icon: "emoticon-confused-outline" },
    { title: "excited", icon: "emoticon-excited-outline" },
    { title: "kiss", icon: "emoticon-kiss-outline" },
    { title: "devil", icon: "emoticon-devil-outline" },
    { title: "dead", icon: "emoticon-dead-outline" },
    { title: "wink", icon: "emoticon-wink-outline" },
    { title: "sick", icon: "emoticon-sick-outline" },
    { title: "frown", icon: "emoticon-frown-outline" },
];

const RegisterScreen = () => {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    return (
        <SafeAreaView>
            <View className="bg-red-700 h-full">
                <View className="flex items-center mt-20">
                    <Image source={require('../assets/logo.png')} style={styles.logo}/>
                </View>
                <View className="flex items-center my-20">
                    <Text className="text-white text-3xl font-bold">Welcome to AIIHust</Text>
                </View>
                <View className="mx-8 flex gap-y-5">
                    <View className="flex flex-row items-center justify-center gap-x-4">
                        <TextInput
                            className="basis-[35%] font-medium 
                        border border-white rounded-xl px-5 py-3 text-lg"
                            value={first_name}
                            onChangeText={setFirst_name}
                            placeholder="Họ"
                            placeholderTextColor="white"
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
                            placeholder="Password"
                            placeholderTextColor="white"
                        />
                    </View>
                    <View className="border border-white rounded-lg px-5 py-3">
                        <SelectDropdown
                            className="flex flex-row justify-center"
                            data={emojisWithIcons}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View className="">
                                        {selectedItem}
                                        <Text className="text-white font-medium text-lg">
                                            {(selectedItem && selectedItem.title) || "Role"}
                                        </Text>
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            ...(isSelected && { backgroundColor: "#D2D9DF" }),
                                        }}
                                    >
                                        <Text>{item.title}</Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
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
    }
})