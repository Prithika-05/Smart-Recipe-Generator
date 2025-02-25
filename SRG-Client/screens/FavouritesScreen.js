import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        "https://rjvn06q4-7002.inc1.devtunnels.ms/favorites"
      );
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      } else {
        console.error("Failed to fetch favorites:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
    const interval = setInterval(fetchFavorites, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f0a500" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../assets/images/ic_launcher.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>Dashboard</Text>
        <TouchableOpacity onPress={() => alert("Notifications")}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeItem}
              onPress={() => navigation.navigate('RecipeDetail', { recipe, index })}
            >
              <View style={styles.recipeTextContainer}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Text style={styles.recipeDescription}>{recipe.Description}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={24} color="#333" />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noFavoritesContainer}>
            <Text style={styles.noFavoritesText}>No favorite recipes found.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  recipeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recipeTextContainer: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  noFavoritesText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
});

export default FavoritesScreen;
