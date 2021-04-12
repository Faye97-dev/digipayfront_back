import axios from "axios";
import { HOST } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormData from "form-data";
import { expiredTokenWarning } from "../../utils/alerts";

export const getProfilStatistiques = async (id, access = null) => {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (access) {
    config.headers["Authorization"] = `JWT ${access}`;
  }

  await axios
    .get(HOST + `api/func/profil/statistique/${id}/`, config)
    .then((res) => {
      data = res.data;
      //console.log(res.data);
    })
    .catch((err) => {
      //console.log(err);
      data = null;
      if (err.response && err.response.status === 401) {
        expiredTokenWarning();
      }
    });

  return data;
};
