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
import { expiredToken } from "../utils/alerts";
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
    url = `api/user/auth-user/get/${tokenParts.userId}/`;
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

export const logout = () => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING });
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
      //setTimeout(() => {
      dispatch({
        type: LOGOUT,
      });
      dispatch({
        type: CLEAN_SESSION,
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
};

export const updatePassword = (id, body, setSubmitting, showAlert) => (
  dispatch,
  getState
) => {
  //dispatch({ type: AUTH_LOADING });

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
    .put(HOST + `api/user/password/update/${id}/`, body, config)
    .then((res) => {
      //console.log(res);
      if (res) {
        showAlert(
          "success",
          res.data.msg,
          <FontAwesomeIcon icon={["fas", "check"]} />
        );
        setTimeout(() => {
          showAlert(
            "warning",
            "Vous allez être déconnecté dans quelque secondes ...",
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
          setTimeout(() => {
            dispatch({
              type: LOGOUT,
            });
            dispatch({
              type: CLEAN_SESSION,
            });
          }, 2500);
        }, 2000);
      }
      setSubmitting(false);
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        expiredToken(dispatch, getState().auth.tokenExpired);
      } else if (err.response && err.response.status === 400) {
        showAlert(
          "warning",
          err.response.data?.msg,
          <FontAwesomeIcon icon={["far", "question-circle"]} />
        );
      } else {
        showAlert(
          "danger",
          "Erreur de modification du mot de passe utilisateur !",
          <FontAwesomeIcon icon={["fas", "times"]} />
        );
      }
      setSubmitting(false);
    });
};
