/* eslint-disable */
import { isUserNameAvailable } from './IsUserNameAvailable';
import {handleErrors} from './handleErrors';
import { isEmailAvailable } from './IsEmailAvailable';

export const saveUser = async (values) => {

  let checkUniquenessSuccess = false;

  !await isUserNameAvailable(values.userName) ? alert('Username already in' +
    ' use!') : await isEmailAvailable(values.email) ? checkUniquenessSuccess = true : alert('Email already in use');

  if (checkUniquenessSuccess) {

    const results = await fetch('https://localhost:44348/users', {
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
      .then(handleErrors)
      .then((res) => {
        if (res.ok) {
          console.log('User registered');
          alert('User registered!');
        }
      });
  }
};