interface Currency {
    code: string;
    name: string;
    symbol: string
}

interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string
}

export class CountryModel {
    name: string;
    capital: string;
    region: string;
    subregion: string;
    population: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    flag: string;
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    currencies: Currency[];
    languages: Language[];
    altSpellings: string[]

    constructor(name: string, capital: string, region: string, subregion: string, population: number, timezones: string[], 
                borders: string[], nativeName: string, numericCode: string, flag: string, alpha2Code: string, alpha3Code: string,
                callingCodes: string[], currencies: Currency[], languages: Language[], altSpellings: string[]) {
        this.name = name;
        this.capital = capital;
        this.region = region;
        this.subregion = subregion;
        this.population = population;
        this.timezones = timezones;
        this.borders = borders;
        this.nativeName = nativeName;
        this.numericCode = numericCode;
        this.flag = flag;
        this.alpha2Code = alpha2Code;
        this.alpha3Code = alpha3Code;
        this.callingCodes = callingCodes;
        this.currencies = currencies;
        this.languages = languages;
        this.altSpellings = altSpellings;
    }
}