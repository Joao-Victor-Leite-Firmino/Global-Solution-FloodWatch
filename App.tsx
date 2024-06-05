import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import LocationList from './components/LocationList';

const App = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:3000/locations');
      if (!response.ok) {
        throw new Error(`Erro ao buscar os locais: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Dados recebidos:', data); 
      setLocations(data);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar os locais:', error); 
      setError('Erro ao buscar os locais');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchLocations();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={handleRefresh} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Probabilidade de Enchente</Text>
      <LocationList locations={locations} />
      <Button title="Atualizar" onPress={handleRefresh} />
    </SafeAreaView>
  );
};

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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 22,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '2%',
  },
});

export default App;
