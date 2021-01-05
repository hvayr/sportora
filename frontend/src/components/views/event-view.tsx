import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputBase from '@material-ui/core/InputBase';
import SimpleCard from '../events/EventCard';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import { address, doFetch, Method, Path } from '../../api/utils';
import GridListTile from '@material-ui/core/GridListTile';
import ImageGridList from './test-view';
import { createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import SportSelect from '../events/SportSelect';
import LocationSelect from '../events/LocationSelect';
import DateSelect from '../events/DateTimeSelect';
import SwitchComponent from '../events/SwitchComponent';
import CreateEvent from '../events/CreateEvent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '0.5em',
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
    },
    eventList: {
      height: 1050,
      marginTop: '5px',
    },
    mainContainer: {
      backgroundColor: theme.palette.primary.main,
      height: '10em',
      border: '3px solid',
      borderRadius: '10px',
    },
    panel: {
      height: '4.5em',
    },
    dateMenu: {
      height: '4.5em',
      '& .MuiFormControl-marginNormal': {
        marginTop: '20px',
      },
    },
    hostEvent: {
      marginTop: '2px',
      backgroundColor: theme.palette.secondary.main,
    },
    inputContainer: {},
    inputs: {},
    hostContainer: {},
  }),
);

const EventView: React.FC = () => {
  const [eventData, setEventData] = useState([]);

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

  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.mainContainer}>
        <Grid container>
          <Grid item sm={6} className={classes.inputContainer}>
            <Grid item className={classes.panel}>
              <SportSelect />
            </Grid>
            <Grid container>
              <Grid item sm={6} className={classes.panel}>
                <LocationSelect />
              </Grid>
              <Grid item sm={6} className={classes.dateMenu}>
                <DateSelect />
              </Grid>
            </Grid>
          </Grid>
          <Grid container sm={6}>
            <Grid container justify="center">
              <Grid item sm={9}>
                <Button variant="contained" className={classes.hostEvent}>
                  <CreateEvent name="test" />
                </Button>
              </Grid>
              <Grid item container justify="flex-start" sm={9}>
                <SwitchComponent name="My Events" />
              </Grid>
              <Grid item container justify="flex-start" sm={9}>
                <SwitchComponent name="Hide Full" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.eventList}>
        <GridList cellHeight={120} className={classes.eventList} cols={1}>
          {eventData.map((e) => (
            <GridListTile key={e} cols={1}>
              <SimpleCard />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </>
    //   <Grid container className={classes.panel}>
    //     <Grid container className={classes.panel} direction="column"></Grid>
    //   </Grid>
    // </>
  );
};

export default EventView;
