import config from "./config.json";
import axios from "axios";

const getAutherStates = (userId, token) => {
  return axios.get(`${config.api}/wp-json/wp/v1/states/auther/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getStates = (token) => {
  return axios.get(`${config.api}/wp-json/wp/v1/states`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getState = (token, stateId) => {
  return axios.get(`${config.api}/wp-json/wp/v1/states/${stateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const deleteState = (stateId, token) => {
  return axios.delete(`${config.api}/wp-json/wp/v1/states/${stateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const createState = (data, token) => {
  return axios.post(`${config.api}/wp-json/wp/v1/states/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const filterStates = (data, token) => {
  return axios.post(`${config.api}/wp-json/wp/v1/states/filter`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getAutherStates,
  getStates,
  getState,
  deleteState,
  createState,
  filterStates,
};
