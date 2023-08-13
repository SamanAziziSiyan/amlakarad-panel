import { useEffect } from "react";
import Header from "../Common/Header";
import { getUserSettinOnLocalStorage } from "../helper";

const Layout = ({ children }) => {
  useEffect(() => {
    const SettingsData = getUserSettinOnLocalStorage();
    let body = document.getElementById("body-element");
    let titleElement = document.getElementsByTagName("h2");
    let contentElement = document.getElementsByTagName("p");
    let lableElement = document.getElementsByTagName("label");
    let inputElement = document.getElementsByTagName("input");
    let selectElement = document.getElementsByTagName("select");
    let textareaElement = document.getElementsByTagName("textarea");
    let buttonTextElement = document.getElementsByTagName("button");
    let subTitleElement = document.getElementsByTagName("span");

    if (SettingsData != null) {
      for (const el of subTitleElement) {
        el.style.color = SettingsData.subTitleColor;
      }
      for (const el of buttonTextElement) {
        el.style.color = SettingsData.btnColor;
      }
      for (const el of textareaElement) {
        el.style.color = SettingsData.placeholderColor;
      }
      for (const el of selectElement) {
        el.style.color = SettingsData.placeholderColor;
      }
      for (const el of inputElement) {
        el.style.color = SettingsData.placeholderColor;
      }
      for (const el of titleElement) {
        el.style.color = SettingsData.title;
      }
      for (const el of lableElement) {
        el.style.color = SettingsData.inputColor;
      }
      for (const el of contentElement) {
        el.style.color = SettingsData.content;
      }
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
