import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LocationItem from './LocationItem';

const LocationList = ({ locations }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={locations}
        renderItem={({ item }) => <LocationItem location={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default LocationList;
