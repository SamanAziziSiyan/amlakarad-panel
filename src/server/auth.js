import config from "./config.json";
import axios from "axios";

const lgoin = (data) => {
  return axios.post(`${config.api}/wp-json/jwt-auth/v1/token`, data);
};

export default {
  lgoin,
};
