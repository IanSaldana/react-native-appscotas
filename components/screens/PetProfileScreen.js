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

const PetProfileScreen = ({ route, navigation }) => {
  const { petId } = route.params;

  // Busca la mascota por ID o carga los detalles de la mascota desde un backend
  // Aquí se muestra un ejemplo simple con datos estáticos
  const petDetails = {
    id: petId,
    name: "Toby",
    species: "Perro",
    breed: "Golden Retriever",
    age: "Joven",
    color: "Café claro",
    gender: "Macho",
    vaccinated: true,
    adoptionFee: "Gratis",
    description:
      "Le gusta jugar al aire libre, le gusta que le hagan cariño y que jueguen con él. No tiene necesidades médicas. Es un perro muy cariñoso y activo.",
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    image: require("../../assets/images/mascota1.jpeg"),
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

          <Text style={styles.sectionTitle}>Ubicación</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="heart" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Marcar Favorito</Text>
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
  buttonText: {
    marginLeft: 10,
    color: "#FFF",
    fontSize: 16,
  },
});

export default PetProfileScreen;
