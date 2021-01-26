import React, { useEffect, useState } from 'react';
import {
  address,
  doFetch,
  FetchMethod,
  ISportEvent,
  Method,
  Path,
} from './utils';
import moment from 'moment';

interface Props {
  location: string;
  sport: string;
  selectedDate: Date | null;
  pageNumber: number;
  hideFullToggle: boolean;
  renderCard: boolean;
  setRenderCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const useSearch = ({
  location,
  sport,
  selectedDate,
  pageNumber,
  hideFullToggle,
  renderCard,
  setRenderCard,
}: Props) => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState([false]);

  useEffect(() => {
    const fetch = async () => {
      const results = await doFetch(
        address,
        Path.ActiveEvents,
        Method.GET,
        FetchMethod.JSON,
        false,
      );

      if (results.status === 200) {
        setEventData(results.content);
        setRenderCard(false);
      }
    };
    fetch();
  }, [location, sport, selectedDate, pageNumber, hideFullToggle, renderCard]);

  return { eventData, loading };
};

export default useSearch;
