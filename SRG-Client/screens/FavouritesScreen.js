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
  Dimensions,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width: windowWidth } = useWindowDimensions();

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        "https://kvl1wj29-7002.inc1.devtunnels.ms/favorites"
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
    return () => clearInterval(interval);
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
      <View style={[styles.topBar, { paddingHorizontal: windowWidth * 0.05 }]}>        
        <Image
          source={require("../assets/images/ic_launcher.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>Favorites</Text>
        <TouchableOpacity onPress={() => alert("Notifications")}>
          <Ionicons name="notifications-outline" size={windowWidth * 0.07} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.recipeItem, { padding: windowWidth * 0.04 }]}
              onPress={() => navigation.navigate('RecipeDetail', { recipe, index })}
            >
              <View style={styles.recipeTextContainer}>
                <Text style={[styles.recipeName, { fontSize: windowWidth * 0.045 }]}>{recipe.name}</Text>
                <Text style={[styles.recipeDescription, { fontSize: windowWidth * 0.035 }]}>{recipe.Description}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={windowWidth * 0.06} color="#333" />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noFavoritesContainer}>
            <Text style={[styles.noFavoritesText, { fontSize: windowWidth * 0.045 }]}>No favorite recipes found.</Text>
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
    paddingVertical: Platform.OS === "ios" ? height * 0.02 : height * 0.015,
    backgroundColor: '#f0a500',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  logo: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'cover',
  },
  appName: {
    fontSize: width * 0.06,
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
    paddingHorizontal: width * 0.04,
  },
  recipeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: height * 0.02,
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
    fontWeight: "bold",
    color: "#333",
    lineHeight: 20,
  },
  recipeDescription: {
    color: "#666",
    marginTop: 5,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.02,
  },
  noFavoritesText: {
    fontWeight: "bold",
    color: "#666",
  },
});

export default FavoritesScreen;
