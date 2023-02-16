import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, View, } from 'react-native';
import { AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from "../sanity";

const HomeScreen = () => {
    const navigation = useNavigation();

    const [featuredCategories, setFeaturedCategories] = useState([]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"]{
            ...,
            restaurants[]->{
            ...,
            dishes[]->
              }
        }
        `).then((data) => {
            setFeaturedCategories(data)
        })
    }, []);

    return (
        <SafeAreaView className="bg-white pt-5">
            <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
                <View>
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru"
                        }}
                        className="w-7 h-7 bg-gray-300 rounded-full"
                    />
                </View>

                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />


                    </Text>
                </View>
                <UserIcon size={35} color="#00CCBB" />


            </View>
            {/* Serach */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
                <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1">
                    <MagnifyingGlassIcon size={20} color="gray" />
                    <TextInput placeholder='Restaurant and cuisines' keyboardType='default' />
                </View>
                <AdjustmentsVerticalIcon color="#00CCBB" />
            </View>
            {/* Body */}
            <ScrollView className="bg-gray-100" contentContainerStyle={{
                paddingBottom: 100
            }}>
                {/* Category */}
                <Categories />

                {/* Features */}
                {featuredCategories?.map(category => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.description}
                    />
                ))}

            </ScrollView>
        </SafeAreaView>

    );
}

export default HomeScreen;

