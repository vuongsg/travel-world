import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryModel } from "../models/country";

export interface CountryState {
    countries: CountryModel[],
    selectedCountry: number
}

const initialState: CountryState = {
    countries: [],
    selectedCountry: -1
}

const slice = createSlice({
    name: 'country',
    initialState: initialState,
    reducers: {
        getCountries: (state: CountryState, action: PayloadAction<CountryModel[]>) => {
            return {
                ...state,
                countries: action.payload
            }
        },
        selectCountry: (state: CountryState, action: PayloadAction<number>) => {
            return {
                ...state,
                selectedCountry: action.payload
            }
        }
    }
});

export const { getCountries, selectCountry } = slice.actions;
export default slice.reducer;