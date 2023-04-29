const API = "https://jkt48-showroom-api.vercel.app/api";
const LIVE = `${API}/lives`;
const ROOM = `${API}/rooms`;

// Laravel API
const LARAVEL_API = "https://laravel-showroom-api.vercel.app/api";
const SEND_COMMENT = `${LARAVEL_API}/live/comment`;
const UPDATE_PROFILE = `${LARAVEL_API}/profile/update`;
const LOGIN = `${LARAVEL_API}/login`;
const USER_PROFILE = `${LARAVEL_API}/profile/user`;
const ROOM_FOLLOW = `${LARAVEL_API}/room/followed_rooms`;
const FOLLOW = `${LARAVEL_API}/room/follow`;
const PROFILE_API = `${LARAVEL_API}/profile/room`;
const REGISTER = `${LARAVEL_API}/register`

const FARM = `${LARAVEL_API}/farm/start`
const ROOM_OFFICIAL =`${LARAVEL_API}/farm/get_room`;
const BULK_GIFT = `${LARAVEL_API}/live/bulk_gift`;
const SEND_GIFT = `${LARAVEL_API}/live/send_gift`;

// Live API
const liveDetail = (roomId) => {
  return `${LIVE}/${roomId}`;
};

const liveRanking = (roomId) => {
  return `${LIVE}/rank/${roomId}`;
};

const liveGift = (roomId) => {
  return `${LIVE}/gift/${roomId}`;
};

const LIVE_COMMENT = (roomId) => {
  return `${LIVE}/comments/${roomId}`;
};

// Room API
const roomListApi = ROOM;
const roomAcademyApi = `${ROOM}/academy`;
const roomLivesApi = `${ROOM}/onlives`;
const fanLetter = (roomId) => {
  return `${ROOM}/fan-letters/${roomId}`;
};

const TOTAL_RANK = (roomId) => {
  return `${LIVE}/total-rank/${roomId}`;
};

const nextLive = (roomId) => {
  return `${ROOM}/next_live/${roomId}`;
};

export {
  API,
  roomListApi,
  roomLivesApi,
  roomAcademyApi,
  fanLetter,
  TOTAL_RANK,
  liveDetail,
  liveRanking,
  liveGift,
  nextLive,
  LIVE_COMMENT,
  LARAVEL_API,
  LOGIN,
  SEND_COMMENT,
  USER_PROFILE,
  UPDATE_PROFILE,
  ROOM_FOLLOW,
  FOLLOW,
  PROFILE_API,
  REGISTER,
  FARM,
  ROOM_OFFICIAL,
  BULK_GIFT,
  SEND_GIFT
};
