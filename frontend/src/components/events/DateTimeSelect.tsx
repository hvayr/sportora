import React, { useEffect, useState } from 'react';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DateTimeSelect() {
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
        inputVariant="outlined"
        ampm={false}
        autoOk={true}
        label="Event start time"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd HH:mm"
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateTimeSelect;
