/* eslint-disable */
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Palette } from '@material-ui/core/styles/createPalette';
import '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

export const colors = {
  lightBlue: '#FFB74D',
  blue: '#FB8C00',
  darkBlue: '#E65100',
  white: '#FFFFFF',
  black: '#101010',
};

export default createMuiTheme({
  typography: {
    fontFamily: ['"Inter"', 'Open Sans'].join(','),
    tab: {
      fontSize: '1.5rem'
    }
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
      color1: `${colors.blue}`,
      color2: `${colors.lightBlue}`,
      color3: `${colors.darkBlue}`,
    },
  },
  select: {
      '& .MuiFormLabel-root': {
        fontSize: '2rem',
        marginBottom: '1em',
        textTransform: 'uppercase',
        fontWeight: '700',
      },
      '& .MuiTextField-root': {
        margin: '20px',
        width: '20ch',
      },
      '& .MuiSelect-select.MuiSelect-select, & .MuiInput-root': {
        paddingTop: '1.5em',
      },
    '& .MuiInputLabel-root': {
      color: 'black',
    },

    '& .MuiOutlinedInput-root': {
      '& .Mui-focused, .MuiOutlinedInput-notchedOutline': {
        borderWidth: '3px',
        boxShadow: '2px 2px 2px #F57C00',
        borderColor: `${colors.black} !important`,
      },
    },
    '& .Mui-focused': {
    },
    }
  /*'& .MuiTextField-root': {
    margin: '10px',
    width: '20ch',
  },
  '& .MuiSelect-select.MuiSelect-select, & .MuiInput-root': {
    paddingTop: '1.5em',
  },*/
});
