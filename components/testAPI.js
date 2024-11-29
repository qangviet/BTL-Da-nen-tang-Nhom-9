const axios = require('axios');
import * as FileSystem from 'expo-file-system'; // Nếu đang dùng Expo

const uploadFile = async () => {
  const fileUri = 'file:///data/user/0/host.exp.exponent/cache/DocumentPicker/860c38c1-72f4-4ec4-a0e5-6dafdd53bda6.png';

  // Kiểm tra xem file có tồn tại không
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!fileInfo.exists) {
    console.error('File not found!');
    return;
  }

  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    name: 'image.png',
    type: 'image/png',
  });

  formData.append('token', 'IOJHMO');
  formData.append('classId', '000007');
  formData.append('title', 'Bai tap GT3');
  formData.append('deadline', '2024-12-11T14:30:00');
  formData.append('description', 'noi chung la kho lam');

  try {
    const response = await axios.post('http://157.66.24.126:8080/it5023e/create_survey', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload success:', response.data);
  } catch (error) {
    console.error('Upload failed:', error.response ? error.response.data : error.message);
  }
};

uploadFile();
