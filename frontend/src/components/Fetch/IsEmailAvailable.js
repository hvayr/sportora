export async function isEmailAvailable(email) {
  let emailIsAvailable = false;

  await fetch('https://localhost:44348/users/email/' + email)
    .then((res) => res.json())
    .then((res) => {
      if (res.length === 0) {
        emailIsAvailable = true;
      }
    });

  return emailIsAvailable;
}
