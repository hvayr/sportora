/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-types */
import React from 'react';
import { createStyles, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { sports } from '../../api/sports';
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import MuiTextField from '@material-ui/core/TextField';
import UseForm from '../Formik/useForm';
import useForm from '../Formik/useForm';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        width: '80%',
        margin: theme.spacing(1),
      },
    },
    location: {
      width: '50em',
    },
    selectSport: {
      margin: 'auto',
    },
  }),
);

const initialValues = {
  sport: 'Any',
  location: '',
  maxParticipants: '',
  description: '',
};

interface IInitialValues {
  sport: 'Any';
  location: '';
  maxParticipants: '';
  description: '';
}

const TestCreateEventForm: React.FC = () => {
  const classes = useStyles();

  const { values, setValues, handleInputChange } = useForm(initialValues);

  interface Values {
    email: string;
  }

  // @ts-ignore
  const locationValue: IInitialValues = values.location;

  const formikOptions = {
    initialValues: initialValues,
    validate: (values: any) => {
      const errors: Partial<Values> = {};
      if (!values.location) {
        errors.email = 'Required';
      }
      {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: (values: object, { setSubmitting }) => void }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    },
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<Values> = {};
          if (!values.location) {
            errors.email = 'Required';
          }
          {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, touched, errors, setFieldValue }) => (
          <Form className={classes.root}>
            <Grid container>
              <Grid item xs={6}>
                <Box margin={1} className={classes.selectSport}>
                  <Autocomplete
                    id="city_id"
                    options={sports}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    onChange={(e, value) => {
                      console.log(value);
                      setFieldValue('city_id', value !== null ? value : 'Any');
                      setValues({
                        ...values,
                        sport: value !== null ? value.value : 'Any',
                      });
                      // @ts-ignore
                      console.log('state:' + values.sport.toString());
                    }}
                    renderInput={(params) => (
                      <TextField
                        margin="normal"
                        name="city_id"
                        label="Select sport"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Location"
                  name="location"
                  value={locationValue}
                  onChange={handleInputChange}
                  className={classes.location}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TestCreateEventForm;
