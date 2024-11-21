import React, { Suspense, useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";
import { Table, TableWrapper, Row, Cell, Col } from "react-native-table-component";

import { LogoHust } from "./../../logo";

import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";

const RegisterClassScreenSVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const userInfo = useSelector((state) => state.navigation.params);

	useEffect(() => {
		if (currentScreen !== "RegisterClassScreenSVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	function goBack() {
		dispatch(goBackMavigation());
		// console.log("Go back!");
	}

	const [tableHead] = useState([
		"Mã học phần",
		"Mã lớp học",
		"Mã lớp kèm",
		"Tên lớp học",
		"Ngày đăng ký",
		"TT Đăng ký",
		"Số TC",
		"Chọn",
	]);
	const [widthArr] = useState([70, 80, 80, 120, 100, 100, 50, 50]);
	const sumTC = 16;
	const [tableData, setTableData] = useState([
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 1],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
		["IT3040", "123456", "789012", "Kỹ thuật lập trình", "10/15/2023", "Thành công", "2", 0],
	]);

	const selectRow = (index, cellIndex) => {
		let temp = [...tableData];
		temp[index][cellIndex] = !temp[index][cellIndex];
		setTableData(temp);
	};

	// for (let i = 0; i < 10; i += 1) {
	//     const rowData = [];
	//     for (let j = 0; j < tableHead.length; j += 1) {
	//         rowData.push(`${i}${j}`);
	//     }
	//     tableData.push(rowData);
	// }

	const [isChecked, setIsChecked] = useState();

	return (
		<View>
			<View className="bg-red-700 pt-8 pb-5 relative">
				<View className="absolute left-3 top-8">
					<TouchableOpacity onPress={() => goBack()}>
						<FontAwesome name="long-arrow-left" size={26} color="white" />
					</TouchableOpacity>
				</View>
				<View className="flex justify-center items-center">
					<LogoHust width={140} height={25}></LogoHust>
					<Text className="text-white text-[28px] pt-5">REGISTER FOR CLASS</Text>
				</View>
			</View>
			<View className="mt-10 mx-8 flex flex-row">
				<View className="basis-[55%] mx-3 bg-[#f2eceb] border-red-600 border py-2">
					<TextInput
						className=" text-red-600 text-xl px-3"
						placeholder="Mã lớp"
						placeholderTextColor={"#ad1d1d"}
					/>
				</View>
				<View className="basis-[35%] flex justify-center items-center bg-red-700 rounded-lg">
					<TouchableOpacity>
						<Text className="text-white italic font-bold text-xl">Đăng ký</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="w-full ">
				<View className="p-4 pt-7 h-[400px] ">
					<ScrollView horizontal={true}>
						<View>
							<Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
								<Row
									data={tableHead}
									widthArr={widthArr}
									// style={styles.header}
									className="bg-red-600 h-11"
									textStyle={styles.textHeader}
								/>
							</Table>
							<ScrollView style={styles.dataWrapper}>
								{/* <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                                    {tableData.map((rowData, index) => (
                                        
                                        <Row
                                            data={rowData}
                                            style={styles.row}
                                            widthArr={widthArr}
                                            textStyle={styles.textRecoder}
                                        />
                                    ))}
                                    
                                </Table> */}
								<Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
									{tableData.map((rowData, index) => (
										<TableWrapper className="flex flex-row">
											{rowData.map((cellData, cellIndex) => (
												<Cell
													data={
														cellIndex === rowData.length - 1 ? (
															<CheckBox
																// style={{ flex: 1, padding: 10 }}
																className="py-1 self-center"
																onClick={() => {
																	selectRow(index, cellIndex);
																}}
																isChecked={cellData}
															/>
														) : (
															cellData
														)
													}
													textStyle={styles.textRecoder}
													width={widthArr[cellIndex]}
													className="py-1"
												/>
											))}
										</TableWrapper>
									))}
								</Table>
							</ScrollView>
							<View className="border-t border-gray-300"></View>
						</View>
					</ScrollView>
				</View>
				<View className="h-5 flex items-end px-6 mt-4">
					<Text className="text-black">
						Tổng số tín chỉ đã đăng ký:{" "}
						<Text className="text-red-600 font-bold">{sumTC}</Text>
					</Text>
				</View>
			</View>
			<View className="flex flex-row mt-10 justify-center gap-x-3">
				<View
					className="flex justify-center items-center
                 bg-red-700 rounded-lg px-5 py-1"
				>
					<TouchableOpacity>
						<Text className="text-white italic font-bold text-lg">Gửi đăng ký</Text>
					</TouchableOpacity>
				</View>
				<View
					className="flex justify-center items-center
                 bg-red-700 rounded-lg px-5 py-1"
				>
					<TouchableOpacity>
						<Text className="text-white italic font-bold text-lg">Xóa lớp</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="flex justify-center items-center mt-10 ">
				<TouchableOpacity>
					<Text className="text-base text-red-600 underline font-bold italic">
						Thông tin danh sách các lớp mở
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 30,
		backgroundColor: "#fff",
	},

	header: {
		backgroundColor: "#537791",
	},

	textHeader: {
		textAlign: "center",
		fontWeight: "500",
		color: "white",
	},

	textRecoder: {
		textAlign: "center",
		fontWeight: "100",
		color: "black",
	},

	dataWrapper: {
		marginTop: -1,
	},

	row: {
		height: 40,
		backgroundColor: "#fff",
	},
});

export default RegisterClassScreenSVien;
