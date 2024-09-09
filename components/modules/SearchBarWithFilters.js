import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { THEME } from "../constants";

const SearchBarWithFilters = ({
  searchText,
  setSearchText,
  applyFilters,
  resetFilters,
  setSelectedSpecies,
  setSelectedGender,
  setSelectedAge,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localSelectedSpecies, setLocalSelectedSpecies] = useState("");
  const [localSelectedGender, setLocalSelectedGender] = useState("");
  const [localSelectedAge, setLocalSelectedAge] = useState("Any");

  const handleApplyFilters = () => {
    setSelectedSpecies(localSelectedSpecies);
    setSelectedGender(localSelectedGender);
    setSelectedAge(localSelectedAge);
    applyFilters();
    setIsModalVisible(false);
  };

  const handleResetFilters = () => {
    setLocalSelectedSpecies("");
    setLocalSelectedGender("");
    setLocalSelectedAge("Any");
    resetFilters();
  };

  return (
    <>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={25} color={THEME.gray} />
          <TextInput
            placeholder="Busca tu mascota"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() => setIsModalVisible(true)}
        >
          <Icon name="list-outline" size={35} color={THEME.white} />
        </TouchableOpacity>
      </View>

      {/* Modal de Filtros */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar mascotas</Text>
            {/* Filtros de Especie */}
            <Text style={styles.filterLabel}>Especie:</Text>
            <View style={styles.vaccinatedFilter}>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  localSelectedSpecies === "Perro" && styles.selectedOption,
                ]}
                onPress={() => setLocalSelectedSpecies("Perro")}
              >
                <Text style={styles.optionText}>Perros</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  localSelectedSpecies === "Gato" && styles.selectedOption,
                ]}
                onPress={() => setLocalSelectedSpecies("Gato")}
              >
                <Text style={styles.optionText}>Gatos</Text>
              </TouchableOpacity>
            </View>
            {/* Filtros de Género */}
            <Text style={styles.filterLabel}>Género:</Text>
            <View style={styles.vaccinatedFilter}>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  localSelectedGender === "Macho" && styles.selectedOption,
                ]}
                onPress={() => setLocalSelectedGender("Macho")}
              >
                <Text style={styles.optionText}>Macho</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  localSelectedGender === "Hembra" && styles.selectedOption,
                ]}
                onPress={() => setLocalSelectedGender("Hembra")}
              >
                <Text style={styles.optionText}>Hembra</Text>
              </TouchableOpacity>
            </View>
            {/* Filtros de Edad */}
            <Text style={styles.filterLabel}>Edad:</Text>
            <View style={styles.vaccinatedFilter}>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  localSelectedAge === "2 años" && styles.selectedOption,
                ]}
                onPress={() => setLocalSelectedAge("2 años")}
              >
                <Text style={styles.optionText}>2 años</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  localSelectedAge === "5 años" && styles.selectedOption,
                ]}
                onPress={() => setLocalSelectedAge("5 años")}
              >
                <Text style={styles.optionText}>5 años</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vaccinatedOption,
                  localSelectedAge === "8+ años" && styles.selectedOption,
                ]}
                onPress={() => setLocalSelectedAge("8+ años")}
              >
                <Text style={styles.optionText}>8+ años</Text>
              </TouchableOpacity>
            </View>
            {/* Botones de Modal */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={handleApplyFilters}
              >
                <Text style={styles.applyBtnText}>Aplicar Filtros</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={handleResetFilters}
              >
                <Text style={styles.clearBtnText}>Limpiar Filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginBottom: 20, // Ajuste adicional para agregar separación
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: THEME.grayLight, // Fondo del input de búsqueda con color del tema
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10, // Ajuste para separar el botón de filtro del input
  },
  searchInput: {
    flex: 1,
    fontSize: 16, // Ajustar tamaño de fuente para consistencia
    color: THEME.dark, // Color del texto del input de búsqueda
  },
  sortBtn: {
    backgroundColor: THEME.menuBackground, // Fondo del botón de ordenamiento con el color del menú
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: THEME.white, // Fondo blanco del modal
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: THEME.primary, // Título del modal en color primario
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: THEME.secondary, // Etiqueta de filtro con color secundario
  },
  vaccinatedFilter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  vaccinatedOption: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: THEME.grayLight, // Opción de filtro con color gris claro
  },
  selectedOption: {
    backgroundColor: THEME.primary, // Opción seleccionada con color primario
  },
  optionText: {
    color: THEME.white, // Texto de la opción en blanco
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  applyBtn: {
    backgroundColor: THEME.primary, // Botón de aplicar con color primario
    padding: 10,
    borderRadius: 5,
  },
  applyBtnText: {
    color: THEME.white, // Texto del botón en blanco
    fontWeight: "bold",
  },
  clearBtn: {
    backgroundColor: THEME.grayLight, // Botón de limpiar con color gris claro
    padding: 10,
    borderRadius: 5,
  },
  clearBtnText: {
    color: THEME.dark, // Texto del botón en color oscuro
    fontWeight: "bold",
  },
});

export default SearchBarWithFilters;
