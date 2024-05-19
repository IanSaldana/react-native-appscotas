import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'

const CardScreen = () => {
  return (
    <SafeAreaView>
        <View>
      <Text>Esta es la pestaña del detalle de mascota</Text>
      <Text>Foto en grande</Text>
      <Text>----------------------</Text>
      <Text>compartir, contactar, favoritos</Text>
      <Text>----------------------</Text>
      <Text>Descripcion detallada de la mascota</Text>
      <Text>----------------------</Text>
      <Text>Descripcion del dueño/organizacion</Text>
    </View>
    </SafeAreaView>
  )
}

export default CardScreen