const API = "https://jkt48showroom-api.vercel.app/api";
const LIVE = `${API}/lives`;
const ROOM = `${API}/rooms`;

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
  nextLive
};
