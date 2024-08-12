import React from "react";
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

const Tab = createBottomTabNavigator();

const homeName = "Inicio";
const chatListName = "Mensajeria";

//por mientras
const notificationsName = "Notificaciones";
const addName = "Add";
const favName = "Favoritos";

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={homeName} //ruta inicial que comienza la app
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: THEME.dark,
        tabBarActiveTintColor: THEME.primary,
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
            iconName = focused ? "heart-circle" : "heart-circle";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        // options={{
        //   tabBarButton: (props) => (
        //     <CustomTabBarButton route="homeName" {...props} />
        //   ),
        // }}
      />
      <Tab.Screen name={chatListName} component={ChatListScreen} />
      <Tab.Screen name={addName} component={CreatePetScreen} />
      <Tab.Screen name={notificationsName} component={NotificationScreen} />
      <Tab.Screen name={favName} component={FavouriteScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
