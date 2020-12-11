import React, { useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import { AppBar, Grid, Tab, Tabs, Toolbar } from '@material-ui/core';
import UserComponent from '../users/UserComponent';
import EventTable from '../events/EventTable';
import UserSearch from '../users/UserSearch';
import Profile from '../profile/Profile';
import ProfileMenu from '../profile/ProfileMenu';
import EditProfile from '../profile/EditProfile';
import LoginButton from '../../auth/login-button';
import { useAuth0 } from '@auth0/auth0-react';
import { saveUserIfNotExisting } from '../../api/saveUserIfNotExisting';
import EventTesting from './event-testing';
import Header from './Header';
import TestHeader from './TestHeader';

makeStyles({
  root: {
    background: 'linear-gradient(45deg, #300, #930)',
    border: 0,
    borderRadius: 15,
    color: 'white',
    padding: '0 30px',
  },
});

const orange = '#eba059';
const white = '#E5E5E5';

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 18,
      marginBottom: 15,
    },
  },
  palette: {
    primary: {
      main: `${white}`,
    },
    secondary: {
      main: `${orange}`,
    },
  },
});

const MainView: React.FC = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const save = async () => {
      if (isAuthenticated) {
        await saveUserIfNotExisting(user);
        const token = await getAccessTokenSilently();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('sub', user.sub);
        console.log('Token saved ');
      }
      console.log('authenticated: ' + isAuthenticated);
    };
    save();
  }, [isAuthenticated]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <TestHeader />
          <Header></Header>
          <TestHeader></TestHeader>
          <ProfileMenu></ProfileMenu>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default MainView;
