import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { THEME } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext"; // Importar el contexto

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { currentUser, updateUser, logout } = useContext(UserContext); // Usar el contexto para obtener y actualizar el usuario

  // Estado local para edición de perfil
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    currentUser?.photo || require("../../assets/images/person.jpeg")
  );
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState(currentUser?.password || "");
  const [modalVisible, setModalVisible] = useState(false);
  const [isPremium, setIsPremium] = useState(currentUser?.isPremium || false);
  const [userType, setUserType] = useState(currentUser?.type || "persona");

  const handleLogout = () => {
    logout(); // Llamar a la función de logout del contexto
    Alert.alert("Cerrando sesión", "Has salido con éxito.");
    navigation.navigate("Login");
  };

  const handleUpgrade = () => {
    setModalVisible(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      name,
      email,
      password,
      photo: profileImage.uri ? profileImage : currentUser.photo,
      isPremium,
      type: userType,
    };

    updateUser(updatedUser); // Actualizar los datos del usuario en el contexto
    setIsEditing(false);
    console.log("Cambios guardados");
  };

  const handleSubscribe = () => {
    setIsPremium(true); // Actualizar el estado local de isPremium
    const updatedUser = {
      ...currentUser,
      isPremium: true, // Actualizar el estado de isPremium en el usuario
    };
    updateUser(updatedUser); // Guardar la actualización en el contexto
    setModalVisible(false);
  };

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  // Determinar el tipo de usuario mostrado
  const displayUserType = () => {
    if (userType === "persona") {
      return "Adoptante";
    } else if (userType === "organizacion") {
      return isPremium ? "Organización Premium" : "Organización Básica";
    }
    return "";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color={THEME.black} />
        </TouchableOpacity>
        {isEditing ? (
          <TouchableOpacity onPress={handleSave}>
            <Icon name="checkmark-outline" size={30} color={THEME.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEdit}>
            <Icon name="pencil-outline" size={30} color={THEME.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={[styles.profileName, styles.inputSpacing]}
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />
        ) : (
          <Text style={[styles.profileName, styles.inputSpacing]}>{name}</Text>
        )}
        <Text style={[styles.profileJob, styles.inputSpacing]}>
          {displayUserType()}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color={THEME.gray} />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          editable={isEditing}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color={THEME.gray} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          editable={isEditing}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.upgradeButton]}
        onPress={handleUpgrade}
      >
        <Text style={[styles.buttonText, styles.upgradeButtonText]}>
          Actualizar a premium
        </Text>
      </TouchableOpacity>

      {/* Modal para mostrar los beneficios */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Beneficios de Premium</Text>

            {/* Precio centralizado */}
            <Text style={styles.priceText}>$20 USD</Text>
            <Text style={styles.monthText}>Monthly</Text>

            <Text style={styles.modalText}>• Publicar mascotas ilimitadas</Text>
            <Text style={styles.modalText}>
              • Permite múltiples fotos y videos por mascota.
            </Text>
            <Text style={styles.modalText}>
              • Sin limite de chats simultáneos.
            </Text>

            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={handleSubscribe}
            >
              <Text style={styles.subscribeButtonText}>Suscribirse</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.black,
  },
  inputSpacing: {
    marginVertical: 10,
  },
  profileJob: {
    fontSize: 16,
    color: THEME.gray,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: THEME.grayLight,
    marginBottom: 20,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: THEME.black,
  },
  button: {
    backgroundColor: THEME.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  upgradeButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: THEME.primary,
  },
  upgradeButtonText: {
    color: THEME.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: THEME.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  subscribeButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    alignItems: "center",
    padding: 10,
  },
  closeButtonText: {
    color: THEME.primary,
    fontSize: 16,
  },
  priceText: {
    fontSize: 50,
    fontWeight: "bold",
    color: THEME.primary,
    textAlign: "center",
    marginVertical: 20,
  },
  monthText: {
    fontSize: 30,
    fontWeight: "bold",
    color: THEME.primary,
    textAlign: "center",
    paddingBottom: 20,
  },
});

export default ProfileScreen;
