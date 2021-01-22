import { address, doFetch, Method, Path } from './utils';
import { User } from '@auth0/auth0-react/dist/auth-state';

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
    console.log('isAvailable Status ' + response.status);
    if (response.status !== 200) {
      isSearchedPropertyAvailable = true;
    }
  } catch (e) {
    console.log('isAvailable error ' + e);
  }

  console.log(isSearchedPropertyAvailable ? 'available' : 'not available');
  return isSearchedPropertyAvailable;
}

const saveUserIfNotExisting = async (user: User): Promise<void> => {
  const { sub, email, name } = user;
  console.log('Checking availability...');
  if (await isAvailable('id', sub)) {
    const saveUser = await doFetch(
      address,
      Path.USERS,
      Method.POST,
      false,
      null,
      {
        authId: sub,
        email: email,
        userName: name,
      },
    );
    console.log(
      saveUser.status === 201
        ? 'User saved to database'
        : 'User' + ' not saved to database',
    );
  }
};

export default saveUserIfNotExisting;
