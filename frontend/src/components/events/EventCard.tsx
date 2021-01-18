import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Collapse, Grid, IconButton } from '@material-ui/core';
import { sports } from '../../api/sports';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';

const dummyParticipants = [
  {
    nickname: 'testimies1',
  },

  {
    nickname: 'testimies2',
  },
  {
    nickname: 'testimies3',
  },

  {
    nickname: 'testimies4',
  },
  {
    nickname: 'testimies5',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 700,
      margin: '2px',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '10px',
      transition: 'background-color',
      '& .MuiCard-root': {
        overflow: 'visible',
      },
      '&:hover': {
        backgroundColor: '#BF360C',
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
    pos: {
      marginBottom: 12,
    },
    sportName: {
      height: '100px',
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
  }),
);

interface EventProps {
  id: number;
  sport: string;
  participants: string[];
  numParticipants: number;
  maxParticipants: number;
  description: string;
  eventStartTime: string;
  author: string;
  location: string;
}

export interface DialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const EventCard: React.FC<EventProps> = (
  props: EventProps,
  dialogProps: DialogProps,
) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const getIcon = sports.map((s) => {
    if (s.value === props.sport) {
      return s.icon;
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const nameList: any = () => {
    let list = [];
    list = dummyParticipants.map((p) => p.nickname);
    console.log('List: ' + list);
    console.log();
    return list.join(', ');
  };

  return (
    <Grid container>
      <Grid item>
        <Card
          className={classes.root}
          style={
            expanded ? { height: 250 + dummyParticipants.length * 10 } : {}
          }
        >
          <CardContent>
            <Grid container>
              <Grid item xs={1}>
                {getIcon}
              </Grid>
              <Grid item container direction="column" xs={3}>
                <Grid item>
                  <Typography variant="h5" component="h1">
                    {props.sport}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {moment(props.eventStartTime).format('MMMM Do, h:mm')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>{props.location}</Typography>
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
                    <Typography variant="h6">HOST</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Nickname</Typography>
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
                  <Typography component="p">"{props.description}"</Typography>
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
                        {/*<Dialog open={open} onClose={handleClose}>
                          <List>
                            {dummyParticipants.map((p) => (
                              <ListItem key={p.nickname}>p.nickname</ListItem>
                            ))}
                          </List>
                        </Dialog>*/}
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
                    <Button size="large">
                      <Typography variant="h6">JOIN</Typography>
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
