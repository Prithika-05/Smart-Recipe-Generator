import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignUpScreen';
import SplashService from './services/SplashService.js';
import { StatusBar } from 'react-native';
import ProfileScreen from './screens/ProfileScreen.js';
import DetectedResultPage from './screens/DetectedScreen.js';
import ShowRecipes from './screens/ShowRecipeScreen.js';
import RecipeDetail from './screens/RecipeDetailScreen.js';
import { FavoritesProvider } from './context/FavoriteContext.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Set SplashService as the initial screen */}
        <Stack.Screen name="Splash" component={SplashService} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name="DetectResult" component={DetectedResultPage}/>
        <Stack.Screen name="ShowRecipes" component={ShowRecipes} /> 
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />     
      </Stack.Navigator>
    </NavigationContainer>
    </FavoritesProvider>
  );
}
