import React, { useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
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

makeStyles({
  root: {
    background: 'linear-gradient(45deg, #300, #930)',
    border: 0,
    borderRadius: 15,
    color: 'white',
    padding: '0 30px',
  },
});

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 18,
      marginBottom: 15,
    },
  },
  palette: {
    primary: {
      main: orange[500],
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

  const routes = ['/home', '/browse', '/events', '/profile'];
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Typography variant="h2" component="div">
            Sportora
          </Typography>
          <BrowserRouter>
            <AppBar position="static">
              <Toolbar>
                <Route
                  path="/"
                  render={(history) => (
                    <div>
                      <Tabs
                        value={
                          history.location.pathname !== '/'
                            ? history.location.pathname
                            : false
                        }
                      >
                        <Tab
                          value={routes[0]}
                          label="Home"
                          component={Link}
                          to={routes[0]}
                        />
                        <Tab
                          value={routes[1]}
                          label="Browse"
                          component={Link}
                          to={routes[1]}
                        />
                        <Tab
                          value={routes[2]}
                          label="Events"
                          component={Link}
                          to={routes[2]}
                        />
                      </Tabs>
                    </div>
                  )}
                />
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-start"
                >
                  <div>
                    {isAuthenticated ? <ProfileMenu /> : <LoginButton />}
                  </div>
                </Grid>
              </Toolbar>
            </AppBar>
            <EventTesting />
            <div>
              <Switch>
                <Route path="/home" component={UserComponent} />
                <Route path="/browse" component={UserSearch} />
                <Route path="/events" component={EventTable} />
                <Route path="/profile" component={Profile} />
                <Route path="/editProfile" component={EditProfile} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default MainView;
