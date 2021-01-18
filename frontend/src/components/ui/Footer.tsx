import React from 'react';
import { createStyles, Theme, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 200,
    },
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};

export default Footer;
