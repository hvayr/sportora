import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ModalHandler() {
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
        <Modal open={openLogin} onClose={handleClose}>
          <div className="modal-login">
            <LoginForm />
          </div>
        </Modal>
        <Button href="#Register" onClick={handleOpenRegister}>
          Register
        </Button>
        <Modal open={openRegister} onClose={handleClose}>
          <div className="modal-register">
            <RegisterForm />
          </div>
        </Modal>
      </ButtonGroup>
    </div>
  );
}
