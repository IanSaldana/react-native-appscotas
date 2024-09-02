import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { petsInitial } from "../constants/data"; // Importa la lista de mascotas
import { useFavorites } from "../context/FavouriteContext"; // Importa el contexto de favoritos

const PetProfileScreen = ({ route, navigation }) => {
  const { petId } = route.params;
  const { favorites, toggleFavorite } = useFavorites(); // Usa el contexto de favoritos para agregar favoritos

  // Buscar la mascota por ID en la lista de mascotas
  const petDetails = petsInitial.find((pet) => pet.id === petId);

  if (!petDetails) {
    return (
      <SafeAreaView style={styles.main}>
        <Text style={styles.errorText}>Mascota no encontrada</Text>
      </SafeAreaView>
    );
  }
  const isFavorite = favorites.some((fav) => fav.id === petDetails.id);
  const handleToggleFavorite = () => {
    toggleFavorite(petDetails);
    console.log(
      isFavorite ? "Eliminado de favoritos:" : "Agregado a favoritos:",
      petDetails.name
    );
  };

  const handleAdopt = () => {
    console.log("Agregado a Lista de Deseos");
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={petDetails.image} style={styles.petImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.petName}>{petDetails.name}</Text>

          {/* Información de la mascota */}
          <View style={styles.infoRow}>
            <Icon name="paw" size={20} color="#FFA726" />
            <Text style={styles.infoText}>Especie: {petDetails.species}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color="#66BB6A" />
            <Text style={styles.infoText}>Edad: {petDetails.age}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="color-palette" size={20} color="#FF7043" />
            <Text style={styles.infoText}>Color: {petDetails.color}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="male" size={20} color="#42A5F5" />
            <Text style={styles.infoText}>Sexo: {petDetails.gender}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="medkit" size={20} color="#FF7043" />
            <Text style={styles.infoText}>
              Vacunado: {petDetails.vaccinated ? "Sí" : "No"}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Historia de la mascota</Text>
          <Text style={styles.petDescription}>{petDetails.description}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
            >
              <Icon
                name={isFavorite ? "heart" : "heart-outline"}
                size={20}
                color="#FFF"
              />
              <Text style={styles.buttonText}>
                {isFavorite ? "Quitar de Favoritos" : "Marcar Favorito"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adoptButton} onPress={handleAdopt}>
              <Icon name="heart-outline" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Adoptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatButton}>
              <Icon name="chatbubbles" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Abrir Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  imageContainer: {
    position: "relative",
  },
  petImage: {
    width: "100%",
    height: 250,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  detailsContainer: {
    padding: 20,
  },
  petName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  petDescription: {
    fontSize: 16,
    color: "#555",
  },
  map: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7043",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#42A5F5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  adoptButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 10,
    color: "#FFF",
    fontSize: 16,
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});

export default PetProfileScreen;
