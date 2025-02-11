import * as FileSystem from 'expo-file-system';

export const sendImageToBackend = async (imageUri) => {
  try {
    // Ensure the file is readable
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (!fileInfo.exists) {
      console.error("File does not exist at the given path:", imageUri);
      return null;
    }

    let formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // Ensure this matches the actual file type
      name: 'upload.jpg',
    });

    const response = await fetch('https://kvl1wj29-7002.inc1.devtunnels.ms/detect', {
      method: 'POST',
      headers: {
        'Accept': 'application/json', // Accept JSON response
        // **Do NOT manually set Content-Type, let FormData handle it**
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Response from backend:', data);
    return data;
  } catch (error) {

    console.error('Error uploading image:', error);
    return null;
  }
};
