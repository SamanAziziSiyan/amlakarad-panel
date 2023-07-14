import config from "./config.json";
import axios from "axios";

const users = (data) => {
  return axios.get(`${config.api}/wp-json/wp/v2/users`, data);
};

export default {
    users,
};
