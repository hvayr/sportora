import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
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
function App() {
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
              <Button href="#SignIn">Sign In</Button>
              <Button href="#Register">Register</Button>
            </ButtonGroup>
          </Grid>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
