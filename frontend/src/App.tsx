import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';

import Tabs from './Tabs';

import { RegisterForm } from './Modals/RegisterForm';

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import { Grid, Modal } from '@material-ui/core';
import { LoginForm } from './Modals/LoginForm';
import NavBar from './components/nav-bar';
import { Profile } from './components/Profile';

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
export function App() {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);

  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenRegister(false);
  };

  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <div className="App">
            <header className="App-Header">
              <Typography variant="h2" component="div">
                Sportora
              </Typography>

              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
              >
                <ButtonGroup variant="contained" color="primary">
                  <Button href="#SignIn" onClick={handleOpenLogin}>
                    Sign In
                  </Button>
                  <Modal open={openLogin} onClose={handleClose}>
                    <div className="modal-login">
                      <LoginForm />
                    </div>
                  </Modal>
                  <Button href="#Register" onClick={handleOpenRegister}>
                    Register
                  </Button>
                  <Modal open={openRegister} onClose={handleClose}>
                    <div className="modal-register">
                      <RegisterForm />
                    </div>
                  </Modal>
                </ButtonGroup>
              </Grid>
            </header>
            <Tabs />
          </div>
        </ThemeProvider>
        {/*<h1>
          <Link to="/">Users Data</Link>
        </h1>
        <h1>
          <Link to="/events">Events Data</Link>
        </h1>
        <Switch>
          <Route exact path="/">
            <UserComponent />
          </Route>
          <Route path="/events">
            <EventComponent />
          </Route>
        </Switch>*/}
        <NavBar />
      </div>
    </Router>
  );
}
