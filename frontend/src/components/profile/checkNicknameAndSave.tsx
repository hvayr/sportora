import React from 'react';
import { address, doFetch, Method, Path } from '../../api/utils';

const checkNicknameAndSave: React.FC = () => {
  const checkNickname = async () => {
    const results = await doFetch(address, Path.USERS, Method.GET, true);
  };
  return <div></div>;
};

export default checkNicknameAndSave;
