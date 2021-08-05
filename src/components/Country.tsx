import { useEffect } from 'react';
import { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CountryModel } from '../models/country';
import { RootType } from '../store';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './Country.scss';
import { Grid, Paper } from '@material-ui/core';
import { CountryState, getCountries, selectCountry } from '../slices/country-slices';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
}));

export const Country = (): ReactElement => {
    const classes = useStyles();
    let countryState = useSelector<RootType>(state => state.Country) as CountryState;
    const dispatch = useDispatch();

    useEffect(() => {
        getCountriesList();
    }, []);

    /**
     * Get countries list, called at first
     */
    const getCountriesList = async () => {
        const response = await fetch('https://restcountries.eu/rest/v2/all');
        const data = await response.json();
        const countries: CountryModel[] = Array.from(data);
        dispatch(getCountries(countries)); 
    }

    const handleSelectCountry = (event: any, index: number) => {
        dispatch(selectCountry(index));
    }

    /**
     * Render countries list to UI
     * @returns 
     */
    const renderCountriesList = () => {
        return (
            <Paper id='paper-countries-list' style={{ maxHeight: 700, overflow: 'auto' }}>
                <List component="nav" aria-label="countries list">
                    {countryState.countries.map((m: CountryModel, index: number) =>
                        <ListItem button selected={countryState.selectedCountry === index} onClick={(event) => handleSelectCountry(event, index)}>
                            <ListItemIcon>
                                <img src={m.flag} alt={m.name} style={{ maxWidth: 30, maxHeight: 30, objectFit: 'cover' }} />
                            </ListItemIcon>
                            <ListItemText primary={m.name} />
                        </ListItem>
                    )}
                </List>
            </Paper>
        )
    }

    return (
        <Grid container direction='row' wrap='nowrap' style={{padding: 30}}>
            <Grid item xs={12} lg={3} className={classes.root} style={{height: '100%'}}>
                {countryState.countries.length === 0 ? <h2>Loading...</h2> : renderCountriesList()}
            </Grid>

            <Grid item xs={12} lg={9}>
                {countryState.countries.length === 0 ? <div></div>
                    : countryState.selectedCountry === -1 ?
                     <Grid container>
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            <h1>Pick any country that you want to visit *_*</h1>
                            <h2>We are ready</h2>
                        </Grid>
                    </Grid>
                    :
                    <Grid container>
                        <Grid item xs={12} style={{textAlign: 'center', marginBottom: 20, marginLeft: 20}}>
                            <h1>{countryState.countries[countryState.selectedCountry].name}</h1>
                        </Grid>
                        <Grid container direction='row' wrap='nowrap'>
                            <Grid item xs={12} lg={3} style={{textAlign: 'center',  marginBottom: 20, marginLeft: 20}}>
                                <img src={countryState.countries[countryState.selectedCountry].flag} alt=''
                                    style={{ width: '100%', maxWidth: 250, maxHeight: 250, objectFit: 'cover'}} />
                            </Grid>
                            <Grid item xs={12} lg={9} style={{lineHeight: 2, marginLeft: 20}}>
                                <p>Native name: {countryState.countries[countryState.selectedCountry].nativeName}</p>
                                <p>Continent: {countryState.countries[countryState.selectedCountry].region}</p>
                                <p>Capital: {countryState.countries[countryState.selectedCountry].capital}</p>
                                <p>Time: {countryState.countries[countryState.selectedCountry].timezones.join(', ')}</p>
                                <p>Code: {countryState.countries[countryState.selectedCountry].callingCodes.join(', ')}</p>
                                <p>Currencies: {countryState.countries[countryState.selectedCountry].currencies.map(m => m.name).join(', ')}</p>
                                <p>Neighbors: {countryState.countries[countryState.selectedCountry].borders
                                                                                                 .map(m => countryState.countries
                                                                                                                .find(co => co.alpha3Code === m)?.name)
                                                                                                 .join(', ')}
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>}
            </Grid>
        </Grid>
    )
}