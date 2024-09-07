import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../constants";
import { NotificationContext } from "../context/NotificationContext"; // Importa el contexto de notificaciones

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { notifications } = useContext(NotificationContext); // Obtener las notificaciones del contexto

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("Notification", {
          notificationId: item.id,
        })
      }
    >
      {/* Mostrar la imagen de la mascota */}
      <Image
        source={
          item.petDetails?.image
            ? { uri: item.petDetails.image.uri }
            : require("../../assets/images/mascota1.jpeg")
        } // Utiliza una imagen predeterminada si no hay imagen
        style={styles.petImage}
      />
      <View style={styles.notificationContent}>
        {/* Mostrar el título de la notificación que incluye el nombre de la mascota */}
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationBody}>{item.body}</Text>
        <View style={styles.notificationFooter}>
          <Text style={styles.notificationDate}>{item.date}</Text>
          <Text style={styles.notificationStatus}>{item.status}</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={20} color={THEME.primary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={false} />
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTitle}>Notificaciones</Text>
        </View>
        <FlatList
          data={notifications} // Usa los datos de notificaciones del contexto
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  headerTitle: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.primary,
    opacity: 0.9,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 15,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationBody: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: "#999",
  },
  notificationStatus: {
    fontSize: 14,
    color: THEME.primary,
    fontWeight: "bold",
  },
});

export default NotificationScreen;
