import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useEstadoGlobal();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigation.navigate('AppContent');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo ao FloodWatch!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.view}>
      <Button title="Login" onPress={handleLogin} />
      </View>
      <Button title="Cadastro" onPress={() => navigation.navigate('Signup')} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#b2e0f4',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    paddingBottom: '3%',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  view: {
    marginTop: "3%",
    marginBottom: "3%"
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LoginScreen;



