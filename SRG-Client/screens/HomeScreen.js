import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const HomePage = ({ navigation }) => {
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
        <TouchableOpacity
          style={styles.generatedButton}
          onPress={() => navigation.navigate('GeneratedRecipe')}
        >
          <Text style={styles.generatedButtonText}>Generate Your Recipe</Text>
        </TouchableOpacity>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbe6',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
});

export default HomePage;