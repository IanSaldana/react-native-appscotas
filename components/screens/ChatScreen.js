import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { THEME } from "../constants";
import React from "react";

const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",

    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

const ChatScreen = () => {
  return (
    <SafeAreaView styles={styles.main}>
      <View>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View styles={styles.flatListcontainer}>
              {/* <Image source={{uri: item.img}}/> */}
              <Text>{item.userName}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  flatListcontainer: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 16,
    paddingBottom: 15,
    borderRadius: 6,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ChatScreen;
