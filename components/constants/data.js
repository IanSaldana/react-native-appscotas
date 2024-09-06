export const petsInitial = [
  {
    id: "1",
    name: "Buddy",
    species: "Perro",
    color: "Cafe",
    age: 3,
    vaccinated: true,
    gender: "Macho",
    location: { region: "Santiago", comuna: "Ñuñoa" }, // Ajuste de estructura para región y comuna
    description: "Perro amigable y juguetón.",
    image: require("../../assets/images/mascota1.jpeg"),
  },
];
// Función para agregar una nueva mascota a la lista
export const addPet = (pet) => {
  const newPet = {
    id: (petsInitial.length + 1).toString(), // Generar un nuevo ID
    ...pet,
  };
  petsInitial.push(newPet);
};
// Función para actualizar una mascota existente
export const updatePet = (updatedPet) => {
  const index = petsInitial.findIndex((pet) => pet.id === updatedPet.id);
  if (index !== -1) {
    petsInitial[index] = { ...updatedPet };
  }
};
