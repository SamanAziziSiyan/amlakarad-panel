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
const ExtraInfoForm = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [getSpecial, setSpecial] = useState(false);

  const [showMantagha, setshowMantagha] = useState(false);
  const [showMantaghaData, setshowMantaghaData] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserId] = useState(0);
  const [moshavers, setMoshavers] = useState([]);
  const shahrakiRef = useRef();
  const kohpayeRef = useRef();
  const saheliRef = useRef();
  const fastRef = useRef();
  const specialRef = useRef();
  const parkingRef = useRef();
  const asansorRef = useRef();
  const moshaverRef = useRef();
  const specialReasonRef = useRef();

  useEffect(() => {
    let userData = getUserDataOnLocalStorage();

    if (userData.role.administrator != null) {
      setUserRole(1);
      setUserId(userData.ID);
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
  }, []);
  const handleCreateStateMeta = (values) => {
    setShowLoading(true);
    let e = moshaverRef.current;

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
    let stateId = localStorage.getItem("stateId");
    let stateData = {
      ID: stateId,
      meta: [
        {
          ostan: showMantaghaData,
          shahr: values.shahr,
          name: values.name,
          address: values.address,
          mobile: values.mobile,
          email: values.email,
          priceform: values.priceform,
          metrazh: values.metrazh,
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
          specialReason:
            specialReasonRef?.current?.value == undefined
              ? ""
              : specialReasonRef?.current?.value,
        },
      ],
    };
    service.states
      .insertMetaData(userToken, stateData)
      .then((data) => {
        if (data.status == 200) {
          localStorage.setItem("ownerMobile", values.mobile);
          localStorage.setItem("moshaverName", e.options[e.selectedIndex].text);
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
            rows={10}
            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
          >
            <option value="">منطقه را انتخاب کنید</option>
            <option value="بوکان">بوکان</option>
          </Field>
          {showMantagha && (
            <Field
              id="ostan"
              name="shahr"
              as="select"
              rows={10}
              className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
            >
              <option>همه</option>
              <option value="اسلام اباد">اسلام اباد</option>
              <option value="آزادگان"> آزادگان</option>
              <option value=" ابوذر"> ابوذر</option>
              <option value="استاد حقیقی">استاد حقیقی</option>
              <option value="اسکندری">اسکندری</option>
              <option value="امیر آباد">امیر آباد</option>
              <option value=" اینگیجه"> اینگیجه</option>
              <option value="پارک ساحلی">پارک ساحلی</option>
              <option value="جاده حصار">جاده حصار</option>
              <option value="چهاراه اطلاعات">چهاراه اطلاعات</option>
              <option value="چهاراه شهرداری">چهاراه شهرداری</option>
              <option value="خیابان انقلاب">خیابان انقلاب</option>
              <option value="خیابان زیتون">خیابان زیتون</option>
              <option value="خیابان سقز">خیابان سقز</option>
              <option value="خیابان ورزش">خیابان ورزش</option>
              <option value="دانشگاه آزاد">دانشگاه آزاد</option>
              <option value="زیبا کنار">زیبا کنار</option>
              <option value="سه راه خاوران">سه راه خاوران</option>
              <option value="سید شکره">سید شکره</option>
              <option value="شهرک امام">شهرک امام</option>
              <option value="شهرک برق">شهرک برق</option>
              <option value="شهرک فرهنگیان">شهرک فرهنگیان</option>
              <option value="شهرک گلستان">شهرک گلستان</option>
              <option value="عشایر">عشایر</option>
              <option value="علی آباد">علی آباد</option>
              <option value="فرمانداری">فرمانداری</option>
              <option value="فلکه قدس">فلکه قدس</option>
              <option value="کشتارگاه">کشتارگاه</option>
              <option value="کلتپه">کلتپه</option>
              <option value="کمربندی">کمربندی</option>
              <option value="کهریزه محمود آباد">کهریزه محمود آباد</option>
              <option value="کوسه">کوسه</option>
              <option value="کوی آفتاب">کوی آفتاب</option>
              <option value="کوی اندیشه">کوی اندیشه</option>
              <option value="کوی سپاه">کوی سپاه</option>
              <option value="کوی محمدیه">کوی محمدیه</option>
              <option value="مجسمه مادر">مجسمه مادر</option>
              <option value="مسکن مهر">مسکن مهر</option>
              <option value="ناچیت">ناچیت</option>
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
          <div className="flex items-center justify-between gap-4 max-md:flex-col">
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
                  rows={10}
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                >
                  <option> نمایش قیمت</option>

                  <option>توافقی</option>
                  <option>تماس بگیرید</option>
                  <option> حراجی</option>
                  <option> بالاترین پیشنهاد</option>
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
              <select
                id="moshaver"
                name="moshaver"
                as="select"
                ref={moshaverRef}
                value={userID}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                disabled={userRole != 1 ? true : false}
                className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
              >
                {moshavers.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
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
                      name="saheli"
                      className="sr-only peer"
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
                      onChange={(e) => {
                        if (e.target.checked) setSpecial(true);
                        else setSpecial(false);
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {getSpecial && (
                  <div className="w-full">
                    <label
                      htmlFor="moavezefor"
                      className="mb-3 text-white block"
                    >
                      علت ویژه بودن
                    </label>
                    <input
                      id="moavezefor"
                      ref={specialReasonRef}
                      type="text"
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    />
                  </div>
                )}
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
              />
              <label className="mr-2 text-white block">شمالی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="wg"
                id=""
                className="wg"
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
              />
              <label className="mr-2 text-white block">شرقی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="wg"
                id=""
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
              <input type="checkbox" name="parking" id="" ref={parkingRef} />
              <label className="mr-2 text-white block">پارکینگ</label>
            </div>

            <div className="flex items-center">
              <input type="checkbox" name="asansor" id="" />
              <label className="mr-2 text-white block">آسانسور</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" ref={asansorRef} />
              <label className="mr-2 text-white block">آب</label>
            </div>

            <div className="flex items-center">
              <input type="checkbox" data-title="برق" className="emkanat" />
              <label className="mr-2 text-white block">برق</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                data-title="گاز"
                className="emkanat"
              />
              <label className="mr-2 text-white block">گاز</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="انباری"
              />
              <label className="mr-2 text-white block">انباری</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="درب ضد سرقت"
              />
              <label className="mr-2 text-white block">درب ضد سرقت</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
                data-title="تلفن"
              />
              <label className="mr-2 text-white block">تلفن</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
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
              />
              <label className="mr-2 text-white block">شومینه</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
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
              />
              <label className="mr-2 text-white block">انتن مرکزی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
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
              />
              <label className="mr-2 text-white block">لابی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="emkanat"
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
              />
              <label className="mr-2 text-white block">آب چاه</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="emkanat"
                data-title="آشپزخانه سرد و گرم"
              />
              <label className="mr-2 text-white block">
                آشپزخانه سرد و گرم
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="emkanat"
                data-title="زمین کشاورزی آبی"
              />
              <label className="mr-2 text-white block">زمین کشاورزی آبی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="emkanat"
                data-title="زمین کشاورزی دیمی"
              />
              <label className="mr-2 text-white block">زمین کشاورزی دیمی</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="emkanat"
                data-title="زمین کشاورزی بارانی ثابت"
              />
              <label className="mr-2 text-white block">
                زمین کشاورزی بارانی ثابت
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="emkanat"
                data-title="زمین کشاورزی بارانی متحرک"
              />
              <label className="mr-2 text-white block">
                زمین کشاورزی بارانی متحرک
              </label>
            </div>
          </div>

          <div className="w-full m-auto flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#4a80bb]  max-lg:w-full m-auto flex items-end justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
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
