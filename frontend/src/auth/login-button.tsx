import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography } from '@material-ui/core';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => loginWithRedirect()}
    >
      <Typography style={{ fontWeight: 700 }}>Log In</Typography>
    </Button>
  );
};

export default LoginButton;
