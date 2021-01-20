/* eslint-disable */
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Palette } from '@material-ui/core/styles/createPalette';
import '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

export const colors = {
  blue: '#1E88E5',
  white: '#FFFFFF',
  black: '#000000',
};

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    select: {
        font: any
      }
  }
  interface ThemeOptions {
    select: {
      font: any
    }
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    custom: any;
  }
  interface PaletteOptions {
    custom: any;
  }
}

export default createMuiTheme({
  typography: {
    h2: {
      fontSize: 18,
      marginBottom: 15,
    },
  },
  palette: {
    primary: {
      main: `${colors.black}`,
    },
    secondary: {
      main: `${colors.white}`,
    },
    background: {
      default: `${colors.white}`,
    },
    custom: {
      blue: `${colors.blue}`,
    },
  },
  select: {
      font: {
       fontSize: '1.5rem',
        '& .MuiTextField-root': {
          margin: '10px',
          width: '20ch',
        },
        '& .MuiSelect-select.MuiSelect-select': {
          paddingTop: '1.5em',
        },
      }
  }

});
