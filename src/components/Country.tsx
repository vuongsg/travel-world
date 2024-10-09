import { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CountryModel } from '../models/country';
import { RootType } from '../store';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Box, SnackbarContent, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ICountryState, setCountries, selectCountry } from '../slices/country-slices';
import './Country.scss';
import { CountryInfo } from './CountryInfo';

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
    let countryState = useSelector<RootType>(state => state.country) as ICountryState;
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
            const data = require("../countries_v3.json");
            countries = Array.from(data);
        }
        catch (err) {
            console.log(err);

            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                countries = Array.from(data);
            }
            catch (err2) {
                console.log(err2);
                countries = [];
            }
        }

        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
        numberCountriesDisplaying = countries.length < 20 ? countries.length : 20;
        const temp: CountryModel[] = [];

        for (let i = 0; i < numberCountriesDisplaying; i++) {
            temp.push(countries[i]);
        }

        setCountriesDisplay(temp);
        dispatch(setCountries(countries));
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

    const handleSelectCountryByName = (event: React.MouseEventHandler<HTMLButtonElement>, countryName: string | undefined) => {
        if (countryName && countryName !== '') {
            const index = countryState.countries.findIndex(m => m.name.common === countryName);
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
            <Box id='box-countries-list' style={{ maxHeight: 700, marginBottom: 30, overflow: 'auto' }}>
                <List component="nav" aria-label="countries list">
                    <InfiniteScroll dataLength={countriesDisplay.length}
                        next={fetchCountriesMore}
                        hasMore={hasData}
                        scrollThreshold={0.8}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="box-countries-list">
                        {countriesDisplay.map((m: CountryModel, index: number) =>
                            <ListItem key={index} alignItems='flex-start' button selected={countryState.selectedIndex === index} 
                                      onClick={(event) => handleSelectCountry(event, index)}>
                                <ListItemAvatar>
                                    <img src={m.flags.svg} alt={m.flags.alt} style={{ maxWidth: 30, maxHeight: 30, objectFit: 'cover' }} />
                                </ListItemAvatar>
                                <ListItemText primary={m.name.common} />
                            </ListItem>
                        )}
                    </InfiniteScroll>
                </List>
            </Box>
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
                        : countryState.selectedIndex === -1 ?
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
                            <CountryInfo country={countryState.countries[countryState.selectedIndex]}
                                         lstCountries={countryState.countries}
                                         onSelectCountryByName={handleSelectCountryByName} />}
                </Grid>
            </Grid>
        </Container>
    )
}