import React, { useState } from 'react';
import 'assets/scss/style.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'utils/darkmode/theme'; 
import { GlobalStyles } from 'utils/darkmode/global';

import LandingPage from 'pages/LandingPage';
import Live from 'pages/streaming/Live';
import ListRoom from 'pages/jeketi/ListRoom';

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
   theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyles />
        <Router>
          <Route path="/" component={() => <LandingPage theme={theme} setTheme={toggleTheme} /> } exact />
          <Route path="/live-stream/:id" component={() => <Live theme={theme} setTheme={toggleTheme} />} />
          <Route path="/list-room" component={() => <ListRoom theme={theme} setTheme={toggleTheme} />} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
