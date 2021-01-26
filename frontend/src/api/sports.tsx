import { SportsHockey, SportsSoccer, SportsTennis } from '@material-ui/icons';
import React from 'react';
import { colors } from '../components/ui/Theme';

export const sports = [
  {
    value: 'Hockey',
    icon: <SportsHockey fontSize="large" style={{ color: `${colors.dark}` }} />,
  },
  {
    value: 'Football',
    icon: <SportsSoccer fontSize="large" style={{ color: `${colors.dark}` }} />,
  },
  {
    value: 'Badminton',
    icon: <SportsTennis fontSize="large" style={{ color: `${colors.dark}` }} />,
  },
  {
    value: 'Tennis',
    icon: <SportsTennis fontSize="large" style={{ color: `${colors.dark}` }} />,
  },
];
