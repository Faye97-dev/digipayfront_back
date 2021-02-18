import axios from "axios";
import { HOST, DATA_LOADING, GET_NOTIFS, ERROR_NOTIF } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const user = getState().auth.user;
  /*if (access) {
        config.headers["Authorization"] = `JWT ${access}`;
      }*/
  axios
    .get(HOST + `api/notification/list/`, {
      params: {
        user: user.id,
      },
      config,
    })
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: GET_NOTIFS,
        payload: res.data,
      });
      console.log(res.data);
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
      //console.log(err.response.data);
      /* refresh token method when 401 status*/
    });
};
