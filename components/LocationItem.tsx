import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LocationItem = ({ location }) => {
  return (
    <View style={styles.itemContainer}>
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
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});

export default LocationItem;
