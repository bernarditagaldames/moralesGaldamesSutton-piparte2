import {View, Text, Pressable, StyleSheet, TextInput} from "react-native";
import {useState} from "react";
import {auth} from "../../firebase/config";

export default function Login(props){
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function validar(){
        if(!email.includes("@")){
            setError("Ingresa una direccion de email");
            return false
        }
        if (password.length<6){
            setError("La contraseña debe tener un minimo de 6 caracteres");
            return false;
        }
        return true
    }

    function onSubmit(){
        setError("");

        if(!validar()) return;

        auth.signInWithEmailAndPassword(email,password)
            .then(res => {props.navigation.navigate("homeMenu");

            })
            .catch(error =>{
                setError("Credenciales incorrectas");
            })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.tituloContainer}>Login</Text>
            <TextInput style={styles.campo}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}/>
            <TextInput style={styles.campo}
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}/>
            {error ? <Text style={styles.error}>{error}</Text>: null}
            <Pressable style={styles.boton} onPress={()=> onSubmit()}>
                <Text style={styles.textoBoton}>Ingresar</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Register")}>
                <Text style={styles.register}>No tengo cuenta</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20, 
        justifyContent: "center",
        alignItems:"center",
    },
    tituloContainer: {
        fontSize: 28,
        textAlign: "center",
        marginBottom: 20,
    },
    campo:{
        width: "50%",
        borderWidth: 1,
        borderColor: "#c9bdbd",
        padding: 10,
        marginBottom: 15,
        borderRadius: 6,
    },
    boton:{
        width: "50%",
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
        marginTop: 10,
    },
    textoBoton:{
        color: "white",
        textAlign: "center"
    },
    register:{
        color: "black",
        textAlign:"center",
        marginTop: 20,
    },
    error: {
        color: "red",
        textAlign:"center",
        marginBottom: 10,
    },
});