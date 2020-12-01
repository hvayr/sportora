import { address, doFetch, Method, Path } from './utils';

export async function isAvailable(
  searchFrom: string,
  searchFor: string,
): Promise<boolean> {
  let isSearchedPropertyAvailable = false;

  try {
    let url;
    if (searchFrom === 'name') {
      url = Path.USERNAME;
    } else {
      url = searchFrom === 'email' ? Path.EMAIL : Path.USERS;
    }

    const response = await doFetch(address, url, Method.GET, false, searchFor);
    console.log('Status ' + response.status);
    if (response.status !== 200) {
      isSearchedPropertyAvailable = true;
    }
  } catch (e) {
    console.log('isAvailable error ' + e);
    alert(e);
  }

  console.log(isSearchedPropertyAvailable ? 'available' : 'not available');
  return isSearchedPropertyAvailable;
}
