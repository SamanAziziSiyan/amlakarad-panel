import axios from "axios";
import { toast } from "react-toastify";
// import bcrypt from "bcrypt";

export const toastAlert = (msg, type = "error") => {
  toast(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    type: type,
  });
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const getUserDataOnLocalStorage = () => {
  let userData = localStorage.getItem("user");
  return JSON.parse(userData);
};
export const getUserSettinOnLocalStorage = () => {
  let userSetting = localStorage.getItem("Settings");
  return JSON.parse(userSetting);
};

export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const sendSMSCode = async (mobile, code) => {
  let data = {
    mobile: mobile,
    templateId: 100000,
    parameters: [
      {
        name: "Code",
        value: String(code),
      },
    ],
  };
  return axios.post(`https://api.sms.ir/v1/send/verify`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      "x-api-key":
        "N4gqCCHLO3bvKbzipOG0ZxdZykJKfZKBIFrcnAcQwK8baftKgz5iu9fpxH4rAejb",
    },
  });
};

export const sendSMSAdminState = async (username, title) => {
  let data = {
    mobile: "09145618696",
    templateId: 689397,
    parameters: [
      {
        name: "username",
        value: username,
      },
      {
        name: "title",
        value: title,
      },
    ],
  };
  return axios.post(`https://api.sms.ir/v1/send/verify`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      "x-api-key":
        "N4gqCCHLO3bvKbzipOG0ZxdZykJKfZKBIFrcnAcQwK8baftKgz5iu9fpxH4rAejb",
    },
  });
};

export const sendSMSStateOwner = async (mobile, title) => {
  let data = {
    mobile: String(mobile),
    templateId: 172091,
    parameters: [
      {
        name: "title",
        value: title,
      },
    ],
  };
  return axios.post(`https://api.sms.ir/v1/send/verify`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      "x-api-key":
        "N4gqCCHLO3bvKbzipOG0ZxdZykJKfZKBIFrcnAcQwK8baftKgz5iu9fpxH4rAejb",
    },
  });
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat("fa").format(num);
};

// export const hashData = (data) => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(123, salt);
//   return hash;
// };

// export const unHashData = async (data) => {
//   const unHash = await bcrypt.compare(password, hash);

//   return unHash;
// };
