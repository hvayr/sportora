import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import Tabs from './Tabs';

import { RegisterForm } from './Components/RegisterForm';

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import { Grid, Modal } from '@material-ui/core';
import { LoginForm } from './Components/LoginForm';

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
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
            <TextField placeholder="Search" variant="standard" type="search" />
            <ButtonGroup variant="contained" color="primary">
              <Button href="#SignIn" onClick={handleOpen}>
                Sign In
              </Button>
              <Modal open={open} onClose={handleClose}>
                <div className="modal-size">
                  <LoginForm />
                </div>
              </Modal>
              <Button href="#Register" onClick={handleOpen}>
                Register
              </Button>
              <Modal open={open} onClose={handleClose}>
                <div className="modal-size">
                  <RegisterForm />
                </div>
              </Modal>
            </ButtonGroup>
          </Grid>
        </header>
        <Tabs />
      </div>
    </ThemeProvider>
  );
}
