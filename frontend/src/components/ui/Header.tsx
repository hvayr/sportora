import React from 'react';

import logo from '../../assets/logo.png';
import { AppBar, createStyles, Toolbar } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ProfileMenu from '../profile/ProfileMenu';
import LoginButton from '../../auth/login-button';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      '& .MuiAppBar-colorPrimary': {
        backgroundColor: '#fff',
      },
      borderRadius: '10px',
    },
    toolbar: {
      minHeight: 128,
      alignItems: 'flex-start',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      backgroundColor: 'white',
      borderRadius: '10px',
      '& .MuiAppBar-colorPrimary': {
        borderRadius: '10px',
      },
      '& .MuiToolBar-regular': {
        borderRadius: '10px',
      },
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
    },
    logo: {
      height: '8em',
      marginRight: 'auto',
    },
    button: {
      marginLeft: 'auto',
    },
  }),
);

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Link to="/">
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>
          <div className={classes.button}>
            {isAuthenticated ? <ProfileMenu /> : <LoginButton />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
