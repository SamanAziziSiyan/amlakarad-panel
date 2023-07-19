import { Formik, Form, Field, ErrorMessage } from "formik";
import { changePasswordSchema } from "../../../validation/formikValidation";
import service from "../../../server/service";
import { getToken, getUserDataOnLocalStorage, toastAlert } from "../../helper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const handleUpdatePassword = (values) => {
    if (values.password != values.confirmPassword) {
      return toastAlert("رمز عبور یکسان نیست");
    }
    let userToken = getToken() 
    let userData = getUserDataOnLocalStorage()
    service.personnel.changePassword(userData.ID ,userToken , values.password )
    .then(data =>{
        console.log(data);
    }).catch(err=>{
        console.log(err);
    })
  };
  return (
    <>
      <div className="relative w-full h-full mt-20">
        <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
        <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
        <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/20 flex justify-around flex-col ">
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
                    render={(msg) => <div className="text-red-500">{msg}</div>}
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
                    render={(msg) => <div className="text-red-500">{msg}</div>}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#4a80bb] shadow-sm shadow-indigo-700 my-4 w-3/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
              >
                {" "}
                ویرایش
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Settings;
