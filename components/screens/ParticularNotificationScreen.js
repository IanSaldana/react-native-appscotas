import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";
import { useRoute } from "@react-navigation/native";
import { THEME } from "../constants";
import RNPickerSelect from "react-native-picker-select"; // Importamos RNPickerSelect para el selector

const ParticularNotificationScreen = () => {
  const { notifications, updateNotificationStatus } =
    useContext(NotificationContext); // Se agrega la función para actualizar el estado
  const { currentUser } = useContext(UserContext); // Obtener el usuario actual del contexto
  const route = useRoute();
  const { notificationId } = route.params;

  const notification = notifications.find(
    (notif) => notif.id === notificationId
  );

  const [status, setStatus] = useState(notification ? notification.status : ""); // Estado local para el estado de la notificación

  if (!notification) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Notificación no encontrada</Text>
      </SafeAreaView>
    );
  }

  const handleStatusChange = (newStatus) => {
    if (newStatus !== status) {
      // Solo actualizar si el estado es diferente
      // Actualizar el estado local
      setStatus(newStatus);
      // Llamar a la función de contexto para actualizar el estado y el historial
      updateNotificationStatus(notificationId, newStatus);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Título de la Notificación */}
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.date}>{notification.date}</Text>

        {/* Estado de la Adopción */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Estado de la Adopción:</Text>
          {/* Si el usuario es una organización, mostrar el Picker para cambiar el estado */}
          {currentUser && currentUser.type === "organizacion" ? (
            <RNPickerSelect
              onValueChange={handleStatusChange}
              items={[
                { label: "Por revisar", value: "Por revisar" },
                { label: "Aceptada", value: "Aceptada" },
                { label: "Cancelada", value: "Cancelada" },
                { label: "Finalizada", value: "Finalizada" },
              ]}
              value={status}
              style={pickerSelectStyles}
            />
          ) : (
            <Text style={styles.status}>{status}</Text>
          )}
        </View>

        {/* Historia del Adoptante */}
        {notification.adopterStory && (
          <View style={styles.adopterStoryContainer}>
            <Text style={styles.storyTitle}>Historia del Adoptante:</Text>
            <Text style={styles.storyText}>{notification.adopterStory}</Text>
          </View>
        )}

        {/* Detalles de la Mascota */}
        {notification.petDetails && (
          <View style={styles.petDetailsContainer}>
            <Text style={styles.petDetailsTitle}>Detalles de la Mascota:</Text>
            <Image
              source={notification.petDetails.image}
              style={styles.petImage}
            />
            <Text style={styles.petName}>
              {notification.petDetails.name} ({notification.petDetails.species})
            </Text>
            <Text style={styles.petInfo}>
              Edad: {notification.petDetails.age} años
            </Text>
            <Text style={styles.petInfo}>
              Género: {notification.petDetails.gender}
            </Text>
            <Text style={styles.petInfo}>
              Color: {notification.petDetails.color}
            </Text>
            <Text style={styles.petInfo}>
              Ubicación: {notification.petDetails.location.region},{" "}
              {notification.petDetails.location.comuna}
            </Text>
          </View>
        )}

        {/* Historial de la Solicitud */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Historial de la Solicitud:</Text>
          {notification.history.map((entry, index) => (
            <View key={index} style={styles.historyEntry}>
              <Text style={styles.historyDate}>{entry.date}</Text>
              <Text style={styles.historyText}>{entry.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bgColor,
    padding: 20,
  },
  errorText: {
    color: THEME.danger,
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: THEME.primary,
  },
  date: {
    fontSize: 14,
    color: THEME.gray,
    marginBottom: 20,
  },
  statusContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: THEME.bgColor, // Fondo del contenedor en el color del menú
    borderRadius: 8,
    borderWidth: 1, // Agregar borde
    borderColor: THEME.menuBackground, // Color del borde del contenedor
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: THEME.primary,
  },
  status: {
    fontSize: 14,
    color: THEME.secondary,
    fontWeight: "bold",
  },
  adopterStoryContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: THEME.bgColor, // Fondo del contenedor en el color del menú
    borderRadius: 8,
    borderWidth: 1, // Agregar borde
    borderColor: THEME.menuBackground, // Color del borde del contenedor
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: THEME.primary,
  },
  storyText: {
    fontSize: 14,
    color: THEME.secondary,
  },
  petDetailsContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: THEME.bgColor, // Fondo del contenedor en el color del menú
    borderRadius: 8,
    borderWidth: 1, // Agregar borde
    borderColor: THEME.menuBackground, // Color del borde del contenedor
  },
  petDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: THEME.primary,
  },
  petImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.primary,
    marginBottom: 5,
  },
  petInfo: {
    fontSize: 14,
    color: THEME.secondary,
    marginBottom: 5,
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: THEME.primary,
  },
  historyEntry: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: THEME.bgColor, // Fondo del contenedor en el color del menú
    borderRadius: 5,
    borderWidth: 1, // Agregar borde
    borderColor: THEME.menuBackground, // Color del borde del contenedor
  },
  historyDate: {
    fontSize: 14,
    color: THEME.gray,
  },
  historyText: {
    fontSize: 14,
    color: THEME.secondary,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: THEME.grayLight,
    borderRadius: 8,
    color: THEME.dark,
    paddingRight: 30,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: THEME.grayLight,
    borderRadius: 8,
    color: THEME.dark,
    paddingRight: 30,
    marginBottom: 15,
  },
});

export default ParticularNotificationScreen;
