import React, { Suspense, useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
import CheckBox from "react-native-check-box";
import { Table, TableWrapper, Row, Cell, Col } from "react-native-table-component";
import Modal from "react-native-modal";
import { LogoHust } from "./../../logo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import api from "../../api";

const ManageClassesScreenGVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const param = useSelector((state) => state.navigation.params);
	//console.log(param)
	useEffect(() => {
		if (currentScreen !== "MyClassesScreenGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

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

	const [widthArr] = useState([70, 130, 80, 130, 130, 70, 70]);
	const [widthArrOpen] = useState([70, 130, 80, 130, 130, 70, 70]);
	const sumTC = 16;
	const [checkedData, setCheckedData] = useState(null); // Lưu thông tin dòng đã chọn
	const [isEditEnabled, setIsEditEnabled] = useState(false); // Điều kiện để bật/tắt nút "Chỉnh sửa"
	const [tableData, setTableData] = useState([]);
	const [tableDataOpen, setTableDataOpen] = useState([]);

	useEffect(() => {
		if (currentScreen !== "MyClassesScreenGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	useEffect(() => {
		// Hàm gọi API để lấy danh sách lớp
		const fetchClassList = async () => {
			// console.log(">>>> LOADED!");
			try {
				const response = await api.post("/it5023e/get_class_list", {
					token: param.token,
					role: param.role == 2 ? "LECTURER" : "STUDENT",
					account_id: "24",
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
					false, // Cột checkbox mặc định là false
				]);
				setTableData(formattedData);
			} catch (error) {
				console.error("Error fetching class list:", error);
				console.error("Error Data:", error.response.data);
				console.error("Error Status:", error.response.status);
			}
		};

		fetchClassList();
	}, [currentScreen]);

	useEffect(() => {
		// Hàm gọi API để lấy danh sách lớp
		const fetchOpenClassList = async () => {
			// console.log(">>>> LOADED!");
			try {
				const response = await api.post("/it5023e/get_open_classes", {
					token: param.token,
					role: param.role == 2 ? "LECTURER" : "STUDENT",
					account_id: "24",
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
			} catch (error) {
				console.error("Error fetching class list:", error);
				console.error("Error Data:", error.response.data);
				console.error("Error Status:", error.response.status);
			}
		};

		fetchOpenClassList();
	}, [currentScreen]);

	function goBack() {
		dispatch(goBackMavigation());
	}

	function goCreateClass() {
		dispatch(
			navigate({
				screen: "CreateClassScreenGVien",
				params: param,
			})
		);
	}

	// Cập nhật trạng thái checkbox khi người dùng chọn hoặc bỏ chọn
	const selectRow = (index, cellIndex) => {
		let temp = [...tableData];
		if (cellIndex === 6) {
			// Cột checkbox
			// Nếu checkbox đã được chọn, bỏ chọn tất cả
			if (temp[index][cellIndex] === false) {
				// Nếu checkbox chưa được chọn thì chọn checkbox đó và bỏ các checkbox khác
				temp.forEach((row, idx) => {
					if (idx !== index) row[6] = false; // Bỏ chọn các checkbox khác
				});
				temp[index][cellIndex] = true; // Chọn checkbox tại dòng hiện tại
				setCheckedData(temp[index]); // Lưu dữ liệu của dòng đã chọn vào checkedData
			} else {
				temp[index][cellIndex] = false; // Nếu đã chọn, bỏ chọn
				setCheckedData(null); // Xóa dữ liệu khi bỏ chọn
			}
			setTableData(temp);
		}
	};

	// Kiểm tra xem có một checkbox được chọn hay không
	useEffect(() => {
		if (checkedData !== null) {
			setIsEditEnabled(true); // Nếu có dòng được chọn, bật nút "Chỉnh sửa"
		} else {
			setIsEditEnabled(false); // Nếu không có dòng nào được chọn, tắt nút "Chỉnh sửa"
		}
	}, [checkedData]);

	// Chuyển đến màn hình chỉnh sửa
	const goEditClass = () => {
		if (checkedData) {
			dispatch(
				navigate({
					screen: "EditClassScreenGVien",
					params: { ...param, classData: checkedData }, // Truyền dữ liệu lớp học vào params
				})
			);
		}
		setCheckedData(null);
	};

	const [isOpenModal, setIsOpenModal] = useState(false);

	const openModalListClass = () => {
		setIsOpenModal(true);
	};

	const closeModalListClass = (e) => {
		setIsOpenModal(false);
	};

	return (
		<ScrollView>
			<View className="bg-red-700 pt-10 pb-5 relative">
				<View className="absolute left-3 top-8">
					<TouchableOpacity onPress={() => goBack()}>
						<FontAwesome name="long-arrow-left" size={26} color="white" />
					</TouchableOpacity>
				</View>
				<View className="flex justify-center items-center">
					<LogoHust width={100} height={20}></LogoHust>
					<Text className="text-white text-[24px] pt-3">CLASS MANAGEMENT</Text>
				</View>
			</View>
			<View className="mt-10 mx-8 flex flex-row">
				<View className="basis-[55%] mx-3 bg-[#f2eceb] border-red-600 border py-2">
					<TextInput
						className=" text-red-600 text-lg px-3"
						placeholder="Mã lớp"
						placeholderTextColor={"#ad1d1d"}
					/>
				</View>
				<View className="basis-[35%] flex justify-center items-center bg-red-700 rounded-lg">
					<TouchableOpacity>
						<Text className="text-white italic font-bold text-lg">Tìm kiếm</Text>
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
								<Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
									{tableData.map((rowData, index) => (
										<TableWrapper
											style={{
												display: "flex",
												flexDirection: "row",
											}}
										>
											{rowData.map((cellData, cellIndex) => (
												<Cell
													data={
														cellIndex === rowData.length - 1 ? (
															<CheckBox
																style={{
																	alignSelf: "center",
																	paddingBottom: 4,
																	paddingTop: 4,
																}}
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
			<View className="flex flex-row mt-10 justify-center gap-x-3">
				<View
					className="flex justify-center items-center
                 bg-red-700 rounded-lg px-5 py-1"
				>
					<TouchableOpacity onPress={() => goCreateClass()}>
						<Text className="text-white italic font-bold text-lg">Tạo lớp học mới</Text>
					</TouchableOpacity>
				</View>
				<View
					className="flex justify-center items-center
                 bg-red-700 rounded-lg px-5 py-1"
				>
					<TouchableOpacity
						onPress={() => goEditClass()}
						disabled={!isEditEnabled} // Vô hiệu hóa nút khi không có checkbox nào được chọn
						style={{
							opacity: isEditEnabled ? 1 : 0.5, // Làm mờ nút khi nó bị vô hiệu hóa
						}}
					>
						<Text className="text-white italic font-bold text-lg">Chỉnh sửa</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="flex justify-center items-center mt-8 ">
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
							<Ionicons
									name="close-outline"
									size={28}
									color="gray"
									className=""
								/>
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
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	header: { backgroundColor: "#537791" },
	textHeader: { textAlign: "center", fontWeight: "700", color: "white" },
	textRecoder: { textAlign: "center", fontWeight: "300", color: "black" },
	dataWrapper: { marginTop: -1 },
	row: { height: 40, backgroundColor: "#fff" },
});
export default ManageClassesScreenGVien;
