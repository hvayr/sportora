import { handleErrors } from './handleErrors';

export async function isUserNameAvailable(name) {
  let nameIsAvailable = false;

  try {
    await fetch('https://localhost:44348/users/exactName/' + name)
      .then((res) => res.json())
      .then((res) => {
        console.log('Length: ' + res.length);
        if (res.length === 0) {
          nameIsAvailable = true;
        }
      });
  } catch (e) {
    console.log(e);
    alert(e);
  }

  return nameIsAvailable;
}
