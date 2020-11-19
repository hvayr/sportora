import React from 'react';

import AuthNav from './auth-nav';
import { MainView } from './main-view';

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <MainView />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
