import { address, doFetch, FetchMethod, Method, Path } from './utils';

export async function isAvailable(
  searchFrom: string,
  searchFor: string,
): Promise<boolean> {
  let isSearchedPropertyAvailable = false;

  try {
    let url;
    if (searchFrom === 'name') {
      url = Path.UserName;
    } else {
      url = searchFrom === 'email' ? Path.Email : Path.Users;
    }

    const response = await doFetch(
      address,
      url,
      Method.GET,
      FetchMethod.JSON,
      false,
      searchFor,
    );
    console.log('Status ' + response.status);
    if (response.status !== 200) {
      isSearchedPropertyAvailable = true;
    }
  } catch (e) {
    console.log('isAvailable error ' + e);
  }

  console.log(isSearchedPropertyAvailable ? 'available' : 'not available');
  return isSearchedPropertyAvailable;
}
