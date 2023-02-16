import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { baskeTotal, selectedBasketItem, selectedBasketItemWithId } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {
    const items = useSelector(selectedBasketItem)
    const navigation = useNavigation();
    let total = useSelector(baskeTotal)
    total = (total*1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity onPress={() => navigation.navigate("Basket")} className="flex-row bg-[#00CCBB] mx-5 p-4 rounded-lg items-center space-x-1">
        <Text className="text-lg text-white font-extrabold bg-[#01A296] py-1 px-2 ">{items.length}</Text>
        <Text className="text-lg text-white font-extrabold flex-1 text-center ">View Basket</Text>
        <Text className="text-lg text-white font-extrabold">{total}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon