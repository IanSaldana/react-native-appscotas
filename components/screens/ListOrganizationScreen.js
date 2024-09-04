import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../constants";
import { UserContext } from "../context/UserContext"; // Importar el contexto de usuario

const ListOrganizationScreen = () => {
  const navigation = useNavigation();
  const { pets } = useContext(UserContext); // Obtener la lista de mascotas del contexto de usuario

  // Función para renderizar cada mascota
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("PetProfile", { petId: item.id })}
    >
      <Image source={item.image} style={styles.petImage} />
      <View style={styles.nameContainer}>
        <Text style={styles.petName}>{item.name}</Text>
        <Icon name="heart" size={20} color="#FF007F" style={styles.heartIcon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={false} />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Lista Organizacion</Text>
        <FlatList
          data={pets} // Usa los datos de mascotas del contexto de usuario
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    borderColor: "#E0E0E0",
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
    color: "#333",
    padding: 10,
  },
});

export default ListOrganizationScreen;
