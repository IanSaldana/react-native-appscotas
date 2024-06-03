import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { THEME } from "../constants";

import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();

const homeName = "HomeTab";
const chatName = "ChatTab";

//por mientras
const notificationsName = "NotificationsTab";
const addName = "AddTab";
const favName = "FavouriteTab";

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
          } else if (rn === chatName) {
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
      <Tab.Screen name={chatName} component={ChatScreen} />
      <Tab.Screen name={addName} component={ChatScreen} />
      <Tab.Screen name={notificationsName} component={ChatScreen} />
      <Tab.Screen name={favName} component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    backgroundColor: THEME.transparent,
    borderTopWidth: 0,
    bottom: 5,
    right: 10,
    left: 10,
    height: 92,
  },
});
