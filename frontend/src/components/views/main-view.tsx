import React, { useEffect } from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import 'fontsource-roboto';
import { useAuth0 } from '@auth0/auth0-react';
import { saveUserIfNotExisting } from '../../api/saveUserIfNotExisting';
import Header from './Header';
import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventContainer from '../EventContainer';
import Footer from './Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      maxWidth: '1000px',
      margin: 'auto',
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

  useEffect(() => {
    const save = async () => {
      if (isAuthenticated) {
        await saveUserIfNotExisting(user);
        const token = await getAccessTokenSilently();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('sub', user.sub);
        console.log('Token saved ');
      }
      console.log('authenticated: ' + isAuthenticated);
    };
    save();
  }, [isAuthenticated]);

  return (
    <div className={classes.app}>
      <Header />
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
      <Footer />
    </div>
  );
};

export default MainView;
