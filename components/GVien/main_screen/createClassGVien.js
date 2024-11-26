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

import { goBack as goBackNavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import api from "../../api";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import Feather from "@expo/vector-icons/Feather";

const CreateClassScreenGVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const param = useSelector((state) => state.navigation.params);
	//console.log(param)

	useEffect(() => {
		if (currentScreen !== "CreateClassScreenGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	const listTypeClass = [
		{ label: "LT", value: "LT" },
		{ label: "BT", value: "BT" },
		{ label: "LT_BT", value: "LT_BT" },
	];

	const [typeClass, setTypeClass] = useState(null);
	const [classId, setClassId] = useState("");
    const [className, setClassName] = useState("");
	const [maxStudentAmount, setMaxStudentAmount] = useState("");
	const modifyDate = (dateString) => {
		return new Date(dateString).toISOString().split('T')[0];
	  };

	const [isOpenModal, setIsOpenModal] = useState(false);

	const openModalListClass = () => {
		setIsOpenModal(true);
	};

	const closeModalListClass = (e) => {
		setIsOpenModal(false);
	};

	function goBack() {
		dispatch(goBackNavigation());
	}

	const [modalStartDate, setModalStartDate] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [modalEndDate, setModalEndDate] = useState(false);
	const [endDate, setEndDate] = useState(null);

	const chooseStartDate = () => {
		setModalStartDate(true);
	};
	const closeModalStartDate = () => {
		setModalStartDate(false);
	};
	const chooseEndDate = () => {
		setModalEndDate(true);
	};
	const closeModalEndDate = () => {
		setModalEndDate(false);
	};
	const formatDate = (date) => {
		return dayjs(date).format("DD/MM/YYYY");
	};
	//Call API create_class
	const handleCreateClass = async () => {
		console.log()
		console.log("Tạo lớp học đã được nhấn");
        if (!classId || !className || !typeClass || !startDate || !endDate || !maxStudentAmount ) {
			alert("Vui lòng nhập đầy đủ thông tin lớp học!");
			return;
		}	
		console.log("Token:", param.token, "Type:", typeof param.token);
		console.log("Class ID:", classId, "Type:", typeof classId);
		console.log("Class Name:", className, "Type:", typeof className);
		console.log("Class Type:", typeClass, "Type:", typeof typeClass);
		console.log("Start Date:", modifyDate(startDate), "Type:", typeof modifyDate(startDate));
		console.log("End Date:", modifyDate(endDate), "Type:", typeof modifyDate(endDate));
		console.log("Parsed Max Student Amount:", parseInt(maxStudentAmount), "Type:", typeof parseInt(maxStudentAmount));

        try {
            const response = await api.post("/it5023e/create_class", {
				token: param.token,
                class_id: classId,
                class_name: className,
                class_type: typeClass,
                start_date: modifyDate(startDate),
                end_date: modifyDate(endDate),
                max_student_amount: parseInt(maxStudentAmount)
			});
			

            if (response.status === 200) {
                alert("Lớp học đã được tạo thành công!");
				console.log(response.data);
				goBack();
            } else {
                alert("Tạo lớp học không thành công. Vui lòng thử lại.");
            }
        } catch (error) {
			// console.error(error.response.data.meta.code);
			if (error.response.data.meta.code === "1004") {
				console.error("Error Data:", error.response.data); 
				console.error("Error Status:", error.response.status);
				alert("Lớp đã tồn tại");
			} else {
				alert("Thông tin lớp không hợp lệ");
				console.error("Error:", error.message);
			}
		}
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
					<TouchableOpacity onPress={() => goBack()}>
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
					value={classId} // Liên kết với state
    				onChangeText={(text) => setClassId(text)} // Cập nhật state
				/>
				<TextInput
					placeholder="Tên lớp*"
					placeholderTextColor={"#e86456"}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
					value={className}
    				onChangeText={(text) => setClassName(text)}
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
				<View className="flex flex-row justify-between my-2">
					<View className="basis-[48%] ">
						<TouchableOpacity
							className="py-2 px-2 bg-white border border-red-500 relative"
							onPress={chooseStartDate}
						>
							<Text className="text-red-400 text-lg">
								{startDate ? formatDate(startDate) : "Bắt đầu*"}
							</Text>
							<View className="absolute right-2 top-3">
								<Feather name="chevron-down" size={22} color="#f87171" />
							</View>
						</TouchableOpacity>
					</View>
					<View className="basis-[48%] ">
						<TouchableOpacity
							className="py-2 px-2 bg-white border border-red-500 relative"
							onPress={chooseEndDate}
						>
							<Text className="text-red-400 text-lg">
								{endDate ? formatDate(endDate) : "Kết thúc*"}
							</Text>
							<View className="absolute right-2 top-3">
								<Feather name="chevron-down" size={22} color="#f87171" />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<TextInput
					placeholder="Số lượng sinh viên tối đa*"
					placeholderTextColor={"#e86456"}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
					onChangeText={(text) => setMaxStudentAmount(text)}
    				keyboardType="numeric" // Chỉ nhập số
				/>
				<View className="mx-auto py-2 px-4 bg-red-700 rounded-lg mt-10">
					<TouchableOpacity onPress={() => handleCreateClass()}>
						<Text className="text-white italic text-xl font-bold">Tạo lớp học</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Modal isVisible={modalStartDate} onBackdropPress={closeModalStartDate}>
				<View className="px-6 bg-gray-200 rounded-lg pb-5">
					<View className="mt-2">
						<DateTimePicker
							mode="single"
							date={startDate}
							initialView="day"
							timePicker={false}
							onChange={(params) => {
								setStartDate(params.date);
							}}
						/>
					</View>
					{startDate && (
						<View className="flex flex-row gap-x-1 items-center">
							<Text>Thời gian bắt đầu:</Text>
							<Text className="text-md font-semibold">{formatDate(startDate)}</Text>
						</View>
					)}
					<View className="flex justify-end flex-row mt-4 mb-2">
						<TouchableOpacity
							className="bg-blue-500 py-2 w-[30%] rounded-lg"
							onPress={closeModalStartDate}
						>
							<Text className="text-white font-mediu self-center">Xong</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<Modal isVisible={modalEndDate} onBackdropPress={closeModalEndDate}>
				<View className="px-6 bg-gray-200 rounded-lg pb-5">
					<View className="mt-2">
						<DateTimePicker
							mode="single"
							date={endDate}
							initialView="day"
							timePicker={false}
							onChange={(params) => {
								setEndDate(params.date);
							}}
						/>
					</View>
					{endDate && (
						<View className="flex flex-row gap-x-1 items-center">
							<Text>Thời gian kết thúc:</Text>
							<Text className="text-md font-semibold">{formatDate(endDate)}</Text>
						</View>
					)}
					<View className="flex justify-end flex-row mt-4 mb-2">
						<TouchableOpacity
							className="bg-blue-500 py-2 w-[30%] rounded-lg"
							onPress={closeModalEndDate}
						>
							<Text className="text-white font-mediu self-center">Xong</Text>
						</TouchableOpacity>
					</View>
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
