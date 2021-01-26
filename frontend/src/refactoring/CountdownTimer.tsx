import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import { useTimer } from 'react-timer-hook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

interface Props {
  hours: number;
  minutes: number;
}

// const checkTime = () => {};

const renderer = ({ hours, minutes }: Props) => {
  return (
    <span>
      {hours}:{minutes}
    </span>
  );
};

interface ITimerProps {
  eventStartTime: string;
}

const CountdownTimer: React.FC = ({ expiryTimestamp }: any) => {
  // const { seconds, minutes, hours, days, isRunning, start } = useTimer({
  //   expiryTimestamp,
  // });
  //
  // start();
  //
  // // const eventTime = moment(eventStartTime);
  // // const currentTime = moment(moment().format());
  //
  // // return <Countdown date={Date.now() + 10000} renderer={renderer} />;
  // return (
  //   <div>
  //     <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
  //     <span>{seconds}</span>
  //     <button onClick={start}>Start</button>
  //   </div>
  // );

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>react-timer-hook </h1>
      <p>Timer Demo</p>
      <div style={{ fontSize: '100px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
    </div>
  );
};

export default CountdownTimer;
