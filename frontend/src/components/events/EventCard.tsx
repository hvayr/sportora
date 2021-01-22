/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Collapse, Grid, IconButton } from '@material-ui/core';
import { sports } from '../../api/sports';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { address, doFetch, Method, Path } from '../../api/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 700,
      margin: '1px',
      backgroundColor: theme.palette.secondary.main,
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
    pos: {
      marginBottom: 12,
    },
    descriptionContainer: {
      height: '100px',
      marginTop: '30px',
    },
    participantContainer: {
      height: '130px',
    },
    participantText: {
      marginLeft: '40px',
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

interface IUser {
  id: number;
  authId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  nickName: string | null;
  gender: null;
  groups: null;
  imageUrl: null;
}

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
  setRenderCard: any;
  userName: string;
}

const EventCard: React.FC<EventProps> = (props: EventProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const getIcon = sports.map((s) => {
    if (s.value === props.sport) {
      return s.icon;
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const joined = props.participants
    .map(
      (participant) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        participant.user.authId === localStorage.getItem('sub'),
    )
    .includes(true);

  const handleJoin = async () => {
    const results = await doFetch(
      address,
      Path.ADDUSERTOEVENT,
      Method.POST,
      true,
      props.id,
    );
    props.setRenderCard(true);
  };

  const handleLeave = async () => {
    const results = await doFetch(
      address,
      Path.REMOVEUSERFROMEVENT,
      Method.DELETE,
      true,
      props.id,
    );
    props.setRenderCard(true);
  };

  const nameList = () => {
    let list = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    list = props.participants.map((p) => p.user.userName);
    console.log();
    return list.join(', ');
  };

  const isEventFull = () => {
    return props.numParticipants >= props.maxParticipants;
  };

  // const authorUserName = () => {
  //   // eslint-disable-next-line react/prop-types,@typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   // eslint-disable-next-line react/prop-types
  //   return props.admins.user[0]?.userName;
  // };

  return (
    <Grid container>
      <Grid item>
        <Card
          className={classes.root}
          style={expanded ? { height: 260 + nameList().length * 3 } : {}}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={1}>
                {getIcon}
              </Grid>
              <Grid item container direction="column" xs={3}>
                <Grid item>
                  <Typography
                    variant="h4"
                    component="h1"
                    className={classes.sportName}
                  >
                    {props.sport}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {moment(props.eventStartTime).format('MMMM Do, h:mm')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{props.location}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={2} />
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
                  style={{ height: '70px' }}
                  alignItems="center"
                  direction="column"
                >
                  <Grid item>
                    <Typography>HOST</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" className={classes.nickname}>
                      {/*{authorUserName()}*/}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} />
              <Grid
                item
                container
                xs={5}
                className={classes.descriptionContainer}
              >
                <Grid item>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <Typography component="h4">"{props.description}"</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={6}
                className={classes.participantContainer}
              >
                <Grid
                  item
                  container
                  direction="column"
                  justify="flex-start"
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
                        onClick={handleExpandClick}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography>{nameList()}</Typography>
                      </CardContent>
                    </Collapse>
                  </Grid>
                  <Grid item container justify="center">
                    <Typography variant="h6">
                      {props.numParticipants} / {props.maxParticipants}
                    </Typography>
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
                      onClick={joined ? handleLeave : handleJoin}
                      disabled={isEventFull() && !joined}
                    >
                      <Typography variant="h5">
                        {joined ? 'LEAVE' : 'JOIN'}
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
