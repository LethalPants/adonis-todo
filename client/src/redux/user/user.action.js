/*eslint no-useless-computed-key: "off"*/

import UserActionTypes from "./user.types";
import axios from "axios";
import { appLogout } from "../root.action";

export const logout = () => {
  return (dispatch) => {
    return axios({
      method: "POST",
      url: "http://localhost:3333/api/v1/users/logout",
      headers: {
        ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        dispatch(appLogout());
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const loginSuccess = (user) => ({
  type: UserActionTypes.LOG_IN_SUCCESS,
  payload: user,
});

export const registerSuccess = (user) => {
  return {
    type: UserActionTypes.REGISTER_SUCCESS,
    payload: user,
  };
};
