import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryModel } from "../models/country";

export interface CountryState {
    countries: CountryModel[],
    selectedIndex: number
}

const initialState: CountryState = {
    countries: [],
    selectedIndex: -1
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
                selectedIndex: action.payload
            }
        }
    }
});

export const { getCountries, selectCountry } = slice.actions;
export default slice.reducer;