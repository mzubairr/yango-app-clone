import { useLocationAutocomplete } from "@/hooks/useAutocomplete";
import { setDestinationLocation, setFromLocation, setPickupLocation, setToLocation } from "@/Redux/reducers/locationSlice";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Keyboard,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const CustomModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();

    const {
        query: pickupQuery,
        setQuery: setPickupQuery,
        predictions: pickupPredictions,
        onChangeQuery: onPickupChange,
        clearPredictions: clearPickupPredictions,
    } = useLocationAutocomplete();

    const {
        query: destinationQuery,
        setQuery: setDestinationQuery,
        predictions: destinationPredictions,
        onChangeQuery: onDestinationChange,
        clearPredictions: clearDestinationPredictions,
    } = useLocationAutocomplete();

    const [activeInput, setActiveInput] = useState(null);

    const selectLocation = (item) => {
        if (activeInput === "pickup") {
            console.log("Selected Pickup Location:", item.geometry.location);
            dispatch(setFromLocation(item.geometry.location));
            setPickupQuery(item.name);
            dispatch(setPickupLocation(item.name));
            clearPickupPredictions();
        } else if (activeInput === "destination") {
            dispatch(setToLocation(item.geometry.location));
            setDestinationQuery(item.name);
            dispatch(setDestinationLocation(item.name));
            clearDestinationPredictions();
            navigateToMap()
        }
        Keyboard.dismiss();
    };

    const handleOutsidePress = () => {
        clearPickupPredictions();
        clearDestinationPredictions();
        Keyboard.dismiss();
    };

    const navigation = useNavigation()

    const navigateToMap = () => {
        navigation.navigate('mapScreen')
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={onClose}
                >
                    <TouchableWithoutFeedback onPress={handleOutsidePress}>
                        <View className="flex-1">
                            <View style={{ boxShadow: '0 -100px 10px rgba(154, 154, 154, 0.59)' }} className="mt-9 bg-[#FAFAFA] rounded-t-2xl p-5 h-full w-full shadow-lg">
                                <View className="p-7 rounded-3xl bg-white shadow-md">
                                    {/* Pickup Input */}
                                    <View className="flex-row mb-2 items-center">
                                        <View className="h-16 w-16 mr-4 overflow-hidden">
                                            <Image
                                                source={{
                                                    uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTc6pnDh-FFnxE2gWkhYknwMiuK-1k3MB9es1AiL07W6dXQbUlD",
                                                }}
                                                className="h-20 w-full"
                                            />
                                        </View>
                                        <View className="flex-1 border-b border-gray-300 relative">
                                            <Text className="text-gray-500 text-2xl mb-[-10px]">
                                                Pickup
                                            </Text>
                                            <TextInput
                                                placeholder="Where from?"
                                                placeholderTextColor="#000"
                                                className="text-2xl font-semibold py-0"
                                                value={pickupQuery}
                                                onFocus={() => setActiveInput("pickup")}
                                                onChangeText={onPickupChange}
                                            />
                                            {activeInput === "pickup" && pickupPredictions.length > 0 && (
                                                <ScrollView className="absolute top-[70px] left-0 right-0 max-h-[250px] bg-white z-20 shadow-md">
                                                    {pickupPredictions.map((item) => (
                                                        <TouchableOpacity
                                                            key={item.place_id}
                                                            onPress={() => selectLocation(item)}
                                                            className="py-2 px-3"
                                                        >
                                                            <Text className="text-base font-bold">
                                                                {item.name}
                                                            </Text>
                                                            <Text className="text-sm text-gray-500">
                                                                {item.formatted_address}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </ScrollView>
                                            )}
                                        </View>
                                    </View>

                                    {/* Destination Input */}
                                    <View className="flex-row items-center">
                                        <View className="h-16 w-16 mr-4">
                                            <Image
                                                source={{
                                                    uri: "https://thumbs.dreamstime.com/b/crossed-flags-icon-digital-red-any-design-isolated-white-vector-illustration-98827982.jpg",
                                                }}
                                                className="h-full w-full"
                                            />
                                        </View>
                                        <View className="flex-1 relative">
                                            <Text className="text-gray-500 text-2xl">Destination</Text>
                                            <TextInput
                                                placeholder="Where to?"
                                                placeholderTextColor="#000"
                                                className="text-2xl font-semibold py-0"
                                                value={destinationQuery}
                                                onFocus={() => setActiveInput("destination")}
                                                onChangeText={onDestinationChange}
                                                onSubmitEditing={navigateToMap}
                                            />
                                            {activeInput === "destination" && destinationPredictions.length > 0 && (
                                                <ScrollView className="absolute top-[70px] left-0 right-0 max-h-[250px] bg-white z-20 shadow-md">
                                                    {destinationPredictions.map((item) => (
                                                        <TouchableOpacity
                                                            key={item.place_id}
                                                            onPress={() => selectLocation(item)}
                                                            className="py-2 px-3"
                                                        >
                                                            <Text className="text-base font-bold">
                                                                {item.name}
                                                            </Text>
                                                            <Text className="text-sm text-gray-500">
                                                                {item.formatted_address}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </ScrollView>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default CustomModal;
