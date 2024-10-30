import React, { useState } from "react";

import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import CheckBox from "react-native-check-box";
const ClassDiemDanhGVien = ({ navigation }) => {
    // const listDate = ["01/10/2024", "08/10/2024", "15/10/2024", "22/10/2024", "29/10/2024", ""];

    const listDate = [
        { value: "01/10/2024", label: "01/10/2024 (Chỉ xem)" },
        { value: "08/10/2024", label: "08/10/2024 (Chỉ xem)" },
        { value: "15/10/2024", label: "15/10/2024 (Chỉ xem)" },
        { value: "22/10/2024", label: "22/10/2024 (Chỉ xem)" },
        { value: "29/10/2024", label: "29/10/2024 (Chỉ xem)" },
        { value: "5/11/2024", label: "5/11/2024" },
        { value: "12/11/2024", label: "12/11/2024" },
        { value: "19/11/2024", label: "19/11/2024" },
        { value: "26/11/2024", label: "26/11/2024" },
        { value: "3/12/2024", label: "3/12/2024" },
        { value: "10/12/2024", label: "10/12/2024" },
        { value: "17/12/2024", label: "17/12/2024" },
        { value: "24/12/2024", label: "24/12/2024" },
        { value: "31/12/2024", label: "31/12/2024" },
    ];
    const [dateCheck, setDateCheck] = useState("");

    const [nghihoc, setNghihoc] = useState(3);

    const widthArr = [50, 120, 200, 120, 100];

    const tableHead = ["STT", "MSSV", "Họ và tên", "Điểm danh", "Tổng số ca vắng"];
    const [dsSinhVien, setDsSinhVien] = useState([
        {
            stt: 1,
            mssv: "20215515",
            name: "Nguyễn Văn A",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 2,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 3,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 4,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 5,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 6,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
        {
            stt: 7,
            mssv: "20215516",
            name: "Nguyễn Văn B",
            diemdanh: true,
            sum_absent: 2,
        },
    ]);

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    const selectRow = (index_r, index_c) => {
        let newDsSinhVien = [...dsSinhVien];
        newDsSinhVien[index_r].diemdanh = !newDsSinhVien[index_r].diemdanh;
        setDsSinhVien(newDsSinhVien);
    };

    return (
        <View>
            <View
                className="flex flex-row 
            items-center px-4 justify-between
            border-t border-gray-100"
            >
                <View>
                    <Text className="text-lg font-semibold">Ngày điểm danh:</Text>
                </View>
                <View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={listDate}
                        search
                        maxHeight={400}
                        labelField="label"
                        valueField="value"
                        placeholder="Chọn ngày"
                        searchPlaceholder="Tìm kiếm..."
                        value={dateCheck}
                        onChange={(item) => {
                            setDateCheck(item.value);
                        }}
                        renderItem={(item) => renderItem(item)}
                    />
                </View>
            </View>
            <View className="border-t">
                <TouchableOpacity>
                    <Text className="text-lg pt-2 underline self-center">
                        Yêu cầu xin vắng mặt ({nghihoc})
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="max-h-[70%] mt-3">
                <ScrollView horizontal={true}>
                    <View className="border-t ">
                        <Table borderStyle={{ borderWidth: 1, borderColor: "gray" }}>
                            <Row
                                data={tableHead}
                                widthArr={widthArr}
                                textStyle={{
                                    textAlign: "center",
                                    fontSize: 16,
                                    padding: 5,
                                    color: "#000",
                                    fontWeight: "600",
                                }}
                            />
                        </Table>
                        <ScrollView>
                            <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
                                {dsSinhVien.map((rowData, index_r) => {
                                    return (
                                        <TableWrapper
                                            key={index_r}
                                            style={{ display: "flex", flexDirection: "row" }}
                                        >
                                            {Object.values(rowData).map((cellData, index_c) => {
                                                return (
                                                    <Cell
                                                        width={widthArr[index_c]}
                                                        data={
                                                            index_c === 3 ? (
                                                                <CheckBox
                                                                    // style={{ flex: 1, padding: 10 }}
                                                                    className="py-1 self-center"
                                                                    onClick={() => {
                                                                        selectRow(index_r, index_c);
                                                                    }}
                                                                    isChecked={cellData}
                                                                />
                                                            ) : (
                                                                cellData
                                                            )
                                                        }
                                                        textStyle={{
                                                            textAlign: "center",
                                                            fontSize: 16,
                                                            padding: 5,
                                                            color: "#000",
                                                        }}
                                                    />
                                                );
                                            })}
                                        </TableWrapper>
                                    );
                                })}
                            </Table>
                        </ScrollView>
                        <Table borderStyle={{ borderWidth: 2, borderColor: "#000" }}>
                            <Row
                                data={["Tổng", 40, 35, ""]}
                                textStyle={{
                                    textAlign: "center",
                                    fontSize: 16,
                                    padding: 2,
                                    fontWeight: "500",
                                }}
                                widthArr={[
                                    widthArr[0],
                                    widthArr[1] + widthArr[2],
                                    widthArr[3],
                                    widthArr[4],
                                ]}
                            />
                        </Table>
                    </View>
                </ScrollView>
            </View>
            <View className="bg-red-600 mx-auto rounded-lg mt-5">
                <TouchableOpacity>
                    <Text
                        className="text-lg px-4 py-2 
                    text-white font-semibold"
                    >
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    dropdown: {
        marginTop: 8,
        marginBottom: 8,
        height: 40,
        width: 210,
        backgroundColor: "white",
        paddingLeft: 10,
        paddingRight: 5,
        borderWidth: 2,
        borderColor: "lightgray",
        borderRadius: 10,
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
    placeholderStyle: {
        color: "#000",
        fontSize: 16,
        fontWeight: 300,
    },
    selectedTextStyle: {
        color: "#000",
        fontSize: 16,
        fontWeight: 300,
        alignSelf: "center",
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
export default ClassDiemDanhGVien;
