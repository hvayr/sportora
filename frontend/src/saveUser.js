/* eslint-disable */
import error from 'eslint-plugin-react';

export const saveUser = (
    values
) => {
  fetch('https://localhost:44348/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        userName: values.userName,
        password: values.password,
        gender: values.gender,
      },
    ),
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })
    .then(res => {
      console.log('ok');
    }).catch(res => console.log(error))


}
