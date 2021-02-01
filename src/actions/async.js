import axios from "axios";
import { HOST } from "./types";
import { NOT_WITHDRAWED } from "../utils/choices";

export async function getNotWhitrated(tel, agence) {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (tel !== "") {
    await axios
      .get(HOST + `api/transfert/list/`, {
        params: {
          tel: tel,
          status: NOT_WITHDRAWED,
          agence_destination: agence,
        },
        config,
      })
      .then((res) => {
        //setTimeout(() => {
        console.log(" Not Whithrated ... ", res.data);
        data = res.data.slice(0, 3);
        //}, 15000);
      })
      .catch((err) => {
        console.log(err);
        data = [];
      });
    return data;
  } else {
    return [];
  }
}

export const updateSolde = async (id, showAlert) => {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .get(HOST + `api/agence/get/${id}/`, config)
    .then((res) => {
      data = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      //console.log(err);
      data = {};
    });

  return data;
};
