export async function isAvailable(attribute, search) {
  let isAttributeAvailable = false;

  try {
    const apiUri = attribute === 'name' ? 'exactName' : 'email';

    await fetch('https://localhost:44348/users/' + apiUri + `/${search}`)
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
