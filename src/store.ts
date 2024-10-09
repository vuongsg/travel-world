import { configureStore } from "@reduxjs/toolkit";
import countrySlices from "./slices/country-slices";

const store = configureStore({
    reducer: {
        country: countrySlices
    }
});

export type RootType = ReturnType<typeof store.getState>;
export default store;