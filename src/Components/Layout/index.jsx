import { useEffect } from "react";
import Header from "../Common/Header";
import { getUserSettinOnLocalStorage } from "../helper";

const Layout = ({ children }) => {
  useEffect(() => {
    const SettingsData = getUserSettinOnLocalStorage();
    let body = document.getElementById("body-element");

    if (SettingsData == null) {
      body.style.background = `linear-gradient(104.05deg, #0c0a5a 19.72%,#1f0042 92.22%)`;
      body.style.fontFamily = `yekan`;
    } else {
      body.style.background = `linear-gradient(104.05deg, ${SettingsData.from} 19.72%, ${SettingsData.to} 92.22%)`;
      body.style.fontFamily = `${SettingsData.font}`;
    }
  }, []);
  return (
    <>
      <div className=" w-4/5 m-auto flex items-center justify-center flex-col h-max">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
