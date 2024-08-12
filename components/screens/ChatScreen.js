import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../constants";

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "¡Hola! ¿Cómo puedo ayudarte hoy?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Soporte",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ]);

  const user = {
    name: "Carlos Díaz",
    avatar: "https://placeimg.com/140/140/people",
  };

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
  };

  return (
    <View style={styles.container}>
      {/* Encabezado personalizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={25} color="#FFF" />
        </TouchableOpacity>
        <Image source={{ uri: user.avatar }} style={styles.profileImage} />
        <Text style={styles.headerTitle}>{user.name}</Text>
      </View>

      {/* Chat */}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderAvatar={null} // Si quieres ocultar el avatar del usuario en el chat
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.primary,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ChatScreen;
