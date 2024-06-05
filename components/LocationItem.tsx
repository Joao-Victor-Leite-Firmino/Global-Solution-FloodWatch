import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

const LocationItem = ({ location }) => {
  const { editarRisco, excluirLocal } = useEstadoGlobal();

  const handleEditRisk = () => {
    editarRisco(location.id, 'Novo Risco');
  };

  const handleDelete = () => {
    excluirLocal(location.id);
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{location.name}</Text>
      <Text style={styles.itemText}>{location.risk}</Text>
      <Button title="Editar Risco" onPress={handleEditRisk} />
      <Button title="Excluir Local" onPress={handleDelete} />
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

