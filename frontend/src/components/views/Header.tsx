import React from 'react';

import logo from '../../assets/logo.png';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import LoginButton from '../../auth/login-button';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  logo: {
    height: '8em',
    marginRight: 'auto',
  },
  button: {},
}));

export default function TestHeader() {
  const { isAuthenticated } = useAuth0();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <ProfileMenu />
          <img src={logo} alt="logo" className={classes.logo} />
          <div className={classes.button}>
            <ProfileMenu />
            {isAuthenticated ? <ProfileMenu /> : <LoginButton />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
