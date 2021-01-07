import * as React from 'react';
import { address, doFetch, Method, Path } from '../../api/utils';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { useState } from 'react';
import { useEffect } from 'react';

const myEventColums: ColDef[] = [
  { field: 'name', headerName: 'Event category', width: 150 },
  {
    field: 'location',
    headerName: 'Location',
    type: 'string',
    width: 130,
  },
  { field: 'description', headerName: 'Description', width: 600 },
];

const joinedEventColumns: ColDef[] = [
  { field: 'name', headerName: 'Event category', width: 150 },
  {
    field: 'location',
    headerName: 'Location',
    type: 'string',
    width: 130,
  },
  { field: 'description', headerName: 'Description', width: 600 },
];

export const JoinedEvents: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await doFetch(address, Path.EVENTS, Method.GET, false);
      console.log(results.status);
      setData(results.status === 200 ? results.content : results.status);
    };

    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={joinedEventColumns} pageSize={5} />
    </div>
  );
};

export const MyEvents: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await doFetch(address, Path.EVENTS, Method.GET, false);
      console.log(results.status);
      setData(results.status === 200 ? results.content : results.status);
    };

    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={myEventColums} pageSize={5} />
    </div>
  );
};
