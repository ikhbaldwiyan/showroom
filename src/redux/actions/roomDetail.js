import { ACTION_TYPES as STATE } from '../constans/actionTypes';

export const getRoomDetailLoad = () => {
  return {
    type: STATE.GET_ROOM_DETAIL_LOAD,
  };
};

export const getRoomDetailSucces = (profile) => {
  let title = profile.room_url_key.includes("JKT48") && profile.room_url_key !== 'officialJKT48';
  let name = title ? `${profile.room_url_key.slice(6)} JKT48 Room` : profile.room_name;
  
  return {
    type: STATE.GET_ROOM_DETAIL_SUCCESS,
    payload: profile,
    room_name: name
  };
};

export const getRoomDetailFailed = (rooms) => {
  return {
    type: STATE.GET_ROOM_DETAIL_FAILED,
    payload: rooms,
  };
};

export const clearRoomDetail = () => {
  return {
    type: STATE.CLEAR_ROOM_DETAIL,
  };
};