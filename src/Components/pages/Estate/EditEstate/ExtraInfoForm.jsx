import Layout from "../../../Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";

import { createState } from "../../../../validation/formikValidation";
import { useEffect, useRef, useState } from "react";
import {
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
} from "../../../helper";
import service from "../../../../server/service";
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router-dom";
const ExtraInfoForm = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showMantagha, setshowMantagha] = useState(false);
  const [showMantaghaData, setshowMantaghaData] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserId] = useState(0);
  const [extraInfo, setExtraInfo] = useState({
    name: "",
    shahr: "",
    address: "",
    mobile: "",
    email: "",
    moshaver: "",
    metrazh: "",
    priceform: "",
    fast: "",
    special: "",
    shahraki: "",
    kohpaye: "",
    saheli: "",
    parking: "",
    asansor: "",
    mg: [],
    emkanat: [],
  });
  const [moshavers, setMoshavers] = useState([]);
  const shahrakiRef = useRef();
  const kohpayeRef = useRef();
  const saheliRef = useRef();
  const fastRef = useRef();
  const specialRef = useRef();
  const parkingRef = useRef();
  const asansorRef = useRef();
  const { stateId } = useParams();

  useEffect(() => {
    let userData = getUserDataOnLocalStorage();

    setUserId(userData.ID);

    if (userData.role.administrator != null) {
      setUserRole(1);
    } else {
      setUserId(userData.ID);
    }
    let userToken = getToken();
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

    service.states
      .getState(userToken, stateId)
      .then((data) => {
        console.log(data);
        setshowMantaghaData(data.data[0].ostan);
        setshowMantagha(true);
        setExtraInfo({
          name: data.data[0].name,
          parking: data.data[0].parking,
          asansor: data.data[0].asansor,
          shahr: data.data[0].shahr,
          address: data.data[0].address,
          mobile: data.data[0].mobile,
          email: data.data[0].email,
          moshaver: data.data[0].moshaver,
          metrazh: data.data[0].metrazh,
          priceform: data.data[0]["price-form"],
          fast: data.data[0].fast,
          special: data.data[0].special,
          shahraki: data.data[0].shahraki,
          kohpaye: data.data[0].kohpaye,
          saheli: data.data[0].saheli,
          mantaghe: data.data[0].mantaghe,
          mg: data.data[0].mg,
          emkanat: data.data[0]["sayer-emkanat"],
        });
        setUserId(data.data[0].moshaver);
      })
      .catch((err) => {
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
  }, []);
  const handleCreateStateMeta = (values) => {
    setShowLoading(true);

    let emkanatElements = document.getElementsByClassName("emkanat");
    let wgElements = document.getElementsByClassName("wg");
    let checkedEmkanat = [];
    for (const item of emkanatElements) {
      if (item.checked) {
        checkedEmkanat.push(item.getAttribute("data-title"));
      }
    }
    let checkedWg = [];

    for (const item of wgElements) {
      if (item.checked) {
        checkedWg.push(item.getAttribute("data-title"));
      }
    }

    let userToken = getToken();
    let stateData = {
      ID: stateId,
      meta: [
        {
          ostan: showMantaghaData,
          shahr: extraInfo.shahr,
          name: extraInfo.name,
          address: extraInfo.address,
          mobile: extraInfo.mobile,
          email: extraInfo.email,
          priceform: extraInfo.priceform,
          metrazh: extraInfo.metrazh,
          moshaver: userID,
          fast: fastRef.current.checked ? "1" : "0",
          special: specialRef.current.checked ? "1" : "0",
          mg: checkedWg,
          asansor: asansorRef.current.checked ? "1" : "0",
          parking: parkingRef.current.checked ? "1" : "0",
          shahraki: shahrakiRef.current.checked ? "1" : "0",
          kohpaye: kohpayeRef.current.checked ? "1" : "0",
          saheli: saheliRef.current.checked ? "1" : "0",
          sayeremkanat: checkedEmkanat,
        },
      ],
    };

    service.states
      .insertMetaData(userToken, stateData)
      .then((data) => {
        if (data.status == 200) {
          setShowLoading(false);
          toastAlert("اطلاعات اضافی با موفقیت ثبت شد", "success");
          toastAlert("روی مرحله رسانه کلیک کنید", "info");
        } else throw new Error();
      })
      .catch((err) => {
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          shahr: "",
          name: "",
          address: "",
          mobile: "",
          email: "",
          moshaver: "",
          metrazh: "",
          wg: "",
        }}
        onSubmit={(values) => {
          handleCreateStateMeta(values);
        }}
      >
        <Form className=" px-32 max-xl:px-5 py-10">
          <label htmlFor="area" className="mb-3 text-white block">
            منطقه
          </label>
          <Field
            id="mantaghe"
            name="mantaghe"
            as="select"
            value={showMantaghaData}
            onChange={(e) => {
              if (e.target.value != 0) setshowMantagha(true);
              setshowMantaghaData(e.target.value);
            }}
            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
          >
            <option value="">منطقه را انتخاب کنید</option>
            <option
              value="بوکان"
              selected={extraInfo.mantaghe == "بوکان" ? true : false}
            >
              بوکان
            </option>
            <option
              value="تهران"
              selected={extraInfo.mantaghe == "تهران" ? true : false}
            >
              تهران
            </option>
          </Field>
          {showMantagha && (
            <Field
              id="shahr"
              name="shahr"
              as="select"
              value={extraInfo.shahr}
              onChange={(e) => {
                setExtraInfo({
                  ...extraInfo,
                  shahr: e.target.value,
                });
              }}
              className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
            >
              <option>همه</option>
              <option
                selected={extraInfo.shahr == "اسلام اباد" ? true : false}
                value="اسلام اباد"
              >
                اسلام اباد
              </option>
              <option
                value="آزادگان"
                selected={extraInfo.shahr == "آزادگان" ? true : false}
              >
                {" "}
                آزادگان
              </option>
              <option
                value="ابوذر"
                selected={extraInfo.shahr == "ابوذر" ? true : false}
              >
                {" "}
                ابوذر
              </option>
              <option
                value="استاد حقیقی"
                selected={extraInfo.shahr == "استاد حقیقی" ? true : false}
              >
                استاد حقیقی
              </option>
              <option
                value="اسکندری"
                selected={extraInfo.shahr == "اسکندری" ? true : false}
              >
                اسکندری
              </option>
              <option
                value="امیر آباد"
                selected={extraInfo.shahr == "امیر آباد" ? true : false}
              >
                امیر آباد
              </option>
              <option
                value="اینگیجه"
                selected={extraInfo.shahr == "اینگیجه" ? true : false}
              >
                {" "}
                اینگیجه
              </option>
              <option
                value="پارک ساحلی"
                selected={extraInfo.shahr == "پارک ساحلی" ? true : false}
              >
                پارک ساحلی
              </option>
              <option
                value="جاده حصار"
                selected={extraInfo.shahr == "جاده حصار" ? true : false}
              >
                جاده حصار
              </option>
              <option
                value="چهاراه اطلاعات"
                selected={extraInfo.shahr == "چهاراه اطلاعات" ? true : false}
              >
                چهاراه اطلاعات
              </option>
              <option
                value="چهاراه شهرداری"
                selected={extraInfo.shahr == "چهاراه شهرداری" ? true : false}
              >
                چهاراه شهرداری
              </option>
              <option
                value="خیابان انقلاب"
                selected={extraInfo.shahr == "خیابان انقلاب" ? true : false}
              >
                خیابان انقلاب
              </option>
              <option
                value="خیابان زیتون"
                selected={extraInfo.shahr == "خیابان زیتون" ? true : false}
              >
                خیابان زیتون
              </option>
              <option
                value="خیابان سقز"
                selected={extraInfo.shahr == "خیابان سقز" ? true : false}
              >
                خیابان سقز
              </option>
              <option
                value="خیابان ورزش"
                selected={extraInfo.shahr == "خیابان ورزش" ? true : false}
              >
                خیابان ورزش
              </option>
              <option
                value="دانشگاه آزاد"
                selected={extraInfo.shahr == "دانشگاه آزاد" ? true : false}
              >
                دانشگاه آزاد
              </option>
              <option
                value="زیبا کنار"
                selected={extraInfo.shahr == "زیبا کنار" ? true : false}
              >
                زیبا کنار
              </option>
              <option
                value="سه راه خاوران"
                selected={extraInfo.shahr == "سه راه خاوران" ? true : false}
              >
                سه راه خاوران
              </option>
              <option
                value="سید شکره"
                selected={extraInfo.shahr == "سید شکره" ? true : false}
              >
                سید شکره
              </option>
              <option
                value="شهرک امام"
                selected={extraInfo.shahr == "شهرک امام" ? true : false}
              >
                شهرک امام
              </option>
              <option
                value="شهرک برق"
                selected={extraInfo.shahr == "شهرک برق" ? true : false}
              >
                شهرک برق
              </option>
              <option
                value="شهرک فرهنگیان"
                selected={extraInfo.shahr == "شهرک فرهنگیان" ? true : false}
              >
                شهرک فرهنگیان
              </option>
              <option
                value="شهرک گلستان"
                selected={extraInfo.shahr == "شهرک گلستان" ? true : false}
              >
                شهرک گلستان
              </option>
              <option
                value="عشایر"
                selected={extraInfo.shahr == "عشایر" ? true : false}
              >
                عشایر
              </option>
              <option
                value="علی آباد"
                selected={extraInfo.shahr == "علی آباد" ? true : false}
              >
                علی آباد
              </option>
              <option
                value="فرمانداری"
                selected={extraInfo.shahr == "فرمانداری" ? true : false}
              >
                فرمانداری
              </option>
              <option
                value="فلکه قدس"
                selected={extraInfo.shahr == "فلکه قدس" ? true : false}
              >
                فلکه قدس
              </option>
              <option
                value="کشتارگاه"
                selected={extraInfo.shahr == "کشتارگاه" ? true : false}
              >
                کشتارگاه
              </option>
              <option
                value="کلتپه"
                selected={extraInfo.shahr == "کلتپه" ? true : false}
              >
                کلتپه
              </option>
              <option
                value="کمربندی"
                selected={extraInfo.shahr == "کمربندی" ? true : false}
              >
                کمربندی
              </option>
              <option
                value="کهریزه محمود آباد"
                selected={extraInfo.shahr == "کهریزه محمود آباد" ? true : false}
              >
                کهریزه محمود آباد
              </option>
              <option
                value="کوسه"
                selected={extraInfo.shahr == "کوسه" ? true : false}
              >
                کوسه
              </option>
              <option
                value="کوی آفتاب"
                selected={extraInfo.shahr == "کوی آفتاب" ? true : false}
              >
                کوی آفتاب
              </option>
              <option
                value="کوی اندیشه"
                selected={extraInfo.shahr == "کوی اندیشه" ? true : false}
              >
                کوی اندیشه
              </option>
              <option
                value="کوی سپاه"
                selected={extraInfo.shahr == "کوی سپاه" ? true : false}
              >
                کوی سپاه
              </option>
              <option
                value="کوی محمدیه"
                selected={extraInfo.shahr == "کوی محمدیه" ? true : false}
              >
                کوی محمدیه
              </option>
              <option
                value="مجسمه مادر"
                selected={extraInfo.shahr == "مجسمه مادر" ? true : false}
              >
                مجسمه مادر
              </option>
              <option
                value="مسکن مهر"
                selected={extraInfo.shahr == "مسکن مهر" ? true : false}
              >
                مسکن مهر
              </option>
              <option
                value="ناچیت"
                selected={extraInfo.shahr == "ناچیت" ? true : false}
              >
                ناچیت
              </option>
            </Field>
          )}

          <div className="flex items-center justify-between gap-4 max-md:flex-col">
            <div className="w-full">
              <label htmlFor="name" className="mb-3 text-white block">
                نام مالک
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder=""
                value={extraInfo.name}
                onChange={(e) => {
                  setExtraInfo({
                    ...extraInfo,
                    name: e.target.value,
                  });
                }}
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
                value={extraInfo.address}
                onChange={(e) => {
                  setExtraInfo({
                    ...extraInfo,
                    address: e.target.value,
                  });
                }}
                placeholder=""
                className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 max-md:flex-col">
            <div className="w-full">
              <label htmlFor="mobile" className="mb-3 text-white block">
                تلفن مالک
              </label>
              <Field
                id="mobile"
                name="mobile"
                type="text"
                value={extraInfo.mobile}
                onChange={(e) => {
                  setExtraInfo({
                    ...extraInfo,
                    mobile: e.target.value,
                  });
                }}
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
                value={extraInfo.email}
                onChange={(e) => {
                  setExtraInfo({
                    ...extraInfo,
                    email: e.target.value,
                  });
                }}
                type="text"
                placeholder=""
                className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200 shadow-gray-800 shadow-sm    sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 max-md:flex-col">
            <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
              <div className="w-full">
                <label htmlFor="price-form" className="mb-3 text-white block">
                  نوع نمایش قیمت
                </label>
                <Field
                  id="price-form"
                  name="priceform"
                  as="select"
                  onChange={(e) => {
                    setExtraInfo({
                      ...extraInfo,
                      priceform: e.target.value,
                    });
                  }}
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                >
                  <option
                    selected={
                      extraInfo.priceform == "نمایش قیمت" ? true : false
                    }
                  >
                    {" "}
                    نمایش قیمت
                  </option>

                  <option
                    selected={extraInfo.priceform == "نمایش" ? true : false}
                  >
                    توافقی
                  </option>
                  <option
                    selected={
                      extraInfo.priceform == "تماس بگیرید" ? true : false
                    }
                  >
                    تماس بگیرید
                  </option>
                  <option
                    selected={extraInfo.priceform == "حراجی" ? true : false}
                  >
                    {" "}
                    حراجی
                  </option>
                  <option
                    selected={
                      extraInfo.priceform == "بالاترین پیشنهاد" ? true : false
                    }
                  >
                    {" "}
                    بالاترین پیشنهاد
                  </option>
                </Field>
              </div>
              <div className="w-full">
                <label htmlFor="metrazh" className="mb-3 text-white block">
                  متراژ
                </label>
                <Field
                  id="metrazh"
                  name="metrazh"
                  type="number"
                  value={extraInfo.metrazh}
                  onChange={(e) => {
                    setExtraInfo({
                      ...extraInfo,
                      metrazh: e.target.value,
                    });
                  }}
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 max-md:flex-col">
            <div className="w-full">
              <label htmlFor="moshaver" className="mb-3 text-white block">
                مشاور مربوطه
              </label>
              <Field
                id="moshaver"
                name="moshaver"
                as="select"
                value={userID}
                onChange={(e) => {
                  setExtraInfo({
                    ...extraInfo,
                    moshaver: e.target.value,
                  });
                  setUserId(e.target.value);
                }}
                disabled={userRole != 1 ? true : false}
                className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
              >
                {moshavers.map((item, index) => (
                  <option
                    selected={item.id == userID ? true : false}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className="w-full">
              <div className="flex items-center gap-9 mt-8">
                <div className=" ">
                  <label htmlFor="saheli" className="mb-2 text-white block">
                    فوری
                  </label>{" "}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      id="saheli"
                      type="checkbox"
                      ref={fastRef}
                      checked={extraInfo.fast == "1" ? true : false}
                      name="saheli"
                      className="sr-only peer"
                      onChange={(e) => {
                        setExtraInfo({
                          ...extraInfo,
                          fast: e.target.checked ? "1" : "",
                        });
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className=" ">
                  <label htmlFor="shahraki" className="mb-2 text-white block">
                    ویژه
                  </label>{" "}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      id="shahraki"
                      type="checkbox"
                      name="shahraki"
                      ref={specialRef}
                      checked={extraInfo.special == "1" ? true : false}
                      onChange={(e) => {
                        setExtraInfo({
                          ...extraInfo,
                          special: e.target.checked ? "1" : "",
                        });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <label htmlFor="area" className="my-8 text-white block">
            <h2 className=" my-10 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
              جهت ملک{" "}
            </h2>
          </label>
          <div className="flex items-center flex-wrap justify-start gap-7">
            <div className="flex items-center   ">
              <input
                type="checkbox"
                name="wg"
                id=""
                className="wg"
                data-title="شمالی"
                checked={extraInfo.mg?.find((item) => item == "شمالی")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.mg?.filter((item) => item != "شمالی");

                    setExtraInfo({ ...extraInfo, mg: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">شمالی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="wg"
                id=""
                className="wg"
                checked={extraInfo.mg?.find((item) => item == "جنوبی")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.mg?.filter((item) => item != "جنوبی");

                    setExtraInfo({ ...extraInfo, mg: data });
                    e.target.checked = false;
                  }
                }}
                data-title="جنوبی"
              />
              <label className="mr-2 text-white block">جنوبی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="wg"
                id=""
                className="wg"
                data-title="شرقی"
                checked={extraInfo.mg?.find((item) => item == "شرقی")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.mg?.filter((item) => item != "شرقی");

                    setExtraInfo({ ...extraInfo, mg: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">شرقی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="wg"
                id=""
                checked={extraInfo.mg?.find((item) => item == "غربی")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.mg?.filter((item) => item != "غربی");

                    setExtraInfo({ ...extraInfo, mg: data });
                    e.target.checked = false;
                  }
                }}
                className="wg"
                data-title="غربی"
              />
              <label className="mr-2 text-white block">غربی</label>
            </div>
          </div>

          <div className="flex items-center gap-9 mt-8">
            <div className="mt-4">
              <label htmlFor="saheli" className="mb-2 text-white block">
                ساحلی
              </label>{" "}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="saheli"
                  type="checkbox"
                  ref={saheliRef}
                  checked={extraInfo.saheli == "1" ? true : false}
                  onChange={(e) => {
                    setExtraInfo({
                      ...extraInfo,
                      saheli: e.target.checked ? "1" : "",
                    });
                  }}
                  name="saheli"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="mt-4">
              <label htmlFor="shahraki" className="mb-2 text-white block">
                شهرکی
              </label>{" "}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="shahraki"
                  type="checkbox"
                  name="shahraki"
                  checked={extraInfo.shahraki == "1" ? true : false}
                  onChange={(e) => {
                    setExtraInfo({
                      ...extraInfo,
                      shahraki: e.target.checked ? "1" : "",
                    });
                  }}
                  ref={shahrakiRef}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="mt-4">
              <label htmlFor="kohpaye" className="mb-2 text-white block">
                کوهپایه
              </label>{" "}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="kohpaye"
                  type="checkbox"
                  ref={kohpayeRef}
                  checked={extraInfo.kohpaye == "1" ? true : false}
                  onChange={(e) => {
                    setExtraInfo({
                      ...extraInfo,
                      kohpaye: e.target.checked ? "1" : "",
                    });
                  }}
                  name="kohpaye"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <label htmlFor="area" className="my-8 text-white block">
            <h2 className=" my-10 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
              امکانات{" "}
            </h2>
          </label>
          <div className="flex items-center gap-7 flex-wrap justify-start">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={extraInfo.parking == "دارد" ? true : false}
                name="parking"
                onChange={(e) => {
                  setExtraInfo({
                    ...extraInfo,
                    parking: e.target.checked ? "دارد" : "ندارد",
                  });
                }}
                ref={parkingRef}
              />
              <label className="mr-2 text-white block">پارکینگ</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="asansor"
                id=""
                checked={extraInfo.asansor == "دارد" ? true : false}
                onChange={(e) => {
                  setExtraInfo({
                    ...extraInfo,
                    asansor: e.target.checked ? "دارد" : "ندارد",
                  });
                }}
              />
              <label className="mr-2 text-white block">آسانسور</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                ref={asansorRef}
                className="emkanat"
                data-title="آب"
                checked={extraInfo.emkanat?.find((item) => item == "آب")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "آب"
                    );

                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">آب</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                data-title="برق"
                className="emkanat"
                checked={extraInfo.emkanat?.find((item) => item == "برق")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "برق"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">برق</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                checked={extraInfo.emkanat?.find((item) => item == "گاز")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "گاز"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
                data-title="گاز"
                className="emkanat"
              />
              <label className="mr-2 text-white block">گاز</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                checked={extraInfo.emkanat?.find((item) => item == "انباری")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "انباری"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
                className="emkanat"
                data-title="انباری"
              />
              <label className="mr-2 text-white block">انباری</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                checked={extraInfo.emkanat?.find(
                  (item) => item == "درب ضد سرقت"
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "درب ضد سرقت"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
                className="emkanat"
                data-title="درب ضد سرقت"
              />
              <label className="mr-2 text-white block">درب ضد سرقت</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                checked={extraInfo.emkanat?.find((item) => item == "تلفن")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "تلفن"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
                className="emkanat"
                data-title="تلفن"
              />
              <label className="mr-2 text-white block">تلفن</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                checked={extraInfo.emkanat?.find((item) => item == "شوفاژ")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "شوفاژ"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
                className="emkanat"
                data-title="شوفاژ"
              />
              <label className="mr-2 text-white block">شوفاژ</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="شومینه"
                checked={extraInfo.emkanat?.find((item) => item == "شومینه")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "شومینه"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">شومینه</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                checked={extraInfo.emkanat?.find((item) => item == "پکیج")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "پکیج"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
                className="emkanat"
                data-title="پکیج"
              />
              <label className="mr-2 text-white block">پکیج</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="کولر"
                checked={extraInfo.emkanat?.find((item) => item == "کولر")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "کولر"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">کولر</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="سونا"
                checked={extraInfo.emkanat?.find((item) => item == "سونا")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "سونا"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">سونا</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="استخر"
                checked={extraInfo.emkanat?.find((item) => item == "استخر")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "استخر"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">استخر</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="جکوزی"
                checked={extraInfo.emkanat?.find((item) => item == "جکوزی")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "جکوزی"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">جکوزی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="آیفون نصویری"
                checked={extraInfo.emkanat?.find(
                  (item) => item == "آیفون تصویری"
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "آیفون تصویری"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">آیفون نصویری</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="دوربین مدار بسته"
                checked={extraInfo.emkanat?.find(
                  (item) => item == "دوربین مدار بسته"
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "دوربین مدار بسته"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">دوربین مدار بسته</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="درب ریموت"
                checked={extraInfo.emkanat?.find((item) => item == "درب ریموت")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "درب ریموت"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">درب ریموت</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="انتن مرکزی"
                checked={extraInfo.emkanat?.find(
                  (item) => item == "انتن مرکزی"
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "انتن مرکزی"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">انتن مرکزی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                checked={extraInfo.emkanat?.find((item) => item == "پاسیو")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "پاسیو"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
                className="emkanat"
                data-title="پاسیو"
              />
              <label className="mr-2 text-white block">پاسیو</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="باربیکیو"
                checked={extraInfo.emkanat?.find((item) => item == "باربیکیو")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "باربیکیو"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">باربیکیو</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="بالکن"
                checked={extraInfo.emkanat?.find((item) => item == "بالکن")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "بالکن"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">بالکن</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="حیات"
                checked={extraInfo.emkanat?.find((item) => item == "حیات")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "حیات"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">حیات</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="لابی"
                checked={extraInfo.emkanat?.find((item) => item == "لابی")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "لابی"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">لابی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                checked={extraInfo.emkanat?.find(
                  (item) => item == "سالن اجتماعات"
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "سالن اجتماعات"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
                data-title="سالن اجتماعات"
              />
              <label className="mr-2 text-white block">سالن اجتماعات</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="سرایداری"
                checked={extraInfo.emkanat?.find((item) => item == "سرایداری")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "سرایداری"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">سرایداری</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="مبله"
                checked={extraInfo.emkanat?.find((item) => item == "مبله")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "مبله"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">مبله</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="اطفاء حریق"
                checked={extraInfo.emkanat?.find(
                  (item) => item == "اطفاء حریق"
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "اطفاء حریق"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">اطفاء حریق</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="وام"
                checked={extraInfo.emkanat?.find((item) => item == "وام")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "وام"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">وام</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="آب چاه"
                checked={extraInfo.emkanat?.find((item) => item == "آب چاه")}
                onChange={(e) => {
                  if (e.target.checked) {
                    e.target.checked = true;
                  } else {
                    let data = extraInfo.emkanat?.filter(
                      (item) => item != "آب چاه"
                    );
                    setExtraInfo({ ...extraInfo, emkanat: data });
                    e.target.checked = false;
                  }
                }}
              />
              <label className="mr-2 text-white block">آب چاه</label>
            </div>
          </div>

          <div className="w-full m-auto flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#4a80bb] items-center justify-center max-lg:w-full m-auto flex items-end justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
            >
              <RiAncientPavilionFill size={24} />
              ثبت اطلاعات اضافی
              {showLoading && <BeatLoader size={10} color="#fff" />}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ExtraInfoForm;
