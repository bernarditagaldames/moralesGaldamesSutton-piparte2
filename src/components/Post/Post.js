import React from "react";
import { View, Text, Pressable } from "react-native";

export default function Post(props){
    return(
        <View>
            <Text>{props.data.creador}</Text>
            <Text>{props.data.descripcion}</Text>
            <Pressable onPress={() => props.navigation.navigate('ComentarPost', { id: props.id })}>
                <Text>Comentar</Text>
            </Pressable>
        </View>
    )
} 