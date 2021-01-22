/* eslint-disable @typescript-eslint/ban-types */

export const doFetch = async (
  address: string,
  path: Path,
  method: Method,
  authorize: boolean,
  id?: string | number | null,
  body?: object,
) => {
  let fetchFrom = address + path;

  if (id) {
    fetchFrom += `/id/${id}`;
  }

  console.log('from ' + fetchFrom);

  const response = await fetch(
    fetchFrom,
    Object.assign(
      {},

      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorize
            ? `Bearer ${localStorage.getItem('token')}`
            : '',
        },
      },
      method !== 'GET' ? { body: JSON.stringify(body) } : {},
    ),
  );

  console.log('status ' + response.status);

  const content =
    response.status === 200 ? await response.json() : await response.text();

  return { status: response.status, content: content };
};

export enum Path {
  USERS = '/users',
  USERNAME = '/users/exactName',
  EVENTS = '/sportevents',
  PROTECTEDEVENTS = '/sportevents/protected',
  EMAIL = '/users/email', //not implemented yet
  PARTICIPATINGEVENTS = '/sportevents/participatingevents',
  ADMINEVENTS = '/sportevents/adminevents',
  CHECKNICKNAME = '/users/checkNickName',
  ADDUSERTOEVENT = '/sportevents/addUser',
  REMOVEUSERFROMEVENT = '/sportevents/removeUser',
}

export const address = `https://localhost:44348`;

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Sport {
  HOCKEY,
  FOOTBALL,
  BASEBALL,
}
