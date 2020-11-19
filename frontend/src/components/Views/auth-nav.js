import React from 'react';
import AuthenticationButton from '../authentication-button';
import Profile from '../Profile';
import { useAuth0 } from '@auth0/auth0-react';
import ExternalApi from './external-api';

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="navbar-nav ml-auto">
      <AuthenticationButton />
      {isAuthenticated ? <Profile /> : <h3>not</h3>}
      <ExternalApi />
    </div>
  );
};

export default AuthNav;
