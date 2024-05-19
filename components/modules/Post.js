import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';



const Post = () => {
  const navigation = useNavigation();
  const handleCard = () =>{
    navigation.navigate("Card")
  }
  const postInfo = [
    {
      petName: 'Milo',
      postImage: require('../../assets/images/mascota1.jpeg'),
      raza: "Kiltro",
      color: "cafe",
      descripción: "ladra mucho",
      edad: 2,

    },
    {
        petName: 'Donkan',
        postImage: require('../../assets/images/mascota2.jpeg'),
        raza: "Coquer",
        color: "Cafe claro",
        descripción: "ladra mucho",
        edad: 18,
    },
    {
        petName: 'Misty',
        postImage: require('../../assets/images/mascota3.jpeg'),
        raza: "Gato naranja",
        color: "naranka",
        descripción: "regalona",
        edad: 11,
    },
    {
        petName: 'Estrella',
        postImage: require('../../assets/images/mascota4.jpeg'),
        raza: "Gato naranja",
        color: "Naranja con blanco",
        descripción: "Tiene hambre",
        edad: 11,
    },
];

  return (
    
    <View style={{flex:1, padding:20}} >
      {postInfo.map((data, index) => {
        const [like, setLike] = useState(data.isLiked);
        return (
          <View
            key={index}
            style={{
              paddingBottom: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.1,
            }}>
            <View
              >
                <TouchableOpacity onPress={handleCard}>
                <Image 
                source={data.postImage}
                style={{width: '100%', height: 400, borderRadius:20}}>

                </Image>
                <View style={{paddingHorizontal: 15}}>
              <Text style={{
                  fontWeight: '700',
                  fontSize: 24,
                  paddingVertical: 2,
                }}>Nombre: {data.petName} </Text>
              <Text style={{
                  fontWeight: '70',
                  fontSize: 20,
                  paddingVertical: 2,
                }}>
                Raza: {data.raza +'\n'}
                Descripcion: {data.descripción +'\n'}
                Color: {data.color + '\n'}
                Edad: {data.edad + '\n'}
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