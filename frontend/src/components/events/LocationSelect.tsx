import React from 'react';
import { createStyles, Theme, MenuItem } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '20ch',
      },
      '& .MuiFormLabel-root': {
        fontSize: '2rem',
      },
      '& .MuiSelect-select.MuiSelect-select': {
        paddingTop: '18px',
      },
    },
  }),
);

const sports = [
  {
    value: 'Oulu',
    label: 'Oulu',
  },
  {
    value: 'Football',
    label: 'Football',
  },
  {
    value: 'Badminton',
    label: 'Badminton',
  },
  {
    value: 'Tennis',
    label: 'Tennis',
  },
];

const LocationSelect: React.FC = () => {
  const classes = useStyles();
  const [sport, setSport] = React.useState('Any');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSport(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-select-sport"
        select
        label="Location"
        value={sport}
        onChange={handleChange}
      >
        {sports.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
};

export default LocationSelect;
