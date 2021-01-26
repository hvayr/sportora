/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-types */
import React, { Dispatch, SetStateAction } from 'react';
import { Button, createStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { sports } from '../api/sports';
import Grid from '@material-ui/core/Grid';
import { User } from '@auth0/auth0-react/dist/auth-state';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { address, doFetch, FetchMethod, Method, Path } from '../api/utils';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    container: {
      '& .MuiFormControl-root': {},
    },
    sport: {
      width: '80%',
    },
    date: {
      marginTop: '16px',
    },
    location: {
      width: '17.2em',
    },
    participants: {
      width: '125%',
    },
    button: {
      marginLeft: 'auto',
      marginRight: '12px',
    },
    error: {
      color: 'red',
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialValues = {
  sport: '',
  location: '',
  date: new Date(Date()),
  maxParticipants: '2',
  description: '',
};

interface IInitialValues {
  sport: string;
  location: string;
  date: Date;
  maxParticipants: string;
  description: string;
}

const validate = (values: IInitialValues) => {
  // @ts-ignore
  const errors: IInitialValues = {};

  if (!values.sport) {
    errors.sport = 'Required';
  }
  if (!values.location) {
    errors.location = 'Required';
  }
  if (!values.maxParticipants) {
    errors.maxParticipants = 'Required';
  } else if (parseInt(values.maxParticipants) < 2) {
    errors.maxParticipants = 'Minimum participants is 2';
  }

  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TestCreateEventForm: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();

  const onSubmit = async (values: object, user: User) => {
    const { sub, email, name } = user;
    // @ts-ignore
    const { sport, description, date, location, maxParticipants } = values;
    // console.log('Date ', date.toJSON());
    console.log(values);

    const response = await doFetch(
      address,
      Path.Events,
      Method.POST,
      FetchMethod.JSON,
      true,
      null,
      {
        author: localStorage.getItem('sub'),
        name: sport,
        email: email,
        userName: name,
        description: description,
        eventStartTime: date,
        location: location,
        maxParticipants: maxParticipants,
        numParticipants: 1,
        activeStatus: true,
      },
    );
    response.status === 201 ? props.setOpen(false) : alert('Error');
  };

  // interface Values {
  //   sport: string;
  //   location: string;
  //   date: string;
  //   maxParticipants: string;
  //   description: string;
  // }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ setFieldValue, handleChange, values }) => (
          <Form>
            <Grid container className={classes.container} spacing={3}>
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    options={sports}
                    getOptionLabel={(option) => option.value}
                    style={{ width: 300 }}
                    onChange={(e, value) => {
                      console.log(value);
                      setFieldValue('sport', value !== null ? value.value : '');
                      handleChange;
                    }}
                    renderInput={(params) => (
                      <Field
                        component={TextField}
                        margin="normal"
                        name="sport"
                        label="Select sport"
                        variant="outlined"
                        {...params}
                        className={classes.sport}
                      />
                    )}
                  />
                  <ErrorMessage name="sport" />
                </Grid>
                <Grid item xs={6} className={classes.date}>
                  {/*<DateTimeSelect*/}
                  {/*  selectedDate={date}*/}
                  {/*  handleDateChange={handleInputChange}*/}
                  {/*/>*/}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      variant="inline"
                      name="date"
                      inputVariant="outlined"
                      ampm={false}
                      autoOk={true}
                      label="Event start time"
                      value={values.date}
                      onChange={(e, value) => {
                        setFieldValue('date', value !== null ? value : '');
                        console.log('Date value ', value);
                      }}
                      onError={console.log}
                      disablePast
                      format="yyyy/MM/dd HH:mm"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item container spacing={2}>
                <Grid item>
                  <Field
                    component={TextField}
                    id="location"
                    variant="outlined"
                    label="Location"
                    name="location"
                    className={classes.location}
                  />
                  <ErrorMessage name="location" />
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  spacing={2}
                  alignItems="center"
                  justify={'flex-end'}
                >
                  <Grid item>
                    <Typography style={{ marginLeft: '30px' }}>
                      Participants
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      component={TextField}
                      id="participants"
                      size="small"
                      type="number"
                      variant="outlined"
                      label=""
                      name="maxParticipants"
                      className={classes.participants}
                    />
                    <ErrorMessage name="maxParticipants" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="description"
                  variant="outlined"
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={2}
                />
                <ErrorMessage name="description" />
              </Grid>
              <Button
                className={classes.button}
                variant="outlined"
                size="large"
                color="primary"
                type="submit"
              >
                CREATE
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TestCreateEventForm;
