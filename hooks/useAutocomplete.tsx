import { API_KEY } from "@/lib/constants";
import { useState } from "react";
import { Keyboard } from "react-native";

export const useLocationAutocomplete = () => {
    const [query, setQuery] = useState("");
    const [predictions, setPredictions] = useState([]);

    const fetchPredictions = async (searchQuery: string) => {
        if (!searchQuery) {
            setPredictions([]);
            return;
        }
        try {
            const response = await fetch(
                `https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${searchQuery}&key=${API_KEY}`
            );
            const data = await response.json();
            setPredictions(Array.isArray(data.results) ? data.results : []);
        } catch (error) {
            console.error("Error fetching autocomplete predictions:", error);
        }
    };

    const onChangeQuery = (text: string) => {
        setQuery(text);
        fetchPredictions(text);
    };

    const clearPredictions = () => {
        setPredictions([]);
        Keyboard.dismiss();
    };

    return {
        query,
        setQuery,
        predictions,
        onChangeQuery,
        clearPredictions,
    };
};
