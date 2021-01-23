import React from 'react';
import Countdown from 'react-countdown';

const renderer = ({ hours, minutes }) => {
  return (
    <span>
      {hours}:{minutes}
    </span>
  );
};

const CountdownTimer = (props) => {
  return <Countdown date={Date.now() + 10000} renderer={renderer} />;
};

export default CountdownTimer;
