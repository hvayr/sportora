/* eslint-disable @typescript-eslint/ban-types,react/prop-types,@typescript-eslint/ban-ts-comment,@typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Form, Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // '& .MuiFormControl-root': {
      //   width: '80%',
      //   margin: theme.spacing(1),
      // },
    },
    box: {
      margin: 'auto',
    },
  }),
);

const useForm = (initialValues: object) => {
  const [values, setValues] = React.useState(initialValues);

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

// @ts-ignore
export const CustomForm = (props) => {
  const classes = useStyles();

  return <Form className={classes.root}>{props.children}</Form>;
};

export default useForm;
