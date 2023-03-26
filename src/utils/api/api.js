const API = "https://jkt48-showroom-api.vercel.app/api";
const LIVE = `${API}/lives`;
const ROOM = `${API}/rooms`;

// Laravel API
// const LARAVEL_API = "http://127.0.0.1:8000/api";
const LARAVEL_API = "https://laravel-showroom-api.vercel.app/api";
const SEND_COMMENT = `${LARAVEL_API}/live/comment`;
const LOGIN = `${LARAVEL_API}/login`;
const GET_OFFICIAL = LARAVEL_API + "/room_official";
const FARM = LARAVEL_API + "/farming";
const SEND_GIFT = LARAVEL_API + "/live/send_gift";
const BULK_GIFT = LARAVEL_API + "/live/bulk_gift";
const UPDATE_PROFILE =  `${LARAVEL_API}/profile/update`;
const USER_PROFILE = `${LARAVEL_API}/profile/user`

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

const profileApi = (roomId) => {
  return `${ROOM}/profile/${roomId}`;
};

const fanLetter = (roomId) => {
  return `${ROOM}/fan-letters/${roomId}`;
};

const totalRank = (roomId) => {
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
  profileApi,
  fanLetter,
  totalRank,
  liveDetail,
  liveRanking,
  liveGift,
  LIVE_COMMENT,
  nextLive,
  LARAVEL_API,
  LOGIN,
  SEND_COMMENT,
  USER_PROFILE,
  UPDATE_PROFILE
};
