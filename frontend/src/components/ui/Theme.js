/* eslint-disable */
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import '@material-ui/core/styles';

export const colors = {
  light: '#FFB74D',
  normal: '#FB8C00',
  dark: '#E65100',
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
      color1: `${colors.normal}`,
      color2: `${colors.light}`,
      color3: `${colors.dark}`,
    },
  },
  select: {
    background: colors.light,
      '& .MuiFormLabel-root': {
        fontSize: '1.5em',
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
        textAlign: 'center',
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
