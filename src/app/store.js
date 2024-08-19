import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./services/api";
import { rootReducer } from "./counter/slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        ...rootReducer,
        [weatherApi.reducerPath]: weatherApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware),
})

setupListeners(store.dispatch)