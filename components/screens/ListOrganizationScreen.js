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
import SearchBarWithFilters from "../modules/SearchBarWithFilters"; // Importa tu componente reutilizable de SearchBar

const ListOrganizationScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext); // Obtener la información del usuario actual
  const { pets } = useContext(PetsContext); // Obtener la lista de mascotas del contexto de mascotas
  const [organizationPets, setOrganizationPets] = useState([]);
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [selectedSpecies, setSelectedSpecies] = useState(""); // Filtro de especie
  const [selectedGender, setSelectedGender] = useState(""); // Filtro de género
  const [selectedAge, setSelectedAge] = useState("Any"); // Filtro de edad

  useEffect(() => {
    // Filtrar mascotas por la organización del usuario actual
    if (currentUser && currentUser.organizationId) {
      const filteredPets = pets.filter(
        (pet) => pet.organizationId === currentUser.organizationId
      );
      setOrganizationPets(filteredPets);
    }
  }, [pets, currentUser]);

  useEffect(() => {
    // Filtrar mascotas cada vez que cambien los filtros o el texto de búsqueda
    filterPets(searchText, selectedSpecies, selectedGender, selectedAge);
  }, [searchText, selectedSpecies, selectedGender, selectedAge, pets]);

  const filterPets = (search, species, gender, age) => {
    let filtered = pets.filter((pet) => {
      const matchName = pet.name.toLowerCase().includes(search.toLowerCase());
      const matchSpecies = species ? pet.species === species : true;
      const matchGender = gender ? pet.gender === gender : true;
      const matchAge =
        age === "Any"
          ? true
          : age === "2 años"
          ? pet.age <= 2
          : age === "5 años"
          ? pet.age <= 5
          : pet.age >= 8;

      return (
        matchName &&
        matchSpecies &&
        matchGender &&
        matchAge &&
        pet.organizationId === currentUser.organizationId
      );
    });

    setOrganizationPets(filtered);
  };

  const resetFilters = () => {
    setSelectedSpecies("");
    setSelectedGender("");
    setSelectedAge("Any");
    setSearchText("");
    filterPets("", "", "", "Any");
  };

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
        <Text style={styles.headerTitle}>Lista de Mascotas</Text>
        {/* Agrega el SearchBar debajo del título */}
        <SearchBarWithFilters
          searchText={searchText}
          setSearchText={setSearchText}
          applyFilters={() =>
            filterPets(searchText, selectedSpecies, selectedGender, selectedAge)
          }
          resetFilters={resetFilters}
          setSelectedSpecies={setSelectedSpecies}
          setSelectedGender={setSelectedGender}
          setSelectedAge={setSelectedAge}
        />
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
    backgroundColor: THEME.bgColor, // Usar el color blanco del tema
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
    color: THEME.primary, // Usar el color primario del tema
    opacity: 0.9,
    paddingBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: THEME.white, // Usar el color blanco del tema
    borderColor: THEME.grayLight, // Usar el color gris claro del tema
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
    color: THEME.black, // Usar el color negro del tema
    padding: 10,
  },
});

export default ListOrganizationScreen;
