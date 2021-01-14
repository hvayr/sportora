import React from 'react';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { sports } from '../../api/sports';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) =>
  createStyles({
    sport: {
      width: '70%',
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

interface SwitchProps {
  getSport: any;
  setSport: any;
}

const SportSelect: React.FC<SwitchProps> = ({
  getSport,
  setSport,
}: SwitchProps) => {
  const classes = useStyles();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSport(event.target.value);
  //   localStorage.setItem('sport', event.target.value.toString());
  // };

  return (
    <form noValidate autoComplete="off">
      <Autocomplete
        options={sports}
        getOptionLabel={(option) => option.value}
        style={{ width: 300 }}
        onChange={(e, value) => {
          setSport(value !== null ? value.value : 'Any');
        }}
        renderInput={(params) => (
          <TextField
            margin="normal"
            name="sport"
            label="Sport"
            variant="outlined"
            {...params}
            className={classes.sport}
          />
        )}
      />
    </form>
  );
};

export default SportSelect;
