import React, { useEffect, useState } from 'react';
import { editEvent } from './editEvent';
import { Button } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function EventComponent() {
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://localhost:44348/sportevents')
      .then((result) => result.json())
      .then((result) => {
        setEvents(result);
      });
  });

  function onClickHandle() {
    console.log('Handling..');
    editEvent(3);
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

export default EventComponent;
