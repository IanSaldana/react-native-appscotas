import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../constants";
import { UserContext } from "../context/UserContext"; // Importa el contexto de usuario

const ChatListScreen = () => {
  const { currentUser, getFilteredConversations } = useContext(UserContext); // Obtener el usuario actual y la función para obtener conversaciones filtradas
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  // Obtener conversaciones filtradas basadas en el tipo de usuario actual
  const filteredConversations = getFilteredConversations();

  useEffect(() => {
    // Este efecto se ejecuta cada vez que las conversaciones cambian
  }, [filteredConversations]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("Chat", {
          userId: item.id,
          userName: item.name,
        })
      }
    >
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.messageHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={false} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mensajería</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar mensajes..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity>
            <Icon name="options" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Message List */}
        {filteredConversations.length > 0 ? (
          <FlatList
            data={filteredConversations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {currentUser.type === "persona"
                ? "No hay mensajes aún. Comienza una conversación con una organización."
                : "No hay mensajes aún. Espera a que una persona inicie una conversación."}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: THEME.bgColor, // Usar el color de fondo del tema
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    color: THEME.primary, // Usar el color primario del tema
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.grayLight, // Usar un color de fondo claro del tema
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: THEME.dark, // Usar un color de texto oscuro del tema
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: THEME.grayLight, // Usar un color de borde claro del tema
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.dark, // Usar un color de texto oscuro del tema
  },
  time: {
    fontSize: 12,
    color: THEME.gray, // Usar un color gris del tema
  },
  lastMessage: {
    fontSize: 14,
    color: THEME.gray, // Usar un color gris del tema
  },
  unreadBadge: {
    backgroundColor: THEME.danger, // Usar un color de alerta del tema
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    color: THEME.white, // Usar el color blanco del tema
    fontSize: 12,
    fontWeight: "bold",
  },
  newChatButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: THEME.primary, // Usar el color primario del tema
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  newChatButtonText: {
    color: THEME.white, // Usar el color blanco del tema
    fontWeight: "bold",
  },
});

export default ChatListScreen;
