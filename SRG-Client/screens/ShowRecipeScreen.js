import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ShowRecipes = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Generated Recipes</Text>
      <FlatList
        data={recipe}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.name}</Text>
            <Text style={styles.recipeSubtitle}>Ingredients:</Text>
            <Text>{item.ingredients.join(", ")}</Text>
            <Text style={styles.recipeSubtitle}>Instructions:</Text>
            {item.instructions.map((step, index) => (
              <Text key={index}>{`${index + 1}. ${step}`}</Text>
            ))}
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
  recipeItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  recipeSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
});

export default ShowRecipes;
