import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../constants";

const ChatScreen = ({ navigation, route }) => {
  const { userId, userName } = route.params;
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      user: {
        _id: 2,
        name: "Organización 1",
        avatar: require("../../assets/images/organizacion.jpeg"),
      },
    },
    {
      _id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      createdAt: new Date(),
      user: {
        _id: 1,
        name: userName || "Usuario",
        avatar: require("../../assets/images/person.jpeg"),
      },
    },
  ]);

  const user = {
    _id: 1,
    name: userName || "Usuario",
    avatar: require("../../assets/images/person.jpeg"),
  };

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: THEME.primary,
          },
          left: {
            backgroundColor: "#f0f0f0",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
          left: {
            color: "#000",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Icon name="send" size={28} color={THEME.primary} />
        </View>
      </Send>
    );
  };

  const renderChatHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Image source={user.avatar} style={styles.profileImage} />
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>{user.name}</Text>
        <Text style={styles.headerSubtitle}>Online</Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="call" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="videocam" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderChatHeader()}

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={user}
        renderBubble={renderBubble}
        renderSend={renderSend}
        placeholder="Message"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.bgColor, // Fondo del tema
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: THEME.grayLight, // Color del borde inferior
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: THEME.dark, // Texto en color oscuro
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.gray, // Texto en gris medio
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 15,
  },
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});

export default ChatScreen;
