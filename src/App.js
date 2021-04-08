import React from 'react';
import 'assets/scss/style.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LandingPage from 'pages/LandingPage';
import Live from 'pages/streaming/Live';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={LandingPage} exact />
        <Route path="/live-stream" component={Live} />
      </Router>
    </div>
  );
}

export default App;
