import { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CountryModel } from '../models/country';
import { RootType } from '../store';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, SnackbarContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CountryState, getCountries, selectCountry } from '../slices/country-slices';
import './Country.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    snackBarDiv: {
        maxWidth: 600,
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        margin: '0 auto'
      }
}));

let numberCountriesDisplaying = 0;

export const Country = (): ReactElement => {
    const [hasData, setData] = useState(true);
    const [countriesDisplay, setCountriesDisplay] = useState<CountryModel[]>([]);   //display in list countries
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
        let countries: CountryModel[] = [];

        try {
            const data = require('../countries.json');
            countries = Array.from(data);
        } catch (err) {
            console.log(err);
            const response = await fetch('https://restcountries.eu/rest/v2/all');
            const data = await response.json();
            countries = Array.from(data);
        }
        
        numberCountriesDisplaying = countries.length < 20 ? countries.length : 20;
        const temp: CountryModel[] = [];

        for (let i = 0; i < numberCountriesDisplaying; i++) {
            temp.push(countries[i]);
        }

        setCountriesDisplay(temp);
        dispatch(getCountries(countries));
    }

    const fetchCountriesMore = () => {
        if (countryState.countries.length <= numberCountriesDisplaying) {
            setData(false);
            return;
        }

        numberCountriesDisplaying = countryState.countries.length < numberCountriesDisplaying + 20 ? countryState.countries.length
                                                                                                    : numberCountriesDisplaying + 20;

        const temp: CountryModel[] = [];
        for (let i = 0; i < numberCountriesDisplaying; i++) {
            temp.push(countryState.countries[i]);
        }

        setCountriesDisplay(temp);
    }

    const handleSelectCountry = (event: any, index: number) => {
        dispatch(selectCountry(index));
    }

    const handleSelectCountryByName = (event: any, countryName: string | undefined) => {
        if (countryName && countryName !== '') {
            const index = countryState.countries.findIndex(m => m.name === countryName);
            if (index !== -1) {
                dispatch(selectCountry(index));
            }
        }
    }

    /**
     * Render countries list to UI
     * @returns 
     */
    const renderCountriesList = () => {
        return (
            <Paper id='paper-countries-list' style={{ maxHeight: 700, marginBottom: 30, overflow: 'auto' }}>
                <List component="nav" aria-label="countries list">
                    <InfiniteScroll dataLength={countriesDisplay.length}
                        next={fetchCountriesMore}
                        hasMore={hasData}
                        scrollThreshold={0.8}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="paper-countries-list">
                        {countriesDisplay.map((m: CountryModel, index: number) =>
                            <ListItem key={index} button selected={countryState.selectedCountry === index} 
                                      onClick={(event) => handleSelectCountry(event, index)}>
                                <ListItemIcon>
                                    <img src={m.flag} alt={m.name} style={{ maxWidth: 30, maxHeight: 30, objectFit: 'cover' }} />
                                </ListItemIcon>
                                <ListItemText primary={m.name} />
                            </ListItem>
                        )}
                    </InfiniteScroll>
                </List>
            </Paper>
        )
    }

    return (
        <Container className='main-container'>
            <Grid container direction='row' style={{ padding: 30 }}>
                <Grid item sm={12} lg={3} className={classes.root} >
                    {countryState.countries.length === 0 ? <h2>Loading...</h2> : renderCountriesList()}
                </Grid>

                <Grid item sm={12} lg={9}>
                    {countryState.countries.length === 0 ? <div></div>
                        : countryState.selectedCountry === -1 ?
                            <Grid container direction='row'>
                                <Grid item sm={12} className={classes.snackBarDiv}>
                                    <SnackbarContent
                                        message={
                                            <Grid item sm={12} style={{ textAlign: 'center', margin: '0 auto', lineHeight: 2 }}>
                                                <h1>Pick any country that you want to visit &nbsp; *_*</h1>
                                                <h3>We are ready</h3>
                                            </Grid>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            :
                            <Grid container direction="row">
                                <Grid item sm={12} style={{ textAlign: 'center', margin: '0 auto', marginBottom: 30 }}>
                                    <h1>{countryState.countries[countryState.selectedCountry].name}</h1>
                                </Grid>
                                <Grid container direction='row'>
                                    <Grid item sm={12} lg={3} style={{ textAlign: 'center', margin:'0 auto', marginBottom: 30, paddingLeft: 30 }}>
                                        <img src={countryState.countries[countryState.selectedCountry].flag} alt=''
                                            style={{ width: '100%', maxWidth: 250, maxHeight: 250, objectFit: 'cover' }} />
                                    </Grid>
                                    <Grid item sm={12} lg={9} id='grid-info' style={{ lineHeight: 2, margin: '0 auto', marginBottom: 30, paddingLeft: 30 }}>
                                        <p>- Native name: {countryState.countries[countryState.selectedCountry].nativeName}</p>
                                        <p>- Official name: {countryState.countries[countryState.selectedCountry].altSpellings.length > 1
                                            ? countryState.countries[countryState.selectedCountry].altSpellings[1]
                                            : countryState.countries[countryState.selectedCountry].altSpellings.length > 0
                                                ? countryState.countries[countryState.selectedCountry].altSpellings[0]
                                                : ''}</p>
                                        <p>- Region: {countryState.countries[countryState.selectedCountry].subregion}</p>
                                        <p>- Capital: {countryState.countries[countryState.selectedCountry].capital}</p>
                                        <p>- {countryState.countries[countryState.selectedCountry].timezones.length > 1 ? 'Time zones' : 'Time zone'}:
                                            <ul>
                                                {countryState.countries[countryState.selectedCountry].timezones.map(m => <li>
                                                    {m.endsWith(':00')
                                                        ? m.substr(0, m.length - 3) : m}</li>)}
                                            </ul>
                                        </p>
                                        <p>- {countryState.countries[countryState.selectedCountry].callingCodes.length > 1 ? 'Codes' : 'Code'}:
                                            <ul>
                                                {countryState.countries[countryState.selectedCountry].callingCodes.map(m => <li>+{m}</li>)}
                                            </ul>
                                        </p>
                                        <p>- {countryState.countries[countryState.selectedCountry].languages.length > 1 ? 'Languages' : 'Language'}:
                                            <ul>
                                                {countryState.countries[countryState.selectedCountry].languages.map(m => <li>{m.name}</li>)}

                                            </ul>
                                        </p>
                                        <p>- {countryState.countries[countryState.selectedCountry].currencies.length > 1 ? 'Currencies' : 'Currency'}:
                                            <ul>
                                                {countryState.countries[countryState.selectedCountry].currencies.map(m => <li>{m.name}</li>)}
                                            </ul>
                                        </p>
                                        <p>- {countryState.countries[countryState.selectedCountry].borders.length > 1 ? 'Borders' : 'Border'}:
                                            <ul>
                                                {countryState.countries[countryState.selectedCountry].borders
                                                                                                    .map(m => countryState.countries
                                                                                                        .find(co => co.alpha3Code === m))
                                                                                                    .map(m => <li>
                                                                                                                <button className='btn-country-name' 
                                                                                                                onClick={event => handleSelectCountryByName(event, m?.name)}>
                                                                                                                    {m?.name}
                                                                                                                </button>
                                                                                                              </li>)}
                                            </ul>
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>}
                </Grid>
            </Grid>
        </Container>
    )
}