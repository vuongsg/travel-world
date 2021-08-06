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
import { Grid, Paper, SnackbarContent } from '@material-ui/core';
import { CountryState, getCountries, selectCountry } from '../slices/country-slices';
import { AutorenewTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    snackBarDiv: {
        maxWidth: 800,
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        margin: '0 auto'
      }
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
            <Grid item xs={12} lg={3} className={classes.root} style={{height: '100%', marginRight: 30}}>
                {countryState.countries.length === 0 ? <h2>Loading...</h2> : renderCountriesList()}
            </Grid>

            <Grid item xs={12} lg={9}>
                {countryState.countries.length === 0 ? <div></div>
                    : countryState.selectedCountry === -1 ?
                     <Grid container>
                        <Grid item xs={12} className={classes.snackBarDiv}>
                            <SnackbarContent
                                message={
                                    <div style={{lineHeight: 2}}>
                                        <h1>Pick any country that you want to visit &nbsp; *_*</h1>
                                        <h3>We are ready</h3>
                                    </div>
                                }
                            />
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
                                <p>- Native name: {countryState.countries[countryState.selectedCountry].nativeName}</p>
                                <p>- Official name: {countryState.countries[countryState.selectedCountry].altSpellings.length > 1
                                                    ? countryState.countries[countryState.selectedCountry].altSpellings[1]
                                                    : countryState.countries[countryState.selectedCountry].altSpellings.length > 0
                                                    ? countryState.countries[countryState.selectedCountry].altSpellings[0]
                                                    : ''}</p>
                                <p>- Region: {countryState.countries[countryState.selectedCountry].subregion}</p>
                                <p>- Capital: {countryState.countries[countryState.selectedCountry].capital}</p>
                                <p>- Time zones:
                                    <ul>
                                        {countryState.countries[countryState.selectedCountry].timezones.map(m => <li style={{marginLeft: 50}}>
                                                                                                                    {m.endsWith(':00') 
                                                                                                                    ? m.substr(0, m.length - 3) : m}</li>)}
                                    </ul>
                                </p>
                                <p>- Code:
                                    <ul>
                                        {countryState.countries[countryState.selectedCountry].callingCodes.map(m => <li style={{marginLeft: 50}}>{m}</li>)}
                                    </ul>
                                </p>
                                <p>- Language:
                                    <ul>
                                        {countryState.countries[countryState.selectedCountry].languages.map(m => <li style={{marginLeft: 50}}>{m.name}</li>)}
                                                                                                       
                                    </ul>
                                </p>
                                <p>- Currencies:
                                    <ul>
                                        {countryState.countries[countryState.selectedCountry].currencies.map(m => <li style={{marginLeft: 50}}>{m.name}</li>)}
                                    </ul>
                                </p>
                                <p>- Borders:
                                    <ul>
                                        {countryState.countries[countryState.selectedCountry].borders
                                                                                             .map(m => countryState.countries
                                                                                                                .find(co => co.alpha3Code === m))
                                                                                             .map(m => <li style={{marginLeft: 50}}>{m?.name}</li>)}
                                    </ul>
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>}
            </Grid>
        </Grid>
    )
}