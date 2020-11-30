import { isAvailable } from './isAvailable';
import { address, doFetch, Method, Path } from './utils';
import { User } from '@auth0/auth0-react/dist/auth-state';

export const saveUserIfNotExisting = async (user: User): Promise<void> => {
  const { sub, email, name } = user;
  console.log('SUB ' + sub);
  console.log('Checking availability...');
  if (await isAvailable('id', sub)) {
    const saveUser = await doFetch(
      address,
      Path.USERS,
      Method.POST,
      false,
      null,
      {
        id: sub,
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
