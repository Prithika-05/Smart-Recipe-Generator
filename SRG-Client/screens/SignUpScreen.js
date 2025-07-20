import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignup = async () => {

    
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.', [{ text: 'OK' }]);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.', [{ text: 'OK' }]);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match. Please try again.', [{ text: 'OK' }]);
      return;
    }

    const userData = {email, password, username};

    try {
      const response = await fetch('https://kvl1wj29-7001.inc1.devtunnels.ms/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password,username }),
      });

      const result = await response.json();
      console.log('Response:', response.status, result);

      if (response.ok) {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Something went wrong. Please try again.', [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to connect to the server. Please try again later.', [
        { text: 'OK' },
      ]);
    }
  };
  return (
  
      <ImageBackground
        source={require('../assets/images/background.jpeg')}
        style={styles.background}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.icon}
            >
              <Ionicons
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={24}
                color="#ccc"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#ccc"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              style={styles.icon}
            >
              <Ionicons
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                size={24}
                color="#ccc"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 16,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#f0a500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight:20,
  },
  link: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default SignupScreen;
