import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeartIcon from "../components/HeartIcon";

// Statically import all images
const images = {
  'recipe-image-1': require('../assets/images/recipes/recipe-image-1.jpg'),
  'recipe-image-2': require('../assets/images/recipes/recipe-image-2.jpg'),
  'recipe-image-3': require('../assets/images/recipes/recipe-image-3.jpg'),
  'recipe-image-4': require('../assets/images/recipes/recipe-image-4.jpg'),
  'recipe-image-5': require('../assets/images/recipes/recipe-image-5.jpg'),
};


const RecipeDetail = ({ route, navigation }) => {
  const { recipe, index } = route.params;

  // Dynamically select the correct image
  const imageNames = [
    'recipe-image-1',
    'recipe-image-2',
    'recipe-image-3',
    'recipe-image-4',
    'recipe-image-5',
  ];
  const selectedImage = images[imageNames[index]];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Image source={require("../assets/images/ic_launcher.png")} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.appName}>Recipe Details</Text>
        <HeartIcon recipe={recipe} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}> {recipe.name} </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.recipeImage} />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="restaurant" size={24} color="#666" />
          <Text style={styles.sectionTitle}>Ingredients</Text>
        </View>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>{ingredient}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="list" size={24} color="#666" />
          <Text style={styles.sectionTitle}>Instructions</Text>
        </View>
        {recipe.instructions.map((step, index) => (
          <Text key={index} style={styles.text}>{`${index + 1}. ${step}`}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="info" size={24} color="#666" />
          <Text style={styles.sectionTitle}>Details</Text>
        </View>
        <Text style={styles.text}>Total Time Taken: {recipe["Total Time Taken"]}</Text>
        <Text style={styles.text}>Total Calories: {recipe["Total Calories"]}</Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5f5",
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
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
    lineHeight: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  recipeImage: {
    objectFit: 'fill',
    width: 330,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 330,
    alignSelf: "center",
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginLeft: 8,
    lineHeight: 20,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    lineHeight: 15,
  },
});

export default RecipeDetail;
