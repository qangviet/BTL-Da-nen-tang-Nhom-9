import React from "react";
import { useState } from "react";
import {
    StyleSheet,
    Image,
    ScrollView,
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { Table, Row } from "react-native-table-component";

import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import LogoHust from "./../../logo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Modal from "react-native-modal";
const CreateClassScreenGVien = ({ navigation }) => {
    const listTypeClass = [
        { label: "LT", value: "LT" },
        { label: "BT", value: "BT" },
        { label: "LT+BT", value: "LT+BT" },
        { label: "TH", value: "TH" },
    ];
    const listTime = [
        { label: "Tuần 1", value: "Tuần 1" },
        { label: "Tuần 2", value: "Tuần 2" },
        { label: "Tuần 3", value: "Tuần 3" },
        { label: "Tuần 4", value: "Tuần 4" },
        { label: "Tuần 5", value: "Tuần 5" },
        { label: "Tuần 6", value: "Tuần 6" },
        { label: "Tuần 7", value: "Tuần 7" },
        { label: "Tuần 8", value: "Tuần 8" },
        { label: "Tuần 9", value: "Tuần 9" },
        { label: "Tuần 10", value: "Tuần 10" },
        { label: "Tuần 11", value: "Tuần 11" },
        { label: "Tuần 12", value: "Tuần 12" },
        { label: "Tuần 13", value: "Tuần 13" },
        { label: "Tuần 14", value: "Tuần 14" },
        { label: "Tuần 15", value: "Tuần 15" },
        { label: "Tuần 16", value: "Tuần 16" },
        { label: "Tuần 17", value: "Tuần 17" },
        { label: "Tuần 18", value: "Tuần 18" },
        { label: "Tuần 19", value: "Tuần 19" },
        { label: "Tuần 20", value: "Tuần 20" },
        { label: "Tuần 21", value: "Tuần 21" },
        { label: "Tuần 22", value: "Tuần 22" },
        { label: "Tuần 23", value: "Tuần 23" },
        { label: "Tuần 24", value: "Tuần 24" },
        { label: "Tuần 25", value: "Tuần 25" },
        { label: "Tuần 26", value: "Tuần 26" },
        { label: "Tuần 27", value: "Tuần 27" },
        { label: "Tuần 28", value: "Tuần 28" },
        { label: "Tuần 29", value: "Tuần 29" },
        { label: "Tuần 30", value: "Tuần 30" },
        { label: "Tuần 31", value: "Tuần 31" },
        { label: "Tuần 32", value: "Tuần 32" },
        { label: "Tuần 33", value: "Tuần 33" },
        { label: "Tuần 34", value: "Tuần 34" },
        { label: "Tuần 35", value: "Tuần 35" },
        { label: "Tuần 36", value: "Tuần 36" },
        { label: "Tuần 37", value: "Tuần 37" },
        { label: "Tuần 38", value: "Tuần 38" },
        { label: "Tuần 39", value: "Tuần 39" },
        { label: "Tuần 40", value: "Tuần 40" },
    ];
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [typeClass, setTypeClass] = useState(null);

    const [listClass, setListClass] = useState([
        {
            id_class: "103268",
            id_class_attached: "103269",
            id_subject: "PH1110",
            name_subject: "Vật lý đại cương I",
            semester: "Kỳ hè-C",
            type_class: "BT",
            status: "Đăng ký chính thức",
            credit: 80,
            number_student: 0,
            name_academic: "VVLKT",
            times: [
                {
                    day_in_week: 2,
                    time: "15:05-17:35",
                    week_time: "47-51",
                    classroom: "D9-102",
                },
                {
                    day_in_week: 6,
                    time: "15:05-17:35",
                    week_time: "47-51",
                    classroom: "D9-101",
                },
                {
                    day_in_week: 5,
                    time: "12:30-15:00",
                    week_time: "47-51",
                    classroom: "D9-101",
                },
            ],
        },
        {
            id_class: "103268",
            id_class_attached: "103269",
            id_subject: "PH1110",
            name_subject: "Vật lý đại cương I",
            semester: "Kỳ hè-C",
            type_class: "BT",
            status: "Đăng ký chính thức",
            credit: 80,
            number_student: 0,
            name_academic: "VVLKT",
            times: [
                {
                    day_in_week: 2,
                    time: "15:05-17:35",
                    week_time: "47-51",
                    classroom: "D9-102",
                },
                {
                    day_in_week: 6,
                    time: "15:05-17:35",
                    week_time: "47-51",
                    classroom: "D9-101",
                },
                {
                    day_in_week: 5,
                    time: "12:30-15:00",
                    week_time: "47-51",
                    classroom: "D9-101",
                },
            ],
        },
    ]);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModalListClass = () => {
        setIsOpenModal(true);
    };

    const closeModalListClass = (e) => {
        setIsOpenModal(false);
    };

    const renderItem = (item, value) => {
        return (
            <>
                <View style={styles.item}>
                    <Text style={styles.textItem}>{item.label}</Text>
                    {item.value === value && (
                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    )}
                </View>
                <View className="border-t border-slate-300"></View>
            </>
        );
    };
    return (
        <View>
            <View className="bg-red-700 pt-10 pb-5 relative">
                <View className="absolute left-3 top-8">
                    <TouchableOpacity>
                        <FontAwesome name="long-arrow-left" size={26} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex justify-center items-center">
                    <LogoHust width={110} height={21}></LogoHust>
                    <Text className="text-white text-[24px] pt-3">CREATE CLASS</Text>
                </View>
            </View>
            <View className="mt-10 w-[85%] mx-auto">
                <TextInput
                    placeholder="Mã lớp*"
                    placeholderTextColor={"#e86456"}
                    className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
                />
                <TextInput
                    placeholder="Mã lớp kèm*"
                    placeholderTextColor={"#e86456"}
                    className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
                />
                <TextInput
                    placeholder="Tên lớp*"
                    placeholderTextColor={"#e86456"}
                    className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
                />
                <TextInput
                    placeholder="Mã học phần*"
                    placeholderTextColor={"#e86456"}
                    className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
                />
                <View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={listTypeClass}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Loại lớp*"
                        value={typeClass}
                        onChange={(item) => {
                            setTypeClass(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                        renderItem={(item) => renderItem(item, typeClass)}
                    />
                </View>
                <View className="flex flex-row justify-between">
                    <View className="basis-[48%] ">
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={listTime}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Bắt đầu*"
                            searchPlaceholder="Tìm kiếm..."
                            value={startTime}
                            onChange={(item) => {
                                setStartTime(item.value);
                            }}
                            renderItem={(item) => renderItem(item, startTime)}
                        />
                    </View>
                    <View className="basis-[48%] ">
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={listTime}
                            maxHeight={300}
                            search
                            labelField="label"
                            valueField="value"
                            placeholder="Kết thúc*"
                            searchPlaceholder="Tìm kiếm..."
                            value={endTime}
                            onChange={(item) => {
                                setEndTime(item.value);
                            }}
                            renderItem={(item) => renderItem(item, endTime)}
                        />
                    </View>
                </View>
                <TextInput
                    placeholder="Số lượng sinh viên tối đa*"
                    placeholderTextColor={"#e86456"}
                    className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
                />
                <View className="mx-auto py-2 px-4 bg-red-700 rounded-lg mt-10">
                    <TouchableOpacity>
                        <Text className="text-white italic text-xl font-bold">Tạo lớp học</Text>
                    </TouchableOpacity>
                </View>
                <View className="mx-auto mt-8 ">
                    <TouchableOpacity onPress={() => openModalListClass()}>
                        <Text className="text-lg text-red-600 underline font-semibold italic">
                            Thông tin danh sách các lớp mở
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal isVisible={isOpenModal} onBackdropPress={(e) => closeModalListClass(e)}>
                <View className="h-[70%] bg-gray-200 ">
                    <ScrollView horizontal={true}>
                        <ScrollView>
                            {listClass.map((item) => {
                                const header_row = [];
                                header_row.push(item.id_class);
                                header_row.push(item.id_subject);
                                header_row.push(item.name_subject);
                                header_row.push(item.semester);
                                header_row.push(item.type_class);
                                header_row.push(item.status);
                                header_row.push(item.credit);
                                header_row.push(item.number_student);
                                header_row.push(item.name_academic);

                                let header_row_time = [
                                    "Thứ",
                                    "Thời gian",
                                    "Tuần học",
                                    "Phòng học",
                                    "Mã lớp",
                                ];

                                return (
                                    <View className="mb-5 pt-2">
                                        <Table
                                            borderStyle={{ borderWidth: 1, borderColor: "#a8a8a8" }}
                                        >
                                            <Row
                                                data={header_row}
                                                widthArr={[60, 60, 150, 100, 40, 90, 40, 40, 60]}
                                                // style={styles.header}
                                                className="bg-[#bfbebe]"
                                                textStyle={{
                                                    textAlign: "center",
                                                    fontWeight: "600",
                                                    color: "black",
                                                }}
                                            />
                                        </Table>
                                        <Text className="mt-4 mx-3">
                                            Tên lớp:{" "}
                                            <Text className="font-semibold">
                                                {item.name_subject}
                                            </Text>
                                        </Text>
                                        <Text className="mt-1 mx-3">
                                            Mã lớp kèm: {item.id_class_attached}
                                        </Text>
                                        <View className="mt-5">
                                            <Table
                                                borderStyle={{
                                                    borderWidth: 1,
                                                    borderColor: "#c1c1c1",
                                                }}
                                            >
                                                <Row
                                                    data={header_row_time}
                                                    style={{
                                                        backgroundColor: "#d6d5d5",
                                                        height: 40,
                                                    }}
                                                />
                                                {item.times.map((time) => {
                                                    const row_time = [];
                                                    row_time.push(time.day_in_week);
                                                    row_time.push(time.time);
                                                    row_time.push(time.week_time);
                                                    row_time.push(time.classroom);
                                                    row_time.push(item.id_class);
                                                    return (
                                                        <Row
                                                            data={row_time}
                                                            style={{
                                                                height: 40,
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Table>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        marginTop: 8,
        marginBottom: 8,
        height: 50,
        backgroundColor: "white",
        padding: 6,
        borderWidth: 1,
        borderColor: "#dc2626",
        // elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 18,
        color: "red",
    },
    placeholderStyle: {
        color: "#e86456",
        fontSize: 18,
        fontWeight: 600,
    },
    selectedTextStyle: {
        color: "#b91c1c",
        fontSize: 18,
        fontWeight: 600,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default CreateClassScreenGVien;
