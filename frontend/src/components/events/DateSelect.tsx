import React, { useEffect, useState } from 'react';
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DateSelect() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date(Date()),
  );

  useEffect(() => {
    localStorage.setItem('date', selectedDate ? selectedDate.toJSON() : '');
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="Date"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd"
        color="secondary"
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateSelect;
