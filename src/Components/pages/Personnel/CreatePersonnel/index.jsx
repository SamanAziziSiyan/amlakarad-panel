import { Formik, Form, Field, ErrorMessage } from "formik";
import { createUser } from "../../../../validation/formikValidation";
import service from "../../../../server/service";
import {
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
} from "../../../helper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CreatePersonnel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();
    if (userData.role.administrator == undefined) {
      toastAlert("شما به این بخش دسترسی ندارید");
      navigate("/");
      return;
    }
  }, []);
  const handleCreateUser = (value) => {
    let data = {
      username: value.username,
      name: value.name,
      password: value.password,
      email: value.email,
      phone: value.phone,
      roles: value.roles,
    };

    let userToken = getToken();
    service.personnel
      .creatUser(data, userToken)
      .then((data) => {
        if (data.status != 201) throw new Error();
        if (data.data.status == 500) throw new Error("isdfsdf");
        toastAlert(
          `کاربر با نام ${data.data.name} با موفقیت ایجاد شد`,
          "success"
        );
      })
      .catch((err) => {
        if (err.response) {
          toastAlert(err.response.data.message);
        } else toastAlert("سرور مشغول است");
      });
  };

  return (
    <>
      <div className="relative w-full h-full mt-20">
        <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
        <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
        <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/20 flex justify-around flex-col ">
          <Formik
            initialValues={{
              username: "",
              name: "",
              password: "",
              email: "",
              phone: "",
              roles: "",
            }}
            validationSchema={createUser}
            onSubmit={(values) => {
              handleCreateUser(values);
            }}
          >
            <Form className=" px-32 py-10">
              <div className="flex items-center justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="username" className="mb-3 text-white block">
                    نام کاربری
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                  <ErrorMessage
                    name="username"
                    render={(msg) => <div className="text-red-500">{msg}</div>}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="mb-3 text-white block">
                    ایمیل
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => <div className="text-red-500">{msg}</div>}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="username" className="mb-3 text-white block">
                    نام و نام خانوادگی
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    render={(msg) => <div className="text-red-500">{msg}</div>}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="mb-3 text-white block">
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
                    render={(msg) => <div className="text-red-500">{msg}</div>}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3 text-white block">
                      نوع کاربری
                    </label>
                    <Field
                      id="roles"
                      name="roles"
                      as="select"
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option value="">انتخاب کنید </option>
                      <option value="administrator">مدیر کل </option>
                      <option value="karmand"> کارمند</option>
                      <option value="moshaver">مشاور املاک </option>
                      <option value="karbar">کاربر عادی</option>
                    </Field>
                    <ErrorMessage
                      name="roles"
                      render={(msg) => (
                        <div className="text-red-500">{msg}</div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3 text-white block">
                      شماره تماس
                    </label>
                    <Field
                      id="meta"
                      name="phone"
                      type="text"
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#4a80bb] shadow-sm shadow-indigo-700 my-4 w-3/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
              >
                {" "}
                ارسال
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreatePersonnel;
