import React, { useState } from "react";
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
import { THEME } from "../constants"; // Asegúrate de tener un archivo de temas para los colores y estilos
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false); // Estado para modo de edición
  const [profileImage, setProfileImage] = useState(
    require("../../assets/images/person.jpeg")
  ); // Estado para la imagen de perfil
  const [email, setEmail] = useState("xxx@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+93123135");
  const [website, setWebsite] = useState("www.gfx.com");
  const [password, setPassword] = useState("xxx@gmail.com");
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [isPremium, setIsPremium] = useState(false); // Estado para el estado de suscripción

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrando sesión");
    Alert.alert("Cerrando sesion", "Haz salido con exito");
    navigation.navigate("Login");
  };

  const handleUpgrade = () => {
    // Lógica para actualizar a cuenta premium
    setModalVisible(true);
    console.log("Actualizando a cuenta premium");
  };

  const handleEdit = () => {
    setIsEditing(true); // Activar el modo de edición
  };

  const handleSave = () => {
    setIsEditing(false); // Desactivar el modo de edición y guardar los cambios
    console.log("Cambios guardados");
  };
  const handleSubscribe = () => {
    // Aquí puedes agregar la lógica de suscripción real, como llamar a un servicio de pago
    console.log("Suscrito a premium");
    setIsPremium(true); // Cambia el estado a premium
    setModalVisible(false); // Cierra el modal
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color={THEME.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image
            source={profileImage} // Reemplaza con la URL de tu imagen
            style={styles.profileImage}
          />
          {isEditing && (
            <Icon
              name="pencil-outline"
              size={25}
              color={THEME.primary}
              style={styles.editIcon}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.profileName}>Ian</Text>
        <Text style={styles.profileJob}>
          Adoptante{isPremium && " • Premium"}
        </Text>
        {!isEditing ? (
          <TouchableOpacity
            style={[styles.button, styles.upgradeButton]}
            onPress={handleEdit}
          >
            <Text style={[styles.buttonText, styles.upgradeButtonText]}>
              Editar perfil
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.upgradeButton]}
            onPress={handleSave}
          >
            <Text style={[styles.buttonText, styles.upgradeButtonText]}>
              Guardar Cambios
            </Text>
          </TouchableOpacity>
        )}
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
        <Icon name="call-outline" size={20} color={THEME.gray} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          editable={isEditing}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="globe-outline" size={20} color={THEME.gray} />
        <TextInput
          style={styles.input}
          placeholder="Website"
          editable={isEditing}
          value={website}
          onChangeText={setWebsite}
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
            <Text style={styles.modalText}>• Publicar mascotas ilimitadas</Text>
            {/* Puedes agregar más beneficios aquí */}

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
});

export default ProfileScreen;
