import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Post(props){
    return(
        <View style={styles.card}>
            <Text style={styles.owner}>{props.data.creador}</Text>
            <Text style={styles.descripcion}>{props.data.descripcion}</Text>
            <Pressable style={styles.boton} onPress={() => props.navigation.navigate('ComentarPost', { id: props.id })}>
                <Text style={styles.botonTexto}>Comentar</Text>
            </Pressable>
        </View>
    )
} 

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    owner: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6C63FF',
        marginBottom: 6,
    },
    descripcion: {
        fontSize: 15,
        color: '#333333',
        lineHeight: 22,
        marginBottom: 12,
    },
    boton: {
        alignSelf: 'flex-start',
        backgroundColor: '#6C63FF',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    botonTexto: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },
    })