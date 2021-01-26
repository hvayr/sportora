/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import { useTimer } from 'react-timer-hook';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: '-25px',
    },
    startsIn: {
      fontSize: '0.75rem',
      fontWeight: 'bold',
    },
    time: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
    },
  }),
);

const CountdownTimer = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });

  const classes = useStyles();

  const formatTime = () => {
    if (days) {
      return <span>{days} days</span>;
    }
    if (hours) {
      return hours < 4 ? (
        <>
          <span>{hours}h </span>
          <span>{minutes}mins</span>
        </>
      ) : (
        <span>{hours} hours</span>
      );
    }
    if (minutes) {
      return <span>{minutes} mins</span>;
    }
    return seconds ? <span>1 min</span> : <span>Started</span>;
  };

  return (
    <>
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justify="flex-end"
      >
        <Grid item container xs={12} justify="flex-end">
          <Grid container justify="flex-end">
            <Grid item>
              <Typography className={classes.startsIn}>Starts in </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className={classes.time}>{formatTime()}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CountdownTimer;
