import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { address, doFetch, Method, Path } from '../../api/utils';

function EventTable() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log('fetching..');
    const fetchData = async () => {
      const result = await doFetch(address, Path.EVENTS, Method.GET, false);
      console.log('Result' + result);

      setEvents(result.content);
    };
    fetchData();
  }, []);

  async function onClickHandle() {
    console.log('Handling..');

    const patchedBody = [
      {
        op: 'replace',
        path: '/Name',
        value: 'toimiiii!!!!',
      },
    ];

    await doFetch(address, Path.EVENTS, Method.PATCH, false, 2, patchedBody);
  }

  return (
    <div>
      <h2>Events Data</h2>
      <Button onClick={() => onClickHandle()}>Edit</Button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Location</th>
            <th>Participants</th>
            <th>EventStartTime</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody style={{ borderTop: '15px solid white' }}>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{event.participants}</td>
              <td>{event.eventStartTime}</td>
              <td>{event.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;
