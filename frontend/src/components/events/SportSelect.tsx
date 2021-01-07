import React from 'react';
import { createStyles, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

export const sports = [
  {
    value: 'Hockey',
    label: 'Hockey',
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

const SportSelect: React.FC = () => {
  const classes = useStyles();
  const [sport, setSport] = React.useState('Any');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSport(event.target.value);
    localStorage.setItem('sport', event.target.value.toString());
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="select-sport"
        select
        label="Sport"
        value={sport}
        onChange={handleChange}
        color="secondary"
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

export default SportSelect;
