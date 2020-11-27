import React, { useEffect, useState } from 'react';
import EditEvent from './editEvent';
import { Button } from '@material-ui/core';
import ExternalApi from './ExternalApi';
import { apiUrl, path, doFetch, method } from '../utils';
import { useAuth0 } from '@auth0/auth0-react';

function EventComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log('fetching..');
    const fetchData = async () => {
      const result = await doFetch(apiUrl, path.EVENTS, method.GET);
      setEvents(result);
    };
    fetchData();
  }, []);

  function onClickHandle() {
    console.log('Handling..');
    EditEvent(3);
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
      <ExternalApi />
    </div>
  );
}

export default EventComponent;
