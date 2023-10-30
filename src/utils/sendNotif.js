import axios from "axios";
import { NOTIFICATION } from "./api/api";

export const sendNotif = ({ userId, message, type }) => {
  axios.post(NOTIFICATION, {
    userId,
    message,
    type,
  });
};
