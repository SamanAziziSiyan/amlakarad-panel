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
  const [getMoaveze, setMoaveze] = useState(false);
  const [getPishforosh, setPishforosh] = useState(false);
  const moavezeRef = useRef();
  const pishforoshRef = useRef();
  const emkanMoavezeRef = useRef();
  const tahvilRef = useRef();
  const mosharekat = useRef();
  const { stateId } = useParams();

  const [kharidData, setKharidData] = useState({
    pricekol: "",
    pricemeteri: "",
    karbari: "",
    sanad: "",
    moaveze: "",
    pishforosh: "",
    mosharekat: "",
    tahvil: "",
    moavezefor: "",
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
  const handleCreateStateMeta = () => {
    setShowLoading(true);
    let userToken = getToken();
    if (shoMoamele == "خرید و فروش") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            moamele: shoMoamele,
            pricekol: kharidData.pricekol,
            pricemeteri: kharidData.pricemeteri,
            karbari: kharidData.karbari,
            sanad: kharidData.sanad,
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
            nafarat: rahanData.nafarat,
            tahol: rahanData.tahol,
            Pets: rahanData.Pets,
            karbari: rahanData.karbari,
            tabdil: rahanData.tabdil,
            darbast: rahanData.darbast,
            pricerahn: rahanData.pricerahn,
            priceejare: rahanData.priceejare,
          },
        ],
      };
      console.log(stateData);
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
          console.log(err);
          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    }

    if (shoMoamele == "اجاره روزانه") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            moamele: shoMoamele,
            nafarat: rozaneData.nafarat,
            tahol: rozaneData.tahol,
            Pets: rozaneData.Pets,
            darbast: rozaneData.darbast,
            celebrations: rozaneData.celebrations,
            priceshabi: rozaneData.priceshabi,
            pricetatilat: rozaneData.pricetatilat,
          },
        ],
      };
      console.log(stateData);
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
          console.log(err);
          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    }
  };

  useEffect(() => {
    let userToken = getToken();

    service.states
      .getState(userToken, stateId)
      .then((data) => {
        console.log(data);
        setShoMoamele(data.data[0].moamele);
        if (data.data[0].pishforosh == "1") {
          setPishforosh(true);
        }
        if (data.data[0].moaveze == "1") {
          setMoaveze(true);
        }
        setKharidData({
          pricekol: data.data[0]["price-kol"],
          pricemeteri: data.data[0]["price-meteri"],
          karbari: data.data[0].karbari,
          sanad: data.data[0].sanad,
          moaveze: data.data[0].moaveze,
          pishforosh: data.data[0].pishforosh,
          mosharekat: data.data[0].mosharekat,
          tahvil: data.data[0].tahvil,
          moavezefor: data.data[0]["moaveze-for"],
        });
        setRahnData({
          nafarat: data.data[0].nafarat,
          tahol: data.data[0].tahol,
          Pets: data.data[0].Pets,
          karbari: data.data[0].karbari,
          tabdil: data.data[0].tabdil,
          darbast: data.data[0].darbast,
          pricerahn: data.data[0]["price-rahn"],
          priceejare: data.data[0]["price-ejare"],
        });
        setRozaneData({
          nafarat: data.data[0].nafarat,
          tahol: data.data[0].tahol,
          Pets: data.data[0].Pets,
          tabdil: data.data[0].tabdil,
          darbast: data.data[0].darbast,
          celebrations: data.data[0].celebrations,
          priceshabi: data.data[0]["price-shabi"],
          pricetatilat: data.data[0]["price-tatilat"],
        });

        setHomeData({
          masahatzamin: data.data[0]["masahat-zamin"],
          tedadtabaghat: data.data[0]["tedad-tabaghat"],
          tedadvahedkol: data.data[0]["tedad-vahed-kol"],
          otagh: data.data[0].otagh,
          numhamam: data.data[0]["num-hamam"],
          numwc: data.data[0]["num-wc"],
          senbana: data.data[0].senbana,
          sokonat: data.data[0].sokonat,
          nama: data.data[0].nama,
          kabinet: data.data[0].kabinet,
          kafposh: data.data[0].kafposh,
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
        initialValues={{}}
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
                        onChange={(e) => {
                          setKharidData({
                            ...kharidData,
                            pricekol: e.target.value,
                          });
                        }}
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
                        onChange={(e) => {
                          setKharidData({
                            ...kharidData,
                            pricemeteri: e.target.value,
                          });
                        }}
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
                        onChange={(e) => {
                          setKharidData({
                            ...kharidData,
                            karbari: e.target.value,
                          });
                        }}
                        value={kharidData.karbari}
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
                        onChange={(e) => {
                          setKharidData({
                            ...kharidData,
                            sanad: e.target.value,
                          });
                        }}
                        value={kharidData.sanad}
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
                        onChange={(e) => {
                          if (e.target.checked) setMoaveze(true);
                          else setMoaveze(false);
                          setKharidData({
                            ...kharidData,
                            moaveze: e.target.checked ? "1" : "0",
                          });
                        }}
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
                        onChange={(e) => {
                          if (e.target.checked) setPishforosh(true);
                          else setPishforosh(false);
                          setKharidData({
                            ...kharidData,
                            pishforosh: e.target.checked ? "1" : "0",
                          });
                        }}
                        id="pishforosh"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="mosharekat"
                      className="mb-2 text-white block"
                    >
                      مشارکت در ساخت
                    </label>{" "}
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="mosharekat"
                        ref={mosharekat}
                        checked={kharidData.mosharekat == "0" ? false : true}
                        onChange={(e) => {
                          setKharidData({
                            ...kharidData,
                            mosharekat: e.target.checked ? "1" : "0",
                          });
                        }}
                        id="mosharekat"
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
                        value={kharidData.moavezefor}
                        onChange={(e) => {
                          setKharidData({
                            ...kharidData,
                            moavezefor: e.target.value,
                          });
                        }}
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
                        value={kharidData.tahvil}
                        onChange={(e) => {
                          setKharidData({
                            ...kharidData,
                            tahvil: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  )}
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
                        type="text"
                        onChange={(e) => {
                          setRahnData({
                            ...rahanData,
                            pricerahn: e.target.value,
                          });
                        }}
                        value={rahanData.pricerahn}
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
                        value={rahanData.priceejare}
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
                        onChange={(e) => {
                          setRahnData({
                            ...rahanData,
                            karbari: e.target.value,
                          });
                        }}
                        value={rahanData.karbari}
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
                        value={rahanData.tabdil}
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
                            tahol: e.target.value,
                          });
                        }}
                        value={rahanData.tahol}
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
                        value={rahanData.Pets}
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
                        value={rahanData.darbast}
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
                        value={rozaneData.tahol}
                        onChange={(e) => {
                          setRozaneData({
                            ...rozaneData,
                            tahol: e.target.value,
                          });
                        }}
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
                        value={rozaneData.celebrations}
                        onChange={(e) => {
                          setRozaneData({
                            ...rozaneData,
                            celebrations: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={
                            rozaneData.celebrations == "" ? true : false
                          }
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={
                            rozaneData.celebrations == "مجاز است" ? true : false
                          }
                        >
                          {" "}
                          مجاز است{" "}
                        </option>
                        <option
                          selected={
                            rozaneData.celebrations == "مجاز نیست"
                              ? true
                              : false
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
                        value={rozaneData.Pets}
                        onChange={(e) => {
                          setRozaneData({
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
                        as="select"
                        onChange={(e) => {
                          setRozaneData({
                            ...rozaneData,
                            darbast: e.target.value,
                          });
                        }}
                        value={rozaneData.darbast}
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
