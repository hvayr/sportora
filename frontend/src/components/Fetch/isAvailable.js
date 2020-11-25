export async function isAvailable(attribute, search) {
  let isAttributeAvailable = false;

  try {
    let apiUri;
    if (attribute === 'name') {
      apiUri = 'exactName';
    } else {
      apiUri = attribute === 'email' ? 'email' : 'id';
    }

    let path = 'https://localhost:44348/users/' + apiUri + `/${search}`;

    await fetch(path)
      .then((res) => res.json())
      .then((res) => {
        console.log(path);
        if (res.length === 0) {
          isAttributeAvailable = true;
        }
      });
  } catch (e) {
    console.log('isAvailable error ' + e);
    alert(e);
  }

  console.log(isAttributeAvailable ? 'true' : 'false');
  return isAttributeAvailable;
}
