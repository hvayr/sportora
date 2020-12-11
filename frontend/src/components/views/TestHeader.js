import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';

const TestHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ProfileMenu />
        <h1>Test</h1>
      </Toolbar>
    </AppBar>
  );
};

export default TestHeader;
