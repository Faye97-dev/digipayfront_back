import axios from "axios";
import { HOST, GET_CLIENTS, DATA_LOADING, ERROR_CLIENT } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const getClients = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_CLIENTS,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .get(HOST + `api/client/`, config)
    .then((res) => {
      dispatch({
        type: GET_CLIENTS,
        payload: res.data,
      });
      //console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_CLIENT,
      });
      showAlert(
        "danger",
        "Erreur de chargement des clients !",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err);
    });
};
