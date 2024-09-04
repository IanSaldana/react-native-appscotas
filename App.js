import * as React from "react";

import Navigation from "./components/navigation/Navigation";
import { StripeProvider } from "@stripe/stripe-react-native";
import { FavoritesProvider } from "./components/context/FavouriteContext";
import { UserProvider } from "./components/context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <FavoritesProvider>
        <Navigation />
      </FavoritesProvider>
    </UserProvider>
  );
};

export default App;
