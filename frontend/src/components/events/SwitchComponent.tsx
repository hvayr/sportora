import React, { useEffect } from 'react';
import {
  SwitchClassKey,
  SwitchProps,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import makeStyles from '@material-ui/core/styles/makeStyles';

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      color: '#212121',
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: '#EEEEEE',

        '& + $track': {
          backgroundColor: theme.palette.custom.color2,
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: 'grey',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: 'grey',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(Switch);

const useStyles = makeStyles((theme: Theme) => ({
  switch: {
    fontSize: '1.6rem',
    fontWeight: 600,
  },
}));

interface SwitchLabelProps {
  name: string;
  toggle: any;
}

const SwitchComponent: React.FC<SwitchLabelProps> = ({
  name,
  toggle,
}: SwitchLabelProps) => {
  const [state, setState] = React.useState({
    checked: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    toggle(state);
  }, [state]);

  const classes = useStyles();

  return (
    <Typography component="div">
      <Grid
        component="label"
        container
        alignItems="center"
        spacing={1}
        className={classes.switch}
      >
        <Grid item>
          <AntSwitch
            checked={state.checked}
            onChange={handleChange}
            name="checked"
            size="medium"
          />
        </Grid>
        <Grid item>{name}</Grid>
      </Grid>
    </Typography>
  );
};

export default SwitchComponent;
