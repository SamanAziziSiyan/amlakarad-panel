import { Formik, Form, Field, ErrorMessage } from "formik";
import { changePasswordSchema } from "../../../validation/formikValidation";
import service from "../../../server/service";
import {
  getToken,
  getUserDataOnLocalStorage,
  getUserSettinOnLocalStorage,
  toastAlert,
} from "../../helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiEdit2Line } from "react-icons/ri";
import Layout from "../../Layout";

const Settings = () => {
  const navigate = useNavigate();
  const [fromColor, setFromColor] = useState("#0c0a5a");
  const [toColor, setToColor] = useState("#1f0042");
  const [titleColor, setTitleColor] = useState("#ffffff");
  const [contetnColor, setContentColor] = useState("#ffffff");
  const [inputColor, setInputColor] = useState("#ffffff");
  const [placeholderColor, setPlaceholderColor] = useState("#eeeeee");
  const [btnColor, setBtnColor] = useState("#ffffff");
  const [subTitleColor, setSubTitleColor] = useState("#000000");
  const [font, setFont] = useState("yekan");
  useEffect(() => {
    const SettingsData = getUserSettinOnLocalStorage();
    console.log(SettingsData);
    if (SettingsData == null) {
      return;
    } else {
      setFromColor(SettingsData.from);
      setToColor(SettingsData.to);
      setFont(SettingsData.font);
      setTitleColor(SettingsData.title);
      setContentColor(SettingsData.content);
      setInputColor(SettingsData.inputColor);
      setPlaceholderColor(SettingsData.placeholderColor);
      setBtnColor(SettingsData.btnColor);
      setSubTitleColor(SettingsData.subTitleColor);
    }
  }, []);
  const handleUpdatePassword = (values) => {
    if (values.password != values.confirmPassword) {
      return toastAlert("رمز عبور یکسان نیست");
    }
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();
    let userpassword = {
      password: values.password,
      userId: userData.ID,
    };
    service.personnel
      .changePassword(userToken, userData.ID, userpassword)
      .then((data) => {
        toastAlert("رمز عبور با موفقیت ویرایش شد", "success");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeSetting = (e) => {
    e.preventDefault();
    let data = {
      font: e.target[0].value,
      from: e.target[1].value,
      to: e.target[2].value,
      title: e.target[3].value,
      content: e.target[4].value,
      inputColor: e.target[5].value,
      placeholderColor: e.target[6].value,
      btnColor: e.target[7].value,
      subTitleColor: e.target[8].value,
    };
    localStorage.setItem("Settings", JSON.stringify(data));
    toastAlert("تنظیمات با موفقیت ثبت شد", "success");
    window.location.reload();
  };
  const removeSettingsData = () => {
    localStorage.removeItem("Settings");
    window.location.reload();
  };
  return (
    <>
      <Layout>
        <div className="relative w-full h-full mt-20">
          <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
          <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
          <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/5 flex justify-around flex-col ">
            <h2 className="mr-10 mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
              تغییر رمز عبور
            </h2>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={changePasswordSchema}
              onSubmit={(values) => {
                handleUpdatePassword(values);
              }}
            >
              <Form className=" px-32 max-lg:px-6 py-10">
                <div className="flex items-center  max-lg:flex-col justify-between gap-4">
                  <div className="w-full">
                    <label htmlFor="username" className="mb-3 text-white block">
                      رمز عبور
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder=""
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <div className="text-red-500">{msg}</div>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="username" className="mb-3 text-white block">
                      تکرار رمز عبور
                    </label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder=""
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      render={(msg) => (
                        <div className="text-red-500">{msg}</div>
                      )}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#4a80bb] m-auto mt-10 max-lg:w-full flex items-center justify-center shadow-sm shadow-indigo-700 my-4 w-1/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
                >
                  {" "}
                  <RiEdit2Line size={23} className="ml-2" />
                  تغییر رمز{" "}
                </button>
              </Form>
            </Formik>
          </div>
        </div>

        <div className="relative w-full h-full mt-20">
          <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/5 flex justify-around flex-col ">
            <h2 className="mr-10 mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
              {" "}
              تنظیمات{" "}
            </h2>

            <form className=" px-32 max-lg:px-6 py-10" onSubmit={handleChangeSetting}>
              <div className="flex items-center max-lg:flex-col justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="username" className="mb-3 text-white block">
                    تغییر فونت
                  </label>
                  <select
                    id="fonts"
                    name="font"
                    type="password"
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-white  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  >
                    <option
                      selected={font == "Vazir" ? true : false}
                      value="Vazir"
                      className="text-gray-600"
                    >
                      {" "}
                      وزیر
                    </option>
                    <option
                      selected={font == "yekan" ? true : false}
                      value="yekan"
                      className="text-gray-600"
                    >
                      {" "}
                      یکان بخ
                    </option>
                    <option
                      selected={font == "Morabba" ? true : false}
                      value="Morabba"
                      className="text-gray-600"
                    >
                      {" "}
                      مربع
                    </option>
                    <option
                      selected={font == "IranSans" ? true : false}
                      value="IranSans"
                      className="text-gray-600"
                    >
                      {" "}
                      ایران سنس
                    </option>
                    <option
                      selected={font == "Changa" ? true : false}
                      value="Changa"
                      className="text-gray-600"
                    >
                      {" "}
                      چنگا
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex items-center mt-4 justify-between gap-4 max-lg:flex-col">
                <div className="w-full">
                  <label htmlFor="from" className="mb-3 text-white block">
                    رنگ پس زمینه اول
                  </label>
                  <input
                    onChange={(e) => {
                      setFromColor(e.target.value);
                    }}
                    value={fromColor}
                    id="from"
                    name="from"
                    type="color"
                    placeholder=""
                    className="w-full h-11 mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="username" className="mb-3 text-white block">
                    رنگ پس زمینه دوم
                  </label>
                  <input
                    onChange={(e) => {
                      setToColor(e.target.value);
                    }}
                    value={toColor}
                    id="to"
                    name="to"
                    type="color"
                    placeholder=""
                    className="w-full mb-4 h-11 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 justify-between gap-4 max-lg:flex-col">
                <div className="w-full">
                  <label htmlFor="titleColor" className="mb-3 text-white block">
                    رنگ عنوان ها
                  </label>
                  <input
                    onChange={(e) => {
                      setTitleColor(e.target.value);
                    }}
                    value={titleColor}
                    name="titleColor"
                    id="titleColor"
                    type="color"
                    placeholder=""
                    className="w-full h-11 mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="contentColor"
                    className="mb-3 text-white block"
                  >
                    رنگ متن
                  </label>
                  <input
                    onChange={(e) => {
                      setContentColor(e.target.value);
                    }}
                    value={contetnColor}
                    id="contentColor"
                    name="contentColor"
                    type="color"
                    placeholder=""
                    className="w-full mb-4 h-11 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center mt-4 justify-between gap-4 max-lg:flex-col">
                <div className="w-full">
                  <label htmlFor="inputColor" className="mb-3 text-white block">
                    رنگ برچسب ورودی ها
                  </label>
                  <input
                    onChange={(e) => {
                      setInputColor(e.target.value);
                    }}
                    value={inputColor}
                    name="inputColor"
                    id="inputColor"
                    type="color"
                    placeholder=""
                    className="w-full h-11 mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="contentColor"
                    className="mb-3 text-white block"
                  >
                    رنگ متن جایگزین ورودی ها
                  </label>
                  <input
                    onChange={(e) => {
                      setPlaceholderColor(e.target.value);
                    }}
                    value={placeholderColor}
                    id="contentColor"
                    name="contentColor"
                    type="color"
                    placeholder=""
                    className="w-full mb-4 h-11 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center mt-4 justify-between gap-4 max-lg:flex-col">
                <div className="w-full">
                  <label htmlFor="btnColor" className="mb-3 text-white block">
                    رنگ متن دکمه ها
                  </label>
                  <input
                    onChange={(e) => {
                      setBtnColor(e.target.value);
                    }}
                    value={btnColor}
                    name="btnColor"
                    id="btnColor"
                    type="color"
                    placeholder=""
                    className="w-full h-11 mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="subTitleColor"
                    className="mb-3 text-white block"
                  >
                    رنگ زیر عنوان ها
                  </label>
                  <input
                    onChange={(e) => {
                      setSubTitleColor(e.target.value);
                    }}
                    value={subTitleColor}
                    id="subTitleColor"
                    name="subTitleColor"
                    type="color"
                    placeholder=""
                    className="w-full mb-4 h-11 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center max-lg:flex-col justify-center">
                <button
                  type="submit"
                  className="bg-green-600 max-lg:w-full m-auto mt-10 flex items-center justify-center shadow-sm shadow-indigo-700 my-4 w-1/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
                >
                  {" "}
                  <RiEdit2Line size={23} className="ml-2" />
                  ثبت تنظیمات
                </button>
                <button
                  onClick={removeSettingsData}
                  type="button"
                  className="bg-sky-500 max-lg:w-full m-auto mt-10 flex items-center justify-center shadow-sm shadow-indigo-700 my-4 w-1/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
                >
                  {" "}
                  <RiEdit2Line size={23} className="ml-2" />
                  بازگردانی تنظیمات اولیه
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Settings;
