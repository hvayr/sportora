import React, { useEffect, useState } from 'react';
import { doFetch, address, Path, Method } from '../../api/utils';

function UserComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await doFetch(address, Path.USERS, Method.GET);
      setUsers(results.content);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Users Data</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Groups</th>
            <th>ImageUrl</th>
          </tr>
        </thead>
        <tbody style={{ borderTop: '15px solid white' }}>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.groupIds}</td>
              <td>{user.imageUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserComponent;
