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
import { NotificationContext } from "../context/NotificationContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const AdoptScreen = () => {
  const { currentUser } = useContext(UserContext); // Obtener el usuario actual del contexto
  const { addNotification } = useContext(NotificationContext); // Obtener la función de agregar notificación del contexto
  const navigation = useNavigation();
  const route = useRoute();
  const { petDetails } = route.params; // Recibir los detalles de la mascota

  const [userName, setUserName] = useState(currentUser?.name || ""); // Precargar el nombre del usuario registrado
  const [adopterStory, setAdopterStory] = useState(""); // Estado para la historia del adoptante

  const handleSendNow = () => {
    console.log("Nombre del adoptante:", userName);
    console.log("Historia del adoptante:", adopterStory);
    alert("¡Solicitud de adopción enviada!");

    // Agregar notificación con detalles de la mascota
    addNotification({
      id: new Date().getTime(),
      title: `Solicitud de adopción: ${petDetails.name}`, // Incluye el nombre de la mascota
      body: "Tu solicitud de adopción ha sido enviada y está por revisar.",
      status: "Por revisar",
      date: new Date().toLocaleString(),
      petDetails: petDetails, // Incluye los detalles completos de la mascota
      adopterStory: adopterStory,
      history: [
        { date: new Date().toLocaleString(), text: "Solicitud enviada" },
      ],
    });

    navigation.goBack();
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
          <Text style={styles.sendButtonText}>Solicitar Adopción</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: THEME.bgColor, // Fondo general de la pantalla
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
    color: THEME.primary, // Color del texto del título del encabezado
  },
  petDetailsCard: {
    backgroundColor: THEME.white, // Fondo de la tarjeta de detalles de la mascota
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
    color: THEME.dark, // Color del nombre de la mascota
  },
  petBreed: {
    fontSize: 14,
    color: THEME.gray, // Color de la raza de la mascota
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    backgroundColor: THEME.secondary, // Fondo de las etiquetas
    color: THEME.white, // Color del texto de las etiquetas
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
    color: THEME.gray, // Color del texto de la ubicación
  },
  formContainer: {
    marginTop: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: THEME.dark, // Color del texto de las etiquetas del formulario
  },
  input: {
    height: 40,
    borderColor: THEME.grayLight,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: THEME.grayLight, // Fondo de los campos de entrada
  },
  textArea: {
    height: 80,
    borderColor: THEME.grayLight,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    backgroundColor: THEME.grayLight, // Fondo de las áreas de texto
  },
  sendButton: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    backgroundColor: THEME.primary, // Fondo del botón de envío
    borderRadius: 40,
  },
  sendButtonText: {
    color: THEME.white, // Color del texto del botón de envío
    fontSize: 16,
    fontWeight: "bold",
  },
  attributeCard: {
    alignItems: "center",
    padding: 10,
    backgroundColor: THEME.menuBackground, // Fondo del atributo
    borderRadius: 10, // Bordes curvados de la tarjeta
    flex: 1,
    marginHorizontal: 5,
  },
  attributeTitle: {
    color: THEME.gray, // Color del título del atributo
  },
  attributeValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: THEME.dark, // Color del valor del atributo
  },
});

export default AdoptScreen;
