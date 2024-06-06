import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import LocationItem from './LocationItem';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

const LocationList = () => {
  const { locais } = useEstadoGlobal();

  return (
    <View style={styles.listContainer}>
      {locais.length === 0 ? (
        <Text>Nenhum local encontrado</Text>
      ) : (
        <FlatList
          data={locais}
          renderItem={({ item }) => <LocationItem location={item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
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

