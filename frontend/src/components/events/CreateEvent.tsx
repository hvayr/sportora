import React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { makeStyles } from '@material-ui/core/styles';
import SportSelect from './SportSelect';
import DateTimeSelect from './DateTimeSelect';
import { address, doFetch, Method, Path } from '../../api/utils';
import { useAuth0 } from '@auth0/auth0-react';

type DialogProps = {
  name: string;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      height: '2.8em',
    },
    dialog: {
      padding: theme.spacing(1),
    },
    description: {
      marginTop: '2em',
      width: '25em',
      marginLeft: '0.5em',
    },
    date: {
      marginLeft: '3.2em',
      marginTop: '1.5em',
      '& .MuiFormLabel-root': {
        fontSize: '1.5rem',
        transform: 'translate(0, -10px) scale(1)',
      },
    },
    participants: {
      marginLeft: '0.5em',
      '& .MuiInputBase-input': {
        textAlign: 'center',
        marginLeft: '5px',
      },
    },
  }),
);

const CreateEvent: React.FC<DialogProps> = (props: DialogProps) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth0();

  const [location, setLocation] = React.useState('');
  const [maxParticipants, setMaxParticipants] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCreate = () => {
    doFetch(address, Path.EVENTS, Method.POST, true, null, {
      author: user.sub,
      name: localStorage.getItem('sport'),
      description: description,
      location: location,
      maxParticipants: parseInt(maxParticipants),
      eventStartTime: localStorage.getItem('date'),
      activeStatus: true,
    });
    console.log('author ' + user.sub);
    console.log('name ' + localStorage.getItem('sport'));
    console.log('description ' + description);
    console.log('location ' + location);
    console.log('max ' + parseInt(maxParticipants));
    console.log('start time ' + localStorage.getItem('date'));
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleMaxParticipantsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMaxParticipants(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const classes = useStyles();

  return (
    <div>
      <Button
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        <ControlPointIcon fontSize="large" />
        <Typography variant="h4" style={{ color: 'black' }}>
          HOST EVENT
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle id="form-dialog-title">Create a new event</DialogTitle>
        <DialogContent>
          <form className={classes.dialog}>
            <Grid container>
              <Grid item>
                <SportSelect />
              </Grid>
              <Grid item className={classes.date}>
                <DateTimeSelect />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    className={classes.participants}
                    label="Location"
                    onChange={handleLocationChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.participants}
                    label="Max Participants"
                    onChange={handleMaxParticipantsChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container>
                <TextField
                  label="Describe the event here"
                  className={classes.description}
                  onChange={handleDescriptionChange}
                  multiline
                >
                  Description
                </TextField>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClickCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateEvent;
