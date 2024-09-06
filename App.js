import * as React from "react";

import Navigation from "./components/navigation/Navigation";
import { StripeProvider } from "@stripe/stripe-react-native";
import { FavoritesProvider } from "./components/context/FavouriteContext";
import { UserProvider } from "./components/context/UserContext";
import { PetsProvider } from "./components/context/PetsContext";

const App = () => {
  return (
    <UserProvider>
      <PetsProvider>
        <FavoritesProvider>
          <Navigation />
        </FavoritesProvider>
      </PetsProvider>
    </UserProvider>
  );
};

export default App;
