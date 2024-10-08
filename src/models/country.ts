interface IName {
    common: string;
    official: string
}

//old calling codes
interface Idd {
    root: string;
}

interface IFlag {
    png: string;
    svg: string;
    alt: string;
}

export class CountryModel {
    name: IName;
    capital?: string[];
    area: number;
    region: string;
    subregion: string;
    population: number;
    timezones: string[];
    borders?: string[];
    numericCode: string;
    flags: IFlag;
    alpha2Code: string;
    alpha3Code: string;
    idd: Idd;
    currencies?: object;
    languages?: object;
    cca3: string;
    altSpellings: string[]

    constructor(name: IName, capital: string[], area: number, region: string, subregion: string, population: number, timezones: string[], 
                borders: string[], numericCode: string, flags: IFlag, alpha2Code: string, alpha3Code: string,
                idd: Idd, currencies: object, languages: object, cca3: string, altSpellings: string[]) {
        this.name = name;
        this.capital = capital;
        this.area = area;
        this.region = region;
        this.subregion = subregion;
        this.population = population;
        this.timezones = timezones;
        this.borders = borders;
        this.numericCode = numericCode;
        this.flags = flags;
        this.alpha2Code = alpha2Code;
        this.alpha3Code = alpha3Code;
        this.idd = idd;
        this.currencies = currencies;
        this.languages = languages;
        this.cca3 = cca3;
        this.altSpellings = altSpellings;
    }
}