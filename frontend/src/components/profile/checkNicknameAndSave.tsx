import React, { useState } from 'react';
import { address, doFetch, Method, Path } from '../../api/utils';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import FormikField from '../forms/FormikField';
import * as Yup from 'yup';

interface FormValues {
  nickName: string;
}

const initialValues: FormValues = {
  nickName: '',
};

const NickNameSchema = Yup.object().shape({
  nickName: Yup.string().min(2, 'Too short!').max(20, 'Too long!'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

export const checkIfNickNameIsSet = () => {
  let set = false;
  const results = async () => {
    const response = await doFetch(
      address,
      Path.CHECKNICKNAME,
      Method.GET,
      true,
    );
    if (response.content === true) {
      set = true;
    }
  };
  return set;
};

export const FirstTimeLoginNickName: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  // const nickname = async () => {
  //   const results = await doFetch(
  //     address,
  //     Path.CHECKNICKNAME,
  //     Method.GET,
  //     true,
  //   );
  //   if (results.content === false) {
  //     alert('change nickname');
  //   }
  //   console.log('nick ' + results.content + results.status);
  // };
  // nickname();

  const onSubmit = () => {
    const fetchData = async () => {
      const patchedBody = [
        {
          op: 'replace',
          path: '/nickName',
          value: 'test',
        },
      ];
      const results = await doFetch(
        address,
        Path.USERS,
        Method.PATCH,
        true,
        null,
        patchedBody,
      );
      console.log(results.status);
      setData(results.status === 200 ? results.content : results.status);
    };

    try {
      fetchData();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log('data ' + data);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Set Nickname'}</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Typography variant="h4">Set Nickname</Typography>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={NickNameSchema}
            >
              {({ dirty, isValid }) => (
                <Form className={classes.root}>
                  <FormGroup>
                    <FormikField name="nickName" label="Nickname" />
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
      </DialogContent>
    </Dialog>
  );
};
