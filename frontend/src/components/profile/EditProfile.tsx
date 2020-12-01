import {
  Button,
  Card,
  CardContent,
  FormGroup,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import FormikField from '../Formik/FormikField';
import FormikSelect, { FormikSelectItem } from '../Formik/FormikSelect';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const onSubmit = (values) => {
  console.log('Form data', JSON.stringify(values));
  // save user here
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

interface FormValues {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  age: 0,
  gender: '',
};

const genderItems: FormikSelectItem[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too short!').max(20, 'Too long!'),
  lastName: Yup.string().min(2, 'Too short!').max(20, 'Too long!'),
  age: Yup.number().max(100, 'Your not that old'),
});

const EditProfile: React.FC = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit Profile</Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={SignupSchema}
        >
          {({ dirty, isValid }) => (
            <Form className={classes.root}>
              <FormGroup>
                <FormikField name="firstName" label="First Name" />
              </FormGroup>

              <FormGroup>
                <FormikField name="lastName" label="Last Name" />
              </FormGroup>

              <FormGroup>
                <FormikField name="age" label="Age" />
              </FormGroup>

              <FormGroup>
                <FormikSelect
                  items={genderItems}
                  name="gender"
                  label="Gender"
                />
              </FormGroup>

              <Button
                variant="contained"
                disabled={!dirty || !isValid}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
