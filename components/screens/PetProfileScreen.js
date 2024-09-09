import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFavorites } from "../context/FavouriteContext";
import { PetsContext } from "../context/PetsContext"; // Importa el contexto de mascotas actualizado
import { UserContext } from "../context/UserContext"; // Importa el contexto de usuario
import { THEME } from "../constants";

const PetProfileScreen = ({ route, navigation }) => {
  const { petId } = route.params;
  const { pets } = useContext(PetsContext); // Obtén la lista de mascotas desde el contexto
  const { initiateConversation, currentUser } = useContext(UserContext); // Obtener los datos necesarios desde el contexto de usuario
  const { favorites, toggleFavorite } = useFavorites();
  const [isModalVisible, setModalVisible] = useState(false);

  const petDetails = pets.find((pet) => pet.id === petId); // Busca la mascota en la lista del contexto

  if (!petDetails) {
    return (
      <SafeAreaView style={styles.main}>
        <Text style={styles.errorText}>Mascota no encontrada</Text>
      </SafeAreaView>
    );
  }

  // Obtener el nombre de la organización directamente de los detalles de la mascota
  const organizationName =
    petDetails.organizationName || "Organización desconocida";

  const isFavorite = favorites.some((fav) => fav.id === petDetails.id);
  const handleToggleFavorite = () => {
    toggleFavorite(petDetails);
  };

  const handleAdopt = () => {
    navigation.navigate("Adopt", { petDetails });
  };

  const handleContact = () => {
    if (currentUser) {
      // Usa el ID y nombre de la organización que creó la mascota
      const userId = petDetails.organizationId;
      const userName = petDetails.organizationName;

      initiateConversation({ id: userId, name: userName });

      if (userId && userName) {
        navigation.navigate("Chat", {
          userId,
          userName,
        });
      } else {
        console.error(
          "No se pudo encontrar el ID o nombre de la organización."
        );
      }
    } else {
      console.error("Usuario actual no definido.");
    }
  };

  const handleEditPet = () => {
    navigation.navigate("CreatePet", { petDetails });
  };

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.container}>
        {/* Imagen y botones del encabezado */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={petDetails.image} style={styles.petImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButtonHeader}
            onPress={handleToggleFavorite}
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={25}
              color="white"
            />
          </TouchableOpacity>
          {/* Condición corregida para verificar si el usuario actual es una organización */}
          {currentUser?.type === "organizacion" && (
            <TouchableOpacity style={styles.editButton} onPress={handleEditPet}>
              <FontAwesome name="edit" size={25} color="white" />
            </TouchableOpacity>
          )}
        </View>
        {/* Modal para la imagen en grande */}
        <Modal visible={isModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={closeModal}
            >
              <Icon name="close" size={30} color="white" />
            </TouchableOpacity>
            <Image source={petDetails.image} style={styles.modalImage} />
          </View>
        </Modal>

        {/* Detalles de la mascota */}
        <View style={styles.detailsContainer}>
          <Text style={styles.petName}>
            {petDetails.name}{" "}
            <Text style={styles.petBreed}>({petDetails.species})</Text>
          </Text>

          {/* Etiquetas */}
          <View style={styles.tagsContainer}>
            <Text style={styles.tag}>{`${petDetails.age} años`}</Text>
            <Text style={styles.tag}>
              {petDetails.gender === "Macho" ? "Adulto" : "Adulta"}
            </Text>
            <Text style={styles.tag}>{petDetails.color}</Text>
          </View>

          {/* Ubicación */}
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={16} color={THEME.black} />
            <Text style={styles.locationText}>
              {petDetails.location.region}, {petDetails.location.comuna}
            </Text>
          </View>
        </View>

        {/* Atributos adicionales */}
        <View style={styles.attributesContainer}>
          <View style={styles.attributeCard}>
            <Text style={styles.attributeTitle}>Vacunado</Text>
            <Text style={styles.attributeValue}>
              {petDetails.vaccinated ? "Sí" : "No"}
            </Text>
          </View>
          <View style={styles.attributeCard}>
            <Text style={styles.attributeTitle}>Especie</Text>
            <Text style={styles.attributeValue}>{petDetails.species}</Text>
          </View>
          <View style={styles.attributeCard}>
            <Text style={styles.attributeTitle}>Color</Text>
            <Text style={styles.attributeValue}>{petDetails.color}</Text>
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>Descripción de la mascota</Text>
          <Text style={styles.petDescription}>{petDetails.description} </Text>
        </View>

        {/* Sección de contacto */}
        <View style={styles.contactContainer}>
          <Image
            source={require("../../assets/images/organizacion.jpeg")} // Reemplaza con la URL de la imagen de la organización
            style={styles.contactAvatar}
          />
          <Text style={styles.contactName}>
            Organización: {organizationName}
          </Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContact}
            >
              <FontAwesome name="comments" size={20} color={THEME.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón Adoptar */}
        <TouchableOpacity style={styles.adoptButton} onPress={handleAdopt}>
          <Text style={styles.adoptButtonText}>Adoptar Ahora</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: THEME.bgColor, // Usar color de fondo del tema
  },
  container: {
    flex: 1,
    marginHorizontal: 0, // Eliminar margen lateral
    paddingHorizontal: 0, // Eliminar padding lateral
    backgroundColor: THEME.bgColor, // Usar color de fondo del tema
  },
  imageContainer: {
    position: "relative",
  },
  petImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  favoriteButtonHeader: {
    position: "absolute",
    top: 40,
    right: 60,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  editButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: THEME.white,
    marginTop: -40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  petName: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.primary, // Color del tema
  },
  petBreed: {
    fontSize: 18,
    color: THEME.gray,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tag: {
    backgroundColor: THEME.primary,
    color: THEME.white,
    padding: 5,
    borderRadius: 5,
    marginRight: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  locationText: {
    marginLeft: 5,
    color: THEME.secondary, // Color del tema
  },
  attributesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  attributeCard: {
    alignItems: "center",
    padding: 10,
    backgroundColor: THEME.bgColor, // Color de fondo del tema
    borderRadius: 15, // Añadir bordes con curva
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1, // Opcional: Añadir borde alrededor de cada card
    borderColor: THEME.menuBackground, // Color del borde igual al fondo
    shadowColor: "#000", // Añadir sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Sombra en Android
  },
  attributeTitle: {
    color: THEME.gray,
  },
  attributeValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: THEME.primary, // Color del tema
  },
  aboutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: THEME.primary, // Color del tema
  },
  petDescription: {
    fontSize: 16,
    color: THEME.gray, // Color del tema
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    color: THEME.secondary, // Color del tema
  },
  contactButtons: {
    flexDirection: "row",
  },
  contactButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: THEME.primary,
    borderRadius: 10,
  },
  adoptButton: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    backgroundColor: THEME.primary,
    borderRadius: 40,
  },
  adoptButtonText: {
    color: THEME.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: THEME.danger, // Color del tema
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalImage: {
    width: "90%",
    height: "70%",
    borderRadius: 8,
  },
  closeModalButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
});

export default PetProfileScreen;
