import config from "./config.json";
import axios from "axios";

const getStates = (token) => {
  return axios.get(`https://amlakarad.com/wp-json/wp/v2/state?per_page=2000`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getState = (token, stateId) => {
  return axios.get(`${config.api}/wp-json/wp/v2/state/${stateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteState = (stateId, token) => {
  return axios.delete(`${config.api}/wp-json/wp/v2/state/${stateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getAutherStates = (userId, token) => {
  return axios.get(`${config.api}/wp-json/wp/v2/state/author/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const createState = (data, token) => {
  return axios.post(`${config.api}/wp-json/wp/v2/state/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const editState = (token, stateId, data) => {
  return axios.put(`${config.api}/wp-json/wp/v2/state/${stateId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const insertMetaData = (token, data) => {
  return axios.post(`${config.api}/wp-json/wp/v2/statemeta/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const filterStates = (token, data) => {
  return axios.post(`${config.api}/wp-json/wp/v2/state/filter`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const filterStateAuthorID = (token, data) => {
  return axios.post(
    `${config.api}/wp-json/wp/v2/state/filterAuthorState`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const getBackoup = (token) => {
  return axios.get(`${config.api}/wp-json/wp/v1/backup/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getStateImage = (stateId, token) => {
  return axios.get(`${config.api}/wp-json/wp/v2/media?parent=${stateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getAutherStates,
  getStates,
  getState,
  deleteState,
  createState,
  editState,
  insertMetaData,
  filterStates,
  getStateImage,
  getBackoup,
  filterStateAuthorID,
};
