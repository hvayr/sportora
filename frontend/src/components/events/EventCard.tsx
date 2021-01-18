import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { sports } from '../../api/sports';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 700,
      maxWidth: 800,
      margin: '2px',
      height: '220px',
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
      '&::after, &::before': {
        position: 'absolute',
        content: '""',
        width: '150px',
        height: '10px',
        background: theme.palette.secondary.main,
        bottom: '17.2em',
      },
      '&::before': {
        right: '50%',
        transform: 'skew(0, 20deg)',
      },
      '&::after': {
        left: '50%',
        transform: 'skew(0, -20deg)',
      },
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
    },
    participantContainer: {
      height: '130px',
    },
  }),
);

type EventProps = {
  id: number;
  sport: string;
  participants: string[];
  numParticipants: number;
  maxParticipants: number;
  description: string;
  date: string;
  author: string;
};

const EventCard: React.FC<EventProps> = (props: EventProps) => {
  const classes = useStyles();

  const getIcon = sports.map((s) => {
    if (s.value === props.sport) {
      return s.icon;
    }
  });

  return (
    <Grid container>
      <Grid item>
        <Card className={classes.root}>
          <CardContent>
            <Grid container>
              <Grid item xs={1}>
                {getIcon}
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5" component="h1">
                  {props.sport}
                </Typography>
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
                  <Typography component="p">{props.description}</Typography>
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
                  <Grid item>
                    <Typography variant="h6">PARTICIPANTS</Typography>
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
