import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios'; // If you're using it in React Native
import { useNavigation } from '@react-navigation/native';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation(); // Use navigation from React Navigation

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5005/admin/adminSignin', {
        email,
        password,
      });

      const data = response.data;

      if (data.token) {
        // Save the token to AsyncStorage or a state management system
        // Example of saving to AsyncStorage:
        // await AsyncStorage.setItem('token', data.token);

        console.log('Login successful');
        navigation.navigate('AdminProfile'); // Navigate to the AdminProfile screen
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Admin Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: 'gray', marginBottom: 16, paddingLeft: 40 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={{ width: 300, height: 40, borderWidth: 1, borderColor: 'gray', marginBottom: 16, paddingLeft: 40 }}
      />
      <Button title="Login" onPress={handleLogin} />
      {errorMessage && <Text style={{ color: 'red', marginTop: 16 }}>{errorMessage}</Text>}
    </View>
  );
};

export default AdminLogin;
