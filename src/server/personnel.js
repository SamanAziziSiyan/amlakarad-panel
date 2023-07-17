import config from "./config.json";
import axios from "axios";

const getUsers = () => {
  return axios.get(`${config.api}/wp-json/wp/v2/users`);
};

export default {
    getUsers,
};
