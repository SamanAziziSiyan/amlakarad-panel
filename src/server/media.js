import config from "./config.json";
import axios from "axios";

const uploadImage = (token, data, imageName) => {
  console.log(data);
  let headers = {
    Authorization: `Bearer ${token}`,
    // "Content-disposition": `attachment; filename = "fff.png"`,
    "content-type": "multipart/form-data",
  };
  return axios.post(`${config.api}/wp-json/wp/v2/media`, data, {
    headers,
  });
};

const deleteImage = (token , id) => {
  return axios.delete(`${config.api}/wp-json/wp/v2/media/${id}?force=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  uploadImage,
  deleteImage,
};
