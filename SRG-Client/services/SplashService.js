import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashService({ navigation }) {
  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          // Navigate to Home if userData exists
          navigation.replace('Home');
        } else {
          // Navigate to Login if userData is not found
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking user data:', error);
        navigation.replace('Login');
      }
    };

    checkUserData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f0a500" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
