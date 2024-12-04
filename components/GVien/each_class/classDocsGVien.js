import { Text, View, FlatList, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import api from "../../api";
import { useEffect } from "react";
import { Linking } from 'react-native';
import { goBack, navigate } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";

const ClassDocsScreenGVien = ({ route }) => {

      const { doc } = route.params || {};  // Đảm bảo doc không undefined
      const navigation = useNavigation();
      const dispatch = useDispatch();
      const currentScreen = useSelector((state) => state.navigation.currentScreen);
      const { params } = route;
      const [token, setToken] = useState("");
      const [class_id, setClassId] = useState("");
      const [DOCs, setDOCs] = useState([]);
      const state = useSelector((state) => state.navigation);
      

      useEffect(() => {
		if (state.currentScreen !== "ClassDocsScreenGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);
      
      // useEffect(() => {
      //       if (params.class != null) {
      //             setToken(params.token);
      //             setClassId(params.class.id);s
      //       }
      // }, [])

      const fetchDocs = async () => {
            try {
                console.log(">>>> Token: ", params.token);
                const response = await api.post('/it5023e/get_material_list', {
                    token: params.token,
                    class_id: params.class.id,
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
                } else {
                    console.error('API error:', response.data.message);
                }
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        
      useEffect(() => {
            fetchDocs();
            }, [currentScreen]);
              
      // useEffect(() => {
      //       async function fetchDocs() {
      //             try {
      //                   console.log(">>>> Token: ", params.token);
      //                   const response = await api.post('/it5023e/get_material_list', {
      //                         token: params.token,
	// 				class_id: params.class.id
	// 			});
                        
	// 			if (response.data.code === "1000") {
      //                         const fetchedDOCs = response.data.data.map((item) => ({
      //                               id: item.id,
	// 					material_name: item.material_name,
	// 					description: item.description,
	// 					material_link: item.material_link,
	// 					material_link: item.material_link,
	// 					class_id: item.class_id,
      //                               material_type: item.material_type
	// 				}));
	// 				setDOCs(fetchedDOCs);
	// 			} else {
      //                         console.error('API error:', response.data.message);
	// 			}
	// 		} catch (error) {
      //                   console.error('Network error:', error);
	// 			console.error("API call failed: ", error);
	// 			console.error("Error fetching class list:", error);
	// 			console.error("Error Data:", error.response.data);
	// 			console.error("Error Status:", error.response.status);
	// 		}
	// 	}
            
	// 	fetchDocs();
	// }, [currentScreen]);
      
      console.log("DOCS: ", DOCs);

      const [modalVisible, setModalVisible] = useState(false);
      const [selectedDoc, setSelectedDoc] = useState(null);

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

      const goEditDoc = (doc) => {
            console.log("Chuyển hướng đến EditMaterialGVien...");
            console.log("Doc gui di:", doc)
            console.log("Param gui di", params.token)
            // dispatch(
            //     navigate({
            //         screen: "EditMaterialGVien",
            //         params: {} // Không cần truyền gì cả
            //     })
            // );
            dispatch(
                  navigate({
                      screen: "EditMaterialGVien",
                      params: {
                        token: params.token,
                        doc: doc
                      }  // Tránh việc truyền undefined
                  })
              );
        }
      
      const deleteDoc = async (doc) => {
            console.log("Deleting docs....");
            console.log("DOCS...",doc);
            //setConfirmSave(false);
            try {
                  const response = await api.post("/it5023e/delete_material", {
                        token: params.token,
                        material_id: doc.id
                  });

                  if (response.status === 200) {
                        alert("Tài liệu đã được xóa thành công");
                        fetchDocs();
                        console.log(response.data);
                        goBack();
                  } else {
                        alert("Vui lòng thử lại");
                  }
                  } catch (error) {
                        console.log("ERROR!")
                  }
            };
            

      const CustomButton = ({ title, onPress, iconName, style }) => (
            <TouchableOpacity
                  onPress={onPress}
                  style={[{
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginVertical: 5,
                  }, style]}
            >
                  {iconName && (
                        <Ionicons name={iconName} size={20} color="black" style={{ marginRight: 10 }} />
                  )}
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>{title}</Text>
            </TouchableOpacity>
      );

      const Item = ({ item }) => (
            <View className="bg-white p-4 m-2 rounded-lg shadow flex-row justify-between items-center border border-gray-200">
                  <View>
                        <Text className='text-lg'>{item.material_name}</Text>
                        <Text className='text-gray-500'>Chỉnh sửa bởi: {params.class.teacher}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleOpenModal(item)}>
                        <FontAwesome name="ellipsis-h" size={20} color="gray" />
                  </TouchableOpacity>
            </View>
      );

      return (
            <View style={{ flex: 1 }}>
                  {DOCs && <FlatList
                        className="mb-5"
                        data={DOCs}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                  />}

                  <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={handleCloseModal}
                  >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
                              <TouchableOpacity style={{ flex: 1 }} onPress={handleCloseModal} />
                              <View
                                    style={{
                                          backgroundColor: 'white',
                                          borderTopLeftRadius: 20,
                                          borderTopRightRadius: 20,
                                          padding: 10,
                                          elevation: 5,
                                          height: 320
                                    }}
                              >
                                    <Text className="text-lg mb-2 self-center">
                                          {selectedDoc ? selectedDoc.name : ''}
                                    </Text>
                                    <CustomButton 
                                          title="Mở" 
                                          onPress={() => {
                                                openMaterial(selectedDoc.material_link);
                                                console.log(`Mở ${selectedDoc?.material_name}`);
                                          }} 
                                          iconName="open-outline" 
                                          />
                                    <CustomButton 
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
                                          iconName="trash-outline" />
                              </View>
                              {/* </View> */}
                        </View>
                  </Modal>
            </View >
      )
}

export default ClassDocsScreenGVien;