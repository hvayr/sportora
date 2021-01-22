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
  Grid,
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


interface Props {
  open: boolean,
  setOpen:
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      marginTop: '10px',
      backgroundColor: '#FFECB3',
    },
  },
  dialog: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '470px',
      padding: '1px',
      border: '8px solid',
      borderColor: 'black',
      backgroundColor: theme.palette.custom.color1,
    },
    '& .MuiDialogContent-root': {
      padding: '8px 8px',
    },
  },
}));

export async function saveNickToLocalStorage() {
  const response = await doFetch(address, Path.CHECKNICKNAME, Method.GET, true);
  if (response.content === true) {
    localStorage.setItem('nickSet', 'true');
  } else {
    localStorage.setItem('nickSet', 'false');
  }
  console.log('nick is set: ' + localStorage.getItem('nickSet'));
}

const openDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const myEventColums

  const myEvents

}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditEvent: React.FC<Props> = (values: any, {open, setOpen}: Props) => {}

export const FirstTimeLoginNickName: React.FC<Props> = ({
  open,
  setOpen,
}: Props) => {
  const classes = useStyles();

  const handleClose = () => {
    if (localStorage.getItem('nickSet') === 'true') {
      setOpen(false);
    }
  };

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
        Path.USERS,
        Method.PATCH,
        true,
        null,
        patchedBody,
      );
      console.log(results.status);
      if (results.status === 204) {
        await saveNickToLocalStorage();
        handleClose();
      } else {
        alert('Something went wrong');
      }
    };
    await fetchData();
  };

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialog}>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container justify="center">
              <Grid item>
                <Typography variant="h4">Welcome to Sportora!</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                  Please set up your nickname:
                </Typography>
              </Grid>
              <Grid item>
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
                      <Grid container justify="center">
                        <Grid item style={{ marginTop: '10px' }}>
                          <Button
                            variant="contained"
                            disabled={!dirty || !isValid}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
