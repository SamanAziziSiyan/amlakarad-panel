import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../../validation/formikValidation";
import service from "../../../../server/service";
import { getToken } from "../../../helper";
import Layout from "../../../Layout";
const CreateEstate = () => {
  const handleCreateEstate = (values) => {
    let userToken = getToken();
    let stateData = {
      title: values.title,
      content: values.content,
      status: "publish",
      postmeta: {
        mantaghe: values.mantaghe,
        name: values.name,
        address: values.address,
        mobile: values.mobile,
        email: values.email,
        moamele: values.moamele,
        melk: values.melk,
        // price-form:values.price,
        metrazh: values.metrazh,
        wg: values.wg,
        saheli: values.saheli,
        shahraki: values.shahraki,
        kohpaye: values.kohpaye,
      },
    };
    service.states
      .createState(stateData, userToken)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Layout>
        <div className="relative w-full h-full mt-20">
          <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
          <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
          <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/10 flex justify-around flex-col ">
            <Formik
              initialValues={{
                title: "",
                content: "",
                mantaghe: "",
                name: "",
                address: "",
                mobile: "",
                email: "",
                moamele: "",
                melk: "",
                price: "",
                metrazh: "",
                wg: "",
                saheli: "",
                shahraki: "",
                kohpaye: "",
              }}
              // validationSchema={loginSchema}
              onSubmit={(values) => {
                handleCreateEstate(values);
              }}
            >
              <Form className=" px-32 py-10">
                <label htmlFor="title" className="mb-3 text-white block">
                  عنوان
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder=""
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                />
                <ErrorMessage
                  name="title"
                  render={(msg) => <div className="text-red-500">{msg}</div>}
                />

                <label htmlFor="description" className="mb-3 text-white block">
                  توضیحات
                </label>
                <Field
                  id="content"
                  name="content"
                  as="textarea"
                  rows={10}
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                />

                <label htmlFor="area" className="mb-3 text-white block">
                  منطقه
                </label>
                <Field
                  id="mantaghe"
                  name="mantaghe"
                  as="select"
                  rows={10}
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                >
                  <option>منطقه را انتخاب کنید</option>
                  <option>بوکان</option>
                </Field>

                <div className="flex items-center justify-between gap-4">
                  <div className="w-full">
                    <label htmlFor="name" className="mb-3 text-white block">
                      نام مالک
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder=""
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="address" className="mb-3 text-white block">
                      آدرس دقیق ملک
                    </label>
                    <Field
                      id="address"
                      name="address"
                      type="text"
                      placeholder=""
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="w-full">
                    <label htmlFor="mobile" className="mb-3 text-white block">
                      تلفن مالک
                    </label>
                    <Field
                      id="mobile"
                      name="mobile"
                      type="text"
                      placeholder=""
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
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
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label htmlFor="area" className="mb-3 text-white block">
                        نوع معامله
                      </label>
                      <Field
                        id="moamele"
                        name="moamele"
                        as="select"
                        rows={10}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option>انتخاب کنید</option>
                        <option>خرید و فروش</option>
                        <option>رهن و اجاره</option>
                        <option>اجاره روزانه</option>
                      </Field>
                    </div>
                    <div className="w-full">
                      <label htmlFor="area" className="mb-3 text-white block">
                        نوع ملک
                      </label>
                      <Field
                        id="melk"
                        name="melk"
                        as="select"
                        rows={10}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option>انتخاب کنید</option>
                        <option>آپارتمان</option>
                        <option>خانه و ویلا</option>
                        <option>زمین و کلنگی</option>
                        <option>اداری و تجاری</option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label htmlFor="area" className="mb-3 text-white block">
                        نوع نمایش قیمت
                      </label>
                      <Field
                        id="price"
                        name="price"
                        as="select"
                        rows={10}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option> انتخاب کنید</option>
                        <option>توافقی</option>
                        <option>تماس بگیرید</option>
                      </Field>
                    </div>
                    <div className="w-full">
                      <label htmlFor="area" className="mb-3 text-white block">
                        متراژ
                      </label>
                      <Field
                        id="metrazh"
                        name="metrazh"
                        type="text"
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <label htmlFor="area" className="mb-3 text-white block">
                  جهت ملک
                </label>
                <div className="flex items-center gap-7">
                  <div className="flex items-center">
                    <input type="checkbox" name="wg[]" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="wg[]" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="wg[]" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="wg[]" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>
                </div>

                <div className="flex items-center gap-9">
                  <div className="mt-4">
                    <label htmlFor="area" className="mb-2 text-white block">
                      ساحلی
                    </label>{" "}
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        name="saheli"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="area" className="mb-2 text-white block">
                      شهرکی
                    </label>{" "}
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="shahraki"
                        value=""
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="area" className="mb-2 text-white block">
                      کوهپایه
                    </label>{" "}
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        name="kohpaye"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <label htmlFor="area" className="my-3 text-white block">
                  امکانات
                </label>
                <div className="flex items-center gap-7 flex-wrap">
                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
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
      </Layout>
    </>
  );
};

export default CreateEstate;
