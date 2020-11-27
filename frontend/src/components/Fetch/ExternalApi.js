import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { apiUrl, path, method, doFetch } from '../utils';

const ExternalApi = async () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-undef
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const callApi = async () => {
    try {
      const results = await doFetch(apiUrl, path.EVENTS, method.GET);
      setData(results);
    } catch (error) {
      setData(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const results = await doFetch(
        apiUrl,
        path.PROTECTEDEVENTS,
        method.GET,
        null,
        true,
      );
      setData(results);
    } catch (error) {
      setData(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Events</h1>
      <div
        className="btn-group mt-5"
        role="group"
        aria-label="External API Requests Examples"
      >
        <button type="button" className="btn btn-primary" onClick={callApi}>
          Get Public Events
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={callSecureApi}
        >
          Get Protected Events
        </button>
      </div>
      {data.length > 0 && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">
                {JSON.stringify(data, null, 2)}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalApi;
