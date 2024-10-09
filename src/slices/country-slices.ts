import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryModel } from "../models/country";

export interface ICountryState {
    countries: CountryModel[],
    selectedIndex: number
}

const initialState: ICountryState = {
    countries: [],
    selectedIndex: -1
}

const slice = createSlice({
    name: 'country',
    initialState: initialState,
    reducers: {
        setCountries: (state: ICountryState, action: PayloadAction<CountryModel[]>) => {
            return {
                ...state,
                countries: action.payload
            }
        },
        selectCountry: (state: ICountryState, action: PayloadAction<number>) => {
            return {
                ...state,
                selectedIndex: action.payload
            }
        }
    }
});

export const { setCountries, selectCountry } = slice.actions;
export default slice.reducer;