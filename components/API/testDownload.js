import React from 'react';
import { Button, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

const downloadFile = async () => {
  const fileUrl = 'https://drive.google.com/uc?id=1Jbd7cfFoiFIFunilKn7NqW7eLcmmnXle&export=download';
  const fileUri = `${FileSystem.documentDirectory}downloadedFile.pdf`; // Đường dẫn lưu file

  try {
    const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);
    console.log('File downloaded to:', uri);
    alert('File đã tải xuống thành công!');
  } catch (error) {
    console.error('Error downloading file:', error);
    alert('Lỗi khi tải file!');
  }
};

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Tải File từ Google Drive" onPress={downloadFile} />
    </View>
  );
}
