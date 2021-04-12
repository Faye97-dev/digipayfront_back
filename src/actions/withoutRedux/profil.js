import axios from "axios";
import { HOST } from "../types";
import { expiredTokenWarning } from "../../utils/alerts";

export const validUsernameVendor = async (body, access = null) => {
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
    .post(HOST + `api/user/vendor/func/valid-username/`, body, config)
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
