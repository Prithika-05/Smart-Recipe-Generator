import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import { sendImageToBackend } from '../utils/roboflowApi';

const HomePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const openCamera = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image URI:", result.assets[0].uri);
      handleImageUpload(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image URI:", result.assets[0].uri);
      handleImageUpload(result.assets[0].uri);
    }
  };

  const handleImageUpload = async (imageUri) => {
    setLoading(true); // Start loading
    try {
      await sendImageToBackend(imageUri);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const recipes = [
    { id: 1, name: 'Spaghetti Bolognese', image: require('../assets/images/Spaghetti.jpg') },
    { id: 2, name: 'Chicken Curry', image: require('../assets/images/Chicken-Curry.jpg') },
    { id: 3, name: 'Vegan Salad', image: require('../assets/images/Vegan-Salad.jpg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>Smart Recipe Generator</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to Smart Recipe Generator!</Text>
        <Text style={styles.welcomeSubtitle}>
          Discover recipes tailored to your taste and create culinary magic.
        </Text>
        <TouchableOpacity style={styles.generatedButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.generatedButtonText}>Generate Your Recipe</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f0a500" />
          <Text style={styles.loadingText}>Detecting Vegetables....</Text>
        </View>
      )}

      {/* Recommended Recipes */}
      <Text style={styles.sectionTitle}>Recommended Recipes</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {recipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Image source={recipe.image} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{recipe.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Menu Bar */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#f0a500" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <MaterialIcons name="history" size={28} color="#6c757d" />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={28} color="#6c757d" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for choosing photo source */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={100} style={styles.blurContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose an Option</Text>

            <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
              <Ionicons name="camera-outline" size={24} color="#fff" />
              <Text style={styles.optionText}>Take a Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
              <Ionicons name="images-outline" size={24} color="#fff" />
              <Text style={styles.optionText}>Upload from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5f5',
  },
  topBar: {
    padding: 20,
    backgroundColor: '#f0a500',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  generatedButton: {
    backgroundColor: '#f0a500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  generatedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  recipeCard: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 150,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
    textAlign: 'center',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  menuText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0a500',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    fontSize: 14,
    color: '#bbb',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to indicate loading state
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensures it's above other elements
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default HomePage;
