import Home from "pages/Home";
import Live from "pages/Live";
import RoomList from "pages/RoomList";
import MultiRoom from "pages/MultiRoom";
import About from "pages/About";
import Login from "pages/Login";
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
import ShowroomWrapped from "pages/wrapper/ShowroomWrapped";
import SupportProject from "pages/support/SupportProject";
import IDNLiveDetail from "pages/idn/IDNLiveDetail";
import MultiRoomIDN from "pages/idn/MultiRoomIDN";
import Leaderboard from "pages/Leaderboard";
import Android from "pages/android/Android";
import PrivacyPolicy from "pages/privacy-policy/PrivacyPolicy";
import RemoveAccount from "pages/remove-account/RemoveAccount";
import LeaderboardMember from "pages/leaderboard/LeaderboardMember";

const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/room/:name/:id/", component: Live },
  { path: "/list-room", component: RoomList },
  { path: "/follow", component: Follow },
  { path: "/multi-room", component: MultiRoom },
  { path: "/about", component: About },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/theater-schedule", component: TheaterScheduleList },
  { path: "/theater/:name/:id", component: TheaterScheduleDetail },
  { path: "/farming", component: Farming },
  { path: "/live-history", component: HistoryList },
  { path: "/history/:name/:id", component: HistoryDetail },
  { path: "/admin", component: ActivityLogList },
  { path: "/users", component: UserList },
  { path: "/theaters", component: TheaterList },
  { path: "/members", component: MemberList },
  { path: "/premium-live", component: PremiumLiveList },
  { path: "/activity", component: ActivityLogList },
  { path: "/wrapped", component: ShowroomWrapped },
  { path: "/support-project", component: SupportProject },
  { path: "/idn/:id", component: IDNLiveDetail },
  { path: "/multi-room-idn", component: MultiRoomIDN },
  { path: "/leaderboard", component: Leaderboard },
  { path: "/android", component: Android },
  { path: "/privacy-policy", component: PrivacyPolicy },
  { path: "/remove-account", component: RemoveAccount },
  { path: "/leaderboard-members", component: LeaderboardMember },

];

export default routes;
