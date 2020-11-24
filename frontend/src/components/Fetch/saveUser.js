import { handleErrors } from './handleErrors';
import { isAvailable } from './isAvailable';
import { useAuth0 } from '@auth0/auth0-react';

export const saveUser = async (user) => {
  console.log('Saving user..');
  await fetch('https://localhost:44348/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user.sub,
      userName: user.name,
      email: user.email,
    }),
  })
    .then(handleErrors)
    .then((res) => {
      if (res.ok) {
        alert('User added to database!');
      }
    });
};
