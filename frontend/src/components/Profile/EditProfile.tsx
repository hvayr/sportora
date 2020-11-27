import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { saveUserOld } from '../Fetch/saveUserOld';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const onSubmit = (values) => {
  console.log('Form data', JSON.stringify(values));
  saveUserOld(values);
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function EditProfile() {
  const classes = useStyles();
  const initialValues = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit Profile</Typography>

        <Formik
          validationSchema={Yup.object({
            firstName: Yup.string()
              .required('First name is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(50, 'Too Long'),
            lastName: Yup.string()
              .required('Last name is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(50, 'Too Long'),
            age: Yup.number()
              .required('User name is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(50, 'Too Long'),
            gender: Yup.string().required('Gender is required'),
          })}
          initialStatus
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleChange, values, errors }) => (
            <Form className={classes.root} autoComplete="off">
              <Box>
                <FormGroup>
                  <Field
                    name="firstName"
                    as={TextField}
                    onChange={handleChange}
                    initialStatus={errors.firstName}
                    label="First Name"
                    variant="outlined"
                    size="small"
                  />
                  {errors.firstName ? <div>{errors.firstName}</div> : null}
                </FormGroup>
              </Box>
              <Box>
                <FormGroup>
                  <Field
                    name="lastName"
                    as={TextField}
                    onChange={handleChange}
                    initialStatus={errors.lastName}
                    label="Last Name"
                    variant="outlined"
                    size="small"
                  />
                  {errors.lastName ? <div>{errors.lastName}</div> : null}
                </FormGroup>
              </Box>
              <Box>
                <FormGroup>
                  <Field
                    name="age"
                    as={TextField}
                    onChange={handleChange}
                    initialStatus={errors.age}
                    label="age"
                    variant="outlined"
                    size="small"
                  />
                  {errors.age ? <div>{errors.age}</div> : null}
                </FormGroup>
              </Box>
              <Box>
                <label>Gender</label>
                <FormGroup>
                  <label>
                    <Field
                      type="radio"
                      name="gender"
                      value="Male"
                      initialStatus={errors.gender}
                    />
                    Male
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="gender"
                      value="Female"
                      initialStatus={errors.gender}
                    />
                    Female
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="gender"
                      value="Other"
                      initialStatus={errors.gender}
                    />
                    Other
                  </label>
                </FormGroup>
                {errors.gender ? <div>{errors.gender}</div> : null}
              </Box>
              <Button variant="contained" type="submit">
                Submit
              </Button>

              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
