import { isAvailable } from './IsAvailable';
import { handleErrors } from './handleErrors';

export const saveUser = async (values) => {
  if (!(await isAvailable('name', values.userName))) {
    alert('Username already in use!');
  } else if (await isAvailable('email', values.email)) {
    const results = await fetch('https://localhost:44348/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        userName: values.userName,
        password: values.password,
        gender: values.gender,
      }),
    })
      .then(handleErrors)
      .then((res) => {
        if (res.ok) {
          console.log('User registered');
          alert('User registered!');
        }
      });
  } else {
    alert('Email is already in use!');
  }
};
