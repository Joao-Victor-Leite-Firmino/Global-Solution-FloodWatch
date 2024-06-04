import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import LocationList from './components/LocationList';
import SQLite from 'react-native-sqlite-storage';

const App = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = SQLite.openDatabase({ name: 'locations.db', createFromLocation: 1 });

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM locations',
        [],
        (tx, results) => {
          const rows = results.rows.raw();
          console.log('Locations:', rows);
          setLocations(rows);
          setError(null);
        },
        error => {
          console.error('Error fetching data:', error);
          setError('Erro ao carregar os dados');
        }
      );
    });

    db.close(() => {
      setLoading(false);
      console.log('Loading complete');
    });
  }, []);

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
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Probabilidade de Enchente</Text>
      <LocationList locations={locations} />
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
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default App;
