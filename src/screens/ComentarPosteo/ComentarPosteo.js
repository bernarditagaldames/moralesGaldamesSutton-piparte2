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
        <View style={styles.container}>
            {loading ? <ActivityIndicator size="large" color="#6C63FF"/> :
            <View style={styles.inner}>
            <Text style={styles.titulo}>Comentar posteo</Text>
            <View style={styles.postCard}>
                <Text style={styles.postOwner}>{post.data.creador}</Text>
                <Text style={styles.postDescripcion}>{post.data.descripcion}</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Escribe tu comentario..."
                onChangeText={text => setComentario(text)}
                value={comentario}
            />
            <Pressable style={styles.boton} onPress={() => onSubmit()}>
                <Text style={styles.botonTexto}>Publicar</Text>
            </Pressable>
            <FlatList
                data={comentarios}
                keyExtractor={item => item.fechaDeCreacion.toString()}
                renderItem={({ item }) => (
                    <View style={styles.comentarioCard}>
                        <Text style={styles.comentarioOwner}>{item.creador}</Text>
                        <Text style={styles.comentarioTexto}>{item.descripcion}</Text>
                    </View>
                )}
            />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F0F2F5' 
    },
    inner: { 
        flex: 1, 
        padding: 16 
    },
    titulo: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#1A1A2E', 
        marginBottom: 4 
    },
    postCard: { 
        backgroundColor: '#FFFFFF', 
        borderRadius: 12, 
        padding: 16, 
        marginBottom: 16,
    },
    postOwner: { 
        fontSize: 13, 
        fontWeight: '600', 
        color: '#6C63FF', 
        marginBottom: 4 
    },
    postDescripcion: { 
        fontSize: 15, 
        color: '#333333' 
    },
    input: { 
        backgroundColor: '#FFFFFF', 
        borderRadius: 10, 
        padding: 12, 
        marginBottom: 10, 
        fontSize: 14,
    },
    boton: { 
        backgroundColor: '#6C63FF', 
        borderRadius: 20, 
        padding: 12, 
        alignItems: 'center', 
        marginBottom: 16 
    },
    botonTexto: { 
        color: '#FFFFFF', 
        fontWeight: '600', 
        fontSize: 14 
    },
    comentarioCard: { 
        backgroundColor: '#FFFFFF', 
        borderRadius: 10, 
        padding: 12, 
        marginBottom: 8,
    },
    comentarioOwner: { 
        fontSize: 12, 
        fontWeight: '600', 
        color: '#6C63FF', 
        marginBottom: 2 
    },
    comentarioTexto: { 
        fontSize: 14, 
        color: '#333333' 
    },
})
