import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, TextField } from '@material-ui/core';
import { colors } from '../ui/Theme';

interface DateProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      ...theme.select,
      width: '75%',
      // fontSize: '1.5em',
    },
    resize: {
      fontSize: '1.5em',
    },
  }),
);

const DateSelect: React.FC<DateProps> = ({ date, setDate }: DateProps) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        clearable
        inputVariant="outlined"
        label="Date"
        value={date}
        onChange={setDate}
        onError={console.log}
        format="yyyy/MM/dd"
        color="secondary"
        disablePast
        InputLabelProps={{
          style: {
            fontSize: '1.5em',
          },
        }}
        className={classes.root}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateSelect;
