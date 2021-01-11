/* eslint-disable @typescript-eslint/ban-types,react/prop-types,@typescript-eslint/ban-ts-comment */
import React from 'react';
import { Form, Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

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

const useForm = (initialValues: object) => {
  const [values, setValues] = React.useState(initialValues);
  const classes = useStyles();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  return {
    values,
    setValues,
    handleInputChange,
  };
};

interface FormikProps {
  initialValues: object;
  onSubmit: object;
}

// @ts-ignore
export const FormikForm = (props) => {
  return (
    <Formik initialValues={props.initialValues} onSubmit={props.onSubmit}>
      <Form>{props.children}</Form>
    </Formik>
  );
};

export default useForm;
