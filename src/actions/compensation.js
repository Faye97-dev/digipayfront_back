import axios from "axios";
import {
  HOST,
  GET_COMPENSATIONS,
  DATA_LOADING,
  ERROR_COMP,
  ADD_COMPENSATION,
} from "./types";
import { expiredToken } from "../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getCompensations = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_COMPENSATIONS,
  });

  const access = getState().auth.access;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }
  axios
    .get(HOST + `api/compensation/list/`, config)
    .then((res) => {
      dispatch({
        type: GET_COMPENSATIONS,
        payload: res.data,
      });
      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_COMP,
      });
      showAlert(
        "danger",
        "Erreur de l'historique des compensations !",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch);
      }
    });
};

/* agent compensation */
export const addCompensation = (body, resetForm, setSubmitting, showAlert) => (
  dispatch,
  getState
) => {
  dispatch({
    type: DATA_LOADING,
    payload: ADD_COMPENSATION,
  });

  //const user = getState().auth.user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const access = getState().auth.access;
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  axios
    .post(HOST + `api/func/agent/pre-compensation/`, body, config)
    .then((res) => {
      const keys = Object.keys({ ...res.data });
      if (!keys.includes("msg")) {
        //setTimeout(() => {
        dispatch({
          type: ADD_COMPENSATION,
          payload: res.data,
        });

        showAlert(
          "success",
          "Compensation Complete!",
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        //}, 10000);
      } else if (keys.includes("msg")) {
        dispatch({
          type: ERROR_COMP,
        });
        showAlert(
          "warning",
          res.data.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      }
      setSubmitting(false);
      resetForm();
    })
    .catch((err) => {
      dispatch({
        type: ERROR_COMP,
      });

      showAlert(
        "danger",
        "Compensation Non-Complete!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      setSubmitting(false);

      if (err.response && err.response.status === 401) {
        expiredToken(dispatch);
      }
    });
};
