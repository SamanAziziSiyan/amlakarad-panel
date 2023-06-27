import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  mobile: Yup.string().required("شماره موبایل الزامی می باشد"),
  password: Yup.string().required("رمز عبور الزامی می باشد"),
});
