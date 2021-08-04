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
        document.title = 'Travel online around the world';
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
                                <img src={m.flag} alt={m.name} style={{ maxWidth: '30px', maxHeight: '30px', objectFit: 'cover' }} />
                            </ListItemIcon>
                            <ListItemText primary={m.name} />
                        </ListItem>
                    )}
                </List>
            </Paper>
        )
    }

    return (
        <Grid container direction='row'>
            <Grid item xs={12} lg={3} className={classes.root} style={{padding: 30}}>
                {countryState.countries.length === 0 ? <h2>Loading...</h2> : renderCountriesList()}
            </Grid>

            <Grid container xs={12} lg={9}>
                {countryState.countries.length === 0 ? <div></div>
                    : countryState.selectedCountry === -1 ?
                     <Grid item xs={12} style={{ textAlign: 'center'}}>
                        <h1>In Progress....</h1>
                        <h2>Stay tuned</h2>
                    </Grid>
                    :
                    <Grid item xs={12} style={{ textAlign: 'center'}}>
                        <h1>{countryState.selectedCountry !== -1 ? countryState.countries[countryState.selectedCountry].name : ''}</h1>
                    </Grid>}
            </Grid>
        </Grid>
    )
}