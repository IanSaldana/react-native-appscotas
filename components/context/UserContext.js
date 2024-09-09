import React, { createContext, useState } from "react";

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("persona");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Estado de usuario actual
  const [pets, setPets] = useState([]); // Estado para almacenar la lista de mascotas
  const [conversations, setConversations] = useState([]); // Estado para almacenar las conversaciones

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
      setCurrentUser(user); // Actualiza el estado con el usuario encontrado
      return user; // Asegúrate de devolver el usuario completo
    }
    return null; // Devuelve null si no se encuentra el usuario
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

  // Función para agregar una nueva conversación
  const addConversation = (conversation) => {
    setConversations((prevConversations) => [
      ...prevConversations,
      conversation,
    ]);
  };

  // Función para iniciar una nueva conversación
  const initiateConversation = (withUser) => {
    if (!withUser || !currentUser) return; // Verifica que ambos usuarios existan

    const newConversation = {
      id: Date.now().toString(),
      name: withUser.name,
      lastMessage: "Nueva conversación",
      avatar: withUser.photo || require("../../assets/images/person.jpeg"),
      time: new Date().toLocaleTimeString(),
      unreadCount: 1,
      type: currentUser.type === "persona" ? "organizacion" : "persona",
    };

    addConversation(newConversation); // Agrega la nueva conversación
  };

  // Función para filtrar las conversaciones según el tipo de usuario
  const getFilteredConversations = () => {
    if (!currentUser) return [];
    return conversations.filter(
      (conversation) =>
        (currentUser.type === "organizacion" &&
          conversation.type === "persona") ||
        (currentUser.type === "persona" && conversation.type === "organizacion")
    );
  };

  return (
    <UserContext.Provider
      value={{
        userType,
        registerUser,
        checkUserExists,
        updateUser,
        logout,
        currentUser,
        pets,
        addPet,
        conversations,
        addConversation,
        initiateConversation,
        getFilteredConversations,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
