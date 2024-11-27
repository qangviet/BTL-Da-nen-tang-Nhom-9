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
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import Feather from "@expo/vector-icons/Feather";
import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import api from "../../api";

const EditClassScreenGVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const param = useSelector((state) => state.navigation.params);
	console.log(param);
	

	useEffect(() => {
		if (currentScreen !== "EditClassScreenGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	function goBack() {
		dispatch(goBackMavigation());
	}

	const listStatus = [
		{ label: "COMPLETED", value: "COMPLETED" },
		{ label: "UPCOMING", value: "UPCOMING" },
		{ label: "ACTIVE", value: "ACTIVE" },
	];

	const [modalStartDate, setModalStartDate] = useState(false);
	//const [startDate, setStartDate] = useState(null);
	const [modalEndDate, setModalEndDate] = useState(false);
	//const [endDate, setEndDate] = useState(null);


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
		if (date!=null)
		{
			return dayjs(date).format("DD/MM/YYYY");
		}
		else return date;
	};

	const modifyDate = (dateString) => {
		return new Date(dateString).toISOString().split('T')[0];
	  };

	const [startDate, setStartDate] = useState(param.classData[3]);
	const [endDate, setEndDate] = useState(param.classData[4]);
	//const [typeClass, setTypeClass] = useState(param.classData[2]);
	const [classID, setClassID] = useState(param.classData[0]);
	const [className, setClassName] = useState(param.classData[1]);
	const [typeStatus, setTypeStatus] = useState(param.classData[5]);
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


	const saveClassInfo = async () => {
		console.log("Saving class info:");
		setConfirmSave(false);
		if (!classID || !className || !typeStatus || !startDate || !endDate ) {
			alert("Vui lòng nhập đầy đủ thông tin lớp học!");
			return;
		}
		try {
			const response = await api.post("/it5023e/edit_class", {
					token: param.token,
			    class_id: classID,
			    class_name: className,
			    status: typeStatus,
			    start_date: modifyDate(startDate),
			    end_date: modifyDate(endDate),
				});
				
	
			if (response.status === 200) {
			    alert("Lớp học đã được lưu thành công!");
					console.log(response.data);
					goBack();
			} else {
			    alert("Chỉnh sửa lớp học không thành công. Vui lòng thử lại.");
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
		
	const deleteClass = async () => {
		console.log("Deleting class");
		setConfirmDelete(false);
		try {
			const response = await api.post("/it5023e/delete_class", {
					token: param.token,
			    role: param.role == 1 ? "STUDENT" : "LECTURER",
				account_id = param.userInfo.id,
				class_id: classID
				});
				
	
			if (response.status === 200) {
			    alert("Lớp học đã được xóa thành công!");
					console.log(response.data);
					goBack();
			} else {
			    alert("Xóa lớp học không thành công. Vui lòng thử lại.");
			}
		  } catch (error) {
				// console.error(error.response.data.meta.code);
				if (error.response.data.meta.code === "9994") {
					console.error("Error Data:", error.response.data); 
					console.error("Error Status:", error.response.status);
					alert("Lớp không tồn tại");
				} else {
					alert("Thông tin lớp không hợp lệ");
					console.error("Error:", error.message);
				}
			}
		};
	}

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
					value={classID}
    				onChangeText={(text) => setClassID(text)}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
				/>
				{/* <TextInput
					placeholder="Tên lớp*"
					placeholderTextColor={"#e86456"}
					defaultValue={currentClass.name_subject}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
				/> */}
				<TextInput
					placeholder="Tên lớp*"
					placeholderTextColor={"#e86456"}
					value={className}
    				onChangeText={(text) => setClassName(text)}
					className="border border-red-600 py-2 px-3 my-2 font-semibold text-lg text-red-700"
				/>
				{/* <View>
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
				</View> */}
				
				<View className="flex flex-row justify-between my-2">
					<View className="basis-[48%] ">
						<TouchableOpacity
							className="py-2 px-2 bg-white border border-red-500 relative"
							onPress={chooseStartDate}
						>
							<Text className="text-red-400 text-lg">
								{startDate ? modifyDate(startDate) : "Bắt đầu*"}
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
								{endDate ? modifyDate(endDate) : "Kết thúc*"}
							</Text>
							<View className="absolute right-2 top-3">
								<Feather name="chevron-down" size={22} color="#f87171" />
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={listStatus}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder="Status*"
						value={typeStatus}
						onChange={(item) => {
							setTypeStatus(item.value);
						}}
						renderLeftIcon={() => (
							<AntDesign style={styles.icon} color="black" name="Safety" size={20} />
						)}
						renderItem={(item) => renderItem(item, typeClass)}
					/>
				</View>

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
			</View>
			<Modal isVisible={confirmSave} onBackdropPress={() => closeModalConfirmSave()}>
				<View className="bg-white rounded-xl self-center">
					<View>
						<View className="self-end px-3 py-3">
							<TouchableOpacity onPress={closeModalConfirmSave}>
								<AntDesign name="close" size={24} color="gray" />
							</TouchableOpacity>
						</View>
					
					</View>
					<Text className="text-xl font-semibold self-center px-5 py-2 my-3">
						Xác nhận lưu thông tin lớp học?
					</Text>
					<View className="flex flex-row justify-end px-5 py-3">
						<View className="bg-blue-400 px-4 py-2 rounded-lg mx-2">
							<TouchableOpacity onPress={() => setConfirmSave(false)}>
								<Text className="text-base text-white">Hủy</Text>
							</TouchableOpacity>
						</View>
						<View className="bg-red-600 px-4 py-2 mx-2 rounded-lg">
							<TouchableOpacity onPress={() => saveClassInfo()}>
								<Text className="text-base text-white">Lưu</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<Modal isVisible={confirmDelete} onBackdropPress={() => closeModalConfirmDelete()}>
				<View className="bg-white rounded-xl self-center">
					<View>
						<View className="self-end px-3 py-3">
							<TouchableOpacity onPress={closeModalConfirmDelete}>
								<AntDesign name="close" size={24} color="gray" />
							</TouchableOpacity>
						</View>
					</View>
					<Text className="text-xl font-semibold self-center px-5 py-2 my-3">
						Xác nhận xóa lớp học?
					</Text>
					<View className="flex flex-row justify-end px-5 py-3">
						<View className="bg-blue-400 px-4 py-2 rounded-lg mx-2">
							<TouchableOpacity onPress={() => setConfirmDelete(false)}>
								<Text className="text-base text-white">Hủy</Text>
							</TouchableOpacity>
						</View>
						<View className="bg-red-600 px-4 py-2 mx-2 rounded-lg">
							<TouchableOpacity onPress={() => deleteClass()}>
								<Text className="text-base text-white">Xóa</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<Modal isVisible={modalStartDate} onBackdropPress={closeModalStartDate}>
				<View className="px-6 bg-gray-200 rounded-lg pb-5">
					<View className="mt-2">
						<DateTimePicker
							mode="single"
							date={startDate}
							initialView="day"
							timePicker={false}
							onChange={(params) => {
								setStartDate(formatDate(params.date));
							}}
						/>
					</View>
					{startDate && (
						<View className="flex flex-row gap-x-1 items-center">
							<Text>Thời gian bắt đầu:</Text>
							<Text className="text-md font-semibold">{startDate}</Text>
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
								setEndDate(formatDate(params.date));
							}}
						/>
					</View>
					{endDate && (
						<View className="flex flex-row gap-x-1 items-center">
							<Text>Thời gian kết thúc:</Text>
							<Text className="text-md font-semibold">{endDate}</Text>
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
//a
export default EditClassScreenGVien;
