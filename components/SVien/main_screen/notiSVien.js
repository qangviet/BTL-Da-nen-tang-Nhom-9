import { TouchableOpacity, View, Text, FlatList, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LogoHust from "../../logo.js";
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotiSVien = ({ navigation }) => {

      const NOTIs = [
            { id: 0, title: "Phát triển ứng dụng đa nền tảng", date: "31/11/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 1, title: "Phát triển ứng dụng đa nền tảng", date: "31/10/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 2, title: "Phát triển ứng dụng đa nền tảng", date: "31/09/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 3, title: "Phát triển ứng dụng đa nền tảng", date: "31/08/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 4, title: "Phát triển ứng dụng đa nền tảng", date: "31/07/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 5, title: "Phát triển ứng dụng đa nền tảng", date: "31/06/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 6, title: "Phát triển ứng dụng đa nền tảng", date: "31/05/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 7, title: "Phát triển ứng dụng đa nền tảng", date: "31/04/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 8, title: "Phát triển ứng dụng đa nền tảng", date: "31/03/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 9, title: "Phát triển ứng dụng đa nền tảng", date: "31/02/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" },
            { id: 10, title: "Phát triển ứng dụng đa nền tảng0", date: "31/01/2024", short_text: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B", content: "Sinh viên chú ý thời gian mở điều chỉnh đăng ký đợt B học kỳ 2024-1B. Bắt đầu từ ngày 10h00 ngày 29/10/2024 đến 16h00 ngày 05/11/2024. Sinh viên có nhu cầu học các học phần mã lớp mở kỳ 2024-1B (từ tuần 11-18) có thể vào đăng ký thêm, chú ý sinh viên chỉ được đăng ký thêm học phần mở đăng ký, không thể điều chỉnh các học phần đã đăng ký thành công. Sinh viên đăng ký trên trang đăng ký: Sinh viên các chương trình Chuẩn, Elitech: dk-sis.hust.edu.vn; Sinh viên chương trình đào tạo liên kết quốc tế: dk-sie.hust.edu.vn" }
      ]

      const [modalVisible, setModalVisible] = useState(false);
      const [selectedNoti, setSelectedNoti] = useState(null);

      const handleOpenModal = (item) => {
            setSelectedNoti(item);
            setModalVisible(true);
      };

      const handleCloseModal = () => {
            setModalVisible(false);
            setSelectedNoti(null);
      };

      const Noti = ({ item }) => (
            <View className="bg-white p-4 ml-2 mr-2 mb-5 rounded-lg shadow justify-between border border-gray-200">
                  <View className="">
                        <View className="h-10 flex-row justify-between">
                              <Text className="font-bold text-base">{item.title}</Text>
                              <Text className="text-sm">{item.date}</Text>
                        </View>
                  </View>
                  <View className='w-full h-px bg-gray-300 mb-3' />
                  <View>
                        <Text>
                              {item.short_text.length < 40 ? item.short_text : `${item.short_text.substring(0, 40)}...`}
                        </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleOpenModal(item)}>
                        <Text className="text-blue-500 underline text-sm self-end">Chi tiết</Text>
                  </TouchableOpacity>
            </View>
      );

      const parseDate = (dateString) => {
            const [day, month, year] = dateString.split('/').map(Number);
            // console.log(new Date(year, month - 1, day + 1))
            return new Date(year, month - 1, day + 1);
      };

      return (
            <View className="h-[87%]">
                  <View className="bg-red-700 pt-10 pb-5 relative">
                        <View className="absolute left-3 top-8">
                              <TouchableOpacity>
                                    <FontAwesome name="long-arrow-left" size={26} color="white" />
                              </TouchableOpacity>
                        </View>
                        <View className="flex justify-center items-center">
                              <LogoHust width={110} height={21}></LogoHust>
                        </View>
                  </View>

                  <View className="">
                        <FlatList
                              className="p-1 mt-3"
                              data={NOTIs}
                              renderItem={({ item }) => <Noti item={item} />}
                              keyExtractor={item => item.id}
                        />

                        <Modal
                              animationType="fade"
                              transparent={true}
                              visible={modalVisible}
                              onRequestClose={handleCloseModal}
                        >
                              <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center' }}>
                                    <View className="h-3/4 pl-8 pr-8 m-8 rounded-lg bg-white ">
                                          <View className="mt-4">
                                                <TouchableOpacity onPress={() => handleCloseModal()} className="self-end">
                                                      <Ionicons name="close-outline" size={28} color="gray" className="" />
                                                </TouchableOpacity>
                                                <Text className="text-lg  self-center font-bold mb-4">
                                                      {selectedNoti ? selectedNoti.title : ''}
                                                </Text>

                                          </View>
                                          <ScrollView className="mb-5">
                                                <Text className="text-lg self-center text-justify">
                                                      {selectedNoti ? selectedNoti.content : ''}
                                                </Text>
                                          </ScrollView>
                                    </View>
                              </View>
                        </Modal>
                  </View>
            </View>
      )
}

export default NotiSVien;