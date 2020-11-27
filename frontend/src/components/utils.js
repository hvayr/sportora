import { useAuth0 } from '@auth0/auth0-react';

export const doFetch = async (apiUrl, path, method, body, token) => {
  let fetchFrom = apiUrl + path;

  const response = await fetch(
    fetchFrom,
    Object.assign(
      {},

      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        Authorization: token ? `Bearer ${token}` : '',
      },
      method !== 'GET' ? { body: JSON.stringify(body) } : {},
    ),
  );

  const resultJSON = await response.json();
  console.log('type: ' + typeof resultJSON);
  console.log('from ' + fetchFrom);
  console.log(resultJSON);
  return resultJSON;
};

export const path = {
  USERS: '/users',
  USERID: '/users/id/',
  USERNAME: '/users/exactName',
  EVENTS: '/sportevents/',
  PROTECTEDEVENTS: '/sportevents/protected',
  EVENTID: '/sportevents/id',
};

export const apiUrl = `https://localhost:44348/`;

export const method = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
};
