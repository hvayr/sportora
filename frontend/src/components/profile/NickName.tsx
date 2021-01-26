import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Card,
  CardContent,
  FormGroup,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { address, doFetch, FetchMethod, Method, Path } from '../../api/utils';
import FormikField from '../forms/FormikField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

interface FormValues {
  nickName: string;
}

const initialValues: FormValues = {
  nickName: '',
};

const NickNameSchema = Yup.object().shape({
  nickName: Yup.string().min(2, 'Too short!').max(20, 'Too long!'),
});

export const NickName: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const onSubmit = async (values: any) => {
    const fetchData = async () => {
      const patchedBody = [
        {
          op: 'replace',
          path: '/nickName',
          value: values.nickName,
        },
      ];
      const results = await doFetch(
        address,
        Path.Users,
        Method.PATCH,
        FetchMethod.JSON,
        true,
        null,
        patchedBody,
      );
      console.log(results.status);
      setData(results.status === 200 ? results.content : results.status);
    };

    try {
      await fetchData();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Change Nickname</Typography>

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
  );
};
