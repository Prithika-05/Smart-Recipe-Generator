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
import Ionicons from "react-native-vector-icons/Ionicons";


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
                content: `Generate five recipes using the following vegetables: ${vegetableList}, and add the measurement of  the ingredients.
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
          
            navigation.navigate("ShowRecipes", { recipe: parsedJson.recipes });

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
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require("../assets/images/ic_launcher.png")} style={styles.logo} />
        <Text style={styles.appName}>Detection Log</Text>
        <TouchableOpacity onPress={() => alert("Notifications")}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.header}>Image</Text>

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
      <View style={styles.buttonContainer}>
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
      </View>

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
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#333", 
    marginBottom: 15, 
    alignSelf: "flex-start", 
    paddingLeft: 10, // Added padding for left spacing
    lineHeight:20,
  },
imageContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#e9f5f5", // Keep the background color if needed
    borderRadius: 5,
    padding: 0, // Remove padding to avoid extra space
    width: "auto", // Let it adjust to image size
    maxWidth: "90%", // Prevent it from being too wide
  },
  image: {
    width: "90%", // Set to 100% to fill the container
    height: undefined,
    aspectRatio: 1, // Adjust this based on the image's aspect ratio
    resizeMode: "contain",
    borderRadius: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    alignSelf: "flex-start",
    lineHeight: 15,
    paddingLeft: 10, // Added left padding for better alignment
  },
  listContainer: { 
    width: "60%", 
    paddingHorizontal: 30,
    alignItems:"flex-end",
  },
  itemContainer: {
    backgroundColor: "#9AB1BC",
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    width: "100%", // Make the container full width
    minHeight: 45, // Set a minimum height for better appearance
    alignSelf: "center",
    justifyContent: "center" // Center the entire container
  },
  itemText: { 
    fontSize: 18, // Increase font size for better visibility
    fontWeight: "500", 
    color: "333",
    textAlign: "center", // Center the text
    flex: 1, // Allow text to fill the available space
    lineHeight:15,
    flexShrink: 1,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 0,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f0a500",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 15,
    paddingBottom: 2,
    elevation: 3,
  },
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

export default DetectedResultPage

