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
import TheaterScheduleList from "pages/theater/TheaterScheduleList";
import TheaterScheduleDetail from "pages/theater/TheaterScheduleDetail";
import Farming from "pages/Farming";
import HistoryList from "pages/history/HistoryList";
import HistoryDetail from "pages/history/HistoryDetail";
import UserList from "pages/admin/user/UserList";
import TheaterList from "pages/admin/theater/TheaterList";
import MemberList from "pages/admin/members/MemberList";
import PremiumLiveList from "pages/admin/premium-live/PremiumLiveList";
import ActivityLogList from "pages/admin/activity/ActivityLogList";
import SharingLive from "pages/sharing/SharingLive";

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
        <Route path="/theater-schedule" component={() => <TheaterScheduleList {...props} />} />
        <Route path="/theater/:name/:id" component={() => <TheaterScheduleDetail {...props} />} />
        <Route path="/farming" component={() => <Farming {...props} />} />
        <Route path="/live-history" component={() => <HistoryList {...props} />} />
        <Route path="/history/:name/:id" component={() => <HistoryDetail {...props} />} />
        <Route path="/admin" component={() => <ActivityLogList {...props} />} />
        <Route path="/users" component={() => <UserList {...props} />} />
        <Route path="/theaters" component={() => <TheaterList {...props} />} />
        <Route path="/members" component={() => <MemberList {...props} />} />
        <Route path="/premium-live" component={() => <PremiumLiveList {...props} />} />
        <Route path="/activity" component={() => <ActivityLogList {...props} />} />
        <Route path="/sharing-live" component={() => <SharingLive {...props} />} />
      </div>
    </ThemeProvider>
  );
}

export default App;
