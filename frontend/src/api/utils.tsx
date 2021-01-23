/* eslint-disable @typescript-eslint/ban-types */

export const doFetch = async (
  address: string,
  path: Path | string,
  method: Method,
  fetchMethod: FetchMethod = FetchMethod.JSON,
  authorize: boolean,
  id: string | number | null = null,
  body: object = {},
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

  const content =
    response.status === 200
      ? await response[fetchMethod]()
      : await response.text();

  return { status: response.status, content: content };
};

export enum Path {
  Users = '/users',
  UserName = '/users/exactName',
  Events = '/sportevents',
  ProtectedEvents = '/sportevents/protected',
  Email = '/users/email', //not implemented yet
  ParticipatingEvents = '/sportevents/participatingevents',
  AdminEvents = '/sportevents/adminevents',
  CheckNickName = '/users/checkNickName',
  AddUserToEvent = '/sportevents/addUser',
  RemoveUserFromEvent = '/sportevents/removeUser',
  LoggedUserNickName = '/users/loggedUserNickName',
  NickNameByAuthId = '/users/nickNameByAuthId',
  CheckActiveState = '/sportevents/checkActiveState',
}

export const address = `https://localhost:44348`;

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum FetchMethod {
  JSON = 'json',
  Text = 'text',
}

export enum Sport {
  HOCKEY,
  FOOTBALL,
  BASEBALL,
}
