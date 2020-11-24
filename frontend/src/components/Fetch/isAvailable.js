export async function isAvailable(attribute, search) {
  let isAttributeAvailable = false;

  try {
    let apiUri;
    if (attribute === 'name') {
      apiUri = 'exactName';
    } else {
      apiUri = attribute === 'email' ? 'email' : 'id';
    }

    await fetch('https://localhost:44348/users/' + apiUri + `/${search}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(search + ' ' + res.length);
        if (res.length === 0) {
          isAttributeAvailable = true;
        }
      });
  } catch (e) {
    console.log('isAvailable error ' + e);
    alert(e);
  }

  return isAttributeAvailable;
}
