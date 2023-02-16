import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { baskeTotal, removeFromBasket, selectedBasketItem } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectedBasketItem);
    const dispatch = useDispatch();
    const total = useSelector(baskeTotal)
    const [groupItemsInBasket, setGroupItemsInBasket] = useState([])
    useMemo(() => {
        const groupItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results
        }, {})
        setGroupItemsInBasket(groupItems)
    }, [items])
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] shadow-sm bg-white">
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" height={50} width={50} />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru"
                        }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className="flex-1">Delivery in 50-75 minutes</Text>

                    <TouchableOpacity>
                        <Text className="text-[#00CCBB]">
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="divide-y divide-gray-200">
                    {
                        Object.entries(groupItemsInBasket).map(([key, items]) => (
                            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5 ">
                                <Text className="text-[#00CCBB]">{items.length} x</Text>
                                <Image
                                    source={{
                                        uri: urlFor(items[0]?.image).url()
                                    }}
                                    className="h-12 w-12 rounded-full"
                                />
                                <Text className="flex-1">{items[0]?.name}</Text>
                                <Text>{(items[0]?.price * 1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                                <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                                    <Text className="text-[#00CCBB] text-xs">
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">{(total*1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Delivery Fee</Text>
                        <Text className="text-gray-400">{(10*1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text >Order Total</Text>
                        <Text className="font-extrabold">{(total*1000 + 10*1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <TouchableOpacity onPress={() =>navigation.navigate("PreparingOrder")} className="rounded-lg bg-[#00CCBB] p-4">
                        <Text className="font-extrabold text-center text-lg text-white">
                            Place Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen