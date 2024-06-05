import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';
import { ProvedorEstadoGlobal, useEstadoGlobal } from './hooks/EstadoGlobal';
import LocationList from './components/LocationList';
import { View } from 'native-base';

const AppContent = () => {
  const { carregarLocais, adicionarLocal } = useEstadoGlobal();

  const handleRefresh = () => {
    carregarLocais();
  };

  const handleAddLocation = () => {
    adicionarLocal('Nome do Local', 'Nível de Risco');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Probabilidade de Enchente</Text>
      <LocationList />
      <view style={styles.view}><Button title="Atualizar" onPress={handleRefresh} /></view>
      <Button title="Adicionar Local" onPress={handleAddLocation} />
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
  view: {
    marginBottom: "5%",
  }
});

export default App;

