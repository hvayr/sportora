import { address, doFetch, FetchMethod, Method, Path } from './utils';
import React from 'react';

export const getNickName = (path: Path, id?: string | number) => {
  const [nick, setNick] = React.useState('');

  const fetch = async () => {
    const response = await doFetch(
      address,
      path,
      Method.GET,
      FetchMethod.Text,
      true,
      id,
    );

    if (response.status === 200) {
      setNick(response.content);
    }

    console.log('getnick status ' + response.status);
  };
  fetch();

  return nick;
};
