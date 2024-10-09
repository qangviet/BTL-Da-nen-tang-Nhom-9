import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // Ở đây bạn sẽ thêm logic xác thực đăng nhập thực tế
      if (username === 'user' && password === 'password') {
        navigation.replace('Home');
      } else if (username === '' || password === '') {
        alert('Chưa nhập đủ thông tin!')
      } else {
        alert('Sai tên đăng nhập hoặc mật khẩu!');
      }
    };

    return (
        <View style={styles.container}>
            <View style={styles.elevation}>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
            </View>
            <Text style={styles.title}>Đăng nhập với tài khoản QLDT</Text>
    
            <TextInput
                style={styles.input}
                placeholder="Email hoặc mã SVCCB"
                placeholderTextColor="#B0B0B0"
            />
    
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                placeholderTextColor="#B0B0B0"
            />
    
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.fingerprintButton}>
                <Ionicons name="finger-print" size={24} color="white" />
            </TouchableOpacity>
    
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
        </View>
      );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C8102E',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
  
    elevation: {
      elevation: 2,
    },
  
    logo: {
      width: 150,
      height: 30,
      marginBottom: 80,
    },
  
    title: {
      color: 'white',
      fontSize: 18,
      marginBottom: 50,
      textAlign: 'center',
    },
  
    input: {
      width: '90%',
      backgroundColor: '#C8102E',
      borderRadius: 25,
      padding: 10,
      marginBottom: 15,
      color: 'white',
      borderWidth: 1,
      borderColor: 'white'
    },
  
    loginButton: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      width: '90%',
      alignItems: 'center',
    },
  
    loginButtonText: {
      color: '#C8102E',
      fontSize: 16,
      fontWeight: 'bold',
    },
  
    fingerprintButton: {
      marginVertical: 15,
      alignItems: 'center',
    },
  
    forgotPassword: {
      color: 'white',
      marginTop: 10,
    },
  });