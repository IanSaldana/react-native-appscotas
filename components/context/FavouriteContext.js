import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const FavoritesContext = createContext();

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (pet) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === pet.id)) {
        return [...prevFavorites, pet];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (petId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((pet) => pet.id !== petId)
    );
  };

  // Nueva función para alternar favorito
  const toggleFavorite = (pet) => {
    if (favorites.some((fav) => fav.id === pet.id)) {
      removeFavorite(pet.id);
    } else {
      addFavorite(pet);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useFavorites = () => useContext(FavoritesContext);
