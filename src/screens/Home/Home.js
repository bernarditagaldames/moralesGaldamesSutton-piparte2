import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { View, Text, StyleSheet, ActivityIndicator, Pressable, FlatList } from "react-native";

import Post from "../../components/Post/Post";

export default function Home(props){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        auth.onAuthStateChanged( user => {
            if (!user) {
                props.navigation.navigate('login');
            }
        });
    
        db.collection('posts').orderBy('fechaDeCreacion', 'desc').onSnapshot(
            docs => {
                let post = [];
                docs.forEach( doc => {
                    post.push({ 
                        id: doc.id,
                        data: doc.data(), 
                });
                });
                setPosts(post);
                setLoading(false)
                console.log(post);
            }
        );
    }, []);

    return(
        <View style={styles.container}>
        {loading ? <ActivityIndicator size="large" color="#6C63FF"/> :
            <View style={styles.inner}>
                <Text style={styles.titulo}>Home</Text>
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => ( <Post data={item.data} id={item.id} navigation={props.navigation} />
                    )}
                />
            </View>}
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    inner: {
        flex: 1,
        padding: 16,
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A1A2E',
        marginBottom: 16,
    }
})