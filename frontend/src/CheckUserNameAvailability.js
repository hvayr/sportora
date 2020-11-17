export async function CheckUserNameAvailability(name) {
  let nameIsAvailable = false;

  await fetch('https://localhost:44348/users/name/' + name)
    .then((res) => res.json())
    .then((res) => {
      console.log('Length: ' + res.length);
      if (res.length === 0) {
        nameIsAvailable = true;
        console.log('First: ' + nameIsAvailable);
      }
    });

  console.log('Second: ' + nameIsAvailable);
  return nameIsAvailable;
}
