// Api.jsx
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByName: builder.query({
        query: (cityItems) => 
            `weather?q=${cityItems !== "[object Object]" ? cityItems : ''}&units=metric&APPID=${import.meta.env.VITE_WEATHER_API}`,
    }),
    getWeatherByCoordinates: builder.query({
      query: ({ lat, lon }) => 
          `weather?lat=${lat}&lon=${lon}&units=metric&APPID=${import.meta.env.VITE_WEATHER_API}`,
  }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWeatherByNameQuery, useGetWeatherByCoordinatesQuery } = weatherApi
