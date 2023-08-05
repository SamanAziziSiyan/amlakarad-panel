import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  createState,
  loginSchema,
} from "../../../../validation/formikValidation";
import MultiStep from "react-multistep";
import service from "../../../../server/service";
import {
  getToken,
  sendSMSAdminState,
  sendSMSStateOwner,
  toastAlert,
} from "../../../helper";

import Layout from "../../../Layout";
import { useEffect, useState } from "react";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";
import InformationForm from "./InformationForm";
import ExtraInfoForm from "./ExtraInfoForm";
import MediaForm from "./MediaForm";
import TradeType from "./TradeType";
import PropertyType from "./PropertyType";
const CreateEstate = () => {
  const [showMantagha, setshowMantagha] = useState(false);
  const [shoMoamele, setShoMoamele] = useState("");
  const [shoMelk, setShowMelk] = useState("");
  const [nextSection, setNextSection] = useState(0);

  return (
    <>
      <Layout>
        <div className="relative w-full h-full mt-20">
          <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
          <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
          <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/10 flex justify-around flex-col ">
            <MultiStep showNavigation={false} activeStep={nextSection}>
              <InformationForm
                title="اطلاعات اولیه"
                setNextSection={setNextSection}
              />
              <TradeType
                title="اطلاعات  نوع معامله"
                setNextSection={setNextSection}
              />
              <PropertyType
                title="اطلاعات نوع ملک"
                setNextSection={setNextSection}
              />
              <ExtraInfoForm
                title="اطلاعات اضافه"
                setNextSection={setNextSection}
              />
              <MediaForm title="رسانه" />
            </MultiStep>

            {/* <Formik
              initialValues={{
                title: "",
                content: "",
                content: "",
               
  
              }}
              validationSchema={createState}
              onSubmit={(values) => {
                // handleCreateEstate(values);
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
                  onChange={(e) => {
                    if (e.target.value != 0) setshowMantagha(true);
                  }}
                  rows={10}
                  className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                >
                  <option>منطقه را انتخاب کنید</option>
                  <option>بوکان</option>
                </Field>
                {showMantagha && (
                  <Field
                    id="ostan"
                    name="ostan"
                    as="select"
                    rows={10}
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                  >
                    <option>همه</option>
                    <option>اسلام اباد</option>
                  </Field>
                )}

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
                      <label
                        htmlFor="moamele"
                        className="mb-3 text-white block"
                      >
                        نوع معامله
                      </label>
                      <Field
                        id="moamele"
                        name="moamele"
                        onChange={(e) => {
                          if (e.target.value == "") return setShoMoamele("");
                          if (e.target.value == "خرید و فروش")
                            return setShoMoamele("خرید و فروش");

                          if (e.target.value == "رهن و اجاره")
                            return setShoMoamele("رهن و اجاره");

                          if (e.target.value == "اجاره روزانه")
                            return setShoMoamele("اجاره روزانه");
                        }}
                        as="select"
                        value={shoMoamele}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value=""
                          selected={shoMoamele == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          value="خرید و فروش"
                          selected={shoMoamele == "خرید و فروش" ? true : false}
                        >
                          خرید و فروش
                        </option>
                        <option
                          value="رهن و اجاره"
                          selected={shoMoamele == "رهن و اجاره" ? true : false}
                        >
                          رهن و اجاره
                        </option>
                        <option
                          value="اجاره روزانه"
                          selected={shoMoamele == "اجاره روزانه" ? true : false}
                        >
                          اجاره روزانه
                        </option>
                      </Field>
                    </div>
                    <div className="w-full">
                      <label htmlFor="melk" className="mb-3 text-white block">
                        نوع ملک
                      </label>
                      <Field
                        id="melk"
                        name="melk"
                        onChange={(e) => {
                          if (e.target.value == "") return setShowMelk("");
                          if (e.target.value == "آپارتمان")
                            return setShowMelk("آپارتمان");

                          if (e.target.value == "خانه و ویلا")
                            return setShowMelk("خانه و ویلا");

                          if (e.target.value == "زمین و کلنگی")
                            return setShowMelk("زمین و کلنگی");

                          if (e.target.value == "اداری و تجاری")
                            return setShowMelk("اداری و تجاری");
                        }}
                        as="select"
                        value={shoMelk}
                        rows={10}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value=""
                          selected={shoMelk == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          value="آپارتمان"
                          selected={shoMelk == "آپارتمان" ? true : false}
                        >
                          آپارتمان
                        </option>
                        <option
                          value="خانه و ویلا"
                          selected={shoMelk == "خانه و ویلا" ? true : false}
                        >
                          خانه و ویلا
                        </option>
                        <option
                          value="زمین و کلنگی"
                          selected={shoMelk == "زمین و کلنگی" ? true : false}
                        >
                          زمین و کلنگی
                        </option>
                        <option
                          value="اداری و تجاری"
                          selected={shoMelk == "اداری و تجاری" ? true : false}
                        >
                          اداری و تجاری
                        </option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="priceform"
                        className="mb-3 text-white block"
                      >
                        نوع نمایش قیمت
                      </label>
                      <Field
                        id="priceform"
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
                      <label
                        htmlFor="metrazh"
                        className="mb-3 text-white block"
                      >
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
                <div className="flex items-center justify-between gap-4">
                  <div className="w-full">
                    <label htmlFor="moshaver" className="mb-3 text-white block">
                      مشاور مربوطه
                    </label>
                    <Field
                      id="moshaver"
                      name="moshaver"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option>solix</option>
                    </Field>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="post_status"
                      className="mb-3 text-white block"
                    >
                      وضعیت نوشته
                    </label>
                    <Field
                      id="post_status"
                      name="post_status"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option value="pending"> در انتظار بررسی </option>
                      <option value="publish"> انتشار </option>
                      <option value="draft"> پیشنویس </option>
                    </Field>
                  </div>
                </div>

                {shoMoamele == "خرید و فروش" ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="pricekol"
                            className="mb-3 text-white block"
                          >
                            قیمت کل
                          </label>
                          <Field
                            id="pricekol"
                            name="pricekol"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="pricemeteri"
                            className="mb-3 text-white block"
                          >
                            قیمت متری
                          </label>
                          <Field
                            id="pricemeteri"
                            name="pricemeteri"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="karbari"
                            className="mb-3 text-white block"
                          >
                            کاربری
                          </label>
                          <Field
                            id="karbari"
                            name="karbari"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> مسکونی </option>
                            <option> تجاری</option>
                            <option>اداری </option>
                            <option>زراعی </option>
                            <option>باغات </option>
                            <option>تفریحی </option>
                            <option>ورزشی </option>
                            <option>فضای سبر </option>
                            <option> بدون کاربری </option>
                            <option> خارج از بافت </option>
                            <option> سایر </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="sanad"
                            className="mb-3 text-white block"
                          >
                            نوع سند
                          </label>
                          <Field
                            id="sanad"
                            name="sanad"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option>تگ برگ</option>
                            <option>منگوله دار</option>
                            <option>قولنامه ای</option>
                            <option>اوقافی</option>
                            <option>بنیادی</option>
                            <option>سازمانی</option>
                            <option>نسخ</option>
                            <option>دردست اقدام</option>
                            <option>سایر </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center   gap-10">
                      <div className="mt-4">
                        <label
                          htmlFor="moaveze"
                          className="mb-2 text-white block"
                        >
                          امکان معاوضه
                        </label>{" "}
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            id="moaveze"
                            name="moaveze"
                            value=""
                            class="sr-only peer"
                          />
                          <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="pishforosh"
                          className="mb-2 text-white block"
                        >
                          پیش فروش
                        </label>{" "}
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="pishforosh"
                            id="pishforosh"
                            value=""
                            class="sr-only peer"
                          />
                          <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </>
                ) : shoMoamele == "رهن و اجاره" ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="vadie"
                            className="mb-3 text-white block"
                          >
                            ودیعه
                          </label>
                          <Field
                            id="vadie"
                            name="vadie"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="priceejare"
                            className="mb-3 text-white block"
                          >
                            اجاره
                          </label>
                          <Field
                            id="priceejare"
                            name="priceejare"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="karbari"
                            className="mb-3 text-white block"
                          >
                            کاربری
                          </label>
                          <Field
                            id="karbari"
                            name="karbari"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> مسکونی </option>
                            <option> تجاری</option>
                            <option>اداری </option>
                            <option>زراعی </option>
                            <option>باغات </option>
                            <option>تفریحی </option>
                            <option>ورزشی </option>
                            <option>فضای سبر </option>
                            <option> بدون کاربری </option>
                            <option> خارج از بافت </option>
                            <option> سایر </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tabdil"
                            className="mb-3 text-white block"
                          >
                            قابلیت تبدیل
                          </label>
                          <Field
                            id="tabdil"
                            name="tabdil"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option> دارد </option>
                            <option> ندارد </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="nafarat"
                            className="mb-3 text-white block"
                          >
                            حداکثر نفرات
                          </label>
                          <Field
                            id="nafarat"
                            name="nafarat"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tahol"
                            className="mb-3 text-white block"
                          >
                            قابلیت اجاره به
                          </label>
                          <Field
                            id="tahol"
                            name="tahol"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> خانواده و مجرد </option>
                            <option> خانواده </option>
                          </Field>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="Pets"
                            className="mb-3 text-white block"
                          >
                            حیوانات خانگی
                          </label>
                          <Field
                            id="Pets"
                            name="Pets"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> مجاز است </option>
                            <option> مجاز نیست </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="darbast"
                            className="mb-3 text-white block"
                          >
                            دربست
                          </label>
                          <Field
                            id="darbast"
                            name="darbast"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option> هست </option>
                            <option> نیست </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </>
                ) : shoMoamele == "اجاره روزانه" ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="price-shabi"
                            className="mb-3 text-white block"
                          >
                            اجاره شبی (روزهای عادی)
                          </label>
                          <Field
                            id="price-shabi"
                            name="priceshabi"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="price-tatilat"
                            className="mb-3 text-white block"
                          >
                            اجاره شبی آخر هفته و تعطیلات
                          </label>
                          <Field
                            id="price-tatilat"
                            name="pricetatilat"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="tahol"
                            className="mb-3 text-white block"
                          >
                            قابلیت اجاره به
                          </label>
                          <Field
                            id="tahol"
                            name="tahol"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> خانواده و مجرد </option>
                            <option> خانواده </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="celebrations"
                            className="mb-3 text-white block"
                          >
                            برگذاری مراسمات
                          </label>
                          <Field
                            id="celebrations"
                            name="celebrations"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option> مجاز است </option>
                            <option> مجاز نیست </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="nafarat"
                            className="mb-3 text-white block"
                          >
                            حداکثر نفرات
                          </label>
                          <Field
                            id="nafarat"
                            name="nafarat"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="Pets"
                            className="mb-3 text-white block"
                          >
                            حیوانات خانگی
                          </label>
                          <Field
                            id="Pets"
                            name="Pets"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> مجاز است </option>
                            <option> مجاز نیست </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="darbast"
                            className="mb-3 text-white block"
                          >
                            دربست
                          </label>
                          <Field
                            id="darbast"
                            name="darbast"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option> هست </option>
                            <option> نیست </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}

                {shoMelk == "آپارتمان" ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="tabaghe"
                            className="mb-3 text-white block"
                          >
                            طبقه چندم
                          </label>
                          <Field
                            id="tabaghe"
                            name="tabaghe"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tedad-tabaghat"
                            className="mb-3 text-white block"
                          >
                            تعداد طبقات کل
                          </label>
                          <Field
                            id="tedad-tabaghat"
                            name="tedad-tabaghat"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="tedad-vahed-har-tabaghe"
                            className="mb-3 text-white block"
                          >
                            تعداد واحد در هر طبقه
                          </label>
                          <Field
                            id="tedad-vahed-har-tabaghe"
                            name="tedad-vahed-har-tabaghe"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tedad-vahed-kol"
                            className="mb-3 text-white block"
                          >
                            تعداد واحد کل
                          </label>
                          <Field
                            id="tedad-vahed-kol"
                            name="tedad-vahed-kol"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="otagh"
                            className="mb-3 text-white block"
                          >
                            تعداد اتاق
                          </label>
                          <Field
                            id="otagh"
                            name="otagh"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={13}>انتخاب کنید</option>
                            <option value={0}>0 </option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                            <option value={8}>8 </option>
                            <option value={9}>9 </option>
                            <option value={10}>10 </option>
                            <option value={11}>11 </option>
                            <option value={12}>12 </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="num-hamam"
                            className="mb-3 text-white block"
                          >
                            تعداد حمام
                          </label>

                          <Field
                            id="num-hamam"
                            name="num-hamam"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                          </Field>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="num-wc"
                            className="mb-3 text-white block"
                          >
                            تعداد دستشویی
                          </label>
                          <Field
                            id="num-wc"
                            name="num-wc"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="senbana"
                            className="mb-3 text-white block"
                          >
                            سن بنا
                          </label>
                          <Field
                            id="senbana"
                            name="senbana"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option>نوساز </option>
                            <option> 1 تا 5 سال </option>
                            <option> 5 تا 10 سال</option>
                            <option>10 تا 20 سال</option>
                            <option>20 تا 50 سال</option>
                            <option>50 سال به بالا</option>
                            <option>کلنگی</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="sokonat"
                            className="mb-3 text-white block"
                          >
                            وضعیت سکونت
                          </label>
                          <Field
                            id="sokonat"
                            name="sokonat"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> تخلیه </option>
                            <option> مستاجر ساکن</option>
                            <option>مالک ساکن </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="nama"
                            className="mb-3 text-white block"
                          >
                            نما
                          </label>
                          <Field
                            id="nama"
                            name="nama"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option> سنگ</option>
                            <option>سیمان</option>
                            <option>شیشه </option>
                            <option> کامپوزیت</option>
                            <option>کلاسیک</option>
                            <option>آجر</option>
                            <option>چوب</option>
                            <option>مدرن</option>
                            <option>ترکیبی</option>
                            <option>رومی</option>
                            <option>سایر</option>
                          </Field>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="kabinet"
                            className="mb-3 text-white block"
                          >
                            نوع کابینت
                          </label>
                          <Field
                            id="kabinet"
                            name="kabinet"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> کابینت MDF </option>
                            <option>کابینت جزیره</option>
                            <option>کابینت چوب</option>
                            <option>کابینت فلزی</option>
                            <option>کابینت ممبران</option>
                            <option>کابینت هایگلس</option>
                            <option>سایر</option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="area"
                            className="mb-3 text-white block"
                          >
                            کف پوش
                          </label>
                          <Field
                            id="kafposh"
                            name="kafposh"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option>پارکت </option>
                            <option>سرامیک </option>
                            <option>سنگ </option>
                            <option>سیمان </option>
                            <option>موزائیک </option>
                            <option>موکت </option>
                            <option>سایر </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </>
                ) : shoMelk == "خانه و ویلا" ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="masahat-zamin"
                            className="mb-3 text-white block"
                          >
                            مساحت زمین
                          </label>
                          <Field
                            id="masahat-zamin"
                            name="masahat-zamin"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tedad-tabaghat"
                            className="mb-3 text-white block"
                          >
                            تعداد طبقات کل
                          </label>
                          <Field
                            id="tedad-tabaghat"
                            name="tedad-tabaghat"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="kabinet"
                            className="mb-3 text-white block"
                          >
                            نوع کابینت
                          </label>
                          <Field
                            id="kabinet"
                            name="kabinet"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> کابینت MDF </option>
                            <option>کابینت جزیره</option>
                            <option>کابینت چوب</option>
                            <option>کابینت فلزی</option>
                            <option>کابینت ممبران</option>
                            <option>کابینت هایگلس</option>
                            <option>سایر</option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tedad-vahed-kol"
                            className="mb-3 text-white block"
                          >
                            تعداد واحد کل
                          </label>
                          <Field
                            id="tedad-vahed-kol"
                            name="tedad-vahed-kol"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="otagh"
                            className="mb-3 text-white block"
                          >
                            تعداد اتاق
                          </label>
                          <Field
                            id="otagh"
                            name="otagh"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={13}>انتخاب کنید</option>
                            <option value={0}>0 </option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                            <option value={8}>8 </option>
                            <option value={9}>9 </option>
                            <option value={10}>10 </option>
                            <option value={11}>11 </option>
                            <option value={12}>12 </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="num-hamam"
                            className="mb-3 text-white block"
                          >
                            تعداد حمام
                          </label>

                          <Field
                            id="num-hamam"
                            name="num-hamam"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                          </Field>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="num-wc"
                            className="mb-3 text-white block"
                          >
                            تعداد دستشویی
                          </label>
                          <Field
                            id="num-wc"
                            name="num-wc"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="senbana"
                            className="mb-3 text-white block"
                          >
                            سن بنا
                          </label>
                          <Field
                            id="senbana"
                            name="senbana"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option>نوساز </option>
                            <option> 1 تا 5 سال </option>
                            <option> 5 تا 10 سال</option>
                            <option>10 تا 20 سال</option>
                            <option>20 تا 50 سال</option>
                            <option>50 سال به بالا</option>
                            <option>کلنگی</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="sokonat"
                            className="mb-3 text-white block"
                          >
                            وضعیت سکونت
                          </label>
                          <Field
                            id="sokonat"
                            name="sokonat"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> تخلیه </option>
                            <option> مستاجر ساکن</option>
                            <option>مالک ساکن </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="nama"
                            className="mb-3 text-white block"
                          >
                            نما
                          </label>
                          <Field
                            id="nama"
                            name="nama"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option> سنگ</option>
                            <option>سیمان</option>
                            <option>شیشه </option>
                            <option> کامپوزیت</option>
                            <option>کلاسیک</option>
                            <option>آجر</option>
                            <option>چوب</option>
                            <option>مدرن</option>
                            <option>ترکیبی</option>
                            <option>رومی</option>
                            <option>سایر</option>
                          </Field>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="kafposh"
                            className="mb-3 text-white block"
                          >
                            کف پوش
                          </label>
                          <Field
                            id="kafposh"
                            name="kafposh"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option>پارکت </option>
                            <option>سرامیک </option>
                            <option>سنگ </option>
                            <option>سیمان </option>
                            <option>موزائیک </option>
                            <option>موکت </option>
                            <option>سایر </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </>
                ) : shoMelk == "زمین و کلنگی" ? (
                  ""
                ) : shoMelk == "اداری و تجاری" ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="tabaghe"
                            className="mb-3 text-white block"
                          >
                            طبقه چندم
                          </label>
                          <Field
                            id="tabaghe"
                            name="tabaghe"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tedad-tabaghat"
                            className="mb-3 text-white block"
                          >
                            تعداد طبقات کل
                          </label>
                          <Field
                            id="tedad-tabaghat"
                            name="tedad-tabaghat"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="tedad-vahed-har-tabaghe"
                            className="mb-3 text-white block"
                          >
                            تعداد واحد در هر طبقه
                          </label>
                          <Field
                            id="tedad-vahed-har-tabaghe"
                            name="tedad-vahed-har-tabaghe"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="tedad-vahed-kol"
                            className="mb-3 text-white block"
                          >
                            تعداد واحد کل
                          </label>
                          <Field
                            id="tedad-vahed-kol"
                            name="tedad-vahed-kol"
                            type="number"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="otagh"
                            className="mb-3 text-white block"
                          >
                            تعداد اتاق
                          </label>
                          <Field
                            id="otagh"
                            name="otagh"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={13}>انتخاب کنید</option>
                            <option value={0}>0 </option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                            <option value={8}>8 </option>
                            <option value={9}>9 </option>
                            <option value={10}>10 </option>
                            <option value={11}>11 </option>
                            <option value={12}>12 </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="num-hamam"
                            className="mb-3 text-white block"
                          >
                            تعداد حمام
                          </label>

                          <Field
                            id="num-hamam"
                            name="numhamam"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                          </Field>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="num-wc"
                            className="mb-3 text-white block"
                          >
                            تعداد دستشویی
                          </label>
                          <Field
                            id="num-wc"
                            name="numwc"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                            <option value={6}>6 </option>
                            <option value={7}>7 </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="area"
                            className="mb-3 text-white block"
                          >
                            سن بنا
                          </label>
                          <Field
                            id="senbana"
                            name="senbana"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option>نوساز </option>
                            <option> 1 تا 5 سال </option>
                            <option> 5 تا 10 سال</option>
                            <option>10 تا 20 سال</option>
                            <option>20 تا 50 سال</option>
                            <option>50 سال به بالا</option>
                            <option>کلنگی</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="sokonat"
                            className="mb-3 text-white block"
                          >
                            وضعیت سکونت
                          </label>
                          <Field
                            id="sokonat"
                            name="sokonat"
                            as="select"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value={0}>انتخاب کنید</option>
                            <option> تخلیه </option>
                            <option> مستاجر ساکن</option>
                            <option>مالک ساکن </option>
                          </Field>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="nama"
                            className="mb-3 text-white block"
                          >
                            نما
                          </label>
                          <Field
                            id="nama"
                            name="nama"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option> سنگ</option>
                            <option>سیمان</option>
                            <option>شیشه </option>
                            <option> کامپوزیت</option>
                            <option>کلاسیک</option>
                            <option>آجر</option>
                            <option>چوب</option>
                            <option>مدرن</option>
                            <option>ترکیبی</option>
                            <option>رومی</option>
                            <option>سایر</option>
                          </Field>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-full">
                          <label
                            htmlFor="kafposh"
                            className="mb-3 text-white block"
                          >
                            کف پوش
                          </label>
                          <Field
                            id="kafposh"
                            name="kafposh"
                            as="select"
                            rows={10}
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option>انتخاب کنید</option>
                            <option>پارکت </option>
                            <option>سرامیک </option>
                            <option>سنگ </option>
                            <option>سیمان </option>
                            <option>موزائیک </option>
                            <option>موکت </option>
                            <option>سایر </option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <label htmlFor="area" className="my-8 text-white block">
                  <h2 className=" my-10 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
                    جهت ملک{" "}
                  </h2>
                </label>
                <div className="flex items-center gap-7">
                  <div className="flex items-center">
                    <input type="checkbox" name="wg[]" id="" />
                    <label className="mr-2 text-white block">شمالی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="wg[]" id="" />
                    <label className="mr-2 text-white block">جنوبی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="wg[]" id="" />
                    <label className="mr-2 text-white block">شرقی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="wg[]" id="" />
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
                        value=""
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
                        value=""
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
                        value=""
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
                <div className="flex items-center gap-7 flex-wrap">
                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">انتخاب همه</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">آب</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">برق</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">گاز</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="parking" id="" />
                    <label className="mr-2 text-white block">پارکینگ</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="asansor" id="" />
                    <label className="mr-2 text-white block">آسانسور</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">انباری</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">درب ضد سرقت</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">تلفن</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شوفاژ</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">شومینه</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">پکیج</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">کولر</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">سونا</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">استخر</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">جکوزی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">
                      آیفون نصویری
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">
                      دوربین مدار بسته
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">درب ریموت</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">انتن مرکزی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">پاسیو</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">باربیکیو</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">بالکن</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">حیات</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">لابی</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">
                      سالن اجتماعات
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">سرایداری</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">مبله</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">اطفاء حریق</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">وام</label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" name="" id="" />
                    <label className="mr-2 text-white block">آب چاه</label>
                  </div>
                </div>

                <label htmlFor="area" className="my-8 text-white block">
                  <h2 className=" my-10 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
                    افزودن تصویر{" "}
                  </h2>
                </label>

                <div className="grid grid-cols-12 gap-5 mt-10">
                  <div className="col-span-2 border h-36 rounded-lg flex items-center justify-center w-36 border-dashed border-blue-500">
                    <RiImageAddLine color="#fff" size={50} />
                  </div>

                  <div className="col-span-2 border h-36 rounded-lg flex items-center justify-center w-36 border-dashed border-blue-500">
                    <RiImageAddLine color="#fff" size={50} />
                  </div>

                  <div className="col-span-2 border h-36 rounded-lg flex items-center justify-center w-36 border-dashed border-blue-500">
                    <RiImageAddLine color="#fff" size={50} />
                  </div>
                </div>

                <label htmlFor="area" className="my-8 text-white block">
                  <h2 className=" my-10 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
                    افزودن فیلم{" "}
                  </h2>
                </label>

                <div className="flex text-white gap-4 items-center">
                  <span>هیچ پرونده ای انتخاب نشده است</span>
                  <button
                    type="submit"
                    className="bg-blue-700 shadow-sm shadow-indigo-700 my-4 w-1/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
                  >
                    {" "}
                    انتخاب فیلم
                  </button>
                </div>
                <div className="w-full m-auto flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-[#4a80bb] m-auto flex items-end justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
                  >
                    <RiAncientPavilionFill size={24} />
                    ثبت ملک جدید
                  </button>
                </div>
              </Form>
            </Formik> */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateEstate;
