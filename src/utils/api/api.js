// BASE URL API
const API = process.env.REACT_APP_SHOWROOM_API;
const ADMIN_API = process.env.REACT_APP_ADMIN_API;
const BOT_API = process.env.REACT_APP_BOT_API;
const LIVE = `${API}/lives`;
const ROOM = `${API}/rooms`;
const SHOWROOM_WRAPPED = "https://jkt48-showroom-wrapped.vercel.app"

// LARAVEL API
const LARAVEL_API = process.env.REACT_APP_LARAVEL_API;
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
const SHOWROOM_LOG_API = process.env.REACT_APP_HISTORY_API;
const RECENT_LIVE_LOG_API = (
  sort = "date",
  page = "1",
  filter = "active",
  order = "-1",
  perpage = "10",
  search = "",
  roomId = ""
) => {
  return `${SHOWROOM_LOG_API}/recent?sort=${sort}&page=${page}&filter=${filter}&order=${order}&perpage=${perpage}&search=${search}&room_id=${roomId}&group=jkt48`;
};

const DETAIL_LIVE_HISTORY = (id) => {
  return `${SHOWROOM_LOG_API}/recent/${id}`
}

// USER PERMISSION CRUD
const LIST_USERS = (page, search) => {
  return `${ADMIN_API}/users?page=${page}&search=${search}`
}
const CREATE_USER = `${ADMIN_API}/users`

const DETAIL_USER = (userId) => {
  return `${ADMIN_API}/users/${userId}`
};

const DELETE_USER = (userId) => {
  return `${ADMIN_API}/users/${userId}`
};

// THEATER SCHEDULES CRUD
const SCHEDULES_API = `${ADMIN_API}/schedules`
const TODAY_SCHEDULE_API = `${ADMIN_API}/schedules/today`
const DETAIL_SCHEDULE = (scheduleId) => {
  return `${ADMIN_API}/schedules/${scheduleId}`
}

// THEATER SETLIST CRUD
const SETLIST_API = `${ADMIN_API}/setlists`
const DETAIL_SETLIST = (setlistId) => {
  return `${ADMIN_API}/setlists/${setlistId}`
}

// MEMBERS CRUD
const MEMBERS_API = `${ADMIN_API}/member`
const DETAIL_MEMBER = (memberId) => {
  return `${ADMIN_API}/member/${memberId}`
}

//PREMIUM LIVE
const PREMIUM_LIVE_TODAY = `${ADMIN_API}/premium-lives/today`;
const PREMIUM_LIVE_LIST = `${ADMIN_API}/premium-lives`;
const PREMIUM_LIVE_DETAIL = (liveId) => {
  return `${ADMIN_API}/premium-lives/${liveId}`
}

// BOT API
const THEATER_SCHEDULE_BOT= `${BOT_API}/theater-notif`;
const THEATER_SCHEDULE_SHOWROOM_BOT = `${BOT_API}/theater-showroom`;
const LIVE_NOTIF_BOT = `${BOT_API}/notification`;
const MESSAGES_BOT = `${BOT_API}/message-bot`;

// ROOM API
const ROOM_LIST_API = ROOM;
const ROOM_GEN_10 = `${ROOM}/academy`;
const ROOM_LIVES_API = `${ROOM}/onlives`;
const ROOM_TRAINEE_API = `${ROOM}/trainee`;
const THEATER_SCHEDULE_API = `${ROOM}/theater-schedule`;

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

// ACTIVITY LOG API
const ACTIVITY_LOG = `${ADMIN_API}/activity`
const ACTIVITY_LOG_DETAIL = (id) => {
  return `${ADMIN_API}/activity/${id}`
}

const SHARING_LIVE = `${ADMIN_API}/sharing-live`
const SHARING_LIVE_DETAIL = (id) => {
  return `${ADMIN_API}/sharing-live/${id}`
}

// NOTIF
const NOTIFICATION = `${ADMIN_API}/notifications`;
const USER_NOTIFICATION = (userId) => {
  return `${ADMIN_API}/notifications/${userId}`;
};

// DISCORD USERS AND NOTIF
const DISCORD_NOTIFICATION = `${ADMIN_API}/notifications/discord`;
const DISCORD_USERS = `${ADMIN_API}/notifications/discord/users`;
const DISCORD_USERS_SEARCH = (name) => {
  return `${ADMIN_API}/notifications/discord/users?name=${name}`;
};
// SHOWROOM WRAPPED
const MOST_WATCH = `${SHOWROOM_WRAPPED}/most-watch`;
const PREMIUM_LIVES = `${SHOWROOM_WRAPPED}/premium-lives`;

// SUPPORT PROJECT
const LIST_DONATOR = `${ADMIN_API}/discord/role?type=donator`

//IDN LIVES
const ROOM_LIVES_IDN = `${SHOWROOM_LOG_API}/idn_lives`;
const ROOM_LIVE_IDN_DETAIL = (slug) => {
  return `${SHOWROOM_LOG_API}/watch/${slug}/idn`
}

const PODIUM_STAGE = (liveId) => {
  return `${ADMIN_API}/history-live/${liveId}`
}

const PODIUM_STAGE_IDN = (liveId) => {
  return `${ADMIN_API}/idn-live-history/${liveId}`
}

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
  SCHEDULES_API,
  DETAIL_SCHEDULE,
  MEMBERS_API,
  DETAIL_MEMBER,
  THEATER_SCHEDULE_BOT,
  LIVE_NOTIF_BOT,
  MESSAGES_BOT,
  THEATER_SCHEDULE_SHOWROOM_BOT,
  SETLIST_API,
  DETAIL_SETLIST,
  PREMIUM_LIVE_LIST,
  PREMIUM_LIVE_DETAIL,
  PREMIUM_LIVE_TODAY,
  ACTIVITY_LOG,
  ACTIVITY_LOG_DETAIL,
  TODAY_SCHEDULE_API,
  SHARING_LIVE,
  SHARING_LIVE_DETAIL,
  NOTIFICATION,
  USER_NOTIFICATION,
  DISCORD_NOTIFICATION,
  DISCORD_USERS,
  DISCORD_USERS_SEARCH,
  MOST_WATCH,
  PREMIUM_LIVES,
  LIST_DONATOR,
  ROOM_LIVES_IDN,
  ROOM_LIVE_IDN_DETAIL,
  PODIUM_STAGE,
  PODIUM_STAGE_IDN
};
