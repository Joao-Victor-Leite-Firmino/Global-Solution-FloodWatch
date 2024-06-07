import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup } = useEstadoGlobal();

  const handleSignup = async () => {
    try {
      await signup(username, password, role);
      setSuccess('Usuário registrado com sucesso! Faça login para continuar.');
      setError('');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000); // Redireciona para a tela de login após 2 segundos
    } catch (err) {
      setError(err.message || 'Erro ao fazer cadastro');
      setSuccess('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Cargo"
        value={role}
        onChangeText={setRole}
      />
      <View style={styles.view}>
      <Button title="Cadastro" onPress={handleSignup} />
      </View>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
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
  success: {
    color: 'green',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SignupScreen;




