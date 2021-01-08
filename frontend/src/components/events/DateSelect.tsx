import React, { useEffect, useState } from 'react';
import {
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

type DateProps = {
  getDate: any;
  setDate: any;
};

const DateSelect: React.FC<DateProps> = ({ getDate, setDate }: DateProps) => {
  // useEffect(() => {
  //   localStorage.setItem('date', selectedDate ? selectedDate.toJSON() : '');
  // }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        inputVariant="outlined"
        ampm={false}
        label="Date"
        value={getDate}
        onChange={setDate}
        onError={console.log}
        autoOk={true}
        format="yyyy/MM/dd"
        color="secondary"
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateSelect;
