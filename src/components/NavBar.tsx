import React, { ReactElement } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import './NavBar.scss'
import { InputBase, Tooltip } from '@material-ui/core';

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
    },
    minWidth: '600px'
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
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export const NavBar = ():ReactElement => {
  const classes = useStyles();
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
          <Link to='/'>
            <HomeIcon style={{color: '#000'}} />
            <h5>Home</h5>
          </Link>
        </IconButton>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label='About'>
          <Link to='/about'>
            <InfoIcon style={{color: '#000'}} />
            <h5>About</h5>
          </Link>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div id='main-nav-bar' className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Travel online around the world
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }} />
          </div>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <IconButton aria-label='Home'>
              <Link to='/'>
                <Tooltip title='Home' placement='bottom' classes={{tooltip: classes.tooltip}}>
                  <HomeIcon style={{color: '#fff'}} />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton aria-label='About'>
              <Link to='/about'>
                <Tooltip title='About' placement='bottom' classes={{tooltip: classes.tooltip}}>
                  <InfoIcon style={{color: '#fff'}} />
                </Tooltip>
              </Link>
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
