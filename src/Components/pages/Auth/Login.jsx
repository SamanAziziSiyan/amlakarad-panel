import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../validation/formikValidation";
import service from "../../../server/service";
import { hashData, toastAlert } from "../../helper";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    let { username, password } = values;
    service.auth
      .lgoin({
        username,
        password,
      })
      .then((data) => {
        if (data.status == 403)
          throw new Error("نام کاربری یا رمز عبور اشتباه است.");
        localStorage.setItem("token", data.data.token);
        let decodeToken = jwtDecode(data.data.token);
        console.log(decodeToken);
        service.personnel
          .getUser(data.data.token, decodeToken.data.user.id)
          .then((user) => {
          
            let userData = {
              username: user.data.extra.username,
              role: user.data.extra.role[0],
              ID: decodeToken.data.user.id,
            };

            localStorage.setItem("user", JSON.stringify(userData));
          })
          .catch((err) => {
            console.log(err);
          });
        toastAlert("با موفقیت وارد شدید ", "success");
        navigate("/");
      })
      .catch((err) => {
        return toastAlert("نام کاربری یا رمز عبور اشتباه است", "error");
      });
  };
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
              <img src="/assets/images/logo.png" className="w-16 h-16 " />
            </div>

            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              <Form className=" px-4 text-center">
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="نام کاربری یا موبایل"
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
                  ورود
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
