import { Text, View, FlatList, Modal, Button, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "../../api";
import { Linking } from "react-native";
import { startLoading, stopLoading } from "../../../redux/loadingSlice";
import { useIsFocused } from "@react-navigation/native";
const ClassDocsScreenSVien = ({ route }) => {
	const { doc } = route.params || {}; // Đảm bảo doc không undefined
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const { params } = route;
	const [token, setToken] = useState("");
	const [class_id, setClassId] = useState("");
	const [DOCs, setDOCs] = useState([]);
	const state = useSelector((state) => state.navigation);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDoc, setSelectedDoc] = useState(null);

	useEffect(() => {
		if (state.currentScreen !== "ClassScreenSVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	const fetchDocs = async () => {
		try {
			dispatch(startLoading());
			console.log(">>>> Params...: ", params);
			const response = await api.post("/it5023e/get_material_list", {
				token: params.token,
				class_id: params.classInfo.id,
			});

			if (response.data.code === "1000") {
				const fetchedDOCs = response.data.data.map((item) => ({
					id: item.id,
					material_name: item.material_name,
					description: item.description,
					material_link: item.material_link,
					class_id: item.class_id,
					material_type: item.material_type,
				}));
				setDOCs(fetchedDOCs);
				dispatch(stopLoading());
			} else {
				dispatch(stopLoading());
				console.error("API error:", response.data.message);
			}
		} catch (error) {
			dispatch(stopLoading());
			console.error("Error fetching documents:", error);
		}
	};

	useEffect(() => {
		fetchDocs();
	}, [currentScreen]);

	console.log("DOCS: ", DOCs);

	const handleOpenModal = (item) => {
		setSelectedDoc(item);
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
		setSelectedDoc(null);
	};

	//const [is_open, setIsOpen] = useState(false);
	const openMaterial = (url) => {
		console.log("Mo tai lieu...");
		//setIsOpen(true);

		try {
			Linking.openURL(url).catch((err) => {
				console.error("Failed to open URL: ", err);
				alert("Error Không thể mở tài liệu.");
			});
		} catch (error) {
			console.error("Error parsing drive URI: ", error);
			alert("Error", "Không thể lấy URL từ tài liệu Google Drive.");
		}
	};

	const CustomButton = ({ title, onPress, iconName, style }) => (
		<TouchableOpacity
			onPress={onPress}
			style={[
				{
					backgroundColor: "white",
					padding: 10,
					borderRadius: 5,
					alignItems: "center",
					flexDirection: "row",
					marginVertical: 5,
				},
				style,
			]}
		>
			{iconName && <Ionicons name={iconName} size={20} color="black" style={{ marginRight: 10 }} />}
			<Text style={{ color: "black", fontWeight: "bold" }}>{title}</Text>
		</TouchableOpacity>
	);

	const Item = ({ item }) => (
		<TouchableOpacity
			className="bg-white p-4 m-2 rounded-lg shadow flex-row justify-between items-center border border-gray-200"
			onPress={() => openMaterial(item.material_link)}
		>
			<View>
				<Text className="text-lg">{item.material_name}</Text>
				<Text className="text-gray-500">Chỉnh sửa bởi: {params.classInfo.teacher}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={{ flex: 1 }}>
			{DOCs && (
				<FlatList
					className="mb-5"
					data={DOCs}
					renderItem={({ item }) => <Item item={item} />}
					keyExtractor={(item) => item.id}
				/>
			)}

			<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
				<View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "flex-end" }}>
					<TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
					<View
						style={{
							backgroundColor: "white",
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
							padding: 10,
							elevation: 5,
							height: 200,
						}}
					>
						<Text className="text-lg mb-2 self-center">
							{selectedDoc ? selectedDoc.material_name : "123"}
						</Text>
						<CustomButton
							title="Mở"
							onPress={() => {
								openMaterial(selectedDoc.material_link);
								console.log(`Mở ${selectedDoc?.material_name}`);
							}}
							iconName="open-outline"
						/>
						{/* <CustomButton 
                                                title="Chỉnh sửa" 
                                                onPress={() => {
                                                      console.log(`Đổi tên ${selectedDoc?.material_name}`);
                                                      goEditDoc(selectedDoc);
                                                }}
                                                iconName="create-outline" />
                                          <CustomButton 
                                                title="Xóa" 
                                                onPress={() => {
                                                      console.log(`Xóa ${selectedDoc?.material_name}`);
                                                      deleteDoc(selectedDoc);
                                                }}
                                                iconName="trash-outline" /> */}
					</View>
					{/* </View> */}
				</View>
			</Modal>
		</View>
	);
};

export default ClassDocsScreenSVien;
