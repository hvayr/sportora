import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { handleErrors } from './handleErrors';

export const editEvent=async (eventId) => {
  console.log('Editing event...');

  const { getAccessTokenSilently } = useAuth0();
  const token = await getAccessTokenSilently();

  fetch('https://localhost:44348/sportevents/' + eventId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([
      {
        op: 'replace',
        path: '/Name',
        value: 'patchTOIMIIIIII!!!',
      },
    ]),
  })
    .then(handleErrors)
    .then((res) => {
      if (res.ok) {
        console.log('Event edited');
        alert('Event edited');
      }
    });
};

export default editEvent;
