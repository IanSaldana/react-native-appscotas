import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./components/navigation/Navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { Context, Provider } from "./components/globalContext/globalContext.js";

function App() {
  return <Navigation></Navigation>;
}

export default App;
