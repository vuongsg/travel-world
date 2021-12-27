import { CountryModel } from "./country";

export interface ICountryProps {
    country: CountryModel;
    lstCountries: CountryModel[];
    onSelectCountryByName(event: any, countryName: string | undefined): void
}