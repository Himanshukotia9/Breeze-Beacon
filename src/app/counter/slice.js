import { createSlice } from '@reduxjs/toolkit'

// Initial state for the news items
const initialState = {
    items: [],
  };
  
  // City slice
  export const citySlice = createSlice({
    name: 'city',
    initialState: initialState,
    reducers: {
      setCityItems: (state, action) => {
        state.items = action.payload;
      },
    },
  });
  
  // Action creators for news slice
  export const { setCityItems } = citySlice.actions;

    // City slice
    export const weatherSlice = createSlice({
        name: 'weather',
        initialState: initialState,
        reducers: {
          setWeather: (state, action) => {
            state.items = action.payload;
          },
        },
    });
  
  // Action creators for news slice
  export const { setWeather } = weatherSlice.actions;
  // Combine all slices into a single reducer object
export const rootReducer = {
    city: citySlice.reducer,
    weather: weatherSlice.reducer,
  };