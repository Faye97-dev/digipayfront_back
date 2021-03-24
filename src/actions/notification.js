import axios from "axios";
import {
  HOST,
  DATA_LOADING,
  GET_NOTIFS,
  ERROR_NOTIF,
  CLEAN_SESSION,
  AUTH_ERROR,
} from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { expiredToken } from "../utils/alerts";
export const getNotifications = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_NOTIFS,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const access = getState().auth.access;
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  const user = getState().auth.user;
  axios
    .get(HOST + `api/notification/list/`, {
      params: {
        user: user.id,
      },
      headers: config.headers,
    })
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: GET_NOTIFS,
        payload: res.data,
      });
      //console.log(res.data);
      //}, 5000);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_NOTIF,
      });
      showAlert(
        "danger",
        "Erreur de chargement des notifications !",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch);
      }
    });
};
