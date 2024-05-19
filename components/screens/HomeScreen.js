import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import * as React from "react";
import { THEME } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Post from "../modules/Post";

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleProfile = () => {
    navigation.navigate("Profile");
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={false} />
        <View style={styles.container}>
          <View>
            <Text style={styles.headerName}>Bienvenida</Text>
            <Text style={styles.subHeads}>@COMUNACHIN</Text>
          </View>
          <TouchableOpacity onPress={handleProfile} >
          <Image 
            source={require('../../assets/images/person.jpeg')}
            style={styles.profileImage}
          />
          </TouchableOpacity>
          
          
        </View>
        <View style={styles.searchInput} >
            <View style={styles.searchInputContainer}>
              <Icon name="search" size={25} color={THEME.gray} />
                  <TextInput placeholder="Busca tu mascota "></TextInput>
            </View>
          <View style={styles.sortBtn}>
          <Icon name="list-outline" size={35} color={THEME.white} />
          </View>
          </View>

        <ScrollView>
          <Post/>    
        </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:"white",
  },
  container: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
        
  },
  headerName: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.primary,
    opacity: 0.9,
  },
  subHeads: {
    fontSize: 22,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.gray,
    opacity: 0.9,
  },
  profileImage:{
    height: 50,
    width:50,
    borderRadius:25,
  },
  searchInput:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal: 20,
    paddingBottom:10
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: THEME.grayLight,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  sortBtn:{
    backgroundColor: THEME.black,
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  }, 
  // utils
  wFull: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
export default HomeScreen;
