import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink } from 'react-router-dom';
import { ICountryState, selectCountry } from '../slices/country-slices'
import { RootType } from '../store';
import './NavBar.scss'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  tooltip: {
    fontSize: '1em',
    letterSpacing: '0.1em'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 0.4),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonDesktop: {
    marginRight: 30
  },
  red: {
    color: 'red'
  },
  white: {
    color: 'white'
  }
}));

export const NavBar = ():ReactElement => {
  const classes = useStyles();
  const countryState = useSelector<RootType>(state => state.country) as ICountryState;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<any>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-navbar';
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId}
          keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Home page</MenuItem>
      <MenuItem onClick={handleMenuClose}>About</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-navbar-mobile';
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId}
          keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label='Home'>
          <NavLink to='/'>
            <HomeIcon style={{color: '#000'}} />
            <h5>Home</h5>
          </NavLink>
        </IconButton>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label='About'>
          <NavLink to='/about'>
            <InfoIcon style={{color: '#000'}} />
            <h5>About</h5>
          </NavLink>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const changeSearchText = (event: object, value: any, reason: any): void => {
    if (reason !== 'clear') {
      dispatch(selectCountry(countryState.countries.findIndex(m => m.name.common === value)));
    }
  }

  return (
    <div id='main-nav-bar' className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Travel online around the world
          </Typography>

          <div className={classes.search} style={{display: 'flex'}}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{color: '#000'}} />
            </div>
            <Autocomplete id="search-box"
              options={countryState.countries.map(m => m.name.common)}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type='text' placeholder='Search...' style={{ width: 300, paddingLeft: 28, paddingTop: 8, paddingBottom: 8 }} 
                        {...params.inputProps} />
                </div>
              )}
              onChange={changeSearchText}
            />
          </div>

          <div className={classes.grow} />

          <div id='section-desktop' className={classes.sectionDesktop}>
            <IconButton aria-label='Home' className={classes.iconButtonDesktop}>
              <NavLink to='/' className={({isActive}) => isActive ? classes.red : classes.white}>
                <Tooltip title='Home' placement='bottom' classes={{tooltip: classes.tooltip}}>
                  <HomeIcon />
                </Tooltip>
              </NavLink>
            </IconButton>
            <IconButton aria-label='About' className={classes.iconButtonDesktop}>
              <NavLink to='/about' className={({isActive}) => isActive ? classes.red : classes.white}>
                <Tooltip title='About' placement='bottom' classes={{tooltip: classes.tooltip}}>
                  <InfoIcon />
                </Tooltip>
              </NavLink>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-label="Show more" aria-controls={mobileMenuId} aria-haspopup="true"
                        onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
