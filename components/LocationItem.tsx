import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LocationItem = ({ location }) => {
  return (
    <View style={[styles.itemContainer, styles[location.risk.replace(' ', '_')]]}>
      <Text style={styles.itemText}>{location.name}</Text>
      <Text style={styles.itemText}>{location.risk}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
  },
  Baixo_risco: {
    backgroundColor: '#d4edda',
  },
  Médio_risco: {
    backgroundColor: '#fff3cd',
  },
  Alto_risco: {
    backgroundColor: '#f8d7da',
  },
  Emergência: {
    backgroundColor: '#f5c6cb',
  },
});

export default LocationItem;