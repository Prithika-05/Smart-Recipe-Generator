import React, { useState } from 'react';
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

const HeartIcon = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsFavorite(!isFavorite)}
      activeOpacity={0.7} // Slight hover effect
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={20}
        color={isFavorite ? '#f0a500' : 'black'}
      />
    </TouchableOpacity>
  );
};

const HomePage = ({ navigation }) => {
  const recipes = [
    { id: 1, name: 'Spaghetti Bolognese', image: require('../assets/images/Spaghetti.jpg') },
    { id: 2, name: 'Chicken Curry ', image: require('../assets/images/Chicken-Curry.jpg') },
    { id: 3, name: 'Vegan Salad ', image: require('../assets/images/Vegan-Salad.jpg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require('../assets/images/ic_launcher.png')} style={styles.logo} />
        <Text style={styles.appName}>Dashboard</Text>
        <TouchableOpacity onPress={() => alert('Notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to the Dashboard!</Text>
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
            <TouchableOpacity
              style={styles.recipeButton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
            >
              <View style={styles.recipeNameContainer}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <HeartIcon />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Menu Bar */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#f0a500" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('History')}>
          <MaterialIcons name="history" size={28} color="#6c757d" />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
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
    backgroundColor: '#e9f5f5',
  },
  topBar: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f0a500',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    flex: 1,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    paddingVertical: 12,
    borderRadius: 25,
  },
  generatedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 24,
    paddingBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
    marginVertical: 10,
    lineHeight: 20,
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
  recipeButton: {
    padding: 15,
    alignItems: 'center',
  },
  recipeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 20,
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
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
    lineHeight: 18,
    textAlign: 'center',
  },
});

export default HomePage;
