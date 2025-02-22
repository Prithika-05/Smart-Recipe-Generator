import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Statically import all images
const images = {
  'recipe-image-1': require('../assets/images/recipes/recipe-image-1.jpg'),
  'recipe-image-2': require('../assets/images/recipes/recipe-image-2.jpg'),
  'recipe-image-3': require('../assets/images/recipes/recipe-image-3.jpg'),
  'recipe-image-4': require('../assets/images/recipes/recipe-image-4.jpg'),
  'recipe-image-5': require('../assets/images/recipes/recipe-image-5.jpg'),
};

const ShowRecipes = ({ route, navigation }) => {
  const { recipes } = route.params;

  const imageNames = [
    'recipe-image-1',
    'recipe-image-2',
    'recipe-image-3',
    'recipe-image-4',
    'recipe-image-5',
  ];

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
         <Image source={require("../assets/images/ic_launcher.png")} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.appName}>Recipes</Text>
        <TouchableOpacity onPress={() => alert("Notifications")}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.recipeCard}>
            <Image
              source={images[imageNames[index]]}
              style={styles.recipeImage}
            />
            <TouchableOpacity
              style={styles.recipeButton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item ,index})}
            >
              <View style={styles.recipeNameContainer}>
                <Text style={styles.recipeName}>{item.name}</Text>
                <Icon name="chevron-right" size={24} color="#333" /> 
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5f5",
    alignItems: "center",
  },
  topBar: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f0a500',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  listContainer: {
    alignItems: "center", // Center all list items
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
    alignSelf: "center", // Center the card
    width: 320, // Set a fixed width for centering
  },
  recipeImage: {
    objectFit: 'fill',
    width: 300,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeButton: {
    width: '100%',
  },
  recipeNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    lineHeight:15
  },
});

export default ShowRecipes;
