import {View, Text, Pressable, FlatList, StyleSheet} from "react-native";
import { db, auth } from "../../firebase/config";
import { useState, useEffect } from "react";

export default function MiPerfil(props){
    const [usuario, setUsuario] = useState(null);
    const [posteos, setPosteos] = useState([]);

    useEffect(() => {
        const usuarioLogueado = auth.currentUser;

        if (usuarioLogueado === null){
            props.navigation.navigate("Login");
            return;
        }

        db.collection("users").where("email", "==", usuarioLogueado.email).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    setUsuario(doc.data());
                })
            }
        );

        db.collection("posts").where("creador", "==", usuarioLogueado.email).onSnapshot(
            docs => {
                let postsDelUsuario = [];

                docs.forEach(doc => {
                    postsDelUsuario.push({
                        id: doc.id,
                        datos: doc.data()
                    })
                })

                setPosteos(postsDelUsuario)
            }
        )
        
    }, []);

    function logout(){
        auth.signOut()
        .then(()=>{
            props.navigation.navigate("Login")
        })
        .catch(e => {
            console.log(e)
        });
    }

    return(
        <View>
            <Text>Mi perfil</Text>
            <Text>{usuario ? usuario.username : "Cargando..."}</Text>
            <Text>{auth.currentUser ? auth.currentUser.email : ""}</Text>
            <Text>Posteos</Text>
            {posteos.length === 0 ? (
                <Text>No hay ningún posteo</Text> 
            ) : (
                <FlatList
                   data={posteos}
                   keyExtractor={item => item.id}
                   renderItem={({item}) => (
                    <View>
                        <Text>{item.datos.descripcion}</Text>
                    </View>
                   )}
                />
            )}

            <Pressable onPress={logout}>
                <Text>Cerrar sesión</Text>
            </Pressable>
        </View>
    )
}
