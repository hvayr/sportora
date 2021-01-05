import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';
import { Grid, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EventView from './views/event-view';

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {},
}));

const EventContainer: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Switch>
        <Route exact path="/" component={EventView} />
        <Route path="/hostEvent" component={() => <div>Create event</div>} />
        <Route path="/profile" component={Profile} />
        <Route path="/editProfile" component={EditProfile} />
      </Switch>
    </>
  );
};

export default EventContainer;
