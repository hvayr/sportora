export async function isAvailable(search) {
  let isAttributeAvailable = false;

  try {
    const apiUri =
      search.toString() === 'values.userName' ? 'exactName' : 'email';

    console.log(search.toString());
    await fetch('https://localhost:44348/users/' + apiUri)
      .then((res) => res.json())
      .then((res) => {
        console.log(search + ' ' + res.length);
        if (res.length === 0) {
          isAttributeAvailable = true;
        }
      });
  } catch (e) {
    console.log(e);
    alert(e);
  }

  return isAttributeAvailable;
}
