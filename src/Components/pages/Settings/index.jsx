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
  const [font, setFont] = useState("yekan");
  useEffect(() => {
    const SettingsData = getUserSettinOnLocalStorage();

    if (SettingsData == null) {
      return;
    } else {
      setFromColor(SettingsData.from);
      setToColor(SettingsData.to);
      setFont(SettingsData.font);
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
    };
    localStorage.setItem("Settings", JSON.stringify(data));
    toastAlert("تنظیمات با موفقیت ثبت شد", "success");
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
              <Form className=" px-32 py-10">
                <div className="flex items-center justify-between gap-4">
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
                  className="bg-[#4a80bb] m-auto mt-10 flex items-center justify-center shadow-sm shadow-indigo-700 my-4 w-1/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
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

            <form className=" px-32 py-10" onSubmit={handleChangeSetting}>
              <div className="flex items-center justify-between gap-4">
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
              <div className="flex items-center mt-4 justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="from" className="mb-3 text-white block">
                    رنگ اول
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
                    رنگ دوم
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
              <button
                type="submit"
                className="bg-[#4a80bb] m-auto mt-10 flex items-center justify-center shadow-sm shadow-indigo-700 my-4 w-1/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
              >
                {" "}
                <RiEdit2Line size={23} className="ml-2" />
                ثبت تنظیمات
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Settings;
