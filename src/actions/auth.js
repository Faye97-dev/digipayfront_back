import axios from "axios";
import {
  CHANGE_ROLE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  HOST,
  AUTH_LOADING,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
  CLEAN_SESSION,
} from "./types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*export const changeRole = (role) => (dispatch) => {
  dispatch({
    type: CHANGE_ROLE,
    payload: role,
  });
};*/

export const changeRole = (role) => ({
  type: CHANGE_ROLE,
  payload: role,
});

export const login = (data, resetForm, setSubmitting, showAlert) => (
  dispatch
) => {
  dispatch({
    type: AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  axios
    .post(HOST + "api/login/", body, config)
    //.get(HOST + `api/user/responsable/get/3/`, config)
    .then((res) => {
      //setTimeout(() => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      //console.log(res.data);
      //setSubmitting(false);
      //resetForm();
      showAlert(
        "success",
        "Login Success!",
        <FontAwesomeIcon icon={["fas", "check"]} />
      );
      //}, 2000);
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      setSubmitting(false);
      showAlert(
        "danger",
        "Login Echec!",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err);
    });
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });
  const access = getState().auth.access;
  //const refresh = getState().auth.refresh;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let url = "";
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
    const tokenParts = JSON.parse(atob(access.split(".")[1]));
    //console.log(tokenParts);
    url = `api/user/current_user/get/${tokenParts.userId}/`;
    //console.log(tokenParts); //const tokenParts = JSON.parse(atob(access.split(".")[1]));
    axios
      .get(HOST + url, config)
      .then((res) => {
        //setTimeout(() => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
        //}, 25000);
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR,
        });
        dispatch({
          type: CLEAN_SESSION,
        });
        //console.log(err);
      });
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch({
      type: CLEAN_SESSION,
    });
  }
};

/*export const login = (user_name, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ user_name, password });
  axios
    .post(HOST + "api/token/", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log(err.response.data);
    });
};*/

export const logout = () => (dispatch, getState) => {
  const refresh = getState().auth.refresh;
  const body = { refresh };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(HOST + "api/logout/", body, config)
    .then(() => {
      /*dispatch({
        type: CLEAN_SESSION,
      });*/
      dispatch({
        type: LOGOUT,
      });
      dispatch({
        type: CLEAN_SESSION,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch({
        type: CLEAN_SESSION,
      });
      //console.log(err);
    });
};
