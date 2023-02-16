import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'

const CategoryCards = ({imgUrl,title}) => {

  return (
    <TouchableOpacity className="relative mr-2">
    <Image source={{
        uri:urlFor(imgUrl).width(200).url()
    }}
        className="h-20  w-20 rounded"
    />
      <Text className="absolute bottom-2.5 left-2 text-green-50 font-bold">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCards