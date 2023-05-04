import { ACTION_TYPES as STATE } from "../constans/actionTypes";

export const getLiveStreamLoad = () => {
  return {
    type: STATE.GET_LIVE_STREAM_LOAD
  };
};

export const getLiveStreamOnline = (data) => {
  return {
    type: STATE.GET_LIVE_STREAM_ONLINE,
    profile: data.profile,
    url: data.url,
    room_name: data.room_name,
  };
};

export const getLiveStreamOffline = () => {
  return {
    type: STATE.GET_LIVE_STREAM_OFFLINE
  };
};

export const clearLiveStream = () => {
  return {
    type: STATE.CLEAR_LIVE_STREAM
  };
};
