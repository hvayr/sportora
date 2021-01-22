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
import React from 'react';
import * as Yup from 'yup';
import { address, doFetch, Method, Path } from '../../api/utils';
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
  description: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: number;
}

const initialValues: FormValues = {
  description: '',
};

const SignupSchema = Yup.object().shape({
  description: Yup.string().min(2, 'Too short!').max(20, 'Too long!'),
});

const EditEvent: React.FC<Props> = ({ open, setOpen, eventId }: Props) => {
  const classes = useStyles();
  const onSubmit = async (values: any) => {
    console.log('eventId ' + eventId);
    const description = values.description;
    const results = await doFetch(
      address,
      Path.EVENTS,
      Method.PATCH,
      true,
      eventId,
      [
        {
          op: 'replace',
          path: '/description',
          value: description,
        },
      ],
    );
    console.log(results.status);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log('Edit event open: ' + open);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Change description'}</DialogTitle>
      <DialogContent>
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
                    <FormikField name="description" label="Description" />
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

export default EditEvent;
