import { API_KEY } from '@/lib/constants';
import { decodePolyline } from '@/lib/decodePolyline';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector } from 'react-redux';

export default function Map() {
    const fromLocation = useSelector((state) => state.location.fromLocation);
    const toLocation = useSelector((state) => state.location.toLocation);
    const pickupLocation = useSelector((state) => state.location.pickupLocation);
    const destinationLocation = useSelector((state) => state.location.destinationLocation);
    const [polylinePoints, setPolylinePoints] = useState(null);
    const [distanceInfo, setDistanceInfo] = useState(null);


    const getRoute = async () => {
        if (!fromLocation || !toLocation) {
            console.warn("From or To location missing");
            return;
        }
        const origin = `${fromLocation.lat},${fromLocation.lng}`;
        const destination = `${toLocation.lat},${toLocation.lng}`;

        const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.routes?.length) {
                const polyline = data.routes[0].overview_polyline.points;
                setPolylinePoints(decodePolyline(polyline));
                setDistanceInfo(data.routes[0].legs[0]);
            } else {
                console.warn("No routes found");
            }
        } catch (error) {
            console.error("Failed to fetch directions", error);
        }
    };
    getRoute()

    return (
        <View className='h-1/2 w-full'>
            {distanceInfo && (
                <Text>
                    {distanceInfo.distance?.text} - {distanceInfo.duration?.text}
                </Text>
            )}
            <View className='flex-1'>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: fromLocation?.lat,
                        longitude: fromLocation?.lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    zoomControlEnabled={true}
                >
                    {fromLocation && (
                        <Marker
                            coordinate={{ latitude: fromLocation.lat, longitude: fromLocation.lng }}
                            title={pickupLocation}
                        />
                    )}

                    {toLocation && (
                        <Marker
                            coordinate={{ latitude: toLocation.lat, longitude: toLocation.lng }}
                            title={destinationLocation}
                        />
                    )}

                    {polylinePoints && (
                        <Polyline
                            coordinates={polylinePoints}
                            strokeColor="#007AFF"
                            strokeWidth={5}
                        />
                    )}
                </MapView>
                <TouchableOpacity className='bg-white absolute bottom-9 left-2 rounded-full p-3'>
                    <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.back()} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
