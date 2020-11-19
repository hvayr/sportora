import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ModalHandler() {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);

  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenRegister(false);
  };
  return (
    <div>
      <ButtonGroup variant="contained" color="primary">
        <Button href="#SignIn" onClick={handleOpenLogin}>
          Sign In
        </Button>
        <Modal
          className={classes.modal}
          open={openLogin}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openLogin}>
            <div className={classes.paper}>
              <LoginForm />
            </div>
          </Fade>
        </Modal>
        <Button href="#Register" onClick={handleOpenRegister}>
          Register
        </Button>
        <Modal
          className={classes.modal}
          open={openRegister}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openRegister}>
            <div className={classes.paper}>
              <RegisterForm />
            </div>
          </Fade>
        </Modal>
      </ButtonGroup>
    </div>
  );
}
