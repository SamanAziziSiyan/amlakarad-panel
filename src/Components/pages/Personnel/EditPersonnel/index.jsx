import { Formik, Form, Field, ErrorMessage } from "formik";
import { createUser } from "../../../../validation/formikValidation";
import service from "../../../../server/service";
import {
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
} from "../../../helper";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiEdit2Line } from "react-icons/ri";
import Layout from "../../../Layout";
const CreatePersonnel = () => {
  const navigate = useNavigate();
  const { personnelId } = useParams();
  const [personnelData, setPersonnelData] = useState({
    name: "",
    phone: "",
    role: "",
    moshavername: "",
  });

  const [showMoshaverName, setShowMoshaverName] = useState(false);

  useEffect(() => {
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();
    if (userData.role.administrator == undefined) {
      toastAlert("شما به این بخش دسترسی ندارید");
      navigate("/");
      return;
    }
    service.personnel
      .getUser(userToken, personnelId)
      .then((data) => {
        let userRol = data.data.extra.role[0];

        if (userRol != "karbar") {
          setShowMoshaverName(true);
        }
        setPersonnelData({
          name: data.data.name,
          username: data.data.extra.username,
          phone: data.data.extra.phone,
          moshavername: data.data.extra.moshavername[0],
          role: Object.keys(userRol)[0],
        });
      })
      .catch((err) => {
        if (err.response.status == 404) {
          navigate("/404");
        }
      });
  }, []);
  const handleUpdateUser = (e) => {
    e.preventDefault();
    let data = {
      name: personnelData.name,
      meta: {
        phone: personnelData.phone,
        moshavername: personnelData.moshavername,
      },
      roles: personnelData.role,
    };
    console.log(data);
    let userToken = getToken();
    service.personnel
      .updateUser(data, personnelId, userToken)
      .then((data) => {
        if (data.status == 200) {
          toastAlert("کاربر با موفقیت ویرایش شد", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toastAlert(err.response.data.message);
        } else toastAlert("سرور مشغول است");
      });
  };

  return (
    <>
      <Layout>
        <div className="relative w-full h-full mt-20">
          <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
          <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
          <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/10 flex justify-around flex-col ">
            {/* <Formik
            initialValues={{
              name: "",
              phone: "",
              role: "",
            }}
            validationSchema={createUser}
            onSubmit={(values) => {
              handleUpdateUser(values);
            }}
          > */}
            <form className=" px-32 py-10" onSubmit={handleUpdateUser}>
              <div className="flex items-center justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="username" className="mb-3 text-white block">
                    نام کاربری
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    disabled
                    value={personnelData.username}
                    placeholder=""
                    className="w-full mb-4  backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="mb-3 text-white block">
                    ایمیل
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    disabled
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="username" className="mb-3 text-white block">
                    نام و نام خانوادگی
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={personnelData.name}
                    onChange={(e) => {
                      setPersonnelData({
                        ...personnelData,
                        name: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                  {/* <ErrorMessage
                      name="name"
                      render={(msg) => <div className="text-red-500">{msg}</div>}
                    /> */}
                </div>
                {/* <div className="w-full">
                  <label htmlFor="email" className="mb-3 text-white block">
                    رمز عبور
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => <div className="text-red-500">{msg}</div>}
                  />
                </div> */}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3 text-white block">
                      نوع کاربری
                    </label>
                    <select
                      onChange={(e) => {
                        if (e.target.value != "karbar") {
                          setShowMoshaverName(true);
                        } else {
                          setShowMoshaverName(false);
                        }
                        setPersonnelData({
                          ...personnelData,
                          role: e.target.value,
                        });
                      }}
                      id="role"
                      name="role"
                      as="select"
                      value={personnelData.role}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option
                        value="administrator"
                        selected={
                          personnelData.role == "administrator" ? true : false
                        }
                      >
                        مدیر کل{" "}
                      </option>
                      <option
                        value="karmand"
                        selected={
                          personnelData.role == "karmand" ? true : false
                        }
                      >
                        {" "}
                        کارمند
                      </option>
                      <option
                        value="moshaver"
                        selected={
                          personnelData.role == "moshaver" ? true : false
                        }
                      >
                        مشاور املاک{" "}
                      </option>
                      <option
                        value="karbar"
                        selected={personnelData.role == "karbar" ? true : false}
                      >
                        کاربر عادی
                      </option>
                    </select>
                    {/* <ErrorMessage
                      name="roles"
                      render={(msg) => (
                        <div className="text-red-500">{msg}</div>
                      )}
                    /> */}
                  </div>
                </div>
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3 text-white block">
                      شماره تماس
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      onChange={(e) => {
                        setPersonnelData({
                          ...personnelData,
                          phone: e.target.value,
                        });
                      }}
                      type="text"
                      value={personnelData.phone}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              {showMoshaverName && (
                <div className="flex items-center justify-between gap-4">
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label htmlFor="area" className="mb-3 text-white block">
                        نام مشاور املاک{" "}
                      </label>
                      <input
                        id="role"
                        name="role"
                        value={personnelData.moshavername}
                        onChange={(e) => {
                          setPersonnelData({
                            ...personnelData,
                            moshavername: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                      {/* <ErrorMessage
                              name="roles"
                              render={(msg) => (
                                <div className="text-red-500">{msg}</div>
                              )}
                            /> */}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="bg-[#4a80bb] m-auto mt-10 flex items-center justify-center shadow-sm shadow-indigo-700 my-4 w-1/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
              >
                {" "}
                <RiEdit2Line size={23} className="ml-2" />
                ویرایش کاربر فعلی
              </button>
            </form>
            {/* </Formik> */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreatePersonnel;
