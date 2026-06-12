import { useState } from "react";
import { View, Text, TextInput, Pressable , StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";

function CrearPosteo(props) {
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  function onSubmit() {
    db.collection("posts")
      .add({
        creador : auth.currentUser.email,
        descripcion: descripcion,
        fechaDeCreacion: Date.now(),
        likes: [],
      })
      .then(() => {
        setDescripcion("");
        setError("");
        props.navigation.navigate("Home");
      })
      .catch((e) => {
        console.log(e);
        setError("No se pudo crear el posteo.");
      });
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}> Crear posteo </Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí una descripción..."
        value={descripcion}
        onChangeText={ text => setDescripcion(text)}
      />

      {error !== "" ? <Text style={styles.error}> {error} </Text> : null}

      <Pressable style={styles.boton} onPress={onSubmit}>
        <Text style={styles.texto}> Publicar </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  }

  ,titulo: {
    marginTop: 70,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "bold",
  },

  input: {
    width: "60%",
    height: 80,
    borderColor: "#0f0909",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#c8d2f0",
  },

  error: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
  },

  boton: {
    backgroundColor: "#5e7ee7",
    borderRadius: 8,
    margin: 20,
    width: 150,
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  texto: {
    color: "#f3ecec",
    fontSize: 20,
    fontWeight: "bold",
  },

})

export default CrearPosteo;