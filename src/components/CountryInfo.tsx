import React from "react";
import { Grid } from "@material-ui/core";
import { ICountryProps } from "../models/ICountryProps";
import "./CountryInfo.scss";

export const CountryInfo: React.FC<ICountryProps> = (props) => {
    const { country, lstCountries, onSelectCountryByName } = props;
    const languages = country.languages ? Object.values(country.languages) : null;
    const currencies = country.currencies ? Object.keys(country.currencies) : null;
    const borders = country.borders;
    console.log(country);

    return (
        <Grid container direction="row">
            <Grid item sm={12} style={{ textAlign: 'center', margin: '0 auto', marginBottom: 30, paddingLeft: 30 }}>
                <h1>{country.name.common}</h1>
            </Grid>
            <Grid container direction='row'>
                <Grid item sm={12} lg={3} style={{ textAlign: 'center', margin: '0 auto', marginBottom: 30, paddingLeft: 30 }}>
                    <img src={country.flags.svg} alt={country.flags.alt} style={{ width: '100%', maxWidth: 250, maxHeight: 250, objectFit: 'cover' }} />
                </Grid>
                <Grid item sm={12} lg={9} id='grid-info' style={{ lineHeight: 2, margin: '0 auto', marginBottom: 30, paddingLeft: 30 }}>
                    <p>- Official name: {country.name.official}</p>
                    <p>- Region: {country.subregion}</p>
                    <p>- Capital: {country.capital?.join(", ")}</p>
                    <p>- Area: {country.area}</p>
                    <p>- {country.timezones.length > 1 ? 'Time zones' : 'Time zone'}:
                        <ul>
                            {country.timezones.map(m => <li>{m.endsWith(':00') ? m.substr(0, m.length - 3) : m}</li>)}
                        </ul>
                    </p>
                    <p>- Calling code: {country.idd.root}</p>
                    <p>{!languages ? "- Language (no info)" : (languages.length > 1 ? '- Languages:' : '- Language:')}
                        <ul>
                            {languages?.map(m => <li>{m}</li>)}

                        </ul>
                    </p>
                    <p>{!currencies ? "- Currency (no info)" : (currencies.length > 1 ? '- Currencies:' : '- Currency:')}
                        <ul>
                            {currencies?.map(m => <li>{m}</li>)}
                        </ul>
                    </p>
                    <p>{!borders ? "- Border (no info)" : (borders.length > 1 ? '- Borders:' : '- Border:')}
                        <ul>
                            {borders?.map(m => lstCountries.find(co => co.cca3 === m))
                                    .map(m => <li>
                                                <button className='btn-country-name' onClick={event => onSelectCountryByName(event, m?.name.common)}>
                                                    {m?.name.common}
                                                </button>
                                            </li>)}
                        </ul>
                    </p>
                </Grid>
            </Grid>
        </Grid>
    )
}