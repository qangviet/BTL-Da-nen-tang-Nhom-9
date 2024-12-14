import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import axios from "axios";
import { LogoHust } from "./../../logo";
import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import api from "../../api";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { startLoading, stopLoading } from "../../../redux/loadingSlice";

const RegisterClassScreenSVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const userInfo = useSelector((state) => state.navigation.params);
	console.log("Infor....", userInfo);

	const [classId, setClassId] = useState("");
	const [tableHead] = useState([
		"Mã lớp học",
		"Tên lớp học ",
		"Loại",
		"Ngày bắt đầu",
		"Ngày kết thúc",
		"Trạng thái",
		"Chọn",
	]);
	const [tableHeadOpen] = useState([
		"Mã lớp học",
		"Tên lớp học ",
		"Loại",
		"Ngày bắt đầu",
		"Ngày kết thúc",
		"Trạng thái",
		"Số sinh viên",
	]);
	const [widthArrOpen] = useState([80, 130, 80, 130, 130, 100, 70]);
	const [widthArr] = useState([80, 120, 80, 100, 100, 100, 80]);
	const [tableData, setTableData] = useState([]);

	//Lay thong tin lop mo:
	const [tableDataOpen, setTableDataOpen] = useState([]);
	useEffect(() => {
		// Hàm gọi API để lấy danh sách lớp
		const fetchOpenClassList = async () => {
			// console.log(">>>> LOADED!");
			try {
				dispatch(startLoading());
				const response = await api.post("/it5023e/get_open_classes", {
					token: userInfo.token,
					// role: userInfo.role == 2 ? "LECTURER" : "STUDENT",
					// account_id: userInfo.id,
					pageable_request: null,
				});
				const pageContent = response.data.data.page_content;
				// Map dữ liệu để phù hợp với cấu trúc tableData
				const formattedData = pageContent.map((item) => [
					item.class_id,
					item.class_name,
					item.class_type,
					item.start_date,
					item.end_date,
					item.status,
					item.student_count,
				]);
				setTableDataOpen(formattedData);
				dispatch(stopLoading());
			} catch (error) {
				dispatch(stopLoading());
				console.error("Error fetching class list:", error);
				console.error("Error Data:", error.response.data);
				console.error("Error Status:", error.response.status);
			}
		};

		fetchOpenClassList();
	}, [currentScreen]);

	const [isOpenModal, setIsOpenModal] = useState(false);

	const openModalListClass = () => {
		setIsOpenModal(true);
	};

	const closeModalListClass = (e) => {
		setIsOpenModal(false);
	};

	useEffect(() => {
		if (currentScreen !== "RegisterClassScreenSVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	function goBack() {
		dispatch(goBackMavigation());
	}

	const selectRow = (index, cellIndex) => {
		let temp = [...tableData];
		temp[index][cellIndex] = !temp[index][cellIndex];
		setTableData(temp);
	};
	//Xóa lớp
	const handleDeleteClasses = () => {
		const updatedData = tableData.filter((row) => !row[row.length - 1]);
		setTableData(updatedData);
	};
	// Đăng ký lớp
	const handleSubmitRegister = async () => {
		const selectedClasses = tableData.filter((row) => row[row.length - 1]).map((row) => row[0]);

		if (selectedClasses.length === 0) {
			alert("Vui lòng chọn ít nhất một lớp để đăng ký!");
			return;
		}

		try {
			await api.post("/it5023e/register_class", {
				token: userInfo.token,
				class_ids: selectedClasses,
			});

			alert("Đã gửi đăng ký lớp thành công!");
			console.log("Register success!");
			setTableData([]); // Reset table data
		} catch (error) {
			console.error("Error submitting registration:", error);
			alert("Không thể gửi đăng ký. Vui lòng thử lại!");
		}
	};

	const handleRegisterClass = async () => {
		if (!classId) {
			alert("Vui lòng nhập mã lớp học!");
			return;
		}
		// Kiểm tra nếu mã lớp đã tồn tại
		const classExists = tableData.some((row) => row[0] === classId);
		if (classExists) {
			alert("Lớp học đã tồn tại trong danh sách!");
			return;
		}

		try {
			const response = await api.post("/it5023e/get_basic_class_info", {
				token: userInfo.token,
				role: "STUDENT",
				account_id: userInfo.id,
				class_id: classId,
			});

			const classInfo = response.data.data;
			const newRow = [
				classInfo.class_id,
				classInfo.class_name,
				classInfo.class_type,
				classInfo.start_date,
				classInfo.end_date,
				classInfo.status,
				false, // Default for checkbox
			];

			setTableData((prevTableData) => [...prevTableData, newRow]);
			setClassId(""); // Clear input field
		} catch (error) {
			console.error("Error fetching class info:", error);
			alert("Không thể lấy thông tin lớp học. Vui lòng thử lại!");
		}
	};

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
						value={classId}
						onChangeText={setClassId}
					/>
				</View>
				<View className="basis-[35%] flex justify-center items-center bg-red-700 rounded-lg">
					<TouchableOpacity onPress={handleRegisterClass}>
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
									className="bg-red-600 h-11"
									textStyle={styles.textHeader}
								/>
							</Table>
							<ScrollView style={styles.dataWrapper}>
								<Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
									{tableData.map((rowData, index) => (
										<TableWrapper className="flex flex-row" key={index}>
											{rowData.map((cellData, cellIndex) => (
												<Cell
													key={cellIndex}
													data={
														cellIndex === rowData.length - 1 ? (
															<CheckBox
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
						Tổng số lớp đã đăng ký: <Text className="text-red-600 font-bold">{tableData.length}</Text>
					</Text>
				</View>
			</View>
			<View className="flex flex-row mt-10 justify-center gap-x-3">
				<View
					className="flex justify-center items-center
                 bg-red-700 rounded-lg px-5 py-1"
				>
					<TouchableOpacity onPress={handleSubmitRegister}>
						<Text className="text-white italic font-bold text-lg">Gửi đăng ký</Text>
					</TouchableOpacity>
				</View>
				<View
					className="flex justify-center items-center
                 bg-red-700 rounded-lg px-5 py-1"
				>
					<TouchableOpacity onPress={handleDeleteClasses}>
						<Text className="text-white italic font-bold text-lg">Xóa lớp</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="flex justify-center items-center mt-10 ">
				<TouchableOpacity onPress={() => openModalListClass()}>
					<Text className="text-base text-red-600 underline font-bold italic">
						Thông tin danh sách các lớp mở
					</Text>
				</TouchableOpacity>
			</View>
			<Modal isVisible={isOpenModal} onBackdropPress={(e) => closeModalListClass(e)}>
				<View className="w-full bg-white rounded-xl">
					<View className="mt-4 justify-between flex-row items-center">
						<Text className="text-lg ml-24">Danh sách lớp mở</Text>

						<TouchableOpacity className="mr-5" onPress={() => closeModalListClass()}>
							<Ionicons name="close-outline" size={28} color="gray" className="" />
						</TouchableOpacity>
					</View>
					<View className="p-4 pt-4 h-[400px]">
						<ScrollView horizontal={true}>
							<View>
								<Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
									<Row
										data={tableHeadOpen}
										widthArr={widthArrOpen}
										// style={styles.header}
										className="bg-red-600 h-11"
										textStyle={styles.textHeader}
									/>
								</Table>
								<ScrollView style={styles.dataWrapper}>
									<Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
										{tableDataOpen.map((rowData, index) => (
											<TableWrapper
												style={{
													paddingBottom: 5,
													borderColor: "black",
													display: "flex",
													flexDirection: "row",
												}}
											>
												{rowData.map((cellData, cellIndex) => (
													<Cell
														data={cellData}
														textStyle={styles.textRecoder}
														width={widthArrOpen[cellIndex]}
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
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
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
});

export default RegisterClassScreenSVien;
