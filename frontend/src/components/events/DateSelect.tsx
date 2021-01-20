import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

interface DateProps {
  getDate: any;
  setDate: any;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    select: {
      ...theme.select,
    },
  }),
);

const DateSelect: React.FC<DateProps> = ({ getDate, setDate }: DateProps) => {
  // useEffect(() => {
  //   localStorage.setItem('date', selectedDate ? selectedDate.toJSON() : '');
  // }, [selectedDate]);
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        inputVariant="outlined"
        label="Date"
        value={getDate}
        onChange={setDate}
        onError={console.log}
        autoOk={true}
        format="yyyy/MM/dd"
        color="secondary"
        style={{ width: '90%' }}
        className={classes.select}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateSelect;
