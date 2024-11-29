import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LogoHust } from "./../../logo";
import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import api from "../../api";

const MyClassesScreenGVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();
	const state = useSelector((state) => state.navigation);
	const param = useSelector((state) => state.navigation.params)
	//console.log(state)
	//console.log("Current screen: ", state);
	useEffect(() => {
		if (state.currentScreen !== "MyClassesScreenGVien") {
			navigation.navigate(state.currentScreen);
		}
	}, [state.currentScreen]);
	
	useEffect(() => {
		// Gọi API để lấy danh sách lớp học
		const fetchClasses = async () => {
			try {
				const response = await api.post("/it5023e/get_class_list", {
					token: param.token,
					role: param.role == 2 ? "LECTURER" : "STUDENT",
					account_id: "null",
				});

				// Xử lý dữ liệu và cập nhật state
				if (response.data.meta.code === "1000") {
					const fetchedClasses = response.data.data.page_content.map((item) => ({
						id: item.class_id,
						name: item.class_name,
						teacher: item.lecturer_name,
					}));
					setClasses(fetchedClasses);
				} else {
					console.error("Error fetching classes: ", response.data.meta.message);
				}
			} catch (error) {
				console.error("API call failed: ", error);
				console.error("Error fetching class list:", error);
				console.error("Error Data:", error.response.data);
				console.error("Error Status:", error.response.status);
			}
		};

		fetchClasses();
	}, [state.currentScreen]); // Chỉ gọi một lần khi component được mount


	// State để lưu danh sách lớp học từ API
	const [classes, setClasses] = useState([]);
	const [classID, setClassID] = useState(null);

	useEffect(() => {
		// Kiểm tra màn hình hiện tại và điều hướng nếu cần
		if (state.currentScreen !== "MyClassesScreenGVien") {
			navigation.navigate(state.currentScreen);
		}
	}, [state.currentScreen]);

	

	function goToClass(item) {
		//setClassID(item.id)
		//console.log(classID)
		dispatch(
			navigate({
				screen: "ClassScreenGVien",
				params: {
					class: item,
					token: param.token,
				},
			})
		);
		console.log("Go to class: ", item.name);
	}

	function goBack() {
		dispatch(goBackMavigation());
		console.log("Go back!");
	}

	const Item = ({ item }) => (
		<TouchableOpacity
			className="bg-white p-4 m-2 rounded-lg shadow flex-row justify-between items-center"
			onPress={() => goToClass(item)}
		>
			<View>
				<Text className="text-lg">{item.name}</Text>
				<Text className="text-gray-500">{item.teacher}</Text>
			</View>
			<FontAwesome name="chevron-right" size={12} color="gray" />
		</TouchableOpacity>
	);

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
				</View>
			</View>

			<View className="pt-2 pl-5">
				<Text className="text-lg">Các lớp trong học kỳ:</Text>
			</View>

			<FlatList
				className="mb-8"
				data={classes}
				renderItem={({ item }) => <Item item={item} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default MyClassesScreenGVien;
