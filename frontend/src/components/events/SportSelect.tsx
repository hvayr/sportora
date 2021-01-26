import React from 'react';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { sports } from '../../api/sports';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { colors } from '../ui/Theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    sport: {
      ...theme.select,
      width: '75%',
      '& .MuiFormControl-marginNormal': {
        marginRight: '20px',
      },
      '& .MuiAutocomplete-inputRoot': {
        borderWidth: '10px',
      },
    },
    root: {
      marginRight: '17.5px',
    },

    // cssOutlinedInput: {
    //   '&$cssFocused $notchedOutline': {
    //     borderWidth: '3px',
    //     boxShadow: '3px 3px 3px',
    //     borderColor: `${theme.palette.custom.color3} !important`,
    //   },
    // },

    cssFocused: {},
    notchedOutline: {
      borderWidth: '3px',
      boxShadow: '2px 2px 2px',
      borderColor: `${theme.palette.primary.main} !important`,
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
    <form noValidate autoComplete="off" className={classes.root}>
      <Autocomplete
        options={sports}
        getOptionLabel={(option) => option.value}
        style={{ width: 300 }}
        onChange={(e, value) => {
          setSport(value !== null ? value.value : '');
        }}
        renderInput={(params) => (
          <TextField
            margin="normal"
            name="sport"
            label="Sport"
            variant="outlined"
            className={classes.sport}
            {...params}
            // InputLabelProps={{
            //   classes: {
            //     root: classes.cssLabel,
            //     focused: classes.cssFocused,
            //   },
            // }}
            // InputProps={{
            //   classes: {
            //     root: classes.cssOutlinedInput,
            //     focused: classes.cssFocused,
            //     notchedOutline: classes.notchedOutline,
            //   },
            // }}

            /*InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}*/
          />
        )}
      />
    </form>
  );
};

export default SportSelect;
