import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const DetectedResultPage = ({ route, navigation }) => {
  const { imageUri, response } = route.params;

  // Remove duplicate vegetable names
  const uniqueVegetables = [];
  const seen = new Set();

  response.predictions.forEach((item) => {
    if (!seen.has(item.class)) {
      seen.add(item.class);
      uniqueVegetables.push(item);
    }
  });

  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const generateRecipes = async () => {
    setLoading(true);
    const vegetableList = uniqueVegetables.map((item) => item.class).join(", ");

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`, // Replace with your API Key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openchat/openchat-7b:free",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful chef assistant. Always respond in valid JSON format. Ensure 'ingredients' and 'instructions' are an array where each step is a separate string.",
              },
              {
                role: "user",
                content: `Generate five recipes using the following vegetables: ${vegetableList}, and all the recipes must be the world class dish from differnt cuisines all around the world, and add the measurement of the ingredients. the instructions must be very detailed.
              Provide a valid JSON response with the structure:
              {
                "recipes": [
                  {
                    "name": "Recipe Name",
                    "ingredients": ["ingredient1 - 2 spoons( 30 calories)", "ingredient2 - 2( 30 calories) ", ...],
                    "instructions": ["Step 1", "Step 2", "Step 3", ...],
                    "Total Time Taken": "Time Taken to complete the recipe",
                    "Total Calories": "Total Calories of the recipe eg: (350 calories)",
                    
                  }
                ]
              }`,
              },
            ],
            max_tokens: 10000,
            temperature: 0.5,
          }),
        }
      );

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const rawResponse = data.choices[0].message.content.trim();
        console.log(rawResponse)

        try {
          const parsedJson = JSON.parse(rawResponse);
          if (parsedJson.recipes && Array.isArray(parsedJson.recipes)) {
          
            navigation.navigate("ShowRecipes", { recipes: parsedJson.recipes });

          } else {
            console.error("Invalid JSON format received:", parsedJson);
            setRecipe(null);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setRecipe(null);
        }
      } else {
        setRecipe(null);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe(null);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.header}>Detection Result</Text>

      {/* Display Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      {/* Detected Vegetables Title */}
      <Text style={styles.sectionTitle}>Detected Vegetables</Text>

      {/* Unique Vegetable List */}
      <FlatList
        data={uniqueVegetables}
        keyExtractor={(item) => item.class}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.class}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Generate Recipes Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={generateRecipes}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Generate Recipes</Text>
        )}
      </TouchableOpacity>

      {/* Display Recipes */}
      {recipe && Array.isArray(recipe) && (
        <FlatList
          data={recipe} // Now correctly accessing recipes array
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    alignItems: "center",
  },
  header: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 15 },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  listContainer: { width: "100%", paddingHorizontal: 10 },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: { fontSize: 16, fontWeight: "500", color: "#333" },
  button: {
    marginTop: 20,
    backgroundColor: "#f0a500",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  recipeItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  recipeSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    color: "#555",
  },
});

export default DetectedResultPage;
