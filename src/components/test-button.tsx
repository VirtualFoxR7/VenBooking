import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import api from '../services/axios';
import {styles} from '../constants/global-styles';

export default function TestButton() {
    const probarConexion = async () => {
        try {
            const respuesta = await api.get('/ping');
            console.log('Respuesta del servidor en frontend:', respuesta.data);
        } catch (error) {
            console.error('Fallo al conectar con el backend:', error);
        }
    };

    return (
        <TouchableOpacity style={styles.boton} onPress={probarConexion}>
            <Text style={styles.texto}>Zapato</Text>
        </TouchableOpacity>
    );
}

