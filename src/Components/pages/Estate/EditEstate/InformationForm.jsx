import { createStateInfo } from "../../../../validation/formikValidation";
import Layout from "../../../Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";
import {
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
} from "../../../helper";
import { BeatLoader } from "react-spinners";
import service from "../../../../server/service";
import { useState } from "react";

const InformationForm = ({ setNextSection, stateData }) => {
  console.log(stateData);
  const [showLoading, setShowLoading] = useState(false);
  const handleCreateEstate = (values) => {
    if (values.post_status == "0") {
      toastAlert("لطفا وضعیت نوشته را وارد کنید ");
      return;
    }
    setShowLoading(true);
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();

    let stateData = {
      title: values.post_title,
      content: values.post_content,
      status: values.post_status,
      author: userData.ID,
      type: "state",
      slug: values.post_title,
    };
    service.states
      .createState(stateData, userToken)
      .then((data) => {
        console.log(data);
        if (data.status == 201) {
          localStorage.setItem("stateId", data.data.id);
          toastAlert("اطلاعات اولیه با موفقیت ثبت شد", "success");
          toastAlert("روی مرحله نوع معامله کلیک کنید", "info");
          setNextSection(3);
          setShowLoading(false);
        } else throw new Error();
      })
      .catch((err) => {
        console.log(err);
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          post_title: "",
          post_content: "",
          post_status: "",
        }}
        validationSchema={createStateInfo}
        onSubmit={(values) => {
          handleCreateEstate(values);
        }}
      >
        <Form className=" px-32 max-xl:px-5 py-10">
          <label htmlFor="post_title" className="mb-3 text-white block">
            عنوان
          </label>
          <Field
            id="post_title"
            name="post_title"
            type="text"
            placeholder=""
            // value={stateData.rendered.title}
            value={stateData.title}
            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
          />
          <ErrorMessage
            name="post_title"
            render={(msg) => <div className="text-red-500">{msg}</div>}
          />

          <label htmlFor="post_content" className="mb-3 text-white block">
            توضیحات
          </label>
          <Field
            id="post_content"
            name="post_content"
            as="textarea"
            rows={10}
            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
          />
          <ErrorMessage
            name="post_content"
            render={(msg) => <div className="text-red-500">{msg}</div>}
          />

          <div className="w-full">
            <label htmlFor="post_status" className="mb-3 text-white block">
              وضعیت نوشته
            </label>
            <Field
              id="post_status"
              name="post_status"
              as="select"
              rows={10}
              required
              className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
            >
              <option value="0"> انتخاب کنید </option>
              <option value="pending"> در انتظار بررسی </option>
              <option value="publish"> انتشار </option>
              <option value="draft"> پیشنویس </option>
            </Field>
            <ErrorMessage
              name="post_status"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>

          <div className="w-full m-auto flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#4a80bb] items-center justify-center max-lg:w-full m-auto flex items-end justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
            >
              <RiAncientPavilionFill size={24} />
              ثبت اطلاعات اولیه
              {showLoading && <BeatLoader size={10} color="#fff" />}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default InformationForm;
