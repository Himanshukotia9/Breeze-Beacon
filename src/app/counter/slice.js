// slice.js
import { createSlice } from '@reduxjs/toolkit'

// Initial state for the news items
const initialState = {
    items: [],
  };
const initialCityState = {
    items: "Delhi", // Default value for cityItems
};
  
// City slice
export const citySlice = createSlice({
    name: 'city',
    initialState: initialCityState,
    reducers: {
      setCityItems: (state, action) => {
        state.items = action.payload;
      },
    },
});
  
// Action creators for City slice
export const { setCityItems } = citySlice.actions;

// Weather slice
export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        setWeather: (state, action) => {
        state.items = action.payload;
        },
    },
});
  
// Action creators for Weather slice
export const { setWeather } = weatherSlice.actions;

// Search Weather slice
export const searchWeatherSlice = createSlice({
  name: 'searchWeather',
  initialState: initialState,
  reducers: {
      setSearchWeather: (state, action) => {
      state.items = action.payload;
      },
  },
});

// Action creators for Search Weather slice
export const { setSearchWeather } = searchWeatherSlice.actions;

// Location slice
export const locationSlice = createSlice({
    name: 'location',
    initialState: initialState,
    reducers: {
        setLocation: (state, action) => {
        state.items = action.payload;
        },
    },
});
  
// Action creators for Weather slice
export const { setLocation } = locationSlice.actions;
// Combine all slices into a single reducer object
export const rootReducer = {
    city: citySlice.reducer,
    weather: weatherSlice.reducer,
    searchWeather: searchWeatherSlice.reducer,
    location: locationSlice.reducer,
  };