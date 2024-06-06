import AsyncStorage from '@react-native-community/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';


type Props = {
  navigation: NativeStackNavigationProp<any, any>; 
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
   try {
     const response = await fetch('http://localhost:3000/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password }),
     });
 
     if (!response.ok) {
       throw new Error('Erro ao fazer login');
     }
 
     const data = await response.json();
     const token = data.token;
 
     // Armazene o token JWT localmente
     await AsyncStorage.setItem('token', token);
     console.log(token)
 
     // Navega para a tela Home após o login bem-sucedido
     navigation.navigate('Home');
   } catch (error) {
     console.error('Erro ao fazer login:', error);
   }
 };
 
  return (
    <View>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;