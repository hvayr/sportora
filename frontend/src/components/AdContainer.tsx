import React from 'react';
import { createStyles, Grid, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.secondary.main,
    },
    ad: {
      margin: '10px',
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

const AdContainer: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container} direction="row" sm={12}>
      <Grid item className={classes.ad} sm={12}>
        <Typography>Mainos</Typography>
      </Grid>
      <Grid item className={classes.ad} sm={12}>
        <Typography>Mainos</Typography>
      </Grid>
      <Grid item className={classes.ad} sm={12}>
        <Typography>Mainos</Typography>
      </Grid>
    </Grid>
  );
};

export default AdContainer;
