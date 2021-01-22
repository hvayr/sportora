import React, { useEffect, useState } from 'react';
import { address, doFetch, Method, Path } from '../../api/utils';
import {
  DataGrid,
  ColDef,
  CellParams,
  GridApi,
  ValueFormatterParams,
} from '@material-ui/data-grid';
import { createStyles } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';
import moment from 'moment';
import EditEvent from './EditEvent';

const useStyles = makeStyles(() =>
  createStyles({
    test: {
      '& .MuiDataGrid-selectedRowCount': {
        fontSize: '0',
      },
    },
  }),
);

const openDialog: React.FC = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const myEventColums: ColDef[] = [
    { field: 'name', headerName: 'Event category', width: 150 },

    {
      field: 'eventStartTime',
      headerName: 'Date',
      valueFormatter: (params: ValueFormatterParams) =>
        moment(params.value as Date).format('MMM Do YY'),
      width: 150,
    },
    { field: 'numParticipants', headerName: 'Participants', width: 150 },

    {
      field: '',
      headerName: 'Edit',
      disableClickEventBubbling: true,
      // eslint-disable-next-line react/display-name
      renderCell: (params: CellParams) => {
        const onClick = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c);
          const thisRow: any = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });
          return setOpen(true);
        };

        return <Button onClick={onClick}>Click</Button>;
      },
    },
  ];

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
    <div>
      <EditEvent open={open} setOpen={setOpen} />
      <div style={{ height: 400, width: '100%' }} className={classes.test}>
        <DataGrid
          rows={data}
          columns={myEventColums}
          pageSize={5}
          className={classes.test}
          disableColumnMenu
          hideFooterSelectedRowCount
        />
      </div>
    </div>
  );
};

export default openDialog;
