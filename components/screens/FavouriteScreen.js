import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useFavorites } from "../context/FavouriteContext"; // Contexto de favoritos
import SearchBarWithFilters from "../modules/SearchBarWithFilters"; // Componente de búsqueda con filtros
import { THEME } from "../constants";

const FavoritesScreen = () => {
  const { favorites } = useFavorites();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.petImage} />
      <View style={styles.nameContainer}>
        <Text style={styles.petName}>{item.name}</Text>
        <Icon
          name="heart"
          size={20}
          color={THEME.danger}
          style={styles.heartIcon}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={false} />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Favoritos</Text>
        {/* Search Bar con filtros */}
        <SearchBarWithFilters />

        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: THEME.bgColor,
  },
  container: {
    padding: 15,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
  },
  headerTitle: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    color: THEME.primary,
    opacity: 0.9,
    paddingBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: THEME.white,
    borderColor: THEME.grayLight,
    borderWidth: 1,
  },
  petImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.dark,
    padding: 10,
  },
});

export default FavoritesScreen;
