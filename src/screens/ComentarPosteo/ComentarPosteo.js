import react from "react";
import firebase from "firebase";
import { auth, db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, TextInput, ActivityIndicator } from "react-native";

export default function New_post(props){

    const [comentario, setComentario] = useState('')
    const [comentarios, setComentarios] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);


    function onSubmit(){
        db.collection('posts').doc(props.route.params.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
            creador: auth.currentUser.email,
            descripcion: comentario,
            fechaDeCreacion: Date.now(),
            }),
        })
        setComentario('');
    }

    useEffect( () => {
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    if (doc.id === props.route.params.id) {
                        posts.push({ 
                            id: doc.id,
                            data: doc.data(), 
                        });
                    }
                });
                setPost(posts[0]);
                setComentarios(posts[0].data.comentarios);
                setLoading(false);
            }
        );
    }, [])

    return(
        <View>
            {loading ? <ActivityIndicator size="large" color="#6C63FF"/> :
            <View style={{flex: 1, padding: 16}}>
            <Text>Comentar posteo</Text>
            <Text>{post.data.creador}</Text>
            <Text>{post.data.descripcion}</Text>
            <TextInput
                placeholder="Escribe tu comentario..."
                onChangeText={text => setComentario(text)}
                value={comentario}
            />
            <Pressable onPress={() => onSubmit()}>
                <Text>Publicar</Text>
            </Pressable>
            <FlatList
                data={comentarios}
                keyExtractor={item => item.fechaDeCreacion.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.creador}</Text>
                        <Text>{item.descripcion}</Text>
                    </View>
                )}
            />
            </View>}
        </View>
    )
}