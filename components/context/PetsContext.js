import React, { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext"; // Importa el contexto de usuario

// Crear el contexto
export const PetsContext = createContext();

// Proveedor del contexto
export const PetsProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const { currentUser } = useContext(UserContext); // Usar useContext para obtener el usuario actual

  // Función para agregar una nueva mascota
  const addPet = (pet) => {
    const newPet = {
      id: (pets.length + 1).toString(),
      organizationId: currentUser?.organizationId || null, // Vincula la mascota a la organización actual
      organizationName: currentUser?.organizationName || currentUser?.name, // Usa el nombre de la organización o el nombre del usuario
      ...pet,
    };
    setPets((prevPets) => [...prevPets, newPet]); // Agregar la nueva mascota al estado
  };

  // Función para actualizar una mascota existente
  const updatePet = (updatedPet) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
    ); // Actualiza la mascota si el ID coincide
  };

  // Cargar mascotas (opcional, para futuras mejoras como API externas)
  const loadPets = () => {
    setPets((prevPets) => [...prevPets]); // Simplemente recarga las mascotas actuales
  };

  return (
    <PetsContext.Provider value={{ pets, addPet, updatePet, loadPets }}>
      {children}
    </PetsContext.Provider>
  );
};
