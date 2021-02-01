import axios from "axios";
import { HOST, GET_EMPLOYES, DATA_LOADING, ERROR_EMPLOYE } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getEmployes = (showAlert) => (dispatch, getState) => {
  dispatch({
    type: DATA_LOADING,
    payload: GET_EMPLOYES,
  });
  const agence = { ...getState().auth.user.agence };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .get(HOST + `api/user/employe/list/`, {
      params: {
        agence: agence.id,
      },
      config,
    })
    .then((res) => {
      dispatch({
        type: GET_EMPLOYES,
        payload: res.data,
      });

      console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: ERROR_EMPLOYE,
      });
      showAlert(
        "danger",
        "Erreur de chargement des employes !",
        <FontAwesomeIcon icon={["fas", "times"]} />
      );
      //console.log(err);
    });
};
