import React, { useEffect, useState } from 'react';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';
import { colors } from '../ui/Theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiInputLabel-root': {
        color: 'black',
      },
      '& .Mui-focused': {},

      '& .MuiOutlinedInput-root': {
        '& .Mui-focused, .MuiOutlinedInput-notchedOutline': {
          borderWidth: '3px',
          boxShadow: '3px 3px 3px',
          borderColor: `${colors.black} !important`,
        },
      },
    },
    cssLabel: {
      color: 'red',
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

function DateTimeSelect() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date(Date()),
  );
  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem('date', selectedDate ? selectedDate.toJSON() : '');
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        variant="inline"
        inputVariant="outlined"
        ampm={false}
        autoOk={true}
        label="Event start time"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd HH:mm"
        className={classes.root}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateTimeSelect;
