import React from 'react';
import { MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { sports } from './SportSelect';
import Grid from '@material-ui/core/Grid';

export default function TestCreateEvent() {
  const [sport, setSport] = React.useState('Any');

  const handleChange = (event) => {
    setSport(event.target.value);
    localStorage.setItem('sport', event.target.value.toString());
  };

  return (
    <form>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            id="select-sport"
            select
            label="Sport"
            value={sport}
            onChange={handleChange}
            color="secondary"
            variant="outlined"
          >
            {sports.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </form>
  );
}
