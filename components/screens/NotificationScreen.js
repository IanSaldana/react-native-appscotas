import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { THEME } from "../constants";
import { StatusBar } from "expo-status-bar";

const notifications = [
  {
    id: "1",
    title: "Mascota Encontrada",
    message: "¡Buena noticia! Tu mascota perdida ha sido encontrada.",
    time: "hace 2 horas",
    image: require("../../assets/images/mascota1.jpeg"), // Asegúrate de que esta imagen existe
  },
  {
    id: "2",
    title: "Nueva Solicitud de Adopción",
    message: "Tienes una nueva solicitud de adopción para tu mascota.",
    time: "hace 1 día",
    image: require("../../assets/images/mascota2.jpeg"), // Asegúrate de que esta imagen existe
  },
  {
    id: "3",
    title: "Vacunación Programada",
    message:
      "Recuerda, la vacunación de tu mascota está programada para mañana.",
    time: "hace 3 días",
    image: require("../../assets/images/mascota3.jpeg"), // Asegúrate de que esta imagen existe
  },
  {
    id: "4",
    title: "Proceso de Adopción Completo",
    message: "¡Felicidades! La adopción de tu mascota ha sido finalizada.",
    time: "hace 5 días",
    image: require("../../assets/images/mascota4.jpeg"), // Asegúrate de que esta imagen existe
  },
];

const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.message}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
          {item.action}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={false} />
      <View style={styles.container}>
        <Text style={styles.header}>Notificaciones</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 15,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  header: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.primary,
    opacity: 0.9,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#242526",
    borderRadius: 20,
    marginRight: 10,
  },
  tabButtonActive: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#3A3B3C",
    borderRadius: 20,
    marginRight: 10,
  },
  tabButtonText: {
    color: "#E4E6EB",
  },
  tabButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fcfcfc",
    borderRadius: 10,
    marginVertical: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#35253b",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    color: "#2f3030",
    fontSize: 14,
  },
  time: {
    color: "#B0B3B8",
    fontSize: 12,
    marginTop: 2,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2D88FF",
    marginLeft: 10,
  },
});

export default NotificationScreen;
