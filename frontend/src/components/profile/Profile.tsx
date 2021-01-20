import React from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Theme,
  Tabs,
  Tab,
  Box,
  AppBar,
} from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import DeleteProfile from './DeleteProfile';
import { NickName } from '../Nickname';
import MyEvents from './MyEvents';
import JoinedEvents from './JoinedEvents';

interface TabPanelProps {
  children?: React.ReactNode;
  index: unknown;
  value: unknown;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return <div>{value === index && <Box p={3}>{children}</Box>}</div>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(6),
      flexGrow: 1,
    },
    components: {
      flexGrow: 1,
    },
  }),
);

const Profile: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <NickName />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AppBar position="static">
              <Tabs
                className={classes.components}
                value={value}
                onChange={handleChange}
              >
                <Tab label="My events" {...0} />
                <Tab label="Joined events" {...1} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              {MyEvents}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {JoinedEvents}
            </TabPanel>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div>
              Want to erase your account? <DeleteProfile />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
