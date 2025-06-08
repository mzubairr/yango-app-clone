import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fromLocation: null,
  toLocation: null,
  pickupLocation: "",
  destinationLocation: ""
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setFromLocation: (state, action) => {
      state.fromLocation = action.payload;
    },
    setPickupLocation: (state, action) => {
      state.pickupLocation = action.payload;
    },
    setDestinationLocation: (state, action) => {
      state.destinationLocation = action.payload;
    },
    setToLocation: (state, action) => {
      state.toLocation = action.payload;
    },
    clearLocation: (state) => {
      state.fromLocation = null;
      state.toLocation = null;
    },
  },
});

export const { setFromLocation, setToLocation, setPickupLocation, setDestinationLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
