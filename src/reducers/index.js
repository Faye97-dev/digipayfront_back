import { combineReducers } from "redux";
import ThemeOptions from "./ThemeOptions";
import agence from "./agence";
import auth from "./auth";
import transaction from "./transaction";
import client from "./client";
import employe from "./employe";
import notification from "./notification";
export default combineReducers({
  ThemeOptions,
  auth,
  agence,
  transaction,
  client,
  employe,
  notification,
});
