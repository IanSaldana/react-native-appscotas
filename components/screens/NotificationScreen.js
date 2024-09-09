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
        {notifications.length > 0 ? ( // Verifica si hay notificaciones
          <FlatList
            data={notifications} // Usa los datos de notificaciones del contexto
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          // Mostrar mensaje si no hay notificaciones
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aún no llegan solicitudes</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: THEME.bgColor, // Utiliza el color de fondo del tema
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
    color: THEME.primary, // Color primario del tema
    opacity: 0.9,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: THEME.white, // Color de fondo blanco del tema
    borderColor: THEME.grayLight, // Color de borde gris claro del tema
    borderWidth: 1,
  },
  petImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.dark, // Color de texto oscuro del tema
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: THEME.gray, // Color de texto gris del tema
    textAlign: "center",
  },
});

export default NotificationScreen;
