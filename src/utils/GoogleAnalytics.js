import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

const RouteChangeTracker = ({ history }) => {
    console.log(history)
    const TRACKING_ID = 'UA-226891621-1';
    ReactGA.initialize(TRACKING_ID);
    
    useEffect(() => {
        history.listen((location, action) => {
            ReactGA.set({ page: location.pathname });
            ReactGA.pageview(location.pathname);
        }, [history]);
    })

    return <div></div>;
};

export default withRouter(RouteChangeTracker);