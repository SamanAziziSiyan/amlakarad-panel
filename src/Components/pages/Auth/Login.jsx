import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../validation/formikValidation";
const Login = () => {
  const handleLogin = () => {};
  return (
    <>
      <div className="h-screen  primary-gradient flex items-center justify-center relative  ">
        <div className="relative">
          <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
          <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
          <div className="w-[430px] h-[490px] rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/20 flex justify-around flex-col items-center">
            <div>
              <h3 className="mb-5 text-2xl font-medium text-gray-300">
                ورود به پنل{" "}
              </h3>
              <img src="/images/logo.png" className="w-16 h-16 " />
            </div>

            <Formik
              initialValues={{
                mobile: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              <Form className=" px-4 text-center">
                <Field
                  id="mobile"
                  name="mobile"
                  type="text"
                  placeholder="شماره موبایل"
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                />

                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="رمز عبور"
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                />

                <button
                  type="submit"
                  className="bg-[#4a80bb] shadow-sm shadow-indigo-700 my-4 w-3/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
                >
                  {" "}
                  ارسال کد
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
