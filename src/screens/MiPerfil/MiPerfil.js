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
        <View style={styles.container}>
            <Text style={styles.tituloContainer}>Mi perfil</Text>
            <Text style={styles.campo}>{usuario ? usuario.username : "Cargando..."}</Text>
            <Text style={styles.campo}>{auth.currentUser ? auth.currentUser.email : ""}</Text>
            <Text style={styles.textoCampo}>Posteos</Text>
            {posteos.length === 0 ? (
                <Text style={styles.campo}>No hay ningún posteo</Text> 
            ) : (
                <FlatList style={styles.posteos}
                   data={posteos}
                   keyExtractor={item => item.id}
                   renderItem={({item}) => (
                    <View>
                        <Text>{item.datos.descripcion}</Text>
                    </View>
                   )}
                />
            )}

            <Pressable style={styles.boton} onPress={logout}>
                <Text style={styles.textoBoton}>Cerrar sesión</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
    },
    tituloContainer:{
        fontSize: 28,
        marginBottom: 20,
        fontWeight:"bold"
    },
    campo:{
        fontSize: 18,
        fontWeight:"bold"
    },
    textoCampo:{

    },
    boton:{
        width: "50%",
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
        marginTop: 10,
        alignSelf:"center"
    },
    textoBoton:{
        color: "white",
        textAlign: "center"
    }
})