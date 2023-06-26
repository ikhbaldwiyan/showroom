// BASE URL API
const API = "https://jkt48-showroom-api.vercel.app/api";
const API_USERS = "https://jkt48-showroom-users.ikhbaldwiyan.repl.co"
const LIVE = `${API}/lives`;
const ROOM = `${API}/rooms`;

// LARAVEL API
const LARAVEL_API = "https://laravel-showroom-api.vercel.app/api";
const LOGIN = `${LARAVEL_API}/login`;
const SEND_COMMENT = `${LARAVEL_API}/live/comment`;
const UPDATE_PROFILE = `${LARAVEL_API}/profile/update`;
const GET_AVATAR = `${LARAVEL_API}/profile/get_avatar`;
const UPDATE_AVATAR = `${LARAVEL_API}/profile/update_avatar`;
const USER_PROFILE = `${LARAVEL_API}/profile/user`;
const ROOM_FOLLOW = `${LARAVEL_API}/room/followed_rooms`;
const FOLLOW = `${LARAVEL_API}/room/follow`;
const PROFILE_API = `${LARAVEL_API}/profile/room`;
const REGISTER = `${LARAVEL_API}/register`;
const FARM = `${LARAVEL_API}/farm/start`;
const ROOM_OFFICIAL = `${LARAVEL_API}/farm/get_room`;
const BULK_GIFT = `${LARAVEL_API}/live/bulk_gift`;
const SEND_GIFT = `${LARAVEL_API}/live/send_gift`;

// SHOWROOM LOG API
const SHOWROOM_LOG_API = "https://dc.crstlnz.site/api/showroom";
const RECENT_LIVE_LOG_API = (
  sort = "date",
  page = "1",
  filter = "active",
  order = "-1",
  perpage = "10",
  search = ""
) => {
  return `${SHOWROOM_LOG_API}/recent?sort=${sort}&page=${page}&filter=${filter}&order=${order}&perpage=${perpage}&search=${search}`;
};

const DETAIL_LIVE_HISTORY = (id) => {
  return `${SHOWROOM_LOG_API}/recent/${id}`
}

// ROOM API
const ROOM_LIST_API = ROOM;
const ROOM_GEN_10 = `${ROOM}/academy`;
const ROOM_LIVES_API = `${ROOM}/onlives`;
const ROOM_TRAINEE_API = `${ROOM}/trainee`;
const THEATER_SCHEDULE_API = `${ROOM}/theater-schedule`;

// USER PERMISSION CRUD
const LIST_USERS = (page, search) => {
  return `${API_USERS}/users?page=${page}&search=${search}`
}
const CREATE_USER = `${API_USERS}/users`

const DETAIL_USER = (userId) => {
  return `${API_USERS}/users/${userId}`
};

const DELETE_USER = (userId) => {
  return `${API_USERS}/users/${userId}`
};

// LIVE API
const LIVE_STREAM_URL = (roomId, cookies) => {
  return `${LIVE}/stream/${roomId}/${cookies}`;
};

const LIVE_RANKING = (roomId, cookies) => {
  return `${LIVE}/rank/${roomId}/${cookies}`;
};

const LIVE_GIFT = (roomId, cookies) => {
  return `${LIVE}/gift/${roomId}/${cookies}`;
};

const LIVE_COMMENT = (roomId, cookies) => {
  return `${LIVE}/comments/${roomId}/${cookies}`;
};

const LIVE_INFO = (roomId, cookies) => {
  return `${LIVE}/info/${roomId}/${cookies}`;
};

const FAN_LETTER = (roomId) => {
  return `${ROOM}/fan-letters/${roomId}`;
};

const TOTAL_RANK = (roomId) => {
  return `${ROOM}/total-rank/${roomId}`;
};

const NEXT_LIVE = (roomId) => {
  return `${ROOM}/next_live/${roomId}`;
};

export {
  API,
  ROOM_LIST_API,
  ROOM_LIVES_API,
  ROOM_GEN_10,
  ROOM_TRAINEE_API,
  FAN_LETTER,
  TOTAL_RANK,
  LIVE_STREAM_URL,
  LIVE_RANKING,
  LIVE_GIFT,
  LIVE_INFO,
  NEXT_LIVE,
  LIVE_COMMENT,
  LARAVEL_API,
  LOGIN,
  SEND_COMMENT,
  USER_PROFILE,
  UPDATE_PROFILE,
  GET_AVATAR,
  UPDATE_AVATAR,
  ROOM_FOLLOW,
  FOLLOW,
  PROFILE_API,
  REGISTER,
  FARM,
  ROOM_OFFICIAL,
  BULK_GIFT,
  SEND_GIFT,
  THEATER_SCHEDULE_API,
  RECENT_LIVE_LOG_API,
  DETAIL_LIVE_HISTORY,
  LIST_USERS,
  CREATE_USER,
  DETAIL_USER,
  DELETE_USER,
};
