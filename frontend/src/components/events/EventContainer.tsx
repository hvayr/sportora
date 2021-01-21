import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from '../profile/Profile';
import EventView from '../views/event-view';

const EventContainer: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={EventView} />
        <Route path="/hostEvent" component={() => <div>Create event</div>} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </>
  );
};

export default EventContainer;
