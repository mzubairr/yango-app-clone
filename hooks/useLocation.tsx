import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useLocation() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        async function getCurrentLocation() {
            const { status } = await Location.requestForegroundPermissionsAsync();

            console.log("🚀 ~ getCurrentLocation ~ status:", status);

            if (status !== "granted") {
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocation(currentLocation);
        }

        getCurrentLocation();
    }, []);

    return { location };
}