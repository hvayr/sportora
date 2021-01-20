import React from 'react';
import MainView from './components/views/main-view';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './components/ui/Theme';

const App: React.FC = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainView />
      </ThemeProvider>
    </div>
  );
};

export default App;
