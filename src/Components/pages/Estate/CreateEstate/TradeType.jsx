import { useRef, useState } from "react";
import { createState } from "../../../../validation/formikValidation";
import Layout from "../../../Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";
import {
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
} from "../../../helper";
import service from "../../../../server/service";
import { BeatLoader } from "react-spinners";
import Num2persian from "num2persian";

const TradeType = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [shoMoamele, setShoMoamele] = useState("");
  const [getMoaveze, setMoaveze] = useState(false);
  const [getPishforosh, setPishforosh] = useState(false);
  const [priceKolAlphabetic, setPriceKolAlphabetic] = useState("");
  const [priceMetriAlphabetic, setPriceMetriAlphabetic] = useState("");
  const [priceRahnAlphabetic, setPriceRahnAlphabetic] = useState("");
  const [priceEjareAlphabetic, setPriceEjareAlphabetic] = useState("");
  const [priceShabiAlphabetic, setPriceShabiAlphabetic] = useState("");
  const [priceShabiTatilatAlphabetic, setPriceShabiTatilatAlphabetic] =
    useState("");
  const moavezeRef = useRef();
  const pishforoshRef = useRef();
  const emkanMoavezeRef = useRef();
  const tahvilRef = useRef();
  const mosharekat = useRef();
  const handleCreateStateMeta = (values) => {
    setShowLoading(true);

    let userToken = getToken();
    let stateId = localStorage.getItem("stateId");
    if (shoMoamele == "خرید و فروش") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            moamele: shoMoamele,
            pricekol: values.pricekol,
            pricemeteri: values.pricemeteri,
            karbari: values.karbari,
            sanad: values.sanad,
            moaveze: moavezeRef.current.checked ? "1" : "0",
            pishforosh: pishforoshRef.current.checked ? "1" : "0",
            mosharekat: mosharekat.current.checked ? "1" : "0",
            tahvil:
              tahvilRef?.current?.value == undefined
                ? ""
                : tahvilRef?.current?.value,
            moavezefor:
              emkanMoavezeRef.current.value == undefined
                ? ""
                : emkanMoavezeRef.current.value,
          },
        ],
      };
      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          if (data.status == 200) {
            setShowLoading(false);
            toastAlert("اطلاعات نوع معامله با موفقیت ثبت شد", "success");
            toastAlert("روی مرحله نوع ملک کلیک کنید", "info");
          } else throw new Error();
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    }

    if (shoMoamele == "رهن و اجاره") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            moamele: shoMoamele,
            nafarat: values.nafarat,
            tahol: values.tahol,
            Pets: values.Pets,
            karbari: values.karbari,
            tabdil: values.tabdil,
            darbast: values.darbast,
            pricerahn: priceRahnAlphabetic,
            priceejare: priceEjareAlphabetic,
          },
        ],
      };
      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          setShowLoading(false);
          toastAlert("اطلاعات نوع معامله با موفقیت ثبت شد", "success");
          toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
        });
    }

    if (shoMoamele == "اجاره روزانه") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            moamele: shoMoamele,
            nafarat: values.nafarat,
            tahol: values.tahol,
            Pets: values.Pets,
            tabdil: values.tabdil,
            darbast: values.darbast,
            celebrations: values.celebrations,
            priceshabi: values.priceshabi,
            pricetatilat: values.pricetatilat,
          },
        ],
      };
      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          setShowLoading(false);
          toastAlert("اطلاعات نوع معامله با موفقیت ثبت شد", "success");
          toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
        });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          moamele: "",
          nafarat: "",
          tahol: "",
          Pets: "",
          karbari: "",
          tabdil: "",
          darbast: "",
          pricerahn: "",
          priceejare: "",
        }}
        onSubmit={(values) => {
          handleCreateStateMeta(values);
        }}
      >
        <Form className=" px-32 max-xl:px-5 py-10">
          <div className="w-full m-auto flex items-center justify-center flex-col">
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="moamele" className="mb-3 text-white block">
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
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                  >
                    <option value="" selected={shoMoamele == "" ? true : false}>
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
              </div>
            </div>

            {shoMoamele == "خرید و فروش" ? (
              <>
                <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
                  <div className="w-full max-md:flex-col flex items-center justify-between gap-4">
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
                        onChange={(e) => {
                          setPriceKolAlphabetic(e.target.value);
                        }}
                        className="w-full  backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                      <span className="text-gray-300 text-sm ">
                        {Num2persian(priceKolAlphabetic)}{" "}
                        <span className="text-xs ">تومان</span>
                      </span>
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
                        onChange={(e) => {
                          setPriceMetriAlphabetic(e.target.value);
                        }}
                        className="w-full   backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                      <span className="text-white text-sm">
                        {Num2persian(priceMetriAlphabetic)}{" "}
                        <span className="text-xs">تومان</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full max-md:flex-col flex items-center justify-between gap-4">
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                      <label htmlFor="sanad" className="mb-3 text-white block">
                        نوع سند
                      </label>
                      <Field
                        id="sanad"
                        name="sanad"
                        as="select"
                        rows={10}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                    <label htmlFor="moaveze" className="mb-2 text-white block">
                      امکان معاوضه
                    </label>{" "}
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="moaveze"
                        name="moaveze"
                        ref={moavezeRef}
                        class="sr-only peer"
                        onChange={(e) => {
                          if (e.target.checked) setMoaveze(true);
                          else setMoaveze(false);
                        }}
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
                        ref={pishforoshRef}
                        id="pishforosh"
                        class="sr-only peer"
                        onChange={(e) => {
                          if (e.target.checked) setPishforosh(true);
                          else setPishforosh(false);
                        }}
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="pishforosh"
                      className="mb-2 text-white block"
                    >
                      مشارکت در ساخت
                    </label>{" "}
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="pishforosh"
                        ref={mosharekat}
                        id="pishforosh"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="w-full mt-4 max-md:flex-col flex items-center justify-between gap-4">
                  {getMoaveze && (
                    <div className="w-full">
                      <label
                        htmlFor="moavezefor"
                        className="mb-3 text-white block"
                      >
                        امکان معاوضه با چه مواردی
                      </label>
                      <input
                        id="moavezefor"
                        ref={emkanMoavezeRef}
                        type="text"
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  )}
                  {getPishforosh && (
                    <div className="w-full">
                      <label htmlFor="tahvil" className="mb-3 text-white block">
                        تحویل
                      </label>
                      <input
                        id="tahvil"
                        type="number"
                        ref={tahvilRef}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  )}
                </div>
              </>
            ) : shoMoamele == "رهن و اجاره" ? (
              <>
                <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
                  <div className="w-full mb-4 max-md:flex-col flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="price-rahn"
                        className="mb-3 text-white block"
                      >
                        ودیعه
                      </label>
                      <input
                        id="price-rahn"
                        name="pricerahn"
                        type="text"
                        onChange={(e) => {
                          setPriceRahnAlphabetic(e.target.value);
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />

                      <span className="text-gray-300 text-sm ">
                        {Num2persian(priceRahnAlphabetic)}{" "}
                        <span className="text-xs ">تومان</span>
                      </span>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="priceejare"
                        className="mb-3 text-white block"
                      >
                        اجاره
                      </label>
                      <input
                        id="priceejare"
                        name="priceejare"
                        type="text"
                        onChange={(e) => {
                          setPriceEjareAlphabetic(e.target.value);
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                      <span className="text-gray-300 text-sm ">
                        {Num2persian(priceEjareAlphabetic)}{" "}
                        <span className="text-xs ">تومان</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full mb-9 max-md:flex-col flex items-center justify-between gap-4">
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                      <label htmlFor="tabdil" className="mb-3 text-white block">
                        قابلیت تبدیل
                      </label>
                      <Field
                        id="tabdil"
                        name="tabdil"
                        as="select"
                        rows={10}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option>انتخاب کنید</option>
                        <option> دارد </option>
                        <option> ندارد </option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="flex mb-4 items-center max-md:flex-col justify-between gap-4 w-full">
                  <div className="w-full max-md:flex-col flex items-center justify-between gap-4">
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="tahol" className="mb-3 text-white block">
                        قابلیت اجاره به
                      </label>
                      <Field
                        id="tahol"
                        name="tahol"
                        as="select"
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option> خانواده و مجرد </option>
                        <option> خانواده </option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full max-md:flex-col flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label htmlFor="Pets" className="mb-3 text-white block">
                        حیوانات خانگی
                      </label>
                      <Field
                        id="Pets"
                        name="Pets"
                        as="select"
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
                  <div className="w-full mb-4 max-md:flex-col flex items-center justify-between gap-4">
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
                        onChange={(e) => {
                          setPriceShabiAlphabetic(e.target.value);
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />

                      <span className="text-gray-300 text-sm ">
                        {Num2persian(priceShabiAlphabetic)}{" "}
                        <span className="text-xs ">تومان</span>
                      </span>
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
                        onChange={(e) => {
                          setPriceShabiTatilatAlphabetic(e.target.value);
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />

                      <span className="text-gray-300 text-sm ">
                        {Num2persian(priceShabiTatilatAlphabetic)}{" "}
                        <span className="text-xs ">تومان</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full mb-9 max-md:flex-col flex items-center justify-between gap-4">
                    <div className="w-full ">
                      <label htmlFor="tahol" className="mb-3 text-white block">
                        قابلیت اجاره به
                      </label>
                      <Field
                        id="tahol"
                        name="tahol"
                        as="select"
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option>انتخاب کنید</option>
                        <option> مجاز است </option>
                        <option> مجاز نیست </option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
                  <div className="w-full  max-md:flex-col flex items-center justify-between gap-4">
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full max-md:flex-col flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label htmlFor="Pets" className="mb-3 text-white block">
                        حیوانات خانگی
                      </label>
                      <Field
                        id="Pets"
                        name="Pets"
                        as="select"
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
            <button
              type="submit"
              className="bg-[#4a80bb] items-center justify-center m-auto max-lg:w-full flex items-end justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
            >
              <RiAncientPavilionFill size={24} />
              ثبت اطلاعات نوع معامله
              {showLoading && <BeatLoader size={10} color="#fff" />}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default TradeType;
