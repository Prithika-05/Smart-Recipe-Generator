import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons if needed

const RecipeDetail = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{recipe.name}</Text>
        {/* Add an image for the recipe if available */}
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
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
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
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default RecipeDetail;
