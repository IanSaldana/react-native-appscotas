import React, { useContext, useEffect, useState } from "react";
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
import { PetsContext } from "../context/PetsContext"; // Importar el contexto de mascotas

const ListOrganizationScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext); // Obtener la información del usuario actual
  const { pets } = useContext(PetsContext); // Obtener la lista de mascotas del contexto de mascotas
  const [organizationPets, setOrganizationPets] = useState([]);

  useEffect(() => {
    // Filtrar mascotas por la organización del usuario actual
    if (currentUser && currentUser.organizationId) {
      const filteredPets = pets.filter(
        (pet) => pet.organizationId === currentUser.organizationId
      );
      setOrganizationPets(filteredPets);
    }
  }, [pets, currentUser]);

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
        <Text style={styles.headerTitle}>
          Lista de Mascotas de la Organización
        </Text>
        <FlatList
          data={organizationPets} // Usa los datos filtrados de mascotas
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
