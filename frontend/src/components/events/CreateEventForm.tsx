/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-types */
import React, { useEffect, SetStateAction, Dispatch } from 'react';
import {
  createStyles,
  MenuItem,
  Typography,
  Button,
  Snackbar,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { sports } from '../../api/sports';
import Grid from '@material-ui/core/Grid';
import { User } from '@auth0/auth0-react/dist/auth-state';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFormik } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { address, doFetch, Path, Method, FetchMethod } from '../../api/utils';
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

const initialValues = {
  sport: '',
  location: '',
  date: new Date(Date()),
  numParticipants: '0',
  maxParticipants: '2',
  description: '',
};

interface IInitialValues {
  sport: string;
  location: string;
  description: string;
  date: Date;
  numParticipants: string;
  maxParticipants: string;
}

interface Values {
  sport: string;
  location: string;
  description: string;
  date: Date;
  numParticipants: string;
  maxParticipants: string;
}

const validate = (values: IInitialValues) => {
  // @ts-ignore
  const errors: IInitialValues = {};

  if (!values.sport) {
    errors.sport = 'Required';
  }
  if (!values.location) {
    errors.location = 'Required';
  } else if (values.location.length > 20) {
    errors.location = 'Location name too long';
  }

  if (!values.maxParticipants) {
    errors.maxParticipants = 'Required';
  } else if (parseInt(values.maxParticipants) < 2) {
    errors.maxParticipants = 'Minimum participants is 2';
  } else if (parseInt(values.maxParticipants) > 99) {
    errors.maxParticipants = 'Maximum participants is 99';
  }

  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 140) {
    errors.description = 'Maximum length exceeded';
  }
  return errors;
};

interface IProps {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setOpenEventViewSnackbar: Dispatch<SetStateAction<boolean>>;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateEventForm: React.FC<IProps> = ({
  setOpenDialog,
  setOpenEventViewSnackbar,
}: IProps) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [error, setError] = React.useState('');

  const classes = useStyles();

  const onSubmit = async (values: Values, user: User) => {
    const { email, name } = user;
    const {
      sport,
      description,
      date,
      location,
      numParticipants,
      maxParticipants,
    } = values;

    try {
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
          numParticipants: numParticipants,
          activeStatus: true,
        },
      );

      console.log('date ', values.date);

      const handleSuccess = () => {
        setOpenEventViewSnackbar(true);
        setOpenDialog(false);
      };
      const handleFailure = () => {
        console.log('Error ', response.status);
        setError(response.status.toString());
        setOpenSnackbar(true);
      };
      console.log('post ', response.status);

      response.status === 201 ? handleSuccess() : handleFailure();
    } catch (e) {
      setError(e.toString());
      setOpenSnackbar(true);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Snackbar open={openSnackbar} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          There was a problem, event was not created. Error: {error}
        </Alert>
      </Snackbar>
      <form onSubmit={formik.handleSubmit}>
        <Grid container className={classes.container} spacing={3}>
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                options={sports}
                getOptionLabel={(option) => option.value}
                style={{ width: 300 }}
                onChange={(e, value) => {
                  console.log(value);
                  formik.setFieldValue(
                    'sport',
                    value !== null ? value.value : '',
                  );
                  formik.handleChange;
                }}
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    name="sport"
                    label="Select sport"
                    variant="outlined"
                    {...params}
                    onBlur={formik.handleBlur}
                    className={classes.sport}
                  />
                )}
              />
              {formik.touched.sport && formik.errors.sport && (
                <div className={classes.error}>{formik.errors.sport}</div>
              )}
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
                  value={formik.values.date}
                  onChange={(e, value) => {
                    formik.setFieldValue('date', value !== null ? value : '');
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
              <TextField
                variant="outlined"
                label="Location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                className={classes.location}
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location && (
                <div className={classes.error}>{formik.errors.location}</div>
              )}
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
                <TextField
                  size="small"
                  type="number"
                  variant="outlined"
                  label=""
                  name="maxParticipants"
                  value={formik.values.maxParticipants}
                  onChange={formik.handleChange}
                  className={classes.participants}
                />
                {formik.errors.maxParticipants && (
                  <div className={classes.error}>
                    {formik.errors.maxParticipants}
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={2}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <div className={classes.error}>{formik.errors.description}</div>
            )}
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
      </form>
    </div>
  );
};

export default CreateEventForm;
