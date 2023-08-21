import { ACTION_TYPES as STATE } from '../constans/actionTypes';

export const getTaskListLoad = () => {
  return {
    type: STATE.GET_TASK_LIST_LOAD
  };
};

export const getTaskListSuccess = (tasks) => {
  return {
    type: STATE.GET_TASK_LIST_SUCCESS,
    payload: tasks,
  };
};

export const getTaskListFailed = () => {
  return {
    type: STATE.GET_TASK_LIST_FAILED,
  };
};