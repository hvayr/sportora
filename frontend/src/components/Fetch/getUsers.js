import React, { useEffect, useState } from 'react';

function getUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://localhost:44348/users')
      .then((result) => result.json())
      .then((result) => {
        setUsers(result);
        console.log('Length: ' + result.length);
      });
  }, []);

  return users;
}

export default getUsers;
