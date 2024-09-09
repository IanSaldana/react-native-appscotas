// src/navigators/BottomTabNavigator.js
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { THEME } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CreatePetScreen from "../screens/CreatePetScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ListOrganizationScreen from "../screens/ListOrganizationScreen";
import { UserContext } from "../context/UserContext"; // Importar el contexto
import theme from "../constants/theme";

const Tab = createBottomTabNavigator();

const homeName = "Inicio";
const chatListName = "Mensajeria";
const notificationsName = "Notificaciones";
const addName = "Agregar Mascota";
const favName = "Favoritos";
const listOrgName = "Lista";

function BottomTabNavigator() {
  const { currentUser } = useContext(UserContext); // Usar el contexto para obtener el usuario actual

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: THEME.white,
        tabBarActiveTintColor: THEME.primary,
        tabBarStyle: {
          backgroundColor: THEME.menuBackground, // Usar el color del theme
          borderTopColor: "transparent",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === chatListName) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (rn === notificationsName) {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (rn === addName) {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (rn === favName) {
            iconName = focused ? "heart-circle" : "heart-circle-outline";
          } else if (rn === listOrgName) {
            iconName = focused ? "list" : "list-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Navegación para Persona */}
      {currentUser?.type === "persona" && (
        <>
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={chatListName} component={ChatListScreen} />
          <Tab.Screen name={notificationsName} component={NotificationScreen} />
          <Tab.Screen name={favName} component={FavouriteScreen} />
        </>
      )}

      {/* Navegación para Organización */}
      {currentUser?.type === "organizacion" && (
        <>
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={chatListName} component={ChatListScreen} />
          <Tab.Screen name={addName} component={CreatePetScreen} />
          <Tab.Screen name={notificationsName} component={NotificationScreen} />
          <Tab.Screen name={listOrgName} component={ListOrganizationScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
