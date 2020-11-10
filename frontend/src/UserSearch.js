import React, { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { keys } from '@material-ui/core/styles/createBreakpoints';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function UserSearch() {
  const [users, setUsers] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');

  useEffect(() => {
    fetch('https://localhost:44348/users/name/' + searchText)
      .then((result) => result.json())
      .then((result) => setUsers(result));
  }, [searchText]);

  function onSearchChange(event) {
    setSearchText(event.target.value);
  }

  return (
    <div>
      <input type="text" onChange={onSearchChange} value={searchText} />
      <h3>
        {users.map((user) => (
          // eslint-disable-next-line react/jsx-key
          <h2>{user.userName}</h2>
        ))}
      </h3>
    </div>
  );
}

export default UserSearch;
