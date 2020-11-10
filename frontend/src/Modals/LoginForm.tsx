import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { object, string } from 'yup';

const initialValues = {
  userName: '',
  password: '',
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
export function LoginForm() {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Login</Typography>

        <Formik
          validationSchema={object({
            userName: string()
              .required('User name is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(50, 'Too Long'),
            password: string()
              .required('Password is required')
              .min(2, 'Must contain atleast 2 characters')
              .max(20, 'Too Long'),
          })}
          initialValues={initialValues}
          onSubmit={(values) => {
            return new Promise(() => {
              console.log(values);
            });
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form className={classes.root}>
              <Grid container>
                <Grid item xs={6}>
                  <Box marginBottom={2}>
                    <FormGroup>
                      <Field
                        name="userName"
                        as={TextField}
                        label="User Name"
                        variant="outlined"
                      />
                      <ErrorMessage name="userName" />
                    </FormGroup>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box marginBottom={2}>
                    <FormGroup>
                      <Field
                        name="password"
                        as={TextField}
                        label="Password"
                        variant="outlined"
                      />
                      <ErrorMessage name="password" />
                    </FormGroup>
                  </Box>
                </Grid>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting || isValidating}
                >
                  Login
                </Button>
              </Grid>

              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
