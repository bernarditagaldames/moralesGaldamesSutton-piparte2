import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { auth, db } from "../../firebase/config";

function CrearPosteo(props) {
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const crearPosteo = () => {
    
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
    <View>
      <Text> Crear posteo </Text>

      <TextInput
        placeholder="Escribí una descripción..."
        value={descripcion}
        onChangeText={ text => setDescripcion(text)}
      />

      {error !== "" ? <Text> {error} </Text> : null}

      <Pressable onPress={crearPosteo}>
        <Text> Publicar </Text>
      </Pressable>
    </View>
  );
}

export default CrearPosteo;