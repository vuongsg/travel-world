import React from "react";
import { Grid } from "@material-ui/core";
import { ICountryProps } from "../models/ICountryProps";
import "./CountryInfo.scss";

export const CountryInfo: React.FC<ICountryProps> = (props) => {
    const { country, lstCountries, onSelectCountryByName } = props;

    return (
        <Grid container direction="row">
            <Grid item sm={12} style={{ textAlign: 'center', margin: '0 auto', marginBottom: 30, paddingLeft: 30 }}>
                <h1>{country.name}</h1>
            </Grid>
            <Grid container direction='row'>
                <Grid item sm={12} lg={3} style={{ textAlign: 'center', margin: '0 auto', marginBottom: 30, paddingLeft: 30 }}>
                    <img src={country.flag} alt='' style={{ width: '100%', maxWidth: 250, maxHeight: 250, objectFit: 'cover' }} />
                </Grid>
                <Grid item sm={12} lg={9} id='grid-info' style={{ lineHeight: 2, margin: '0 auto', marginBottom: 30, paddingLeft: 30 }}>
                    <p>- Native name: {country.nativeName}</p>
                    <p>- Official name: {country.altSpellings.length > 1 ? country.altSpellings[1] 
                                                                         : country.altSpellings.length > 0 ? country.altSpellings[0] : ''}</p>
                    <p>- Region: {country.subregion}</p>
                    <p>- Capital: {country.capital}</p>
                    <p>- {country.timezones.length > 1 ? 'Time zones' : 'Time zone'}:
                        <ul>
                            {country.timezones.map(m => <li>{m.endsWith(':00') ? m.substr(0, m.length - 3) : m}</li>)}
                        </ul>
                    </p>
                    <p>- {country.callingCodes.length > 1 ? 'Codes' : 'Code'}:
                        <ul>
                            {country.callingCodes.map(m => <li>+{m}</li>)}
                        </ul>
                    </p>
                    <p>- {country.languages.length > 1 ? 'Languages' : 'Language'}:
                        <ul>
                            {country.languages.map(m => <li>{m.name}</li>)}

                        </ul>
                    </p>
                    <p>- {country.currencies.length > 1 ? 'Currencies' : 'Currency'}:
                        <ul>
                            {country.currencies.map(m => <li>{m.name}</li>)}
                        </ul>
                    </p>
                    <p>- {country.borders.length > 1 ? 'Borders' : 'Border'}:
                        <ul>
                            {country.borders
                                    .map(m => lstCountries.find(co => co.alpha3Code === m))
                                    .map(m => <li>
                                                <button className='btn-country-name' onClick={event => onSelectCountryByName(event, m?.name)}>
                                                    {m?.name}
                                                </button>
                                            </li>)}
                        </ul>
                    </p>
                </Grid>
            </Grid>
        </Grid>
    )
}