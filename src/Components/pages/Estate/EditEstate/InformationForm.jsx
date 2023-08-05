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
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InformationForm = ({ setNextSection }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [userID, setUserId] = useState(0);
  const moshaverRef = useRef();
  const [userRole, setUserRole] = useState(null);
  const [moshavers, setMoshavers] = useState([]);
  const { stateId } = useParams();
  const navigate = useNavigate();

  const [informationData, setInformationData] = useState({
    title: "",
    content: "",
    status: "",
    moshaver: "",
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
      author: informationData.moshaver,
      type: "state",
    };
    service.states
      .editState(userToken, stateId, stateData)
      .then((data) => {
        if (data.status == 200) {
          toastAlert("اطلاعات اولیه با موفقیت ویرایش شد", "success");
          toastAlert("روی مرحله نوع معامله کلیک کنید", "info");
          setShowLoading(false);
        } else throw new Error();
      })
      .catch((err) => {
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
  };
  useEffect(() => {
    let userToken = getToken();
    let moshaverRole = getUserDataOnLocalStorage();
    let moshaverId = getUserDataOnLocalStorage();
    moshaverRole = moshaverRole.role;
    moshaverId = moshaverRole.ID;
  
    if (moshaverRole.administrator != null) {
      setUserRole(1);
    } else {
      setUserId(moshaverId);
    }

    service.personnel
      .getUsers(userToken)
      .then((data) => {
        if (data.data.status == 403) throw new Error();
        let moshaverItems = [];
        data.data.map((item) => {
          if (!item.extra.role[0].karbar) {
            moshaverItems.push(item);
          }
        });
        setMoshavers(moshaverItems);
      })
      .catch((err) => {
        toastAlert("شما به بخش دسترسی ندارید");
      });

    let userData = getUserDataOnLocalStorage();
    service.states
      .getState(userToken, stateId)
      .then((data) => {
        if (data.data.length == 0) {
          navigate("/404");
        }
        setInformationData({
          title: data.data[0].post_title,
          content: data.data[0].post_content,
          status: data.data[0].post_status,
          moshaver: data.data[0].post_author,
        });
      })
      .catch((err) => {
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
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

          <div className="flex items-center justify-between gap-4 max-md:flex-col">
            <div className="w-full">
              <label htmlFor="auther" className="mb-3 text-white block">
                کاربر ثبت کننده ملک 
              </label>
              <select
                id="auther"
                name="auther"
                as="select"
                ref={moshaverRef}
                value={informationData.moshaver}
                onChange={(e) => {
                  setInformationData({
                    ...informationData,
                    moshaver: e.target.value,
                  });
                }}
                disabled={userRole != 1 ? true : false}
                className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
              >
                {moshavers.map((item, index) => (
                  <option
                    selected={item.id == informationData.moshaver ? true : false}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
              <option
                value="expired  "
                selected={informationData.status == "expired" ? true : false}
              >
                فروخته شد
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
