import { useLocationAutocomplete } from "@/hooks/useAutocomplete";
import { setDestinationLocation, setFromLocation, setPickupLocation, setToLocation } from "@/Redux/reducers/locationSlice";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Keyboard,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

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

    const fromLocation = useSelector((state) => state.location.fromLocation);
    const toLocation = useSelector((state) => state.location.toLocation);

    const navigateToMap = () => {
        if (fromLocation?.lat && fromLocation?.lng && toLocation?.lat && toLocation?.lng) {
            router.push('/mapScreen');
        } else {
            Alert.alert("Location missing", "Please select pickup and destination from suggestions.");
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View className="bg-[#FAFAFA] rounded-t-3xl p-5 flex-1">
                        <View className="p-7 rounded-3xl bg-white shadow-md">
                            {/* Pickup Input */}
                            <View className="flex-row mb-2 items-center">
                                <View className="h-16 w-16 mr-4 overflow-hidden p-3 flex-row items-center">
                                    <Image
                                        source={require("@/assets/images/direction-man.png")}
                                        className="h-full w-full -scale-x-[1]"
                                        resizeMode="contain"
                                    />
                                </View>
                                <View className="flex-1 border-b border-gray-300 relative">
                                    <Text className="text-gray-500 text-xl">Pickup</Text>
                                    <TextInput
                                        placeholder="Where from?"
                                        placeholderTextColor="#000"
                                        className="text-xl font-semibold p-0"
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
                                    <Text className="text-gray-500 text-xl">Destination</Text>
                                    <TextInput
                                        placeholder="Where to?"
                                        placeholderTextColor="#000"
                                        className="text-xl font-semibold p-0"
                                        value={destinationQuery}
                                        onFocus={() => setActiveInput("desstination")}
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
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
};

export default CustomModal;
