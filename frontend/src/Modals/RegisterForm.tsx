import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { number, object, string } from 'yup';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: '',
  gender: '',
  group: 0,
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function RegisterForm() {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>

        <Formik
          validationSchema={object({
            firstName: string()
              .required('First name is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(50, 'Too Long'),
            lastName: string()
              .required('Last name is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(50, 'Too Long'),
            userName: string()
              .required('User name is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(50, 'Too Long'),
            email: string().email('Invalid email').required('Required'),
            password: string()
              .required('Password is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(20, 'Too Long'),
            group: number().required().min(0).max(5),
            image: string(),
          })}
          initialValues={initialValues}
          onSubmit={(values) => {
            return new Promise(() => {
              console.log(values);
            });
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form className={classes.root} autoComplete="off">
              <Box>
                <FormGroup>
                  <Field
                    name="firstName"
                    as={TextField}
                    label="First Name"
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="firstName" />
                </FormGroup>
              </Box>

              <Box>
                <FormGroup>
                  <Field
                    name="lastName"
                    as={TextField}
                    label="Last Name"
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="lastName" />
                </FormGroup>
              </Box>

              <Box>
                <FormGroup>
                  <Field
                    name="userName"
                    as={TextField}
                    label="User Name"
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="userName" />
                </FormGroup>
              </Box>

              <Box>
                <FormGroup>
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="email" />
                </FormGroup>
              </Box>

              <Box>
                <FormGroup>
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    variant="outlined"
                    size="small"
                  />
                  <ErrorMessage name="password" />
                </FormGroup>
              </Box>

              <Box>
                <label>Gender</label>
                <FormGroup>
                  <label>
                    <Field type="radio" name="gender" value="Male" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="Female" />
                    Female
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="Other" />
                    Other
                  </label>
                </FormGroup>
                <ErrorMessage name="gender" />
              </Box>

              <Box>
                <FormGroup>
                  <Field name="group" label="group" as={TextField} select>
                    <MenuItem value={0}>Select ...</MenuItem>
                    <MenuItem value={1}>0</MenuItem>
                    <MenuItem value={2}>1</MenuItem>
                    <MenuItem value={3}>2</MenuItem>
                    <MenuItem value={4}>3</MenuItem>
                    <MenuItem value={5}>4</MenuItem>
                    <MenuItem value={6}>5</MenuItem>
                  </Field>
                  <ErrorMessage name="group" />
                </FormGroup>
              </Box>

              <Button type="submit" disabled={isSubmitting || isValidating}>
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
