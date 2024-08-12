import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";

//screens
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePetScreen from "../screens/CreatePetScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";
import PetProfileScreen from "../screens/PetProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoadingScreen from "../screens/LoadingScreen";

//screens names
const loginName = "Login";
const registerName = "Register";

const loadingName = "Loading";

const homeName = "Home";
const profileName = "Profile";
const petProfileName = "PetProfile";
const createPetName = "CreatePet";

const chatListName = "ChatList";
const chatName = "Chat";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  // const user = false; //autenticacion de usuario simple, cambiar despues
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loginName} //ruta inicial que comienza la app
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name={loginName} component={LoginScreen} />
        <Stack.Screen name={registerName} component={RegisterScreen} />

        <Stack.Screen name={loadingName} component={LoadingScreen} />

        <Stack.Screen name={homeName} component={BottomTabNavigator} />
        <Stack.Screen name={profileName} component={ProfileScreen} />
        <Stack.Screen name={createPetName} component={CreatePetScreen} />
        <Stack.Screen name={petProfileName} component={PetProfileScreen} />

        <Stack.Screen name={chatListName} component={ChatListScreen} />
        <Stack.Screen name={chatName} component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
