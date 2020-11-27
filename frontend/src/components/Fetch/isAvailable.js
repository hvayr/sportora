import { apiUrl, doFetch, method, path } from '../utils';

export async function isAvailable(searchFrom, searchFor) {
  let isSearchedObjectAvailable = false;

  try {
    let url;
    if (searchFrom === 'name') {
      url = path.USERNAME;
    } else {
      url = searchFrom === 'email' ? path.EMAIL : path.USERID;
    }

    await doFetch(apiUrl, url, method.GET, null, searchFor);
  } catch (e) {
    console.log('isAvailable error ' + e);
    alert(e);
  }

  console.log(isSearchedObjectAvailable ? 'available' : 'not available');
  return isSearchedObjectAvailable;
}
