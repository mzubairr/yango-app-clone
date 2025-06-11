import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useSelector } from "react-redux";
const RequestModal = () => {
    const pickupLocation = useSelector((state: any) => state.location.pickupLocation);
    const destinationLocation = useSelector((state: any) => state.location.destinationLocation);

    const transport = [
        {
            image: require('@/assets/images/economycar.png'),
            title: 'Economy',
            price: 650,
        },
        {
            image: require('@/assets/images/comfortcar.png'),
            title: 'Comfort',
            price: 1200,
        },
        {
            image: require('@/assets/images/motorbike.png'),
            title: 'Bike',
            price: 2500,
        },
        {
            image: require('@/assets/images/rickshaw.png'),
            title: 'Rickshaw',
            price: 300,
        },
    ];

    return (
        <ScrollView style={{ boxShadow: '0 0 10px rgba(154, 154, 154, 0.59)' }} className="w-full h-1/2 rounded-t-[30px] bottom-0 absolute" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="px-4">
                <Text className="uppercase font-extrabold text-3xl py-4">your trip</Text>
                <View className="flex-row mb-2 items-center">
                    <View className="h-16 w-16 mr-4 overflow-hidden">
                        <Image
                            source={require('@/assets/images/direction-man.png')}
                            className="h-full w-full -scale-x-[1]"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-2xl font-medium border-b border-gray-400 flex-1">{pickupLocation}</Text>
                </View>
                <View className="mb-2">
                    <View className="flex-row items-center border-b border-gray-400">
                        <View className="h-16 w-16 mr-4 overflow-hidden">
                            <Image
                                source={{
                                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVqA_64gwHREW_7znS3pYq_wuj7hHFa5kqA&s'
                                }}
                                className="h-full w-full -scale-x-[1]"
                                resizeMode="contain"
                            />
                        </View>
                        <Text className="text-2xl font-medium flex-1">{destinationLocation}</Text>
                        <TouchableOpacity className="bg-[#EEEEEE] py-1 px-5 rounded-full">
                            <Text className="text-xl">Stops</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* export section */}
                <View style={{ height: 140 }} className="w-full flex-row justify-between px-2 py-2">
                    {transport.length > 0 && transport.map((item, idx) => (
                        <TouchableOpacity key={idx} className="bg-[#EEEEEE] h-full w-[23%] items-center p-2 rounded-lg">
                            <View className="h-1/2 w-full">
                                <Image
                                    source={item.image}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                />
                            </View>
                            <View className="h-1/2 w-full">
                                <Text className="text-center text-lg font-bold">{item.title}</Text>
                                <Text className="text-center text-lg font-bold">Rs.{item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className="bg-white flex-1 w-full px-4 flex-row justify-between items-center">
                <View className="h-16 w-16">
                    <Image
                        source={require('@/assets/images/cash-img.png')}
                        className="h-full w-full"
                        resizeMode="contain"
                    />
                </View>
                <TouchableOpacity className="bg-red-500 py-4 px-20 rounded-2xl">
                    <Text className="text-white text-2xl">Reqeuest</Text>
                </TouchableOpacity>
                <View className="h-16 w-16">
                    <Image
                        source={{
                            uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSjNQ-FtlX38G-4EdmvuhC6JdJmfgSoRjBl6EL3_TWjFdV9NqNa",
                        }}
                        className="h-full w-full"
                        resizeMode="contain"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default RequestModal;
