import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { THEME } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import Slider from "@react-native-community/slider";
import { petsInitial } from "../constants/data";
import { UserContext } from "../context/UserContext"; // Importar el contexto

const HomeScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext); // Usar el contexto para obtener el usuario actual
  const [pets, setPets] = useState(petsInitial);
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [filteredPets, setFilteredPets] = useState(petsInitial); // Estado para las mascotas filtradas

  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para el modal de filtros
  const [selectedSpecies, setSelectedSpecies] = useState(""); // Filtro por especie
  const [selectedColor, setSelectedColor] = useState(""); // Filtro por color
  const [ageRange, setAgeRange] = useState([0, 10]); // Rango de edad
  const [isVaccinated, setIsVaccinated] = useState(null); // Filtro por vacunación

  const handleSearch = (text) => {
    setSearchText(text);
    filterPets(text, selectedSpecies, selectedColor, ageRange, isVaccinated);
  };

  const filterPets = (search, species, color, ageRange, vaccinated) => {
    let filtered = pets.filter((pet) => {
      const matchName = pet.name.toLowerCase().includes(search.toLowerCase());
      const matchSpecies = species ? pet.species === species : true;
      const matchColor = color ? pet.color === color : true;
      const matchAge = pet.age >= ageRange[0] && pet.age <= ageRange[1];
      const matchVaccinated =
        vaccinated !== null ? pet.vaccinated === vaccinated : true;
      return (
        matchName && matchSpecies && matchColor && matchAge && matchVaccinated
      );
    });
    setFilteredPets(filtered);
  };

  const applyFilters = () => {
    filterPets(
      searchText,
      selectedSpecies,
      selectedColor,
      ageRange,
      isVaccinated
    );
    setIsModalVisible(false);
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handlePetPress = (petId) => {
    navigation.navigate("PetProfile", { petId });
  };

  const renderMascota = ({ item }) => (
    <TouchableOpacity
      style={styles.mascotaItem}
      onPress={() => handlePetPress(item.id)}
    >
      <Image source={item.image} style={styles.mascotaImage} />
      <View style={styles.mascotaDetailsContainer}>
        <Text style={styles.mascotaName}>{item.name}</Text>
        <Text style={styles.mascotaDetails}>{item.description}</Text>
        <Text style={styles.mascotaDetails}>Edad: {item.age} </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={false} />
      <View style={styles.container}>
        <View>
          {/* Mostrar el nombre del usuario registrado */}
          <Text style={styles.headerName}>Bienvenido</Text>
          <Text style={styles.subHeads}>{currentUser?.name || "Usuario"}</Text>
        </View>
        <TouchableOpacity onPress={handleProfile}>
          {/* Mostrar la foto del usuario registrado si está disponible */}
          <Image
            style={styles.profileImage}
            source={
              currentUser?.photo
                ? { uri: currentUser.photo }
                : require("../../assets/images/person.jpeg")
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchInput}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={25} color={THEME.gray} />
          <TextInput
            placeholder="Busca tu mascota "
            value={searchText}
            onChangeText={handleSearch}
            style={{ flex: 1 }}
          />
        </View>
        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() => setIsModalVisible(true)}
        >
          <Icon name="list-outline" size={35} color={THEME.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPets}
        renderItem={renderMascota}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.mascotasList}
        showsVerticalScrollIndicator={false}
      />
      {/* Modal para filtros */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar mascotas</Text>
            {/* Filtros de especie, color, etc. */}
            {/* ... */}
            <View style={styles.modalButtons}>
              <Button title="Aplicar Filtros" onPress={applyFilters} />
              <Button
                title="Cancelar"
                onPress={() => setIsModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  headerName: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.primary,
    opacity: 0.9,
  },
  subHeads: {
    fontSize: 22,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.gray,
    opacity: 0.9,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: THEME.grayLight,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  sortBtn: {
    backgroundColor: THEME.black,
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  mascotaItem: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  mascotaImage: {
    width: "100%",
    height: 250,
  },
  mascotaDetailsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  mascotaName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  mascotaDetails: {
    color: "#DDD",
    fontSize: 14,
  },
  mascotasList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  vaccinatedFilter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  vaccinatedOption: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: THEME.grayLight,
  },
  selectedOption: {
    backgroundColor: THEME.primary,
  },
  optionText: {
    color: THEME.white,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // utils
  wFull: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
});
export default HomeScreen;
