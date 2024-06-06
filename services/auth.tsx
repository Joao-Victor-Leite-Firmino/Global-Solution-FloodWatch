// services/auth.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000'; 

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const { token } = response.data;
        await AsyncStorage.setItem('token', token);
        return token;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro ao fazer login');
    }
};

export const signup = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/registro`, { username, password, role });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro ao fazer registro');
    }
};

export const logout = async () => {
    await AsyncStorage.removeItem('token');
};
