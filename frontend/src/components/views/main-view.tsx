import React, { useEffect } from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import 'fontsource-roboto';
import { useAuth0 } from '@auth0/auth0-react';
import saveUserIfNotExisting from '../../api/saveUser';
import Header from '../ui/Header';
import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventContainer from '../events/EventContainer';
import { address, doFetch, Method, Path } from '../../api/utils';

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

  useEffect(() => {
    const save = async () => {
      if (isAuthenticated) {
        await saveUserIfNotExisting(user);
        const token = await getAccessTokenSilently();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('sub', user.sub);
        console.log('Token: ' + sessionStorage.getItem('token'));

        // const nickname = async () => {
        //   const results = await doFetch(
        //     address,
        //     Path.GETNICKNAME,
        //     Method.GET,
        //     true,
        //   );
        //   console.log('nick ' + (await results.content) + results.status);
        // };
        // nickname();
      }
      console.log('authenticated: ' + isAuthenticated);
    };
    save();
  }, [isAuthenticated]);

  return (
    <div className={classes.root}>
      <Header />
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
