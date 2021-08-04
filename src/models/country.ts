export class CountryModel {
    name: string;
    captital: string;
    region: string;
    subregion: string;
    population: string;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    flag: string

    constructor(name: string, capital: string, region: string, subregion: string, population: string, timezones: string[], 
                borders: string[], nativeName: string, numericCode: string, flag: string) {
        this.name = name;
        this.captital = capital;
        this.region = region;
        this.subregion = subregion;
        this.population = population;
        this.timezones = timezones;
        this.borders = borders;
        this.nativeName = nativeName;
        this.numericCode = numericCode;
        this.flag = flag;
    }
}