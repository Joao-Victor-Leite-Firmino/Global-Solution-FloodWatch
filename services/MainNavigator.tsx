// MainNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/Signup';
import AppContent from '../screens/AppContent';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user } = useEstadoGlobal();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="AppContent" component={AppContent} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
