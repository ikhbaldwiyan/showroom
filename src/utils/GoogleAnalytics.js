import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

const RouteChangeTracker = ({ history }) => {
  const TRACKING_ID = 'UA-226891621-1';
  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    if (window.location.hostname !== 'localhost') {
      ReactGA.pageview(window.location.pathname);
      history.listen((location) => {
        ReactGA.pageview(location.pathname);
      },[history]);
    }
  });

  return <div></div>;
};

export default withRouter(RouteChangeTracker);