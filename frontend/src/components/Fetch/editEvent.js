import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useState } from 'react';
import { handleErrors } from './handleErrors';

function EditEvent(eventId) {
  const [data, setData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const fetchData = async () => {
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
          value: 'toimiikoPatch',
        },
      ]),
    })
      .then(handleErrors)
      .then((res) => {
        setData(res);
        if (res.ok) {
          console.log('Event edited');
          alert('Event edited');
        }
      });
  };

  return <div>jee</div>;
}

export default EditEvent;
