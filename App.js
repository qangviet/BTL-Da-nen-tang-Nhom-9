import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import LoginScreen from "./components/login.js";
import RegisterScreen from "./components/register.js";
import RegisterClassScreenSVien from "./components/SVien/main_screen/registerClassSVien.js";
import MyClassesScreenSVien from "./components/SVien/main_screen/my_classesSVien.js";
import ClassScreenSVien from "./components/SVien/each_class/tabClassSVien.js";
import classSubmitSurveysSVien from "./components/SVien/each_class/classSubmitSurveysSVien.js";
import NotiSVien from "./components/SVien/main_screen/notiSVien.js";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="NotiSVien">
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
                    name="RegisterClassScreenSVien"
                    component={RegisterClassScreenSVien}
                    options={{ title: "Đăng ký lớp", headerShown: false }}
                />
                <Stack.Screen
                    name="MyClassesScreenSVien"
                    component={MyClassesScreenSVien}
                    options={{ title: "Danh sách lớp", headerShown: false }}
                />
                <Stack.Screen
                    name="ClassScreenSVien"
                    component={ClassScreenSVien}
                    options={{ title: "Lớp học", headerShown: false }}
                />
                <Stack.Screen
                    name="classSubmitSurveysSVien"
                    component={classSubmitSurveysSVien}
                    options={{ title: "Nộp bài tập", headerShown: false }}
                />
                <Stack.Screen
                    name="NotiSVien"
                    component={NotiSVien}
                    options={{ title: "Thông báo", headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
