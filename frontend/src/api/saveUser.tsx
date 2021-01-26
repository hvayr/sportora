import { address, doFetch, FetchMethod, Method, Path } from './utils';
import { User } from '@auth0/auth0-react/dist/auth-state';

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
      Path.Users,
      Method.POST,
      FetchMethod.JSON,
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
