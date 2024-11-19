import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeGVien from './homeGVien';
import ChatGVien from './chatGVien';
import Profile from '../../profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabMainGVien = () => {
      return (
            <Tab.Navigator
                  screenOptions={({ route }) => ({
                        animation: 'shift',
                        tabBarStyle: {
                              backgroundColor: 'white', // Màu nền của tab
                              // borderTopColor: 'transparent', // Ẩn viền trên
                              height: 70, // Chiều cao của tab
                              marginBottom: 10,
                              marginLeft: 10,
                              marginRight: 10,
                              borderRadius: 50
                        },
                        tabBarActiveTintColor: '#c52f3d', // Màu của tab đang hoạt động
                        tabBarInactiveTintColor: 'gray', // Màu của tab không hoạt động
                        tabBarLabelStyle: {
                              fontSize: 14, // Kích thước chữ cho nhãn tab
                              paddingBottom: 5, // Khoảng cách dưới nhãn
                        },
                        tabBarIcon: ({ focused, color }) => {
                              let iconName;

                              // Chọn biểu tượng dựa trên tên route
                              if (route.name === 'Trang chủ') {
                                    iconName = focused ? 'home' : 'home-outline';
                              } else if (route.name === 'Tin nhắn') {
                                    iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
                              } else if (route.name === 'Profile') {
                                    iconName = focused ? 'person' : 'person-outline';
                              }

                              // Trả về biểu tượng Ionicons
                              return <Ionicons name={iconName} size={20} color={color} />;
                        },
                        headerShown: false, // Ẩn header cho tất cả các màn hình
                  })}
            >
                  <Tab.Screen name="Trang chủ" component={HomeGVien} />
                  <Tab.Screen name="Tin nhắn" component={ChatGVien} />
                  <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
      );
}

export default TabMainGVien;