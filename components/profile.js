import { TouchableOpacity, View, Text, FlatList, Modal, ScrollView, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LogoHust from "./logo";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {

      const USER = {
            'name': "Lường Mạnh Tú",
            'phoneNumber': "0355064807",
            'email': "tu.lm215500@sis.hust.edu.vn",
            'mssv': "20215500",
            'dob': "03/01/2003",
            'personalEmail': "tu.manhluong3103@gmail.com",
            'khoaVien': "Trường Công nghệ Thông tin và Truyền thông",
            'he': "Kỹ sư chính quy - k66",
            'class': "Khoa học máy tính 06 - K66"
      }

      return (
            <View className="flex-1">
                  <View className="bg-red-700 pt-8 pb-3 relative">
                        <View className="justify-center flex-row">
                              <Text className="text-white self-center text-lg">Thông tin sinh viên</Text>
                        </View>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false} className="h-[100%]">
                        <View style={styles.shadow}>
                              <ImageBackground
                                    source={require('../assets/bg.jpg')}
                                    style={styles.image}
                              >
                                    <View className="bg-white p-2 m-4 flex-1 flex-row justify-between rounded-xl">
                                          <Image className="w-[25%] h-full self-start" source={require('../assets/icon.png')} />
                                          <View className="flex-1 pl-3">
                                                <Text className="flex-1 text-lg font-bold mb-2" >{USER.name}</Text>
                                                <Text className="flex-1">Sđt: {USER.phoneNumber}</Text>
                                                <Text className="flex-1">Email: {USER.email}</Text>
                                          </View>
                                    </View>
                              </ImageBackground>
                        </View>
                        <View className="bg-white m-5 border border-gray-400 h-[100%]">

                        </View>
                  </ScrollView>
            </View >
      )
}

const styles = StyleSheet.create({
      image: {
            width: '100%',
            height: 130,
            resizeMode: 'cover',
      },
      shadow: {
            width: '100%', // Chiếm toàn bộ chiều rộng
            height: 130,   // Chiều cao của hình nền
            elevation: 10, // Độ sâu bóng (Android)
            overflow: 'hidden', // Đảm bảo không có phần nào ra ngoài
      },
})

export default Profile;