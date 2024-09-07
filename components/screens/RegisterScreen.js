import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../constants";
import RNPickerSelect from "react-native-picker-select";
import { UserContext } from "../context/UserContext"; // Importar el contexto

const RegisterScreen = () => {
  const [rut, setRut] = useState(""); // Estado para el nombre
  const [name, setName] = useState(""); // Estado para el nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState(""); // Nuevo estado para manejar el tipo de usuario

  const { registerUser } = useContext(UserContext); // Usar el contexto
  const navigation = useNavigation();

  const handleRegister = () => {
    if (password !== confirmPassword || !password || !confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden o están vacías.");
      return;
    }

    if (!name || !email || !selectedUserType) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    // Registrar usuario con tipo, email, contraseña, nombre y rut
    registerUser(selectedUserType, email, password, name, rut); // Asegurarse de pasar el nombre y el tipo de usuario

    Alert.alert(
      "Usuario Registrado",
      "El usuario ha sido registrado con éxito como " + selectedUserType,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"), // Navegar a la pantalla de login después de la alerta
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <RNPickerSelect
        onValueChange={(value) => setSelectedUserType(value)} // Actualiza solo el estado local
        items={[
          { label: "Persona", value: "persona" },
          { label: "Organización", value: "organizacion" },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Selecciona una opción", value: null }}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: THEME.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: THEME.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: THEME.primary,
    textAlign: "center",
    fontSize: 16,
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
    paddingRight: 30, // Para ajustar el ícono en iOS
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
    paddingRight: 30, // Para ajustar el ícono en Android
    marginBottom: 15,
  },
});

export default RegisterScreen;
