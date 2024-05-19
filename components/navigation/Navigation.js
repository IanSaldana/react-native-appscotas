import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";

//screens
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen"
import CardScreen from "../screens/CardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens names
const homeName = "Home";
const loginName = "Login";
const profileName = "Profile";
const cardName = "Card";

const Stack = createNativeStackNavigator();
const counter = 2;

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
        <Stack.Screen name={homeName} component={BottomTabNavigator} />
        <Stack.Screen name={profileName} component={ProfileScreen} />
        <Stack.Screen name={cardName} component={CardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
