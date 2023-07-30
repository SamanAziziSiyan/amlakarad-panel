import config from "./config.json";
import axios from "axios";

const getLogs = (token) => {
  return axios.get(`${config.api}/wp-json/wp/v1/log`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getUsers = (token) => {
  return axios.get(`${config.api}/wp-json/wp/v2/users?per_page=100`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getUser = (token, userId) => {
  return axios.get(`${config.api}/wp-json/wp/v2/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const changePassword = (userId, token, password) => {
  return axios.post(
    `${config.api}/wp-json/wp/v2/users/${userId}?password=${password}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
const deleteUser = (id, token) => {
  return axios.delete(
    `${config.api}/wp-json/wp/v2/users/${id}?reassign=1&force=true`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
const searchUser = (username, token) => {
  return axios.get(`${config.api}/wp-json/wp/v2/users/?search=${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const creatUser = (data, token) => {
  console.log(data);
  return axios.post(`${config.api}/wp-json/wp/v2/users/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateUser = (data, userId, token) => {
  return axios.post(`${config.api}/wp-json/wp/v2/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getLogs,
  getUsers,
  getUser,
  deleteUser,
  searchUser,
  creatUser,
  changePassword,
  updateUser,
};
