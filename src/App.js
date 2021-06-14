import React, { useState } from 'react';
import 'assets/scss/style.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'utils/darkmode/theme'; 
import { GlobalStyles } from 'utils/darkmode/global';

import Home from 'pages/Home';
import Live from 'pages/Live';
import RoomList from 'pages/RoomList';

function App(props) {
  const [theme, setTheme] = useState('light');
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
          <Route path="/" component={() => <Home {...props} /> } exact />
          <Route path="/live-stream/:id" component={() => <Live {...props} />} />
          <Route path="/list-room" component={() => <RoomList {...props} />} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
