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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InformationForm = ({ setNextSection }) => {
  const [showLoading, setShowLoading] = useState(false);
  const { stateId } = useParams();

  const [informationData, setInformationData] = useState({
    title: "",
    content: "",
    status: "",
  });
  const handleEditState = (values) => {
    if (values.post_status == "0") {
      toastAlert("لطفا وضعیت نوشته را وارد کنید ");
      return;
    }
    setShowLoading(true);
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();

    let stateData = {
      title: informationData.title,
      content: informationData.content,
      status: informationData.status,
      type: "state",
    };
    service.states
      .editState(userToken, stateId, stateData)
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          toastAlert("اطلاعات اولیه با موفقیت ویرایش شد", "success");
          toastAlert("روی مرحله نوع معامله کلیک کنید", "info");
          setShowLoading(false);
        } else throw new Error();
      })
      .catch((err) => {
        console.log(err);
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
  };
  useEffect(() => {
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();
    service.states
      .getState(userToken, stateId)
      .then((data) => {
        console.log(data.data.status);
        setInformationData({
          title: data.data[0].post_title,
          content: data.data[0].post_content,
          status: data.data[0].post_status,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(informationData);
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          post_title: "",
          post_content: "",
          post_status: "",
        }}
        // validationSchema={createStateInfo}
        onSubmit={(values) => {
          handleEditState(values);
        }}
      >
        <Form className=" px-32 max-xl:px-5 py-10">
          <label htmlFor="post_title" className="mb-3 text-white block">
            عنوان
          </label>
          <input
            id="post_title"
            name="post_title"
            type="text"
            placeholder=""
            onChange={(e) => {
              setInformationData({
                ...informationData,
                title: e.target.value,
              });
            }}
            required
            value={informationData.title}
            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
          />

          <label htmlFor="post_content" className="mb-3 text-white block">
            توضیحات
          </label>
          <textarea
            id="post_content"
            name="post_content"
            rows={10}
            required
            onChange={(e) => {
              setInformationData({
                ...informationData,
                content: e.target.value,
              });
            }}
            value={informationData.content}
            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
          />

          <div className="w-full">
            <label htmlFor="post_status" className="mb-3 text-white block">
              وضعیت نوشته
            </label>
            <select
              id="post_status"
              name="post_status"
              rows={10}
              onChange={(e) => {
                setInformationData({
                  ...informationData,
                  status: e.target.value,
                });
              }}
              className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
            >
              <option
                value="pending"
                selected={informationData.status == "" ? true : false}
              >
                انتخاب کنید
              </option>
              <option
                value="pending"
                selected={informationData.status == "pending" ? true : false}
              >
                {" "}
                در انتظار بررسی{" "}
              </option>
              <option
                value="publish"
                selected={informationData.status == "publish" ? true : false}
              >
                منتشر شده
              </option>
              <option
                value="draft"
                selected={informationData.status == "draft" ? true : false}
              >
                {" "}
                پیشنویس{" "}
              </option>
            </select>
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
