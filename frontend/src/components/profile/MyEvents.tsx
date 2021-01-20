import React, { useEffect, useState } from 'react';
import { address, doFetch, Method, Path } from '../../api/utils';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { createStyles } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() =>
  createStyles({
    test: {
      '& .MuiDataGrid-selectedRowCount': {
        fontSize: '0',
      },
    },
  }),
);

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

const MyEvents: React.FC = () => {
  const [data, setData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const results = await doFetch(
        address,
        Path.ADMINEVENTS,
        Method.GET,
        true,
      );
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
    <div style={{ height: 400, width: '100%' }} className={classes.test}>
      <DataGrid
        rows={data}
        columns={myEventColums}
        pageSize={5}
        className={classes.test}
      />
    </div>
  );
};

export default MyEvents;
