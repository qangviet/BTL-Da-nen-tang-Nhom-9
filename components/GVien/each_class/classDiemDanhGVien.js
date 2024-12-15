import React, { useState, useEffect } from "react";

import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import dayjs from "dayjs";
import { Dropdown } from "react-native-element-dropdown";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import CheckBox from "react-native-check-box";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "react-native-ui-datepicker";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { startLoading, stopLoading } from "../../../redux/loadingSlice";
import { useNavigation } from "@react-navigation/native";
const ClassDiemDanhGVien = ({ route }) => {
	const navigation = useNavigation();
	const isFocused = useIsFocused(); // Hook để kiểm tra screen có đang focus hay không
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.loading.isLoading);
	const { params } = route;
	console.log(">>>>>>> ClassDiemdanh");
	console.log("params: ", params);
	const currentScreen = useSelector((state) => state.navigation.currentScreen);

	useEffect(() => {
		if (currentScreen !== "ClassScreenGVien") {
			if (isFocused) {
				navigation.navigate(currentScreen);
			}
		}
	}, [currentScreen]);

	const widthArr = [50, 90, 180, 100];

	const tableHead = ["STT", "MSSV", "Họ và tên", "Có mặt"];

	const [dsSinhVien, setDsSinhVien] = useState([]);
	const [absentStudentIds, setAbsentStudentIds] = useState([]);
	console.log("Absent ids: ", absentStudentIds);

	const [attendances, setAttendances] = useState([]);

	const [absentRequests, setAbsentRequests] = useState([]);

	const [acceptedStudentIds, setAcceptedStudentIds] = useState([]);

	const [studentId_accountId, setStudentId_AccountId] = useState({});

	const format_Date = (date) => {
		return dayjs(date).format("YYYY-MM-DD");
	};

	const [dateCheck, setDateCheck] = useState(format_Date(dayjs()));
	const [DATES, setDATES] = useState([]);

	const [isCheckAbsent, setIsCheckAbsent] = useState(false);
	const displayAbsent = () => {
		setIsCheckAbsent(true);
	};
	const hideAbsent = () => {
		setIsCheckAbsent(false);
	};

	const [viewDescription, setViewDescription] = useState(-1);

	const renderItem = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>{item.label}</Text>
			</View>
		);
	};

	const selectRow = (index_r, index_c) => {
		dispatch(startLoading());
		let newDsSinhVien = [...dsSinhVien];
		newDsSinhVien[index_r].present = !newDsSinhVien[index_r].present;
		setDsSinhVien(newDsSinhVien);

		let newAbsentStudentIds = [...absentStudentIds];
		if (newDsSinhVien[index_r].present) {
			const index = newAbsentStudentIds.indexOf(newDsSinhVien[index_r].student_id);
			if (index !== -1) {
				newAbsentStudentIds.splice(index, 1); // Xóa phần tử
			}
		} else {
			if (!newAbsentStudentIds.includes(newDsSinhVien[index_r].student_id)) {
				newAbsentStudentIds.push(newDsSinhVien[index_r].student_id);
			}
		}
		setAbsentStudentIds(newAbsentStudentIds);
		dispatch(stopLoading());
	};

	const fetchStudents = async () => {
		dispatch(startLoading());
		try {
			const response = await api.post("/it5023e/get_class_info", {
				token: params.token,
				class_id: params.class.id,
			});

			if (response.data.meta.code === "1000") {
				const fetchedData = response.data.data.student_accounts.map((item, index) => ({
					stt: index + 1,
					student_id: item.student_id,
					student_name: item.first_name + " " + item.last_name,
					present: true,
					student_account_id: item.account_id,
				}));

				let studentMap = {};
				fetchedData.forEach(student => {
					studentMap[student.student_id] = student.student_account_id;
				});
				setStudentId_AccountId(studentMap);

				const temp_attendances = await fetchAttendences();
				if (temp_attendances != null) {
					let absentList = temp_attendances
						.filter((attendance) => attendance.status !== "PRESENT")
						.map((attendance) => attendance.student_id);
					setAbsentStudentIds(absentList);

					let newDsSinhVien = [...fetchedData];
					newDsSinhVien.forEach((student) => {
						if (absentList.includes(student.student_id)) {
							student.present = false;
						}
					});
					setDsSinhVien(newDsSinhVien);
				} else {
					// xcvb;
					setDsSinhVien(fetchedData);
				}
				dispatch(stopLoading());
			} else {
				dispatch(stopLoading());

				console.error("API error:", response.data.message);
			}
		} catch (error) {
			dispatch(stopLoading());
			console.error(
				`Error fetching documents - Api get_class_info - Data: token: ${params.token}, class_id: ${params.class.id}`,
				error
			);
		}
	};

	const fetchDates = async () => {
		dispatch(startLoading());
		try {
			const response = await api.post("/it5023e/get_attendance_dates", {
				token: params.token,
				class_id: params.class.id,
			});

			if (response.data.meta.code === "1000") {
				const fetchedData = response.data.data.map((item) => ({
					value: item,
					label: item,
				}));

				let newItem = { value: format_Date(dayjs()), label: format_Date(dayjs()) };
				let exists = fetchedData.some((item) => item.value === newItem.value && item.label === newItem.label);
				if (!exists) {
					fetchedData.push(newItem);
				}

				fetchedData.sort((a, b) => new Date(b.value) - new Date(a.value));
				setDATES(fetchedData);
				console.log("Dates: ", DATES);
				dispatch(stopLoading());
			} else {
				console.error("API error:", response.data.message);
				dispatch(stopLoading());
			}
		} catch (error) {
			dispatch(stopLoading());
			console.error(
				`Error fetching documents - Api get_attendance_dates - Data: token: ${params.token}, class_id: ${params.class.id}`,
				error
			);
		}
	};

	const sendNoti = async (student_account_id, message, noti_type) => {
		try {
			console.log("Noti type:...", noti_type);
			console.log("Account Id:...", student_account_id);
			console.log("Message:...", message);
			console.log("Token:", params.token);
			const response = await axios.post(
				"http://157.66.24.126:8080/it5023e/send_notification",
				{
					token: params.token,
					message: message,
					toUser: student_account_id,
					type: noti_type,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.data.meta.code === "1000") {
				console.log("Gửi thông báo thành công!...");
			} else {
				console.error("API error:", response.data.meta.message);
			}
		} catch (error) {
			console.error("API call failed: ", error);
			console.error(error.response.data);
		}
	}

	const fetchAttendences = async () => {
		dispatch(startLoading());
		try {
			const response = await api.post("/it5023e/get_attendance_list", {
				token: params.token,
				class_id: params.class.id,
				date: dateCheck,
			});

			if (response.data.meta.code === "1000") {
				const fetchedData = response.data.data.attendance_student_details.map((item) => ({
					attendance_id: item.attendance_id,
					student_id: item.student_id,
					status: item.status,
				}));
				dispatch(stopLoading());
				setAttendances(fetchedData);
				return fetchedData;
			} else {
				console.error("API error:", response.data.message);
			}
		} catch (error) {
			console.log(
				"Error fetching attendences - data: ",
				`Token: ${params.token}, Class_id: ${params.class.id}, Date: ${dateCheck}`
			);
			console.error("Error fetching attendences:", error);
		}
		dispatch(stopLoading());
	};

	const fetchAbsentRequests = async () => {
		dispatch(startLoading());
		try {
			const response = await api.post("/it5023e/get_absence_requests", {
				token: params.token,
				class_id: params.class.id,
				date: dateCheck,
			});

			if (response.data.meta.code === "1000") {
				const fetchedData = response.data.data.page_content.map((item) => ({
					request_id: item.id,

					student_name: item.student_account.first_name + " " + item.student_account.last_name,
					student_account_id: item.student_account.account_id,
					student_id: item.student_account.student_id,

					title: item.title,
					reason: item.reason,
					status: item.status,
					file_url: item.file_url,
				}));
				let sortedRequests = fetchedData.sort((a, b) => {
					if (a.status === "PENDING" && b.status !== "PENDING") return -1;
					if (a.status !== "PENDING" && b.status === "PENDING") return 1;
					return 0;
				});
				setAbsentRequests(sortedRequests);

				let temp_acceptedStudentIds = sortedRequests
					.filter((request) => request.status === "ACCEPTED")
					.map((request) => request.student_id);
				setAcceptedStudentIds(temp_acceptedStudentIds);
				dispatch(stopLoading());
			} else {
				dispatch(stopLoading());

				console.error("API error:", response.data.message);
			}
		} catch (error) {
			dispatch(stopLoading());
			console.error(
				`Error fetching documents - Api get_absence_requests - Data: token: ${params.token}, 
				class_id: ${params.class.id}, data: ${dateCheck}`,
				error
			);
		}
	};

	useEffect(() => {
		dispatch(startLoading());
		fetchDates();
		fetchStudents();
		fetchAbsentRequests();

		// fetchAttendences();
		setAbsentStudentIds([]);
		dispatch(stopLoading());
	}, [dateCheck]);

	console.log("attendences: ", attendances);
	console.log("Students: ", dsSinhVien);

	useEffect(() => {
		fetchAbsentRequests();
	}, [viewDescription]);

	console.log("Accepted ids: ", acceptedStudentIds);

	const reviewRequest = async (request_id, status, student_account_id) => {
		dispatch(startLoading());
		try {
			const response = await api.post("/it5023e/review_absence_request", {
				token: params.token,
				request_id: request_id,
				status: status,
			});

			if (response.data.meta.code === "1000") {
				console.log("Request reviewed!");
				if (status === "ACCEPTED") {
					sendNoti(student_account_id, `Yêu cầu xin nghỉ lớp ${params.class.id} ngày ${format_Date(dateCheck)} của bạn đã được chấp nhận`, "ACCEPT_ABSENCE_REQUEST");
				} else {
					sendNoti(student_account_id, `Yêu cầu xin nghỉ lớp ${params.class.id} ngày ${format_Date(dateCheck)} của bạn đã bị từ chối`, "REJECT_ABSENCE_REQUEST");
				}
			} else {
				console.error("API error:", response.data.message);
			}
			dispatch(stopLoading());
		} catch (error) {
			console.error(
				`Error fetching documents - Api review_absence_request - Data - token: ${params.token}, 
				request_id: ${request_id}, status: ${status} `,
				error
			);
		}
	};

	function acceptRequest(request_id, student_account_id) {
		setViewDescription(-1);
		reviewRequest(request_id, "ACCEPTED", student_account_id);
	}

	function rejectRequest(request_id, student_account_id) {
		setViewDescription(-1);
		reviewRequest(request_id, "REJECTED", student_account_id);
	}

	const takeAttendence = async () => {
		dispatch(startLoading());
		try {
			const response = await api.post("/it5023e/take_attendance", {
				token: params.token,
				class_id: params.class.id,
				date: dateCheck,
				attendance_list: absentStudentIds,
			});

			if (response.data.meta.code === "1000") {
				dispatch(stopLoading());
				alert("Điểm danh thành công!");
			} else {
				dispatch(stopLoading());

				console.error("API error:", response.data.message);
			}
		} catch (error) {
			dispatch(stopLoading());
			console.error(
				`Error fetching documents - Api take_attendance - Data - token: ${params.token}, 
				date: ${dateCheck}, attendance_list: ${absentStudentIds} `,
				error
			);
		}
	};

	const setAttendanceStatus = async (attendance_id, student_account_id) => {
		dispatch(startLoading());
		try {
			const response = await api.post("/it5023e/set_attendance_status", {
				token: params.token,
				status: "EXCUSED_ABSENCE",
				attendance_id: attendance_id,
			});

			if (response.data.meta.code === "1000") {
				console.log("Đổi Excused thành công: ", attendance_id);
				sendNoti(student_account_id, `Cập nhật trạng thái điểm danh lớp ${params.class.id} ngày ${format_Date(dateCheck)}: Vắng có phép`, "ABSENCE");
			} else {
				console.error("API error:", response.data.message);
			}
			dispatch(stopLoading());
		} catch (error) {
			dispatch(stopLoading());
			console.error(
				`Error fetching documents - Api take_attendance - Data - token: ${params.token}, 
				status: "EXCUSED_ABSENCE", attendance_id: ${attendance_id} `,
				error
			);
		}
	};

	const submitDiemDanh = async () => {
		dispatch(startLoading());
		await takeAttendence();
		dispatch(startLoading());
		const temp_attendances = await fetchAttendences();
		console.log("2 attendences: ", temp_attendances);

		temp_attendances.forEach((attendance) => {
			let student_account_id = studentId_accountId[attendance.student_id];
			if (absentStudentIds.includes(attendance.student_id) && acceptedStudentIds.includes(attendance.student_id) && attendance.status !== "PRESENT") {
				setAttendanceStatus(attendance.attendance_id, student_account_id);
			} else if (attendance.status === "PRESENT") {
				sendNoti(student_account_id, `Cập nhật trạng thái điểm danh lớp ${params.class.id} ngày ${format_Date(dateCheck)}: Có mặt`, "ABSENCE");
			} else {
				sendNoti(student_account_id, `Cập nhật trạng thái điểm danh lớp ${params.class.id} ngày ${format_Date(dateCheck)}: Vắng không phép`, "ABSENCE");
			}

		});

		dispatch(stopLoading());
	};

	// console.log("studentId_accountId: ", studentId_accountId);
	console.log("absent requests: ", absentRequests);

	const checkAbsent = (date) => {
		//  Fetch api

		const displayDescription = (absent_index) => {
			setViewDescription(absent_index);
		};

		const hideDescription = () => {
			setViewDescription(-1);
		};

		return (
			<View>
				{absentRequests != [] ? (
					<View>
						<View className="border-t border-gray-400">
							<TouchableOpacity onPress={hideAbsent}>
								<Text className="text-lg pt-2 underline self-center text-red-700">
									Quay lại điểm danh
								</Text>
							</TouchableOpacity>
							{absentRequests.map((item, index) => {
								return (
									<View key={index} className="mx-3 bg-white rounded-lg my-2 border border-gray-300">
										<TouchableOpacity
											className="flex-row justify-between"
											onPress={() => displayDescription(index)}
										>
											<View>
												<Text className="text-lg font-bold px-5 pt-2">
													{item.student_name + " - " + item.student_id}
												</Text>
												<Text className="px-5 pt-1 pb-2 text-lg">{item.title}</Text>
											</View>
											<View className="justify-center mr-5">
												{item.status === "PENDING" ? (
													<Text className="text-red-600 italic font-bold text-base">
														PENDING
													</Text>
												) : (
													<Text className="text-base">{item.status}</Text>
												)}
											</View>
										</TouchableOpacity>
									</View>
								);
							})}
						</View>
						{viewDescription >= 0 && (
							<Modal isVisible={viewDescription >= 0 ? true : false} onBackdropPress={hideDescription}>
								<View className="h-[60%] bg-gray-200 rounded-lg p-3">
									<View>
										<TouchableOpacity
											onPress={() => setViewDescription(-1)}
											className="h-9 justify-center self-end"
										>
											<Ionicons
												name="close-outline"
												size={28}
												color="gray"
												className="self-end mt-2 mr-3"
											/>
										</TouchableOpacity>
									</View>
									<View className="mx-4">
										<Text className="text-2xl font-bold">
											{absentRequests[viewDescription].title}
										</Text>
										<Text className="text-lg mt-2 text-gray-600">
											{absentRequests[viewDescription].student_name} -{" "}
											{absentRequests[viewDescription].student_id}
										</Text>
									</View>
									<View className="border-t border-gray-400 mx-4 mt-4"></View>
									<View className="mt-4 mx-4 rounded-md">
										<Text className="text-base">{absentRequests[viewDescription].reason}</Text>
										<View className="gap-x-1 pt-6">
											<Text className="font-semibold text-base">File đính kèm:</Text>
											<TouchableOpacity>
												<Text className="text-blue-500 underline text-base">
													{absentRequests[viewDescription].file_url}
												</Text>
											</TouchableOpacity>
										</View>
									</View>
									<View className="flex-row justify-center mt-10">
										<TouchableOpacity
											className="rounded-lg bg-red-600 h-10 mr-8 justify-center p-2"
											onPress={() => acceptRequest(absentRequests[viewDescription].request_id, absentRequests[viewDescription].student_account_id)}
										>
											<Text className="self-center text-white text-base font-bold">
												Chấp nhận
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											className="rounded-lg bg-red-600 h-10 justify-center p-2"
											onPress={() => rejectRequest(absentRequests[viewDescription].request_id, absentRequests[viewDescription].student_account_id)}
										>
											<Text className="self-center text-white text-base font-bold">Từ chối</Text>
										</TouchableOpacity>
									</View>
								</View>
							</Modal>
						)}
					</View>
				) : (
					<View>
						<Text>Không có yêu cầu vắng mặt trong ngày này</Text>
					</View>
				)}
			</View>
		);
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
						data={DATES}
						search
						maxHeight={400}
						labelField="label"
						valueField="value"
						placeholder="Chọn ngày"
						searchPlaceholder="Tìm kiếm..."
						value={dateCheck}
						onChange={(item) => {
							setDateCheck(item.value);
							hideAbsent();
						}}
						renderItem={(item) => renderItem(item)}
					/>
				</View>
			</View>

			{isCheckAbsent ? (
				checkAbsent(dateCheck)
			) : (
				<>
					<View className="border-t border-gray-400">
						<TouchableOpacity onPress={displayAbsent}>
							<Text className="text-lg pt-2 underline self-center text-red-700">
								Yêu cầu xin vắng mặt ({absentRequests.length})
							</Text>
						</TouchableOpacity>
					</View>
					<View className="max-h-[70%] mt-3 ml-1 mr-1">
						{dsSinhVien != [] && (
							<ScrollView horizontal={true}>
								<View className="border-t">
									<Table
										borderStyle={{
											borderWidth: 1,
											borderColor: "darkgray",
										}}
									>
										<Row
											data={tableHead}
											widthArr={widthArr}
											textStyle={{
												textAlign: "center",
												fontSize: 16,
												padding: 5,
												color: "#fff",
												fontWeight: "600",
											}}
											className="bg-red-600"
										/>
									</Table>
									<ScrollView>
										<Table
											borderStyle={{
												borderWidth: 1,
												borderColor: "lightgray",
											}}
										>
											{dsSinhVien.map((rowData, index_r) => {
												return (
													<TableWrapper
														key={index_r}
														style={{
															display: "flex",
															flexDirection: "row",
														}}
													>
														{Object.values(rowData)
															.slice(0, -1)
															.map((cellData, index_c) => {
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
									<Table
										borderStyle={{
											borderWidth: 1,
											borderColor: "darkgray",
										}}
									>
										<Row
											data={[
												"Tổng",
												dsSinhVien.length,
												dsSinhVien.length - absentStudentIds.length,
												"",
											]}
											textStyle={{
												textAlign: "center",
												fontSize: 16,
												padding: 2,
												fontWeight: "500",
												color: "white",
											}}
											widthArr={[
												widthArr[0],
												widthArr[1] + widthArr[2],
												widthArr[3],
												widthArr[4],
											]}
											className="bg-red-600"
										/>
									</Table>
								</View>
							</ScrollView>
						)}
					</View>
					<View className="bg-red-600 mx-auto rounded-lg mt-5">
						<TouchableOpacity onPress={() => submitDiemDanh()}>
							<Text
								className="text-lg px-4 py-2 
                        text-white font-semibold"
							>
								Submit
							</Text>
						</TouchableOpacity>
					</View>
				</>
			)}
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
