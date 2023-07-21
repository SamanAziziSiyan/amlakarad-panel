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

// export const hashData = (data) => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(data, salt);
//   return hash;
// };

// export const unHashData = async (data) => {
//   const unHash = await bcrypt.compare(password, hash);

//   return unHash;
// };
