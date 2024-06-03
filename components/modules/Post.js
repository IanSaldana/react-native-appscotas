import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const Post = ({ postInfo }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {postInfo.map((data, index) => {
        const [like, setLike] = useState(data.isLiked);
        return (
          <View
            key={index}
            style={{
              paddingBottom: 10,
              borderBottomColor: "gray",
              borderBottomWidth: 0.1,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PetDetails", { petId: data.id })
                }
              >
                <Image
                  source={{ uri: data.postImage }} // Asegúrate de que data.postImage es una URL válida
                  style={{ width: "100%", height: 400, borderRadius: 20 }}
                />
                <View style={{ paddingHorizontal: 15 }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 24,
                      paddingVertical: 2,
                    }}
                  >
                    Nombre: {data.nombre}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "70",
                      fontSize: 20,
                      paddingVertical: 2,
                    }}
                  >
                    Raza: {data.raza + "\n"}
                    Descripción: {data.descripcion + "\n"}
                    Color: {data.color + "\n"}
                    Edad: {data.edad + "\n"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Post;
