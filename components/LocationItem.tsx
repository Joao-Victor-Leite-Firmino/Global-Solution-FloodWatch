import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';
import { Picker } from '@react-native-picker/picker';

const LocationItem = ({ location }) => {
  const { editarRisco, excluirLocal } = useEstadoGlobal();
  const [editando, setEditando] = useState(false);
  const [novoRisco, setNovoRisco] = useState(location.risk);

  const handleEditRisk = () => {
    setEditando(true);
  };

  const handleSave = async () => {
    await editarRisco(location.id, novoRisco);
    setEditando(false);
  };

  const handleCancel = () => {
    setNovoRisco(location.risk);
    setEditando(false);
  };

  const handleDelete = () => {
    excluirLocal(location.id);
  };

  const getBackgroundColor = (risk) => {
    switch (risk) {
      case 'Baixo nível':
        return '#82d163'; // Verde
      case 'Médio nível':
        return '#ffeb3b'; // Amarelo
      case 'Alto nível':
        return '#ff9800'; // Laranja
      case 'Emergência':
        return '#f44336'; // Vermelho
      default:
        return '#ffffff'; // Branco padrão
    }
  };

  return (
    <View style={[styles.itemContainer, { backgroundColor: getBackgroundColor(location.risk) }]}>
      <Text style={styles.itemText}>{location.name}</Text>
      {editando ? (
        <>
          <Picker
            selectedValue={novoRisco}
            style={styles.picker}
            onValueChange={(itemValue) => setNovoRisco(itemValue)}
          >
            <Picker.Item label="Baixo nível" value="Baixo nível" />
            <Picker.Item label="Médio nível" value="Médio nível" />
            <Picker.Item label="Alto nível" value="Alto nível" />
            <Picker.Item label="Emergência" value="Emergência" />
          </Picker>
          <Button title="Salvar" onPress={handleSave} />
          <View style={styles.botao}>
          <Button title="Cancelar" onPress={handleCancel} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.itemText}>{location.risk}</Text>
          <View style={styles.view}>
          <Button title="Editar Risco" onPress={handleEditRisk} />
          </View>
        </>
      )}
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
    alignItems: 'center',
    marginTop: "8%",
  },
  botao: {
    marginTop: "3%",
    marginBottom: "3%",
  },
  view: {
    marginTop: "7%",
    marginBottom: "3%",
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    marginRight: '10%'
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default LocationItem;

