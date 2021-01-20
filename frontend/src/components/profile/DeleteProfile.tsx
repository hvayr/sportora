import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { address, doFetch, Method, Path } from '../../api/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    red: {
      backgroundColor: 'red',
    },
    green: {
      backgroundColor: 'green',
    },
  }),
);

// eslint-disable-next-line react/prop-types
const DeleteProfile: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const deleteProfile = async () => {
      await doFetch(address, Path.USERS, Method.DELETE, true);
    };
    deleteProfile();
    sessionStorage.clear();
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Button className={classes.red} onClick={handleClickOpen}>
        Erase account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Erase account'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to erase your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} className={classes.green}>
            Yes
          </Button>
          <Button onClick={handleClose} className={classes.red} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteProfile;
