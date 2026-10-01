import axios from "axios";
import { toast } from "react-toastify";

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
    type,
  });
};

export const getToken = () => localStorage.getItem("token");

export const getUserDataOnLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

export const getUserSettinOnLocalStorage = () => {
  const userSetting = localStorage.getItem("Settings");
  return userSetting ? JSON.parse(userSetting) : null;
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

/*
 * SMS provider credentials must never be shipped in the browser bundle.
 * Configure a server-side proxy endpoint that owns the provider credential:
 *
 * REACT_APP_SMS_PROXY_URL=https://your-backend.example.com/api/sms
 *
 * The proxy is expected to accept the same payload used below and authenticate
 * with the SMS provider on the server. Do not put the provider API key in a
 * REACT_APP_* variable.
 */
const getSmsProxyUrl = () => {
  const url = process.env.REACT_APP_SMS_PROXY_URL;
  if (!url) {
    throw new Error("SMS proxy is not configured");
  }
  return url;
};

const postSms = (data) => axios.post(getSmsProxyUrl(), data);

export const sendSMSCode = async (mobile, code) => {
  return postSms({
    type: "verification",
    mobile: String(mobile),
    templateId: 100000,
    parameters: [{ name: "Code", value: String(code) }],
  });
};

export const sendSMSAdminState = async (username, title) => {
  return postSms({
    type: "admin-state",
    username: String(username),
    title: String(title),
  });
};

export const sendSMSStateOwner = async (mobile, title) => {
  return postSms({
    type: "state-owner",
    mobile: String(mobile),
    title: String(title),
  });
};
