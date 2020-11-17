import React, { createContext, FC, useContext, useState } from 'react';

import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

interface Auth0User {
  name: string;
  email: string;
}

interface IAuth0Context {
  isAuthenticated: boolean;
  user?: Auth0User;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
}
export const Auth0Context = createContext<IAuth0Context>({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
  loading: true,
});

export const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<
    boolean
    >(false);
  const [user, setUser] = useState<Auth0User | undefined>(
    undefined,
  );
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        signIn: () =>
          getAuth0ClientFromState().loginWithRedirect(),
        signOut: () => getAuth0ClientFromState().logout({
          client_id: authSettings.client_id,
          returnTo: window.location.origin + '/signout-callback'
        }),
        loading,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

