import * as React from "react";

import Navigation from "./components/navigation/Navigation";
import { StripeProvider } from "@stripe/stripe-react-native";
import { FavoritesProvider } from "./components/context/FavouriteContext";

const App = () => {
  return (
    <FavoritesProvider>
      <Navigation />
    </FavoritesProvider>
  );
};

export default App;
