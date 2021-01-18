import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

const color1 = '#000000';
const color2 = '#FFFFFF';

export default createMuiTheme({
  typography: {
    h2: {
      fontSize: 18,
      marginBottom: 15,
    },
  },
  palette: {
    primary: {
      main: `${color1}`,
    },
    secondary: {
      main: `${color2}`,
    },
    background: {
      default: '#FFF3E0',
    },
  },
});

export const colors = {
  color1: '#1E88E5',
};
