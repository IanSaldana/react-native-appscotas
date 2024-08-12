import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { THEME } from "../constants";

const CreatePetScreen = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const navigation = useNavigation();

  const handleCreatePet = () => {
    // Aquí manejarías la lógica para crear la mascota, como enviar los datos al backend o guardarlos localmente
    Alert.alert("Creacion mascota", "Creacion exitosa");
    navigation.navigate("Inicio");
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={false} />
      <View style={styles.container}>
        <Text style={styles.headerName}>Crear publicacion</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el nombre de la mascota"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Edad:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la edad de la mascota"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Ingrese una descripción de la mascota"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <Text style={styles.label}>Ubicación:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la ubicación de la mascota"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.createBtn}
        onPress={handleCreatePet}
      >
        <Text style={styles.createText}>Crear publicacion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    padding: 15,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  headerName: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.primary,
    opacity: 0.9,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  createBtn: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    marginTop: 10,
    backgroundColor: THEME.secondary,
    borderRadius: 40,
  },
  createText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: "400",
  },
  textArea: {
    height: 80,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    textAlignVertical: "top", // Para Android, asegura que el texto empiece desde la parte superior
  },
  photoButton: {
    backgroundColor: "#FF007F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  photoButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  photo: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default CreatePetScreen;
