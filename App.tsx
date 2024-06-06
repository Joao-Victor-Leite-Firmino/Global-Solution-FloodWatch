// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ProvedorEstadoGlobal } from './hooks/EstadoGlobal';
import MainNavigator from './services/MainNavigator';

const App = () => {
  return (
    <ProvedorEstadoGlobal>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ProvedorEstadoGlobal>
  );
};

export default App;




