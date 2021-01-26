/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, IconButton } from '@material-ui/core';
import { sports } from '../../api/sports';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import {
  address,
  doFetch,
  FetchMethod,
  IUser,
  Method,
  Path,
} from '../../api/utils';
import { getNickName } from '../../api/getNickName';
import CountdownTimer from './CountdownTimerJS';

import ParticipantPopOver from '../ui/ParticipantPopOver';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 700,
      margin: '1px',
      // backgroundColor: theme.palette.secondary.main,
      backgroundColor: '#FFE0B2',
      boxShadow: 'inset 1px 1px 10px',
      // boxShadow: 'inset 0 5px 10px 0px rgba(0,0,0,.5)',
      color: theme.palette.primary.main,
      borderRadius: '10px',
      transition: 'background-color',
      '& .MuiCard-root': {
        overflow: 'visible',
      },
      '&:hover': {
        backgroundColor: theme.palette.custom.color2,
        transitionDuration: '500ms',
        transitionTimingFunction: 'ease-out',
      },
      // '&::after, &::before': {
      //   position: 'absolute',
      //   content: '""',
      //   width: '150px',
      //   height: '10px',
      //   background: theme.palette.secondary.main,
      //   bottom: '17.2em',
      // },
      // '&::before': {
      //   right: '50%',
      //   transform: 'skew(0, 20deg)',
      // },
      // '&::after': {
      //   left: '50%',
      //   transform: 'skew(0, -20deg)',
      // },
    },
    joined: {
      backgroundColor: '#2FFA80',
    },
    hosted: {
      backgroundColor: '#168AFA',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    sportName: {
      fontWeight: 600,
      textTransform: 'uppercase',
      // backgroundColor: theme.palette.primary.main,
      // padding: '5px',
    },
    startTime: {
      marginTop: '2px',
    },
    location: {
      marginTop: '10px',
    },
    pos: {
      marginBottom: 12,
    },
    hostContainer: {
      marginTop: '-20px',
    },
    descriptionContainer: {
      height: '100px',
      marginTop: '30px',
    },
    participantContainer: {},
    participantText: {
      marginLeft: '40px',
    },
    participantList: {
      marginTop: '-20px',
    },
    expandIcon: {
      marginTop: '-8px',
    },
    joinButton: {
      color: theme.palette.custom.color2,
      backgroundColor: theme.palette.primary.main,
      '& .MuiTypography-h5': {
        fontWeight: 600,
      },
    },
    nickname: {
      color: theme.palette.custom.color3,
      fontWeight: 600,
    },
  }),
);

interface EventProps {
  id: number;
  sport: string;
  participants: IUser[];
  numParticipants: number;
  maxParticipants: number;
  description: string;
  eventStartTime: string;

  author: string;
  location: string;
  setRenderCard: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  nickName: string;
  activeStatus: boolean;
}

const EventCard: React.FC<EventProps> = (props: EventProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const classes = useStyles();

  const getIcon = sports.map((s) => {
    if (s.value === props.sport) {
      return s.icon;
    }
  });

  function joined() {
    return props.participants
      .map((participant: any) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {
          if (participant.user) {
            if (participant.user.authId != null) {
              // console.log('id ', participant.user.authId);
              return participant.user.authId === localStorage.getItem('sub');
            }
          }
        },
      )
      .includes(true);
  }

  const handleJoin = async () => {
    const results = await doFetch(
      address,
      Path.AddUserToEvent,
      Method.POST,
      FetchMethod.JSON,
      true,
      props.id,
    );
    props.setRenderCard(true);
  };

  const handleLeave = async () => {
    const results = await doFetch(
      address,
      Path.RemoveUserFromEvent,
      Method.DELETE,
      FetchMethod.JSON,
      true,
      props.id,
    );
    props.setRenderCard(true);
  };

  const handleClickOpenPopOver = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const isEventFull = () => {
    return props.numParticipants >= props.maxParticipants;
  };

  const path = Path.NickNameByAuthId;

  const authorNickName = () => {
    return getNickName(path, props.author);
  };

  function isAuthor() {
    return props.author === localStorage.getItem('sub');
  }

  const disableJoin = () => {
    if (isEventFull() && !joined) {
      return true;
    }
    return !localStorage.getItem('sub');
  };

  const currentTime = moment(new Date());
  const eventTime = moment(props.eventStartTime);
  const diffTime = eventTime.diff(currentTime, 'second');
  const timeRemaining = new Date();
  timeRemaining.setSeconds(timeRemaining.getSeconds() + diffTime);

  return (
    <Grid container>
      <Grid item>
        <Card
          className={
            isAuthor()
              ? clsx(classes.root, classes.hosted)
              : !joined()
              ? classes.root
              : clsx(classes.root, classes.joined)
          }
        >
          <CardContent>
            <Grid container>
              <Grid item xs={1}>
                {getIcon}
              </Grid>
              <Grid item container direction="column" xs={5}>
                <Grid item>
                  <Typography
                    variant="h5"
                    component="h1"
                    className={classes.sportName}
                  >
                    {props.sport}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.startTime}>
                    {moment(props.eventStartTime).format('MMMM Do, h:mm a')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.location}>
                    {props.location}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                justify="flex-end"
                alignItems="flex-start"
                xs={6}
              >
                <Grid item xs={12}>
                  <CountdownTimer expiryTimestamp={timeRemaining} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  container
                  xs={6}
                  className={classes.descriptionContainer}
                  alignItems="center"
                >
                  <Grid item xs={2} />
                  <Grid item xs={6}>
                    <Typography component="h4">
                      Description: {props.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  xs={6}
                  justify="space-around"
                  alignItems="flex-start"
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    direction="column"
                    className={classes.hostContainer}
                  >
                    <Grid item>
                      <Typography>HOST</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5" className={classes.nickname}>
                        {authorNickName()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container className={classes.participantContainer}>
                    <Grid
                      item
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item container justify="center">
                        <Typography
                          className={classes.participantText}
                          variant="h6"
                        >
                          PARTICIPANTS
                        </Typography>
                        <Grid item>
                          <IconButton
                            className={classes.expandIcon}
                            onClick={handleClickOpenPopOver}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      {/*<Grid item>*/}
                      {/*  <Collapse*/}
                      {/*    in={expanded}*/}
                      {/*    timeout="auto"*/}

                      {/*    unmountOnExit*/}
                      {/*    className={classes.participantList}*/}
                      {/*  >*/}
                      {/*    <CardContent>*/}
                      {/*      <Typography style={{ color: '#E65100' }}>*/}
                      {/*        {nameList()}*/}
                      {/*      </Typography>*/}
                      {/*    </CardContent>*/}
                      {/*  </Collapse>*/}
                      {/*</Grid>*/}
                      <Grid item>
                        <ParticipantPopOver
                          anchorEl={anchorEl}
                          setAnchorEl={setAnchorEl}
                          names={props.participants}
                        />
                      </Grid>
                      <Grid item container justify="center">
                        <Typography variant="h6">
                          {props.numParticipants} / {props.maxParticipants}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justify="flex-end"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <Button
                      size="small"
                      className={classes.joinButton}
                      variant="contained"
                      onClick={joined() ? handleLeave : handleJoin}
                      disabled={disableJoin()}
                    >
                      <Typography variant="h5">
                        {joined() ? 'LEAVE' : 'JOIN'}
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EventCard;
