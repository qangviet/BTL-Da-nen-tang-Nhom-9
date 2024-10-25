import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import LoginScreen from "./components/login.js";
import RegisterScreen from "./components/register.js";
import ClassManagementScreen from "./components/manageClass.js";
import CreateClassScreen from "./components/createClass.js";
import EditClassScreen from "./components/editClass.js";
import RegisterClassScreen from "./components/main_screen/registerClass.js";
import MyClassesScreen from "./components/main_screen/my_classes.js";
import ClassScreen from "./components/each_class/class.js";
import ClassDiemDanh from "./components/each_class/classDiemDanh.js";


const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ClassScreen">
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ title: "Đăng ký", headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: "Đăng nhập", headerShown: false }}
                />
                <Stack.Screen
                    name="RegisterClassScreen"
                    component={RegisterClassScreen}
                    options={{ title: "Đăng ký lớp", headerShown: false }}
                />
                <Stack.Screen
                    name="MyClassesScreen"
                    component={MyClassesScreen}
                    options={{ title: "Danh sách lớp", headerShown: false }}
                />
                <Stack.Screen
                    name="ClassScreen"
                    component={ClassScreen}
                    options={{ title: "Lớp học", headerShown: false }}
                />
                <Stack.Screen
                    name="ClassManagementScreen"
                    component={ClassManagementScreen}
                    options={{ title: "Quản lý lớp", headerShown: false }}
                />
                <Stack.Screen
                    name="CreateClassScreen"
                    component={CreateClassScreen}
                    options={{ title: "Tạo lớp", headerShown: false }}
                />
                <Stack.Screen
                    name="EditClassScreen"
                    component={EditClassScreen}
                    options={{ title: "Sửa lớp", headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
