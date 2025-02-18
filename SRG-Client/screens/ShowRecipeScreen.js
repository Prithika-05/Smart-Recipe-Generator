import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

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

  // Array of image names corresponding to the recipes
  const imageNames = [
    'recipe-image-1',
    'recipe-image-2',
    'recipe-image-3',
    'recipe-image-4',
    'recipe-image-5',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Generated Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.recipeCard}>
            <Image
              source={images[imageNames[index]]} // Reference the statically imported images
              style={styles.recipeImage}
            />
            <TouchableOpacity
              style={styles.recipeButton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
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
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  recipeCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
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
  },
});

export default ShowRecipes;
