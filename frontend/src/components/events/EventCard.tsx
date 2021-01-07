import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 700,
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
  participants: number;
  description: string;
};

export default function EventCard(props: EventProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.sport}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.participants}
        </Typography>
        <Typography variant="body2" component="p">
          {props.description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">JOIN</Button>
      </CardActions>
    </Card>
  );
}