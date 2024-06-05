import React, { useState, useEffect  } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button } from 'react-native';
import { ProvedorEstadoGlobal, useEstadoGlobal } from './hooks/EstadoGlobal';
import LocationList from './components/LocationList';

const AppContent = () => {
  const { carregarLocais, adicionarLocal } = useEstadoGlobal();
  const [name, setName] = useState('');
  const [risk, setRisk] = useState('');

  useEffect(() => {
    carregarLocais();
  }, []);

  const handleAddLocation = () => {
    if (name && risk) {
      adicionarLocal(name, risk);
      setName('');
      setRisk('');
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Probabilidade de Enchente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Local"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nível de Risco"
        value={risk}
        onChangeText={setRisk}
      />
      <Button title="Adicionar Local" onPress={handleAddLocation} />
      <LocationList />
    </SafeAreaView>
  );
};

const App = () => (
  <ProvedorEstadoGlobal>
    <AppContent />
  </ProvedorEstadoGlobal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
});

export default App;