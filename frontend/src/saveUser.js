/* eslint-disable */
export const saveUser = (
    values
) => {
  fetch('https://localhost:44348/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        userName: values.userName,
        password: values.password,
        gender: values.gender,
      }
    ),
  })
      .then((res) => res.json())
      .then(res => console.log('Test', res));
}
