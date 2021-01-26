import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventCard from '../events/EventCard';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { createStyles, Theme } from '@material-ui/core/styles';
import SportSelect from '../events/SportSelect';
import DateSelect from '../events/DateSelect';
import SwitchComponent from '../events/SwitchComponent';
import CreateEventForm from '../events/CreateEventForm';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import useSearch from '../../api/useSearch';
import filteredEvents from '../events/filterEvents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    eventList: {
      height: 1050,
      marginTop: '15px',
      display: 'block',
      '&::-webkit-scrollbar': {
        width: '1em',
      },
      '&::-webkit-scrollbar-thumb': {
        background: `linear-gradient(${theme.palette.custom.color1}, ${theme.palette.primary.main})`,
        borderRadius: '6px',
      },
    },
    mainContainer: {
      backgroundColor: '#FFFFFF',
      height: '11em',
      borderRadius: '10px',
    },
    locationMenu: {
      ...theme.select,
      '& .MuiInputBase-input': {
        backgroundColor: theme.palette.custom.color2,
      },
      marginLeft: '-75px',
      marginTop: '-1em',
      height: '1em',
    },
    dateMenu: {
      marginLeft: '-6.5em',
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
      marginTop: '7px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.custom.color2,
      '& .MuiTypography-h4': {
        fontWeight: 600,
      },
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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EventView = () => {
  // const [eventData, setEventData] = useState([]);
  const [sport, setSport] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, handleDateChange] = React.useState<Date | null>(null);
  const [hideFullToggle, setHideFullToggle] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [renderCard, setRenderCard] = React.useState(false);
  const [perPage, setPerPage] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(null);

  const { eventData, loading } = useSearch({
    location,
    sport,
    selectedDate,
    pageNumber,
    hideFullToggle,
    setRenderCard,
    renderCard,
  });

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickOpenDialog = () => {
    localStorage.getItem('sub')
      ? handleOpenDialog()
      : alert('You need to be logged in to' + ' host an event.');
  };

  // function filteredData() {
  //   console.log('initial data ', eventData);
  //   let filteredData = eventData;
  //   filteredData = filteredData.filter((s: ISportEvent) => s.activeStatus);
  //
  //   console.log('filteredData ', filteredData);
  //   return filteredData;
  // }

  const classes = useStyles();

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Event created succesfully!
        </Alert>
      </Snackbar>
      <Grid
        container
        className={classes.mainContainer}
        spacing={1}
        justify="center"
      >
        <Grid item container alignItems="center" justify="center">
          <Grid item>
            <SportSelect getSport={sport} setSport={setSport} />
          </Grid>
          <Grid item className={classes.dateMenu}>
            <DateSelect date={selectedDate} setDate={handleDateChange} />
          </Grid>
          <Grid item>
            <TextField
              className={classes.locationMenu}
              label="Location"
              variant="outlined"
              onChange={handleLocationChange}
              color="secondary"
            />
          </Grid>
        </Grid>
        <Grid item container justify="center">
          <Grid item>
            <Button
              variant="contained"
              className={classes.hostEvent}
              color="primary"
              onClick={handleClickOpenDialog}
            >
              <ControlPointIcon fontSize="large" />
              <Typography variant="h4">HOST EVENT</Typography>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                className={classes.dialog}
              >
                <Paper className={classes.createForm}>
                  <CreateEventForm
                    setOpenDialog={setOpenDialog}
                    setOpenEventViewSnackbar={setOpenSnackbar}
                  />
                </Paper>
              </Dialog>
            </Button>
          </Grid>
          <Grid item style={{ marginTop: '20px', marginLeft: '20px' }}>
            <SwitchComponent name="Hide Full" toggle={setHideFullToggle} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.eventList}>
        <Grid item>
          <GridList cellHeight="auto" className={classes.eventList} cols={1}>
            {filteredEvents({
              eventData,
              sport,
              location,
              selectedDate,
              hideFullToggle,
            }).map(
              ({
                id,
                name,
                participants,
                maxParticipants,
                numParticipants,
                description,
                eventStartTime,
                author,
                location,
                userName,
                nickName,
                activeStatus,
              }) => (
                <Grid container key={id} justify="center">
                  <Grid item>
                    <GridListTile key={id} cols={1}>
                      <EventCard
                        id={id}
                        sport={name}
                        participants={participants}
                        maxParticipants={maxParticipants}
                        numParticipants={numParticipants}
                        description={description}
                        eventStartTime={eventStartTime}
                        author={author}
                        location={location}
                        userName={userName}
                        nickName={nickName}
                        activeStatus={activeStatus}
                        setRenderCard={setRenderCard}
                      />
                      ));
                    </GridListTile>
                  </Grid>
                </Grid>
              ),
            )}
          </GridList>
        </Grid>
      </Grid>
    </>
  );
};

export default EventView;
