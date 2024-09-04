import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Switch,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { THEME } from "../constants";
import { addPet } from "../constants/data";

const CreatePetScreen = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const handleCreatePet = () => {
    if (
      !name ||
      !species ||
      !color ||
      !age ||
      !gender ||
      !region ||
      !comuna ||
      !description
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const newPet = {
      id: Date.now().toString(),
      name,
      species,
      color,
      age: parseInt(age, 10),
      vaccinated,
      gender,
      location: { region, comuna },
      description,
      image: image ? { uri: image } : null,
    };

    addPet(newPet);

    // Limpiar el formulario después de crear
    setName("");
    setSpecies("");
    setColor("");
    setAge("");
    setVaccinated(false);
    setGender("");
    setDescription("");
    setRegion("");
    setComuna("");
    setImage(null);

    Alert.alert("Creación de mascota", "Publicación creada con éxito.");
    navigation.navigate("Inicio");
  };

  const handleChoosePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Error", "Se requiere permiso para acceder a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const formElements = [
    {
      key: "photo",
      element: (
        <>
          <TouchableOpacity
            style={styles.photoButton}
            onPress={handleChoosePhoto}
          >
            <Text style={styles.photoButtonText}>Subir foto</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.photo} />}
        </>
      ),
    },
    {
      key: "name",
      element: (
        <>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el nombre de la mascota"
            value={name}
            onChangeText={setName}
          />
        </>
      ),
    },
    {
      key: "species",
      element: (
        <>
          <Text style={styles.label}>Especie:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSpecies(value)}
            items={[
              { label: "Perro", value: "Perro" },
              { label: "Gato", value: "Gato" },
            ]}
            placeholder={{ label: "Seleccione la especie", value: null }}
            style={pickerSelectStyles}
          />
        </>
      ),
    },
    {
      key: "color",
      element: (
        <>
          <Text style={styles.label}>Color:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el color de la mascota"
            value={color}
            onChangeText={setColor}
          />
        </>
      ),
    },
    {
      key: "age",
      element: (
        <>
          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese la edad de la mascota"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </>
      ),
    },
    {
      key: "vaccinated",
      element: (
        <>
          <Text style={styles.label}>Vacunado:</Text>
          <View style={styles.switchContainer}>
            <Switch value={vaccinated} onValueChange={setVaccinated} />
            <Text>{vaccinated ? "Sí" : "No"}</Text>
          </View>
        </>
      ),
    },
    {
      key: "gender",
      element: (
        <>
          <Text style={styles.label}>Género:</Text>
          <RNPickerSelect
            onValueChange={(value) => setGender(value)}
            items={[
              { label: "Macho", value: "Macho" },
              { label: "Hembra", value: "Hembra" },
            ]}
            placeholder={{ label: "Seleccione el género", value: null }}
            style={pickerSelectStyles}
          />
        </>
      ),
    },
    {
      key: "description",
      element: (
        <>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Ingrese una descripción de la mascota"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
        </>
      ),
    },
    {
      key: "region",
      element: (
        <>
          <Text style={styles.label}>Región:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese la región"
            value={region}
            onChangeText={setRegion}
          />
        </>
      ),
    },
    {
      key: "comuna",
      element: (
        <>
          <Text style={styles.label}>Comuna:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese la comuna"
            value={comuna}
            onChangeText={setComuna}
          />
        </>
      ),
    },
    {
      key: "submit",
      element: (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.createBtn}
          onPress={handleCreatePet}
        >
          <Text style={styles.createText}>Crear publicación</Text>
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior="padding"
      keyboardVerticalOffset={20}
    >
      <SafeAreaView style={styles.main}>
        <StatusBar translucent={false} />
        <FlatList
          data={formElements}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>{item.element}</View>
          )}
          keyExtractor={(item) => item.key}
          style={{ padding: 20 }}
          ListHeaderComponent={() => (
            <Text style={styles.headerName}>Crear publicación</Text>
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    padding: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  headerName: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.primary,
    marginBottom: 20,
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
    marginTop: 20,
    backgroundColor: THEME.primary,
    borderRadius: 40,
  },
  createText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  textArea: {
    height: 80,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  photoButton: {
    backgroundColor: THEME.primary,
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
});

export default CreatePetScreen;
