import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

const color1 = deepOrange[500];
const color2 = orange[200];

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
