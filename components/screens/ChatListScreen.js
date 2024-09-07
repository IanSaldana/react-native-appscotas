import React, { useState } from "react";
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

const chatList = [
  {
    id: "1",
    name: "Organizacion 1",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
    avatar: require("../../assets/images/person.jpeg"),
    time: "10:20",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Organizacion 2",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
    avatar: require("../../assets/images/person.jpeg"),
    time: "10:15",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Organizacion 3",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
    avatar: require("../../assets/images/person.jpeg"),
    time: "09:00",
    unreadCount: 1,
  },
];

const ChatListScreen = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

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
        <FlatList
          data={chatList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    color: THEME.primary,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
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
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
  lastMessage: {
    fontSize: 14,
    color: "#888",
  },
  unreadBadge: {
    backgroundColor: "#FF6B81",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  newChatButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: THEME.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "left",
  },
  newChatButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatListScreen;
