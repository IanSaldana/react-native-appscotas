import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../constants";
import { UserContext } from "../context/UserContext"; // Importa el contexto del usuario
import { useNavigation, useRoute } from "@react-navigation/native";

const AdoptScreen = () => {
  const { currentUser } = useContext(UserContext); // Obtener el usuario actual del contexto
  const navigation = useNavigation();
  const route = useRoute();
  const { petDetails } = route.params; // Recibir los detalles de la mascota

  const [userName, setUserName] = useState(currentUser?.name || ""); // Precargar el nombre del usuario registrado
  const [adopterStory, setAdopterStory] = useState(""); // Estado para la historia del adoptante

  const handleSendNow = () => {
    // Aquí va la lógica para manejar el envío de la solicitud de adopción
    console.log("Nombre del adoptante:", userName);
    console.log("Historia del adoptante:", adopterStory);
    alert("¡Solicitud de adopción enviada!");
    // Puedes agregar aquí el código para enviar los datos a un backend o servicio
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={THEME.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Solicitud de Adopcion</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" size={24} color={THEME.dark} />
          </TouchableOpacity>
        </View>

        {/* Detalles de la Mascota */}
        <View style={styles.petDetailsCard}>
          <Image source={petDetails.image} style={styles.petImage} />
          <View style={styles.petInfo}>
            <Text style={styles.petName}>
              {petDetails.name}{" "}
              <Text style={styles.petBreed}>({petDetails.species})</Text>
            </Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>{`${petDetails.age} años`}</Text>
              <Text style={styles.tag}>
                {petDetails.gender === "Macho" ? "Adulto" : "Adulta"}
              </Text>
              <Text style={styles.tag}>{petDetails.color}</Text>
            </View>
            <View style={styles.locationContainer}>
              <Icon name="location-outline" size={16} color={THEME.danger} />
              <Text style={styles.locationText}>
                {petDetails.location.region}, {petDetails.location.comuna}
              </Text>
            </View>
          </View>
        </View>

        {/* Formulario de Adopción */}
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Tu nombre"
          />

          <Text style={styles.formLabel}>Cuéntanos tu historia</Text>
          <TextInput
            style={styles.textArea}
            value={adopterStory}
            onChangeText={setAdopterStory}
            placeholder="Escribe una breve descripción..."
            multiline
          />
        </View>

        {/* Botón de Enviar */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendNow}>
          <Text style={styles.sendButtonText}>Send Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.dark,
  },
  petDetailsCard: {
    backgroundColor: THEME.white,
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: THEME.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  petImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  petInfo: {
    alignItems: "center",
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.dark,
  },
  petBreed: {
    fontSize: 14,
    color: THEME.gray,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    backgroundColor: THEME.secondary,
    color: THEME.white,
    padding: 5,
    borderRadius: 5,
    marginRight: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    marginLeft: 5,
    color: THEME.gray,
  },
  formContainer: {
    marginTop: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: THEME.dark,
  },
  input: {
    height: 40,
    borderColor: THEME.grayLight,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: THEME.grayLight,
  },
  textArea: {
    height: 80,
    borderColor: THEME.grayLight,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    backgroundColor: THEME.grayLight,
  },
  sendButton: {
    backgroundColor: THEME.danger,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  sendButtonText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdoptScreen;
