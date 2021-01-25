import React, { useEffect, useState } from 'react';
import {
  address,
  doFetch,
  FetchMethod,
  ISportEvent,
  Method,
  Path,
} from './utils';

interface Props {
  location: string;
  sport: string[];
  selectedDate: Date | null;
  pageNumber: number;
  hideFullToggle: boolean;
}

const useSearch = ({
  location,
  sport,
  selectedDate,
  pageNumber,
  hideFullToggle,
}: Props) => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState([false]);

  useEffect(() => {
    const fetch = async () => {
      const checkActiveState = await doFetch(
        address,
        Path.CheckActiveState,
        Method.POST,
        FetchMethod.Text,
        false,
      );

      const results = await doFetch(
        address,
        `search&${location}&${sport}&${selectedDate}&${pageNumber}`,
        Method.GET,
        FetchMethod.JSON,
        false,
      );
      await checkActiveState;
      if (results.status === 200) {
        setEventData(results.content);
      }
      console.log('useSearch: ', results.content);
    };
    fetch();
  }, [location, sport, selectedDate, pageNumber, hideFullToggle]);

  // function filteredEvents() {
  //   let filteredData = eventData;
  //
  //   filteredData = filteredData.filter((s: ISportEvent) => s.activeStatus);
  //
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   if (hideFullToggle.checked) {
  //     filteredData = filteredData.filter(
  //       (s: ISportEvent) => s.numParticipants < s.maxParticipants,
  //     );
  //   }
  //
  //   if (sport.toString() !== 'Any') {
  //     filteredData = filteredData.filter(
  //       (s: ISportEvent) =>
  //         s.name.toLocaleLowerCase() === sport.toString().toLocaleLowerCase(),
  //     );
  //   }
  //
  //   if (location.toString() !== '') {
  //     filteredData = filteredData.filter((s: ISportEvent) =>
  //       s.location
  //         .toLocaleLowerCase()
  //         .includes(location.toString().toLocaleLowerCase()),
  //     );
  //   }
  //
  //   if (date !== null) {
  //     filteredData = filteredData.filter(
  //       (s: ISportEvent) =>
  //         s.eventStartTime.split('T')[0] === date.toJSON().split('T')[0],
  //     );
  //   }
  //
  //   filteredData.sort(function (a, b): any {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     return new Date(a.eventStartTime) - new Date(b.eventStartTime);
  //   });
  //
  //   console.log('filteredData ' + filteredData.map((e: any) => e.activeStatus));
  //
  //   return filteredData;
  // }

  return { eventData, loading };
};

export default useSearch;
