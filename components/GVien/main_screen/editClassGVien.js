import React from "react";
import { useState, useEffect } from "react";
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
import { LogoHust } from "./../../logo";
import AntDesign from "@expo/vector-icons/AntDesign";

import Modal from "react-native-modal";

import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";

const EditClassScreenGVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const params = useSelector((state) => state.navigation.params);

	useEffect(() => {
		if (currentScreen !== "MyClassesScreenGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	function goBack() {
		dispatch(goBackMavigation());
	}

	const listTypeClass = [
		{ label: "LT", value: "LT" },
		{ label: "BT", value: "BT" },
		{ label: "LT+BT", value: "LT+BT" },
		{ label: "TH", value: "TH" },
	];
	const listTime = [
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
		{ label: "5", value: "5" },
		{ label: "6", value: "6" },
		{ label: "7", value: "7" },
		{ label: "8", value: "8" },
		{ label: "9", value: "9" },
		{ label: "10", value: "10" },
		{ label: "11", value: "11" },
		{ label: "12", value: "12" },
		{ label: "13", value: "13" },
		{ label: "14", value: "14" },
		{ label: "15", value: "15" },
		{ label: "16", value: "16" },
		{ label: "17", value: "17" },
		{ label: "18", value: "18" },
		{ label: "19", value: "19" },
		{ label: "20", value: "20" },
		{ label: "21", value: "21" },
		{ label: "22", value: "22" },
		{ label: "23", value: "23" },
		{ label: "24", value: "24" },
		{ label: "25", value: "25" },
		{ label: "26", value: "26" },
		{ label: "27", value: "27" },
		{ label: "28", value: "28" },
		{ label: "29", value: "29" },
		{ label: "30", value: "30" },
		{ label: "31", value: "31" },
		{ label: "32", value: "32" },
		{ label: "33", value: "33" },
		{ label: "34", value: "34" },
		{ label: "35", value: "35" },
		{ label: "36", value: "36" },
		{ label: "37", value: "37" },
		{ label: "38", value: "38" },
		{ label: "39", value: "39" },
		{ label: "40", value: "40" },
		{ label: "41", value: "41" },
		{ label: "42", value: "42" },
		{ label: "43", value: "43" },
		{ label: "44", value: "44" },
		{ label: "45", value: "45" },
		{ label: "46", value: "46" },
		{ label: "47", value: "47" },
		{ label: "48", value: "48" },
		{ label: "49", value: "49" },
		{ label: "50", value: "50" },
		{ label: "51", value: "51" },
		{ label: "52", value: "52" },
		{ label: "53", value: "53" },
	];

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

	const currentClass = {
		id_class: "103268",
		id_class_attached: "103269",
		id_subject: "PH1110",
		name_subject: "Vật lý đại cương VI",
		semester: "Kỳ hè-C",
		type_class: "BT",
		status: "Đăng ký chính thức",
		credit: "80",
		number_student: 0,
		name_academic: "VVLKT",
		start_week: "47",
		end_week: "51",
		times: [
			{
				day_in_week: 2,
				time: "15:05-17:35",
				classroom: "D9-102",
			},
			{
				day_in_week: 6,
				time: "15:05-17:35",
				classroom: "D9-101",
			},
			{
				day_in_week: 5,
				time: "12:30-15:00",
				classroom: "D9-101",
			},
		],
	};

	const [startTime, setStartTime] = useState(currentClass.start_week);
	const [endTime, setEndTime] = useState(currentClass.end_week);
	const [typeClass, setTypeClass] = useState(currentClass.type_class);

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

	const [confirmSave, setConfirmSave] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const openModalConfirmSave = () => {
		setConfirmSave(true);
	};
	const closeModalConfirmSave = () => {
		setConfirmSave(false);
	};

	const openModalConfirmDelete = () => {
		setConfirmDelete(true);
	};
	const closeModalConfirmDelete = () => {
		setConfirmDelete(false);
	};

	// console.log(currentClass.end_week);

	return (
		<View>
			<View className="bg-red-700 pt-10 pb-5 relative">
				<View className="absolute left-3 top-8">
					<TouchableOpacity onPress={() => goBack()}>
						<FontAwesome name="long-arrow-left" size={26} color="white" />
					</TouchableOpacity>
				</View>
				<View className="flex justify-center items-center">
					<LogoHust width={110} height={21}></LogoHust>
					<Text className="text-white text-[24px] pt-3">EDIT CLASS</Text>
				</View>
			</View>
			<View className="mt-10 w-[85%] mx-auto">
				<TextInput
					placeholder="Mã lớp*"
					placeholderTextColor={"#e86456"}
					defaultValue={currentClass.id_class}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
				/>
				<TextInput
					placeholder="Mã lớp kèm*"
					placeholderTextColor={"#e86456"}
					defaultValue={currentClass.id_class_attached}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
				/>
				<TextInput
					placeholder="Tên lớp*"
					placeholderTextColor={"#e86456"}
					defaultValue={currentClass.name_subject}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
				/>
				<TextInput
					placeholder="Mã học phần*"
					placeholderTextColor={"#e86456"}
					defaultValue={currentClass.id_subject}
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
					defaultValue={currentClass.credit}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
				/>
				<View className="flex flex-row">
					<View className="mx-auto py-2 px-4 bg-red-700 rounded-lg mt-10">
						<TouchableOpacity onPress={openModalConfirmDelete}>
							<Text className="text-white italic text-xl font-bold">Xóa lớp học</Text>
						</TouchableOpacity>
					</View>
					<View className="mx-auto py-2 px-4 bg-red-700 rounded-lg mt-10">
						<TouchableOpacity onPress={openModalConfirmSave}>
							<Text className="text-white italic text-xl font-bold">Xác nhận</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View className="mx-auto mt-8 ">
					<TouchableOpacity onPress={() => openModalListClass()}>
						<Text className="text-lg text-red-600 underline font-semibold italic">
							Thông tin danh sách các lớp mở
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Modal isVisible={confirmSave} onBackdropPress={() => closeModalConfirmSave()}>
				<View className="bg-gray-300 rounded-xl self-center">
					<View>
						<View className="self-end px-3 py-3">
							<TouchableOpacity onPress={closeModalConfirmSave}>
								<AntDesign name="close" size={24} color="gray" />
							</TouchableOpacity>
						</View>
						<View className="border-t border-gray-400"></View>
					</View>
					<Text className="text-xl font-semibold self-center px-5 py-2 my-3">
						Xác nhận lưu thông tin lớp học?
					</Text>
					<View className="flex flex-row justify-end px-5 py-3">
						<View className="bg-blue-400 px-4 py-2 rounded-lg mx-2">
							<TouchableOpacity>
								<Text className="text-base">Hủy</Text>
							</TouchableOpacity>
						</View>
						<View className="bg-red-400 px-4 py-2 mx-2 rounded-lg">
							<TouchableOpacity>
								<Text className="text-base">Lưu</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<Modal isVisible={confirmDelete} onBackdropPress={() => closeModalConfirmDelete()}>
				<View className="bg-gray-300 rounded-xl self-center">
					<View>
						<View className="self-end px-3 py-3">
							<TouchableOpacity onPress={closeModalConfirmDelete}>
								<AntDesign name="close" size={24} color="gray" />
							</TouchableOpacity>
						</View>
						<View className="border-t border-gray-400"></View>
					</View>
					<Text className="text-xl font-semibold self-center px-5 py-2 my-3">
						Xác nhận xóa lớp học?
					</Text>
					<View className="flex flex-row justify-end px-5 py-3">
						<View className="bg-blue-400 px-4 py-2 rounded-lg mx-2">
							<TouchableOpacity>
								<Text className="text-base">Hủy</Text>
							</TouchableOpacity>
						</View>
						<View className="bg-red-400 px-4 py-2 mx-2 rounded-lg">
							<TouchableOpacity>
								<Text className="text-base">Xóa</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
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
//a
export default EditClassScreenGVien;
