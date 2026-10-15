import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TestButton({ url = 'http://localhost:3000/api/test' }) {
    const probarConexion = async () => {
        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            console.log('Respuesta del servidor en frontend:', datos);
        } catch (error) {
            console.error('Fallo al conectar con el backend:', error);
        }
    };

    return (
        <TouchableOpacity style={styles.boton} onPress={probarConexion}>
            <Text style={styles.texto}>Testear Conexión</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#10b981',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    texto: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});