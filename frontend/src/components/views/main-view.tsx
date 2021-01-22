import React, { useEffect } from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import 'fontsource-roboto';
import { useAuth0 } from '@auth0/auth0-react';
import saveUserIfNotExisting from '../../api/saveUser';
import Header from '../ui/Header';
import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventContainer from '../events/EventContainer';
import {
  saveNickToLocalStorage,
  FirstTimeLoginNickName,
} from '../profile/checkNicknameAndSave';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // background: `repeating-linear-gradient(#101010, #424242)`,
      background: '#FFFFFF',
      height: '1500px',
    },
    app: {
      margin: 'auto',
      maxWidth: '1000px',
    },
    mainContainer: {
      marginTop: '0.5em',
      height: '1200px',
    },
    eventContainer: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

const MainView: React.FC = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(true);
  const [openFirstTimeLogin, setOpenFirstTimeLogin] = React.useState(false);

  const handleOpenFirstTimeLogin = () => {
    if (isAuthenticated && localStorage.getItem('nickSet') === 'false') {
      setOpenFirstTimeLogin(true);
    }
  };

  useEffect(() => {
    console.log('auth logged ' + localStorage.getItem('loggedIn'));
    const save = async () => {
      const check = async () => {
        console.log('check2');
        if (isAuthenticated) {
          await saveUserIfNotExisting(user);
          const token = await getAccessTokenSilently();
          localStorage.setItem('token', token);
          localStorage.setItem('sub', user.sub);
          await saveNickToLocalStorage();
          console.log('nickset: ' + localStorage.getItem('nickSet'));
          console.log('Token: ' + localStorage.getItem('token'));
        }
      };
      await check();
      setLoading(false);
      handleOpenFirstTimeLogin();
      console.log('loading ' + isLoading);
      console.log('authenticated: ' + isAuthenticated);
    };
    save();
  }, [isAuthenticated]);

  if (isLoading) {
    console.log('is loading');
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.root}>
      <Header />
      <FirstTimeLoginNickName
        open={openFirstTimeLogin}
        setOpen={setOpenFirstTimeLogin}
      />
      <div className={classes.app}>
        <Grid container className={classes.mainContainer}>
          <Grid item className={classes.eventContainer} sm={12}>
            <EventContainer />
          </Grid>
          {/*<Grid container sm={4}>
          <Grid sm={1} />
          <Grid container className={classes.root} direction="column" sm={11}>
            <AdContainer />
          </Grid>
        </Grid>*/}
        </Grid>
      </div>
    </div>
  );
};

export default MainView;
