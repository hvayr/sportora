import { date } from 'yup';
import { ISportEvent } from '../../api/utils';
import React from 'react';

interface Props {
  eventData: never[];
  sport: string;
  location: string;
  selectedDate: Date | null;
  hideFullToggle: boolean;
}

const filteredEvents = ({
  eventData,
  sport,
  location,
  selectedDate,
  hideFullToggle,
}: Props) => {
  let filteredData = eventData;

  filteredData = filteredData.filter((s: ISportEvent) => s.activeStatus);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (hideFullToggle.checked) {
    filteredData = filteredData.filter(
      (s: ISportEvent) => s.numParticipants < s.maxParticipants,
    );
  }

  if (sport.toString() !== '') {
    filteredData = filteredData.filter(
      (s: ISportEvent) =>
        s.name.toLocaleLowerCase() === sport.toString().toLocaleLowerCase(),
    );
  }

  if (location.toString() !== '') {
    filteredData = filteredData.filter((s: ISportEvent) =>
      s.location
        .toLocaleLowerCase()
        .includes(location.toString().toLocaleLowerCase()),
    );
  }

  if (selectedDate !== null) {
    filteredData = filteredData.filter(
      (s: ISportEvent) =>
        s.eventStartTime.split('T')[0] === selectedDate.toJSON().split('T')[0],
    );
  }

  filteredData.sort(function (a, b): any {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new Date(a.eventStartTime) - new Date(b.eventStartTime);
  });

  return filteredData;
};

export default filteredEvents;
