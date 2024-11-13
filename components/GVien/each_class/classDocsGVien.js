import { Text, View, FlatList, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

const ClassDocsScreenGVien = ({ navigation }) => {

      const DOCs = [
            { id: "0", name: "Tài liệu 1", uploader: 'Ai đó' },
            { id: "1", name: "Tài liệu 2", uploader: 'Ai đó' },
            { id: "2", name: "Tài liệu 3", uploader: 'Ai đó' },
            { id: "3", name: "Tài liệu 4", uploader: 'Ai đó' },
            { id: "4", name: "Tài liệu 5", uploader: 'Ai đó' },
            { id: "5", name: "Tài liệu 6", uploader: 'Ai đó' },
            { id: "6", name: "Tài liệu 7", uploader: 'Ai đó' },
      ]

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
                        <Text className='text-lg'>{item.name}</Text>
                        <Text className='text-gray-500'>Chỉnh sửa bởi: {item.uploader}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleOpenModal(item)}>
                        <FontAwesome name="ellipsis-h" size={20} color="gray" />
                  </TouchableOpacity>
            </View>
      );

      return (
            <View style={{ flex: 1 }}>
                  <FlatList
                        className="mb-5"
                        data={DOCs}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                  />

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
                                    <CustomButton title="Mở" onPress={() => console.log(`Mở ${selectedDoc?.name}`)} iconName="open-outline" />
                                    <CustomButton title="Đổi tên" onPress={() => console.log(`Đổi tên ${selectedDoc?.name}`)} iconName="create-outline" />
                                    <CustomButton title="Chia sẻ" onPress={() => console.log(`Chia sẻ ${selectedDoc?.name}`)} iconName="share-outline" />
                                    <CustomButton title="Sao chép liên kết" onPress={() => console.log(`Sao chép liên kết ${selectedDoc?.name}`)} iconName="copy-outline" />
                                    <CustomButton title="Xóa" onPress={() => console.log(`Xóa ${selectedDoc?.name}`)} iconName="trash-outline" />
                              </View>
                              {/* </View> */}
                        </View>
                  </Modal>
            </View >
      )
}

export default ClassDocsScreenGVien;