import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { sports } from '../../api/sports';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 700,
      maxWidth: 800,
      height: '220px',
      backgroundColor: '#FF9800',
      borderColor: theme.palette.secondary.main,
      borderRadius: '10px',
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

  console.log(getIcon);

  return (
    <Grid container>
      <Grid item>
        <Card className={classes.root} variant="outlined" raised style={{ props. }}>
          <CardContent>
            <Grid container>
              <Grid item xs={1}>
                {getIcon}
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="column"
                justify="space-around"
                className={classes.sportName}
              >
                <Grid item>
                  <Typography variant="h5" component="h1">
                    {props.sport}
                  </Typography>
                </Grid>
                <Grid item>
                  Participants: {props.numParticipants}/{props.maxParticipants}
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                xs={7}
                justify="space-around"
                alignItems="flex-start"
              >
                <Grid item>
                  <Typography>Host: {props.author}</Typography>
                </Grid>
                <Grid item>
                  <Typography component="p">{props.description}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    // <Card className={classes.root} variant="outlined">
    //   <CardContent>
    //     <Grid container>
    //       <Grid item sm={12}>
    //         <Grid container>
    //           <Grid item>
    //             <Typography variant="h5" component="h2">
    //               {props.sport}
    //             </Typography>
    //             {getIcon}
    //           </Grid>
    //           <Grid container sm={12}>
    //             <Grid item sm={6}>
    //               <Typography variant="body2" component="p">
    //                 {props.description}
    //                 <br />
    //               </Typography>
    //             </Grid>
    //             <Grid item sm={4}>
    //               <Typography className={classes.pos} color="textSecondary">
    //                 Participants: {props.participants.length}/
    //                 {props.maxParticipants}
    //               </Typography>
    //             </Grid>
    //             <CardActions>
    //               <Button size="small">JOIN</Button>
    //             </CardActions>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </CardContent>
    // </Card>
  );
};

export default EventCard;
