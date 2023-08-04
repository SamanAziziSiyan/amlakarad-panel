import config from "./config.json";
import axios from "axios";

const uploadImage = (token, data, imageName) => {
 
  let headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "multipart/form-data",
  };
  return axios.post(`${config.api}/wp-json/wp/v2/media`, data, {
    headers,
  });
};

const getStateImages = (token, stateId) => {
   let headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(`${config.api}/wp-json/wp/v2/media/${stateId}`, {
    headers,
  });
};

const deleteImage = (token, id) => {
  return axios.delete(`${config.api}/wp-json/wp/v2/media/${id}?force=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  uploadImage,
  deleteImage,
  getStateImages,
};
