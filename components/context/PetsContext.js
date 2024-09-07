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
    setPets((prevPets) => [...prevPets, newPet]); // Actualiza el estado de mascotas
  };

  const updatePet = (updatedPet) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
    ); // Actualiza el estado con la mascota modificada
  };

  const loadPets = () => {
    // Este método ahora simplemente "recarga" las mascotas del estado actual
    setPets((prevPets) => [...prevPets]); // Podría ser más útil si obtienes datos de una fuente externa
  };

  return (
    <PetsContext.Provider value={{ pets, addPet, updatePet, loadPets }}>
      {children}
    </PetsContext.Provider>
  );
};
