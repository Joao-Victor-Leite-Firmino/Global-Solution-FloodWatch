import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button } from 'react-native';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';
import LocationList from '../components/LocationList';
import { Picker } from '@react-native-picker/picker';

const AppContent = () => {
  const { carregarLocais, adicionarLocal } = useEstadoGlobal();
  const [name, setName] = useState('');
  const [risk, setRisk] = useState('Baixo nível');

  useEffect(() => {
    carregarLocais();
  }, []);

  const handleAddLocation = () => {
    if (name && risk) {
      adicionarLocal(name, risk);
      setName('');
      setRisk('Baixo nível');
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
      <Picker
        selectedValue={risk}
        style={styles.picker}
        onValueChange={(itemValue) => setRisk(itemValue)}
      >
        <Picker.Item label="Baixo nível" value="Baixo nível" />
        <Picker.Item label="Médio nível" value="Médio nível" />
        <Picker.Item label="Alto nível" value="Alto nível" />
        <Picker.Item label="Emergência" value="Emergência" />
      </Picker>
      <Button title="Adicionar Local" onPress={handleAddLocation} />
      <LocationList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2e0f4',
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
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 10,
  },
});

export default AppContent;
