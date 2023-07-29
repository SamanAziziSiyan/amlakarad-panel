import { useEffect, useRef, useState } from "react";
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
import { useParams } from "react-router-dom";

const TradeType = ({ stateData }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [shoMoamele, setShoMoamele] = useState("");
  const moavezeRef = useRef();
  const pishforoshRef = useRef();
  const { stateId } = useParams();

  const [kharidData, setKharidData] = useState({
    pricekol: "",
    pricemeteri: "",
    karbari: "",
    sanad: "",
    moaveze: "",
    pishforosh: "",
  });
  const [rahanData, setRahnData] = useState({
    nafarat: "",
    tahol: "",
    Pets: "",
    karbari: "",
    tabdil: "",
    darbast: "",
    pricerahn: "",
    priceejare: "",
  });
  const [rozaneData, setRozaneData] = useState({
    nafarat: "",
    tahol: "",
    Pets: "",
    tabdil: "",
    darbast: "",
    celebrations: "",
    priceshabi: "",
    pricetatilat: "",
  });

  const [homeData, setHomeData] = useState({
    masahatzamin: "",
    tedadtabaghat: "",
    tedadvahedkol: "",
    otagh: "",
    numhamam: "",
    numwc: "",
    senbana: "",
    sokonat: "",
    nama: "",
    kabinet: "",
    kafposh: "",
  });
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
          },
        ],
      };

      service.states
        .insertMetaData(stateData, userToken)
        .then((data) => {
          if (data.status == 200) {
            setShowLoading(false);
            toastAlert("اطلاعات نوع معامله با موفقیت ثبت شد", "success");
            toastAlert("روی مرحله نوع ملک کلیک کنید", "info");
          } else throw new Error();
        })
        .catch((err) => {
          console.log(err);
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
            vadie: values.vadie,
            priceejare: values.priceejare,
          },
        ],
      };
      console.log(stateData);
      service.states
        .insertMetaData(stateData, userToken)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
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
      console.log(stateData);
      service.states
        .insertMetaData(stateData, userToken)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          toastAlert("سرور مشغول است");
        });
    }
  };

  useEffect(() => {
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();

    service.states
      .getState(userToken, stateId)
      .then((data) => {
        setShoMoamele(data.data.postmeta.moamele);
        setKharidData({
          pricekol: data.data.postmeta["price-kol"],
          pricemeteri: data.data.postmeta["price-meteri"],
          karbari: data.data.postmeta.karbari,
          sanad: data.data.postmeta.sanad,
          moaveze: data.data.postmeta.moaveze,
          pishforosh: data.data.postmeta.pishforosh,
        });
        setRahnData({
          nafarat: data.data.postmeta.nafarat,
          tahol: data.data.postmeta.tahol,
          Pets: data.data.postmeta.Pets,
          karbari: data.data.postmeta.karbari,
          tabdil: data.data.postmeta.tabdil,
          darbast: data.data.postmeta.darbast,
          pricerahn: data.data.postmeta["price-rahn"],
          priceejare: data.data.postmeta["price-ejare"],
        });
        setRozaneData({
          nafarat: data.data.postmeta.nafarat,
          tahol: data.data.postmeta.tahol,
          Pets: data.data.postmeta.Pets,
          tabdil: data.data.postmeta.tabdil,
          darbast: data.data.postmeta.darbast,
          pricerahn: data.data.postmeta["price-rahn"],
          pricetatilat: data.data.postmeta["price-tatilat"],
        });

        setHomeData({
          masahatzamin: data.data.postmeta["masahat-zamin"],
          tedadtabaghat: data.data.postmeta["tedad-tabaghat"],
          tedadvahedkol: data.data.postmeta["tedad-vahed-kol"],
          otagh: data.data.postmeta.otagh,
          numhamam: data.data.postmeta["num-hamam"],
          numwc: data.data.postmeta["num-wc"],
          senbana: data.data.postmeta.senbana,
          sokonat: data.data.postmeta.sokonat,
          nama: data.data.postmeta.nama,
          kabinet: data.data.postmeta.kabinet,
          kafposh: data.data.postmeta.kafposh,
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
          moamele: "",
          nafarat: "",
          tahol: "",
          Pets: "",
          karbari: "",
          tabdil: "",
          darbast: "",
          vadie: "",
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
                    className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                        value={kharidData.pricekol}
                        onChange={() => {}}
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
                        value={kharidData.pricemeteri}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option
                          selected={
                            kharidData.karbari == "مسکونی" ? true : false
                          }
                        >
                          {" "}
                          مسکونی{" "}
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "تجاری" ? true : false
                          }
                        >
                          {" "}
                          تجاری
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "اداری" ? true : false
                          }
                        >
                          اداری{" "}
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "زارعی" ? true : false
                          }
                        >
                          زراعی{" "}
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "باغات" ? true : false
                          }
                        >
                          باغات{" "}
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "تفریحی" ? true : false
                          }
                        >
                          تفریحی{" "}
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "ورزشی" ? true : false
                          }
                        >
                          ورزشی{" "}
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "فضای سبز" ? true : false
                          }
                        >
                          فضای سبر{" "}
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "بدون کاربری" ? true : false
                          }
                        >
                          {" "}
                          بدون کاربری{" "}
                        </option>
                        <option
                          selected={
                            kharidData.karbari == "خارج از بافت" ? true : false
                          }
                        >
                          {" "}
                          خارج از بافت{" "}
                        </option>
                        <option
                          selected={kharidData.karbari == "سایر" ? true : false}
                        >
                          {" "}
                          سایر{" "}
                        </option>
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={kharidData.sanad == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={kharidData.sanad == "تک برگ" ? true : false}
                        >
                          تک برگ
                        </option>
                        <option
                          selected={
                            kharidData.sanad == "منگوله دار" ? true : false
                          }
                        >
                          منگوله دار
                        </option>
                        <option
                          selected={
                            kharidData.sanad == "قولنامه ای" ? true : false
                          }
                        >
                          قولنامه ای
                        </option>
                        <option
                          selected={kharidData.sanad == "اوقافی" ? true : false}
                        >
                          اوقافی
                        </option>
                        <option
                          selected={kharidData.sanad == "بنیادی" ? true : false}
                        >
                          بنیادی
                        </option>
                        <option
                          selected={
                            kharidData.sanad == "سازمانی" ? true : false
                          }
                        >
                          سازمانی
                        </option>
                        <option
                          selected={kharidData.sanad == "نسخ" ? true : false}
                        >
                          نسخ
                        </option>
                        <option
                          selected={
                            kharidData.sanad == "دردست اقدام" ? true : false
                          }
                        >
                          دردست اقدام
                        </option>
                        <option
                          selected={kharidData.sanad == "سایر" ? true : false}
                        >
                          سایر{" "}
                        </option>
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
                        checked={kharidData.moaveze == "0" ? false : true}
                        ref={moavezeRef}
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
                        ref={pishforoshRef}
                        checked={kharidData.pishforosh == "0" ? false : true}
                        id="pishforosh"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </>
            ) : shoMoamele == "رهن و اجاره" ? (
              <>
                <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
                  <div className="w-full max-md:flex-col flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label htmlFor="vadie" className="mb-3 text-white block">
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
                        onChange={(e) => {
                          setRahnData({
                            ...rahanData,
                            priceejare: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={rahanData.karbari == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={
                            rahanData.karbari == "مسکونی" ? true : false
                          }
                        >
                          {" "}
                          مسکونی{" "}
                        </option>
                        <option
                          selected={rahanData.karbari == "تجاری" ? true : false}
                        >
                          {" "}
                          تجاری
                        </option>
                        <option
                          selected={rahanData.karbari == "اداری" ? true : false}
                        >
                          اداری{" "}
                        </option>
                        <option
                          selected={rahanData.karbari == "زراعی" ? true : false}
                        >
                          زراعی{" "}
                        </option>
                        <option
                          selected={rahanData.karbari == "باغات" ? true : false}
                        >
                          باغات{" "}
                        </option>
                        <option
                          selected={
                            rahanData.karbari == "تفریحی" ? true : false
                          }
                        >
                          تفریحی{" "}
                        </option>
                        <option
                          selected={rahanData.karbari == "ورزشی" ? true : false}
                        >
                          ورزشی{" "}
                        </option>
                        <option
                          selected={
                            rahanData.karbari == "فضای سبر" ? true : false
                          }
                        >
                          فضای سبر{" "}
                        </option>
                        <option
                          selected={
                            rahanData.karbari == "بدون کاربری" ? true : false
                          }
                        >
                          {" "}
                          بدون کاربری{" "}
                        </option>
                        <option
                          selected={
                            rahanData.karbari == "خارج از بافت" ? true : false
                          }
                        >
                          {" "}
                          خارج از بافت{" "}
                        </option>
                        <option
                          selected={rahanData.karbari == "سایر" ? true : false}
                        >
                          {" "}
                          سایر{" "}
                        </option>
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
                        onChange={(e) => {
                          setRahnData({
                            ...rahanData,
                            tabdil: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={rahanData.tabdil == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={rahanData.tabdil == "دارد" ? true : false}
                        >
                          {" "}
                          دارد{" "}
                        </option>
                        <option
                          selected={rahanData.tabdil == "ندارد" ? true : false}
                        >
                          {" "}
                          ندارد{" "}
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="flex items-center max-md:flex-col justify-between gap-4 w-full">
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
                        value={rahanData.nafarat}
                        onChange={(e) => {
                          setRahnData({
                            ...rahanData,
                            nafarat: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                        onChange={(e) => {
                          setRahnData({
                            ...rahanData,
                            nafarat: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                        onChange={(e) => {
                          setRahnData({
                            ...rahanData,
                            Pets: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={rahanData.Pets == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={rahanData.Pets == "مجاز است" ? true : false}
                        >
                          {" "}
                          مجاز است{" "}
                        </option>
                        <option
                          selected={
                            rahanData.Pets == "مجاز نیست" ? true : false
                          }
                        >
                          {" "}
                          مجاز نیست{" "}
                        </option>
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
                        onChange={(e) => {
                          setRahnData({
                            ...rahanData,
                            darbast: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={rahanData.darbast == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={rahanData.darbast == "هست" ? true : false}
                        >
                          {" "}
                          هست{" "}
                        </option>
                        <option
                          selected={rahanData.darbast == "نیست" ? true : false}
                        >
                          {" "}
                          نیست{" "}
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
              </>
            ) : shoMoamele == "اجاره روزانه" ? (
              <>
                <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
                  <div className="w-full max-md:flex-col flex items-center justify-between gap-4">
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
                        value={rozaneData.priceshabi}
                        onChange={(e) => {
                          setRozaneData({
                            ...rozaneData,
                            priceshabi: e.target.value,
                          });
                        }}
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
                        value={rozaneData.pricetatilat}
                        onChange={(e) => {
                          setRozaneData({
                            ...rozaneData,
                            pricetatilat: e.target.value,
                          });
                        }}
                        type="number"
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full max-md:flex-col flex items-center justify-between gap-4">
                    <div className="w-full">
                      <label htmlFor="tahol" className="mb-3 text-white block">
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
                        onChange={(e) => {
                          setRozaneData({
                            ...rozaneData,
                            tahol: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={rozaneData.tahol == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={
                            rozaneData.tahol == "مجاز است" ? true : false
                          }
                        >
                          {" "}
                          مجاز است{" "}
                        </option>
                        <option
                          selected={
                            rozaneData.tahol == "مجاز نیست" ? true : false
                          }
                        >
                          {" "}
                          مجاز نیست{" "}
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="flex max-md:flex-col items-center justify-between gap-4 w-full">
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
                        value={rozaneData.nafarat}
                        onChange={(e) => {
                          setRozaneData({
                            ...rozaneData,
                            nafarat: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
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
                        onChange={(e) => {
                          setRahnData({
                            ...rozaneData,
                            Pets: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={rozaneData.Pets == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={
                            rozaneData.Pets == "مجاز است" ? true : false
                          }
                        >
                          {" "}
                          مجاز است{" "}
                        </option>
                        <option
                          selected={
                            rozaneData.Pets == "مجاز نیست" ? true : false
                          }
                        >
                          {" "}
                          مجاز نیست{" "}
                        </option>
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
                        onChange={(e) => {
                          setRahnData({
                            ...rozaneData,
                            darbast: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={rozaneData.darbast == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={rozaneData.darbast == "هست" ? true : false}
                        >
                          {" "}
                          هست{" "}
                        </option>
                        <option
                          selected={rozaneData.darbast == "نیست" ? true : false}
                        >
                          {" "}
                          نیست{" "}
                        </option>
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
              className="bg-[#4a80bb] items-center  m-auto max-lg:w-full flex  justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
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
