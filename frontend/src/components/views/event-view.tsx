import React, { useEffect, useState } from 'react';
import { Dialog, Grid, Paper, TextField, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventCard from '../events/EventCard';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import { address, doFetch, Method, Path } from '../../api/utils';
import GridListTile from '@material-ui/core/GridListTile';
import { createStyles, Theme } from '@material-ui/core/styles';
import SportSelect from '../events/SportSelect';
import DateSelect from '../events/DateSelect';
import SwitchComponent from '../events/SwitchComponent';
import CreateEvent from '../events/CreateEvent';
import TestCreateEventForm from '../events/TestCreateEventForm';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    eventList: {
      height: 1050,
      marginTop: '5px',
    },
    mainContainer: {
      backgroundColor: theme.palette.primary.main,
      height: '11em',
      borderRadius: '10px',
    },
    locationMenu: {
      marginLeft: '0.5em',
      height: '1em',
      width: '11.25em',
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '20ch',
      },
      '& .MuiFormLabel-root': {
        fontSize: '1.5rem',
      },
      '& .MuiInput-root': {
        marginTop: '1.5em',
      },
    },
    dateMenu: {
      marginLeft: '3em',
      marginTop: '0.6em',
      '& label + .MuiInput-formControl': {
        marginTop: '1.75em',
      },
      '& .MuiFormLabel-root': {
        fontSize: '2rem',
        marginBottom: '1em',
      },
    },
    hostEvent: {
      marginTop: '2px',
      backgroundColor: theme.palette.secondary.main,
    },
    locationText: {
      marginTop: '0.8em',
      marginLeft: '0.35em',
      fontWeight: 400,
      fontSize: '1.5rem',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    dialog: {
      '& .MuiDialog-paperWidthSm': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    createForm: {
      margin: theme.spacing(1),
      padding: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

const EventView = () => {
  const [eventData, setEventData] = useState([]);
  const [sport, setSport] = useState(['Any']);
  const [location, setLocation] = useState('');
  const [selectedDate, handleDateChange] = React.useState<Date | null>(null);
  const [hideFullToggle, setHideFullToggle] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      const result = await doFetch(
        address,
        Path.EVENTS,
        Method.GET,
        false,
        null,
      );
      setEventData(await result.content);
    };
    getData();
  }, []);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  interface ISportEvent {
    id: number;
    author: string;
    admins: number[];
    name: string;
    description: string;
    location: string;
    participants: number[];
    numParticipants: number;
    maxParticipants: number;
    activeStatus: boolean;
    eventStartTime: string;
    eventCreatedTime: string;
    autoInvite: number[];
  }

  function filteredEvents() {
    let filteredData = eventData;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (hideFullToggle.checked) {
      filteredData = filteredData.filter(
        (s: ISportEvent) => s.participants.length >= s.maxParticipants,
      );
    }

    if (sport.toString() !== 'Any') {
      filteredData = filteredData.filter(
        (s: ISportEvent) =>
          s.name.toLocaleLowerCase() === sport.toString().toLocaleLowerCase(),
      );
      console.log('testi ' + filteredData);
    }

    if (location.toString() !== '') {
      filteredData = filteredData.filter((s: ISportEvent) =>
        s.location
          .toLocaleLowerCase()
          .includes(location.toString().toLocaleLowerCase()),
      );
    }

    if (selectedDate !== null) {
      filteredData = filteredData.filter(
        (s: ISportEvent) =>
          s.eventStartTime.split('T')[0] ===
          selectedDate.toJSON().split('T')[0],
      );
    }

    return filteredData;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.mainContainer}>
        <Grid item sm={6}>
          <Grid container style={{ border: '2px black' }}>
            <Grid item>
              <SportSelect getSport={sport} setSport={setSport} />
            </Grid>
            <Grid item className={classes.dateMenu}>
              <DateSelect getDate={selectedDate} setDate={handleDateChange} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={6}>
              <TextField
                className={classes.locationMenu}
                label="Location"
                onChange={handleLocationChange}
                color="secondary"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container sm={6}>
          <Grid container justify="center">
            <Grid item sm={9}>
              <Button
                variant="contained"
                className={classes.hostEvent}
                color="primary"
                onClick={handleClickOpen}
              >
                <ControlPointIcon fontSize="large" />
                <Typography variant="h4" style={{ color: 'black' }}>
                  HOST EVENT
                </Typography>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  className={classes.dialog}
                >
                  <Paper className={classes.createForm}>
                    <TestCreateEventForm />
                  </Paper>
                </Dialog>
              </Button>
            </Grid>
            <Grid item container justify="flex-start" sm={9}>
              <SwitchComponent name="Hide Full" toggle={setHideFullToggle} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.eventList}>
        <GridList cellHeight={120} className={classes.eventList} cols={1}>
          {filteredEvents().map(
            ({
              id,
              name,
              participants,
              maxParticipants,
              description,
              date,
            }) => (
              <GridListTile key={id} cols={1}>
                <EventCard
                  id={id}
                  sport={name}
                  participants={participants}
                  maxParticipants={maxParticipants}
                  description={description}
                  date={date}
                />
                ));
              </GridListTile>
            ),
          )}
        </GridList>
      </Grid>
    </>
  );
};

export default EventView;
