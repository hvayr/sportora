import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { address, doFetch, Method, Path } from '../../api/utils';
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const EventTesting: React.FC = () => {
  const [value, setValue] = useState();

  async function handlePost() {
    const result = await doFetch(
      address,
      Path.EVENTS,
      Method.POST,
      false,
      null,
      {
        name: 'TestEvent',
        author: sessionStorage.getItem('sub'),
      },
    );
    console.log(`status: ${result.status} content: ${result.content}`);
  }

  async function handlePatch() {
    const result = await doFetch(
      address,
      Path.EVENTS,
      Method.PATCH,
      true,
      value,
      [
        {
          op: 'replace',
          path: '/Name',
          value: 'patch works',
        },
      ],
    );
    console.log(`status: ${result.status} content: ${result.content}`);
  }

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          handlePost();
        }}
      >
        Create a test event
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          handlePatch();
        }}
      >
        Patch event
      </Button>
      <input
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Id"
      />
    </>
  );
};

export default EventTesting;
