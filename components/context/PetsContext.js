import React, { createContext, useState } from "react";
import { petsInitial } from "../constants/data";

// Crear el contexto
export const PetsContext = createContext();

// Proveedor del contexto
export const PetsProvider = ({ children }) => {
  const [pets, setPets] = useState(petsInitial);

  const addPet = (pet) => {
    const newPet = {
      id: (pets.length + 1).toString(),
      ...pet,
    };
    setPets((prevPets) => [...prevPets, newPet]);
  };

  const updatePet = (updatedPet) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
    );
  };

  return (
    <PetsContext.Provider value={{ pets, addPet, updatePet }}>
      {children}
    </PetsContext.Provider>
  );
};
