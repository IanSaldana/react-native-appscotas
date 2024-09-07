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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import { PetsContext } from "../context/PetsContext";
import { UserContext } from "../context/UserContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const { pets, loadPets } = useContext(PetsContext);
  const [searchText, setSearchText] = useState("");
  const [filteredPets, setFilteredPets] = useState(pets);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("Any"); // Estado para el filtro de edad

  useFocusEffect(
    React.useCallback(() => {
      loadPets();
      filterPets(searchText, selectedSpecies, selectedGender, selectedAge);
    }, [searchText, selectedSpecies, selectedGender, selectedAge])
  );

  useEffect(() => {
    filterPets(searchText, selectedSpecies, selectedGender, selectedAge);
  }, [pets]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

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

      return matchName && matchSpecies && matchGender && matchAge;
    });
    setFilteredPets(filtered);
  };

  const applyFilters = () => {
    filterPets(searchText, selectedSpecies, selectedGender, selectedAge);
    setIsModalVisible(false);
  };

  const resetFilters = () => {
    setSelectedSpecies("");
    setSelectedGender("");
    setSelectedAge("Any");
    setSearchText("");
    filterPets("", "", "", "Any");
    setIsModalVisible(false);
  };

  const renderMascota = ({ item }) => (
    <TouchableOpacity
      style={styles.mascotaItem}
      onPress={() => navigation.navigate("PetProfile", { petId: item.id })}
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
          <Text style={styles.headerName}>Bienvenido</Text>
          <View style={styles.premiumContainer}>
            {currentUser?.isPremium && (
              <Icon
                name="paw-outline"
                size={20}
                color="#f1c232"
                style={styles.pawIcon}
              />
            )}
            <Text
              style={[
                styles.subHeads,
                currentUser?.isPremium ? styles.premiumName : null,
              ]}
            >
              {currentUser?.name || "Usuario"}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
            placeholder="Busca tu mascota"
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
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar mascotas</Text>
            {/* Filtros de Especie */}
            <Text style={styles.filterLabel}>Especie:</Text>
            <View style={styles.vaccinatedFilter}>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  selectedSpecies === "Perro" && styles.selectedOption,
                ]}
                onPress={() => setSelectedSpecies("Perro")}
              >
                <Text style={styles.optionText}>Perros</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  selectedSpecies === "Gato" && styles.selectedOption,
                ]}
                onPress={() => setSelectedSpecies("Gato")}
              >
                <Text style={styles.optionText}>Gatos</Text>
              </TouchableOpacity>
            </View>
            {/* Filtros de Género */}
            <Text style={styles.filterLabel}>Género:</Text>
            <View style={styles.vaccinatedFilter}>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  selectedGender === "Macho" && styles.selectedOption,
                ]}
                onPress={() => setSelectedGender("Macho")}
              >
                <Text style={styles.optionText}>Macho</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  selectedGender === "Hembra" && styles.selectedOption,
                ]}
                onPress={() => setSelectedGender("Hembra")}
              >
                <Text style={styles.optionText}>Hembra</Text>
              </TouchableOpacity>
            </View>
            {/* Filtros de Edad */}
            <Text style={styles.filterLabel}>Edad:</Text>
            <View style={styles.vaccinatedFilter}>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  selectedAge === "2 años" && styles.selectedOption,
                ]}
                onPress={() => setSelectedAge("2 años")}
              >
                <Text style={styles.optionText}>2 años</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  selectedAge === "5 años" && styles.selectedOption,
                ]}
                onPress={() => setSelectedAge("5 años")}
              >
                <Text style={styles.optionText}>5 años</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  selectedAge === "8+ años" && styles.selectedOption,
                ]}
                onPress={() => setSelectedAge("8+ años")}
              >
                <Text style={styles.optionText}>8+ años</Text>
              </TouchableOpacity>
            </View>
            {/* Botones de Modal */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Text style={styles.applyBtnText}>Aplicar Filtros</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.clearBtn} onPress={resetFilters}>
                <Text style={styles.clearBtnText}>Limpiar Filtros</Text>
              </TouchableOpacity>
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
  headerContainer: {
    flexDirection: "column",
  },
  headerName: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.primary,
    opacity: 0.9,
  },
  premiumContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pawIcon: {
    marginRight: 5,
  },
  subHeads: {
    fontSize: 22,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.gray,
    opacity: 0.9,
  },
  premiumName: {
    color: "#f1c232", // Color dorado para usuarios premium
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
    textAlign: "center",
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
  applyBtn: {
    flex: 1,
    backgroundColor: THEME.primary,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    marginRight: 5,
  },
  applyBtnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  clearBtn: {
    flex: 1,
    backgroundColor: THEME.gray,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  clearBtnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default HomeScreen;
