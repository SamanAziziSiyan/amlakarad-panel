import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("شماره موبایل الزامی می باشد"),
  password: Yup.string().required("رمز عبور الزامی می باشد"),
});

export const createUser = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی می باشد"),
  name: Yup.string().required(" نام و نام خانوادگی الزامی می باشد"),
  email: Yup.string()
    .required("ایمیل الزامی می باشد")
    .email("ایمیل را به درستی وارد کنید"),
  password: Yup.string().required("رمز عبور الزامی می باشد"),
  roles: Yup.string().required("نقش کاربر الزامی می باشد"),
});
