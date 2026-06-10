import {View, Text, Pressable, StyleSheet, TextInput} from "react-native";
import {useState, useEffect} from "react";
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
        <View>
            <Text>Login</Text>
            <TextInput
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}/>
            <TextInput
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}/>
            {error ? <Text>{error}</Text>: null}
            <Pressable onPress={()=> onSubmit()}>
                <Text>Ingresar</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Register")}>
                <Text>No tengo cuenta</Text>
            </Pressable>
        </View>
    )
}