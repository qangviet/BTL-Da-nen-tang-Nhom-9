import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import React from 'react'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LogoHust from "components/logo.js";

const MyClassesScreen = ({ navigation }) => {

      const CLASSES = [
            { id: '0', name: 'Phát triển ứng dụng đa nền tảng', teacher: 'Nguyễn Tiến Thành' },
            { id: '1', name: 'Tính toán tiến hóa', teacher: 'Huỳnh Thị Thanh Bình' },
            { id: '2', name: 'Nhập môn Khoa học dữ liệu', teacher: 'Phạm Văn Hải' },
            { id: '3', name: 'Lưu trữ và xử lý dữ liệu lớn', teacher: 'Trần Việt Trung' },
            { id: '4', name: 'Quản trị dự án CNTT', teacher: 'Lê Đức Trung' },
            { id: '5', name: 'Project III', teacher: 'Đỗ Tuấn Anh' },
            { id: '6', name: 'Subject 6', teacher: 'Nguyễn Tiến Thành' },
            { id: '7', name: 'Subject 7', teacher: 'Nguyễn Tiến Thành' },
            { id: '8', name: 'Subject 8', teacher: 'Nguyễn Tiến Thành' },
            { id: '9', name: 'Subject 9', teacher: 'Nguyễn Tiến Thành' },
            { id: '10', name: 'Subject 10', teacher: 'Nguyễn Tiến Thành' },

            { id: 'extra', name: 'extra', teacher: 'extra' },
      ];

      function goToClass(name) {
            console.log("Go to class: ", name)
      }

      function goBack() {
            console.log("Go back!")
      }

      const Item = ({ item }) => (
            <TouchableOpacity className="bg-white p-4 m-2 rounded-lg shadow flex-row justify-between items-center" onPress={() => goToClass(item.name)}>
                  <View>
                        <Text className='text-lg'>{item.name}</Text>
                        <Text className='text-gray-500'>{item.teacher}</Text>
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

                  <FlatList className="mb-8"
                        data={CLASSES}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                  />

            </View>
      )
}

const styles = StyleSheet.create({

});

export default MyClassesScreen;