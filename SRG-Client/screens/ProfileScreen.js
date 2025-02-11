import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUsername(parsedData.username);
          setEmail(parsedData.email);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const favorites = [
    {
      id: 1,
      name: "Spaghetti Bolognese",
      image: require("../assets/images/Spaghetti.jpg"),
    },
    {
      id: 2,
      name: "Chicken Curry ",
      image: require("../assets/images/Chicken-Curry.jpg"),
    },
    {
      id: 3,
      name: "Vegan Salad ",
      image: require("../assets/images/Vegan-Salad.jpg"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require("../assets/images/ic_launcher.png")} style={styles.logo} />
        <Text style={styles.appName}>Profile</Text>
        <TouchableOpacity onPress={() => alert("Notifications")}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#333" style={styles.iconStyle} />
          <Text style={styles.userInfoLabel}>Name:</Text>
          <Text style={styles.userInfoText}>{username}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#333" style={styles.iconStyle} />
          <Text style={styles.userInfoLabel}>Email:</Text>
          <Text style={styles.userInfoText}>{email}</Text>
        </View>
      </View>

      {/* Favorites Section */}
      <Text style={styles.sectionTitle}>Favorites</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {favorites.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Image source={recipe.image} style={styles.recipeImage} />
            <View style={styles.recipeDetails}>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <Ionicons name="heart" size={20} color="#f0a500" />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          AsyncStorage.removeItem("userData");
          navigation.replace("Splash");
        }}
      >
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5f5",
  },
  topBar: {
    padding: 15,
    backgroundColor: "#f0a500",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    flex: 1,
    letterSpacing: 1.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  userInfo: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
    minWidth: 60, // Ensures label width consistency
    lineHeight:20,
  },
  userInfoText: {
    fontSize: 16,
    color: "#666",
    flex: 1, // Ensures the text takes up remaining space properly
    lineHeight:20,
  },
  iconStyle: {
    width: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  recipeCard: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  recipeImage: {
    width: "100%",
    height: 150,
  },
  recipeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    lineHeight:20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0a500",
    paddingVertical: 15,
    margin: 20,
    borderRadius: 25,
    justifyContent: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});

export default ProfileScreen;
