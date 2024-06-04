import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(null);
  const [floodRisk, setFloodRisk] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão de localização é necessária para o funcionamento do aplicativo.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const checkFloodRisk = async () => {
    if (!location) {
      Alert.alert('Localização não encontrada', 'Não foi possível obter a localização.');
      return;
    }

    try {
      // Substitua pela URL da API de previsão de IA
      const response = await axios.post('https://api.exemplo.com/predict-flood', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (response.data.floodRisk) {
        setFloodRisk(response.data.floodRisk);
        Alert.alert('Alerta de Enchente', 'Há um risco de enchente na sua área!');
      } else {
        setFloodRisk(null);
        Alert.alert('Sem Risco de Enchente', 'Não há risco de enchente na sua área.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a previsão de enchente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo de Alerta de Enchentes</Text>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Você está aqui"}
          />
        </MapView>
      ) : (
        <Text>Obtendo localização...</Text>
      )}
      <Button title="Verificar Risco de Enchente" onPress={checkFloodRisk} />
      {floodRisk && <Text style={styles.warning}>Risco de Enchente: {floodRisk}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  warning: {
    marginTop: 20,
    color: 'red',
    fontSize: 18,
  },
});
