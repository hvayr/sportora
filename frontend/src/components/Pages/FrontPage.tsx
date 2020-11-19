import React from 'react';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import { AppBar, Grid, Tab, Tabs, Toolbar } from '@material-ui/core';
import UserComponent from '../Fetch/UserComponent';
import EventComponent from '../Fetch/EventComponent';
import UserSearch from '../Fetch/UserSearch';
import { ModalHandler } from '../Modals/ModalHandler';

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function FrontPage() {
  const routes = ['/home', '/browse', '/events'];
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
                  <ModalHandler />
                </Grid>
              </Toolbar>
            </AppBar>
            <div>
              <Switch>
                <Route path="/home" component={UserComponent} />
                <Route path="/browse" component={UserSearch} />
                <Route path="/events" component={EventComponent} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </div>
  );
}
