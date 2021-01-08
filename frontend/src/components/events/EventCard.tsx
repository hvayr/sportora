import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 700,
      maxHeight: 120,
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
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
  }),
);

type EventProps = {
  id: number;
  sport: string;
  participants: string[];
  maxParticipants: number;
  description: string;
  date: string;
};

const EventCard: React.FC<EventProps> = (props: EventProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container style={{ border: '2px solid' }}>
          <Grid item sm={12}>
            <Grid container style={{ border: '1px blue' }}>
              <Grid item>
                <Typography variant="h5" component="h2">
                  {props.sport}
                </Typography>
              </Grid>
              <Grid container sm={12}>
                <Grid item sm={6}>
                  <Typography variant="body2" component="p">
                    {props.description}
                    <br />
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Typography className={classes.pos} color="textSecondary">
                    Participants: {props.participants.length}/
                    {props.maxParticipants}
                  </Typography>
                </Grid>
                <CardActions>
                  <Button size="small">JOIN</Button>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EventCard;
