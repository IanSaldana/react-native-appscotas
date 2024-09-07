import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { NotificationContext } from "../context/NotificationContext";
import { useRoute } from "@react-navigation/native";
import { THEME } from "../constants";

const ParticularNotificationScreen = () => {
  const { notifications } = useContext(NotificationContext);
  const route = useRoute();
  const { notificationId } = route.params;

  const notification = notifications.find(
    (notif) => notif.id === notificationId
  );

  if (!notification) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Notificación no encontrada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Título de la Notificación */}
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.date}>{notification.date}</Text>

        {/* Estado de la Adopción */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Estado de la Adopción:</Text>
          <Text style={styles.status}>{notification.status}</Text>
        </View>

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
    backgroundColor: "#FFF",
    padding: 20,
  },
  errorText: {
    color: "red",
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
    color: "#888",
    marginBottom: 20,
  },
  statusContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: THEME.dark,
  },
  status: {
    fontSize: 14,
    color: THEME.primary,
    fontWeight: "bold",
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: THEME.dark,
  },
  historyEntry: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F1F1F1",
    borderRadius: 5,
  },
  historyDate: {
    fontSize: 14,
    color: "#888",
  },
  historyText: {
    fontSize: 14,
    color: "#333",
  },
});

export default ParticularNotificationScreen;
