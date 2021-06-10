import React, { useState } from 'react';
import 'assets/scss/style.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'utils/darkmode/theme'; 
import { GlobalStyles } from 'utils/darkmode/global';

import LandingPage from 'pages/LandingPage';
import Live from 'pages/Live';
import ListRoom from 'pages/ListRoom';
import MultiRoom from 'pages/MultiRoom';

function App(props) {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
   theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  props = {
    theme,
    setTheme: toggleTheme
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyles />
        <Router>
          <Route path="/" component={() => <LandingPage {...props} /> } exact />
          <Route path="/live-stream/:id" component={() => <Live {...props} />} />
          <Route path="/list-room" component={() => <ListRoom {...props} />} />
          <Route path="/multi-room" component={() => <MultiRoom {...props} />} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
