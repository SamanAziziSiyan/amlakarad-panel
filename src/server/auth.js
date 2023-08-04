import config from "./config.json";
import axios from "axios";

const lgoin = (data) => {
  return axios.post(`${config.api}/wp-json/jwt-auth/v1/token`, data);
};

const createUserLoginToken = (token, data) => {
  return axios.post(`${config.api}/wp-json/wp/v1/ulToken`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const loginValidate = (data) => {
  return axios.post(`${config.api}/wp-json/jwt-auth/v1/token/validate`, data, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
};

export default {
  lgoin,
  loginValidate,
  createUserLoginToken,
};
