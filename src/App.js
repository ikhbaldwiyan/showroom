import 'assets/scss/style.scss';
import { Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'utils/darkmode/theme'; 
import { GlobalStyles } from 'utils/darkmode/global';
import { useDarkMode } from 'utils/useDarkMode';

import Home from 'pages/Home';
import Live from 'pages/Live';
import RoomList from 'pages/RoomList';
import MultiRoom from 'pages/MultiRoom';
import About from 'pages/About';
import GoogleAnalytics from 'utils/GoogleAnalytics';
import Login from 'pages/Login';
import Follow from "pages/Follow";
import Register from "pages/Register";
import TheaterSchedule from "pages/TheaterSchedule";
import Farming from "pages/Farming";
import LiveHistory from "pages/LiveHistory";
import DetailLiveHistory from "pages/DetailLiveHistory";
import UserList from "pages/Users/UserList";

function App(props) {
  const [theme, toggleTheme] = useDarkMode();

  props = { theme, toggleTheme }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyles />
        <GoogleAnalytics />
        <Route path="/" component={() => <Home {...props} /> } exact />
        <Route path="/room/:name/:id/" component={() => <Live {...props} />} />
        <Route path="/list-room" component={() => <RoomList {...props} />} />
        <Route path="/follow" component={() => <Follow {...props} />} />
        <Route path="/multi-room" component={() => <MultiRoom {...props} />} />
        <Route path="/about" component={() => <About {...props} />} />
        <Route path="/login" component={() => <Login {...props} />} />
        <Route path="/register" component={() => <Register {...props} />} />
        <Route path="/theater-schedule" component={() => <TheaterSchedule {...props} />} />
        <Route path="/farming" component={() => <Farming {...props} />} />
        <Route path="/live-history" component={() => <LiveHistory {...props} />} />
        <Route path="/history/:name/:id" component={() => <DetailLiveHistory {...props} />} />
        <Route path="/admin" component={() => <UserList {...props} />} />
      </div>
    </ThemeProvider>
  );
}

export default App;
