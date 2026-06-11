import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [errorR, setErrorR] = useState("");

  function onSubmit() {
    setErrorR("");

    if (email === "") {
      setErrorR("El email es obligatorio");
      return;
    }

    if (password === "") {
      setErrorR("La contraseña es obligatoria");
      return;
    }

    if (user === "") {
      setErrorR("El nombre de usuario es obligatorio");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        db.collection("users").add({
            email: email,
            username: user,
            createdAt: Date.now(),
          })
          .then(() => {
            auth.signOut().then(() => {
              props.navigation.navigate("Login");
            });
          })
          .catch((e) => {
            console.log(e);
            setErrorR("Error en el registro");
          });
      })
      .catch((err) => {
        setErrorR(err.message);
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="nombre de usuario"
        onChangeText={(text) => setUser(text)}
        value={user}
      />

      <TextInput
        style={styles.input}
        placeholder="contraseña"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />

      {errorR !== "" ? <Text style={styles.error}>{errorR}</Text> : null}

      <Pressable style={styles.boton} onPress={() => onSubmit()}>
        <Text style={styles.botonTexto}>Registrarme</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.link}>Ya tengo cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#c9bdbd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },

  boton: {
    width: "50%",
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },

  botonTexto: {
    color: "white",
    textAlign: "center",
  },

  link: {
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Register;