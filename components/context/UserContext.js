import React, { createContext, useState } from "react";

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("persona");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Estado de usuario actual
  const [pets, setPets] = useState([]); // Estado para almacenar la lista de mascotas

  // Función para registrar un usuario
  const registerUser = (type, email, password, name, rut) => {
    const newUser = {
      type,
      email,
      password,
      name,
      rut,
      photo: null,
      isPremium: false,
      organizationId: type === "organizacion" ? Date.now().toString() : null, // Asigna un ID único si el tipo es organización
    };

    setUserType(type);
    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);

    // Si el usuario es el que acaba de registrarse, actualiza currentUser
    setCurrentUser(newUser);
  };

  // Función para verificar si un usuario existe
  const checkUserExists = (email, password) => {
    const user = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setCurrentUser(user);
    }
    return user;
  };

  // Función para actualizar los datos del usuario
  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    setRegisteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === updatedUser.email ? updatedUser : user
      )
    );
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
  };

  // Función para agregar una mascota
  const addPet = (pet) => {
    setPets((prevPets) => [pet, ...prevPets]); // Agrega la mascota al principio de la lista
  };

  return (
    <UserContext.Provider
      value={{
        userType,
        registerUser,
        checkUserExists,
        updateUser,
        logout,
        currentUser, // Asegúrate de que `currentUser` esté disponible en el proveedor
        pets,
        addPet,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
