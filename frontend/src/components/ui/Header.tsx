import React from 'react';

import logo from '../../assets/logo.png';
import {
  AppBar,
  createStyles,
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ProfileMenu from '../profile/ProfileMenu';
import LoginButton from '../../auth/login-button';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import App from '../../App';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      '& .MuiAppBar-colorPrimary': {
        backgroundColor: '#fff',
      },
      borderRadius: '10px',
    },
    toolbar: {
      minHeight: 128,
      alignItems: 'flex-end',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      backgroundColor: 'white',
      borderRadius: '10px',
      '& .MuiAppBar-colorPrimary': {
        borderRadius: '10px',
      },
      '& .MuiToolBar-regular': {
        borderRadius: '10px',
      },
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
    },
    logo: {
      height: '100%',
    },
    logoText: {
      color: theme.palette.secondary.main,
    },
    button: {
      marginLeft: 'auto',
    },
    header: {
      width: '100%',
      height: '160px',
      display: 'block',
      backgroundColor: '#101010',
    },
    appBar: {
      width: '1000px',
      height: '100%',
      display: 'flex',
      margin: 'auto',
      backgroundColor: '#101010',
    },
  }),
);

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.appBar}>
        <Grid container>
          <Grid item container alignItems="center">
            <Grid item>
              <Typography variant="h1" className={classes.logoText}>
                SPORTORA
              </Typography>
            </Grid>
            <Grid item container alignItems="flex-end">
              <div className={classes.button}>
                {isAuthenticated ? <ProfileMenu /> : <LoginButton />}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {/*<AppBar position="static" className={classes.root}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Link to="/">
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>
          <div className={classes.button}>
            {isAuthenticated ? <ProfileMenu /> : <LoginButton />}
          </div>
        </Toolbar>
      </AppBar>*/}
    </div>
  );
};

export default Header;
