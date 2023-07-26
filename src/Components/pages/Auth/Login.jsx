import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../validation/formikValidation";
import service from "../../../server/service";
import { hashData, toastAlert } from "../../helper";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthLayout from "../../Layout/AuthLayout";
import { RiLoginCircleLine } from "react-icons/ri";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const handleLogin = async (values) => {
    setShowLoading(true);
    let { username, password } = values;
    await service.auth
      .lgoin({
        username,
        password,
      })
      .then(async (data) => {
        if (data.status == 403)
          throw new Error("نام کاربری یا رمز عبور اشتباه است.");
        localStorage.setItem("token", data.data.token);
        let decodeToken = jwtDecode(data.data.token);
        await service.personnel
          .getUser(data.data.token, decodeToken.data.user.id)
          .then((user) => {
            let userData = {
              username: user.data.extra.username,
              role: user.data.extra.role[0],
              ID: decodeToken.data.user.id,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            toastAlert("با موفقیت وارد شدید ", "success");
            navigate("/");
            setShowLoading(false);
          })
          .catch((err) => {
            toastAlert("سرور مشغول است ", "error");
            setShowLoading(false);
          });
      })
      .catch((err) => {
        setShowLoading(false);
        return toastAlert("نام کاربری یا رمز عبور اشتباه است", "error");
      });
  };
  return (
    <>
      <AuthLayout>
        <div className=" flex items-center justify-center relative  ">
          <div className="relative">
            <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
            <div className="w-20 h-20 bg-[#9b3ed3]  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
            <div className="w-[430px] h-[490px] rounded-2xl backdrop-blur-md bg-opacity-50 shadow-[#7a2fae] shadow-md bg-white/10 flex justify-around flex-col items-center">
              <div className="flex items-center flex-col gap-2">
                <h3 className="mb-5 text-2xl font-medium text-gray-400">
                  صفحه ورود پرسنل
                </h3>
                <h3 className="text-[#7a2fae]">خوش آمدید</h3>
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
                    className="w-full placeholder:text-[#7a2fae] text-[#7a2fae] border-[#7a2fae] mb-4   bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-b-[1px]  border-solid p-3   placeholder-slate-300 focus:border-[#9b3ed2] focus:scale-[1.01]   shadow-sm  shadow-purple-400  sm:text-sm"
                  />

                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="رمز عبور"
                    className="w-full placeholder:text-[#7a2fae] border-[#7a2fae] mb-4 text-[#7a2fae]   bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-b-[1px]  border-solid p-3   placeholder-slate-300 focus:border-[#9b3ed2] focus:scale-[1.01]   shadow-sm  shadow-purple-400  sm:text-sm"
                  />

                  <button
                    type="submit"
                    className=" flex items-center justify-center gap-2 m-auto  bg-gradient-light-primary shadow-sm shadow-indigo-700 my-4 w-3/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
                  >
                    <RiLoginCircleLine size={24} color={"#fff"} />
                    <span>ورود</span>
                    {showLoading && <BeatLoader size={10} color="#fff" />}
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
