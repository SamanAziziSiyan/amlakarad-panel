import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../validation/formikValidation";
const CreateEstate = () => {
  const handleCreateEstate = () => {};

  return (
    <>
      <div className="relative w-full h-full mt-20">
        <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
        <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
        <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/20 flex justify-around flex-col ">
          <Formik
            initialValues={{
              mobile: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              handleCreateEstate(values);
            }}
          >
            <Form className=" px-32 py-10">
              <div className="flex items-center justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="mobile" className="mb-3 text-white block">
                    نام کاربری
                  </label>
                  <Field
                    id="mobile"
                    name="mobile"
                    type="text"
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="mb-3 text-white block">
                    شماره تماس
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder=""
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                  />
                </div>
              </div>

              <label htmlFor="description" className="mb-3 text-white block">
                آدرس
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                rows={2}
                className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
              />

<label htmlFor="description" className="mb-3 text-white block">
                توضیحات
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                rows={4}
                className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
              />

             

              <div className="flex items-center justify-between gap-4">
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="w-3/6">
                    <label htmlFor="area" className="mb-3 text-white block">
                      نوع کاربری
                    </label>
                    <Field
                      id="area"
                      name="area"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option>انتخاب کنید</option>
                      <option>انتخاب کنید</option>
                      <option>انتخاب کنید</option>
                      <option>انتخاب کنید</option>
                      <option>انتخاب کنید</option>
                    
                    </Field>
                  </div>
                </div>
              </div>

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
    </>
  );
};

export default CreateEstate;
