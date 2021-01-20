import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      color: theme.palette.secondary.main,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    userName: {
      color: theme.palette.custom.color2,
    },
  }),
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ProfileMenu() {
  const { isAuthenticated, logout } = useAuth0();
  const routes = ['/profile'];
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {isAuthenticated && (
        <div>
          <IconButton onClick={handleMenu} color="inherit">
            <Typography className={classes.userName}>
              {useAuth0().user.name}
            </Typography>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem component={Link} to={routes[0]} onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout({
                  returnTo: window.location.origin,
                });
                sessionStorage.clear();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}
