import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export const editEvent = async() => {
  const [message, setMessage] = useState('');
  const serverUrl = process.env.REACT_APP_AUTH0_URL;

  const { getAccessTokenSilently } = useAuth0;

  const callApi = async () => {

    const response = await fetch(

    )

  }

  return (

  );
}