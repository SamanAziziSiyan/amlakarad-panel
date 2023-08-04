import { useEffect, useState } from "react";
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

const PropertyType = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [shoMelk, setShowMelk] = useState("");
  const [apartmentData, setApartmentData] = useState({
    tabaghe: "",
    tedadtabaghat: "",
    tedadvahedhartabaghe: "",
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
  const [edariData, setEdariData] = useState({
    tabaghe: "",
    tedadtabaghat: "",
    tedadvahedhartabaghe: "",
    tedadvahedkol: "",
    otagh: "",
    numhamam: "",
    numwc: "",
    senbana: "",
    sokonat: "",
    nama: "",
    kafposh: "",
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
  const { stateId } = useParams();

  useEffect(() => {
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();

    service.states
      .getState(userToken, stateId)
      .then((data) => {
        setShowMelk(data.data[0].melk);
        setApartmentData({
          tabaghe: data.data[0].tabaghe,
          tedadtabaghat: data.data[0]["tedad-tabaghat"],
          tedadvahedhartabaghe: data.data[0]["tedad-vahed-har-tabaghe"],
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
        setEdariData({
          tabaghe: data.data[0].tabaghe,
          tedadtabaghat: data.data[0]["tedad-tabaghat"],
          tedadvahedhartabaghe: data.data[0]["tedad-vahed-har-tabaghe"],
          tedadvahedkol: data.data[0]["tedad-vahed-kol"],
          otagh: data.data[0].otagh,
          numhamam: data.data[0]["num-hamam"],
          numwc: data.data[0]["num-wc"],
          senbana: data.data[0].senbana,
          sokonat: data.data[0].sokonat,
          nama: data.data[0].nama,
          kafposh: data.data[0].kafposh,
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
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
  }, []);
  const handleEditStateMeta = (values) => {
    setShowLoading(true);

    let userToken = getToken();
    if (shoMelk == "آپارتمان") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            melk: shoMelk,
            tabaghe: apartmentData.tabaghe,
            tedadtabaghat: apartmentData.tedadtabaghat,
            tedadvahedhartabaghe: apartmentData.tedadvahedhartabaghe,
            tedadvahedkol: apartmentData.tedadvahedkol,
            otagh: apartmentData.otagh,
            numhamam: apartmentData.numhamam,
            numwc: apartmentData.numwc,
            senbana: apartmentData.senbana,
            sokonat: apartmentData.sokonat,
            nama: apartmentData.nama,
            kabinet: apartmentData.kabinet,
            kafposh: apartmentData.kafposh,
          },
        ],
      };
      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          if (data.status == 200) {
            setShowLoading(false);
            toastAlert("اطلاعات نوع ملک با موفقیت ثبت شد", "success");
            toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
          } else throw new Error();
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    }

    if (shoMelk == "خانه و ویلا") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            melk: shoMelk,
            masahatzamin: homeData.masahatzamin,
            tedadtabaghat: homeData.tedadtabaghat,
            tedadvahedkol: homeData.tedadvahedkol,
            otagh: homeData.otagh,
            numhamam: homeData.numhamam,
            numwc: homeData.numwc,
            senbana: homeData.senbana,
            sokonat: homeData.sokonat,
            nama: homeData.nama,
            kabinet: homeData.kabinet,
            kafposh: homeData.kafposh,
          },
        ],
      };

      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          if (data.status == 200) {
            setShowLoading(false);
            toastAlert("اطلاعات نوع ملک با موفقیت ثبت شد", "success");
            toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
          } else throw new Error();
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    }

    if (shoMelk == "زمین و کلنگی") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            melk: shoMelk,
          },
        ],
      };
      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          if (data.status == 200) {
            setShowLoading(false);
            toastAlert("اطلاعات نوع ملک با موفقیت ثبت شد", "success");
            toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
          } else throw new Error();
        })
        .catch((err) => {

          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    }
    if (shoMelk == "اداری و تجاری ") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            melk: shoMelk,
            tabaghe: edariData.tabaghe,
            tedadtabaghat: edariData.tedadtabaghat,
            tedadvahedhartabaghe: edariData.tedadvahedhartabaghe,
            tedadvahedkol: edariData.tedadvahedkol,
            otagh: edariData.otagh,
            numhamam: edariData.numhamam,
            numwc: edariData.numwc,
            senbana: edariData.senbana,
            sokonat: edariData.sokonat,
            nama: edariData.nama,
            kafposh: edariData.kafposh,
          },
        ],
      };
      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          if (data.status == 200) {
            setShowLoading(false);
            toastAlert("اطلاعات نوع ملک با موفقیت ثبت شد", "success");
            toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
          } else throw new Error();
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          tabaghe: "",
          tedadvahedhartabaghe: "",
        }}
        onSubmit={(values) => {
          handleEditStateMeta(values);
        }}
      >
        <Form className=" px-32 max-xl:px-5 py-10">
          <div className="w-full m-auto flex items-center justify-center flex-col">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                    <option value="" selected={shoMelk == "" ? true : false}>
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
            </div>

            {shoMelk == "آپارتمان" ? (
              <>
                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        value={apartmentData.tabaghe}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            tabaghe: e.target.value,
                          });
                        }}
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
                        type="text"
                        value={apartmentData.tedadtabaghat}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            tedadtabaghat: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label
                        htmlFor="tedad-vahed-har-tabaghe"
                        className="mb-3 text-white block"
                      >
                        تعداد واحد در هر طبقه
                      </label>
                      <Field
                        id="tedad-vahed-har-tabaghe"
                        name="tedadvahedhartabaghe"
                        type="number"
                        value={apartmentData.tedadvahedhartabaghe}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            tedadvahedhartabaghe: e.target.value,
                          });
                        }}
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
                        name="tedadvahedkol"
                        type="number"
                        value={apartmentData.tedadvahedkol}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            tedadvahedkol: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="otagh" className="mb-3 text-white block">
                        تعداد اتاق
                      </label>
                      <Field
                        id="otagh"
                        name="otagh"
                        as="select"
                        value={apartmentData.otagh}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            otagh: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option
                          value={0}
                          selected={apartmentData.otagh == 0 ? true : false}
                        >
                          0{" "}
                        </option>
                        <option
                          value={1}
                          selected={apartmentData.otagh == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={apartmentData.otagh == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={apartmentData.otagh == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={apartmentData.otagh == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={apartmentData.otagh == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={apartmentData.otagh == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={apartmentData.otagh == 7 ? true : false}
                        >
                          7{" "}
                        </option>
                        <option
                          value={8}
                          selected={apartmentData.otagh == 8 ? true : false}
                        >
                          8{" "}
                        </option>
                        <option
                          value={9}
                          selected={apartmentData.otagh == 9 ? true : false}
                        >
                          9{" "}
                        </option>
                        <option
                          value={10}
                          selected={apartmentData.otagh == 10 ? true : false}
                        >
                          10{" "}
                        </option>
                        <option
                          value={11}
                          selected={apartmentData.otagh == 11 ? true : false}
                        >
                          11{" "}
                        </option>
                        <option
                          value={12}
                          selected={apartmentData.otagh == 12 ? true : false}
                        >
                          12{" "}
                        </option>
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
                        value={apartmentData.numhamam}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            numhamam: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={apartmentData.numhamam == 0 ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          value={1}
                          selected={apartmentData.numhamam == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={apartmentData.numhamam == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={apartmentData.numhamam == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={apartmentData.numhamam == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={apartmentData.numhamam == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={apartmentData.numhamam == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={apartmentData.numhamam == 7 ? true : false}
                        >
                          7{" "}
                        </option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="num-wc" className="mb-3 text-white block">
                        تعداد دستشویی
                      </label>
                      <Field
                        id="num-wc"
                        name="numwc"
                        as="select"
                        value={apartmentData.numwc}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            numwc: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={apartmentData.numwc == 0 ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          value={1}
                          selected={apartmentData.numwc == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={apartmentData.numwc == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={apartmentData.numwc == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={apartmentData.numwc == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={apartmentData.numwc == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={apartmentData.numwc == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={apartmentData.numwc == 7 ? true : false}
                        >
                          7{" "}
                        </option>
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
                        value={apartmentData.senbana}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            senbana: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={apartmentData.senbana == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={
                            apartmentData.senbana == "نوساز" ? true : false
                          }
                        >
                          نوساز{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.senbana == "1 تا 5 سال" ? true : false
                          }
                        >
                          {" "}
                          1 تا 5 سال{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.senbana == "5 تا 10 سال"
                              ? true
                              : false
                          }
                        >
                          {" "}
                          5 تا 10 سال
                        </option>
                        <option
                          selected={
                            apartmentData.senbana == "10 تا 20 سال"
                              ? true
                              : false
                          }
                        >
                          10 تا 20 سال
                        </option>
                        <option
                          selected={
                            apartmentData.senbana == "20 تا 50 سال"
                              ? true
                              : false
                          }
                        >
                          20 تا 50 سال
                        </option>
                        <option
                          selected={
                            apartmentData.senbana == "50 سال به بالا"
                              ? true
                              : false
                          }
                        >
                          50 سال به بالا
                        </option>
                        <option
                          selected={
                            apartmentData.senbana == "کلنگی" ? true : false
                          }
                        >
                          کلنگی
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        value={apartmentData.sokonat}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            sokonat: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={apartmentData.sokonat == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={
                            apartmentData.sokonat == "تخلیه" ? true : false
                          }
                        >
                          {" "}
                          تخلیه{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.sokonat == "مستاجر ساکن"
                              ? true
                              : false
                          }
                        >
                          {" "}
                          مستاجر ساکن
                        </option>
                        <option
                          selected={
                            apartmentData.sokonat == "مالک ساکن" ? true : false
                          }
                        >
                          مالک ساکن{" "}
                        </option>
                      </Field>
                    </div>
                    <div className="w-full">
                      <label htmlFor="nama" className="mb-3 text-white block">
                        نما
                      </label>
                      <Field
                        id="nama"
                        name="nama"
                        as="select"
                        value={apartmentData.nama}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            nama: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={apartmentData.nama == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={apartmentData.nama == "سنگ" ? true : false}
                        >
                          {" "}
                          سنگ
                        </option>
                        <option
                          selected={
                            apartmentData.nama == "سیمان" ? true : false
                          }
                        >
                          سیمان
                        </option>
                        <option
                          selected={apartmentData.nama == "شیشه" ? true : false}
                        >
                          شیشه{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.nama == "کامپوزیت" ? true : false
                          }
                        >
                          {" "}
                          کامپوزیت
                        </option>
                        <option
                          selected={
                            apartmentData.nama == "کلاسیک" ? true : false
                          }
                        >
                          کلاسیک
                        </option>
                        <option
                          selected={apartmentData.nama == "آجر" ? true : false}
                        >
                          آجر
                        </option>
                        <option
                          selected={apartmentData.nama == "چوب" ? true : false}
                        >
                          چوب
                        </option>
                        <option
                          selected={apartmentData.nama == "مدرن" ? true : false}
                        >
                          مدرن
                        </option>
                        <option
                          selected={
                            apartmentData.nama == "ترکیبی" ? true : false
                          }
                        >
                          ترکیبی
                        </option>
                        <option
                          selected={apartmentData.nama == "رومی" ? true : false}
                        >
                          رومی
                        </option>
                        <option
                          selected={apartmentData.nama == "سایر" ? true : false}
                        >
                          سایر
                        </option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        value={apartmentData.kabinet}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            kabinet: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option
                          selected={
                            apartmentData.kabinet == " کابینت MDF"
                              ? true
                              : false
                          }
                        >
                          {" "}
                          کابینت MDF{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.kabinet == "کابینت جزیره"
                              ? true
                              : false
                          }
                        >
                          کابینت جزیره
                        </option>
                        <option
                          selected={
                            apartmentData.kabinet == "کابینت چوب" ? true : false
                          }
                        >
                          کابینت چوب
                        </option>
                        <option
                          selected={
                            apartmentData.kabinet == "کابینت فلزی"
                              ? true
                              : false
                          }
                        >
                          کابینت فلزی
                        </option>
                        <option
                          selected={
                            apartmentData.kabinet == "کابینت ممبران"
                              ? true
                              : false
                          }
                        >
                          کابینت ممبران
                        </option>
                        <option
                          selected={
                            apartmentData.kabinet == "کابینت هایگلس"
                              ? true
                              : false
                          }
                        >
                          کابینت هایگلس
                        </option>
                        <option
                          selected={
                            apartmentData.kabinet == "سایر" ? true : false
                          }
                        >
                          سایر
                        </option>
                      </Field>
                    </div>
                    <div className="w-full">
                      <label htmlFor="area" className="mb-3 text-white block">
                        کف پوش
                      </label>
                      <Field
                        id="kafposh"
                        name="kafposh"
                        as="select"
                        value={apartmentData.kafposh}
                        onChange={(e) => {
                          setApartmentData({
                            ...apartmentData,
                            kafposh: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={apartmentData.kafposh == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={
                            apartmentData.kafposh == "پارکت" ? true : false
                          }
                        >
                          پارکت{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.kafposh == "سرامیک" ? true : false
                          }
                        >
                          سرامیک{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.kafposh == "رومی" ? true : false
                          }
                        >
                          رومی{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.kafposh == "سیمان" ? true : false
                          }
                        >
                          سیمان{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.kafposh == "موزائیک" ? true : false
                          }
                        >
                          موزائیک{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.kafposh == "موکت" ? true : false
                          }
                        >
                          موکت{" "}
                        </option>
                        <option
                          selected={
                            apartmentData.kafposh == "سایر" ? true : false
                          }
                        >
                          سایر{" "}
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
              </>
            ) : shoMelk == "خانه و ویلا" ? (
              <>
                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        value={homeData.masahatzamin}
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            masahatzamin: e.target.value,
                          });
                        }}
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
                        type="text"
                        value={homeData.tedadtabaghat}
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            tedadtabaghat: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            kabinet: e.target.value,
                          });
                        }}
                        value={homeData.kabinet}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option
                          selected={
                            homeData.kabinet == " کابینت MDF" ? true : false
                          }
                        >
                          {" "}
                          کابینت MDF{" "}
                        </option>
                        <option
                          selected={
                            homeData.kabinet == "کابینت جزیره" ? true : false
                          }
                        >
                          کابینت جزیره
                        </option>
                        <option
                          selected={
                            homeData.kabinet == "کابینت چوب" ? true : false
                          }
                        >
                          کابینت چوب
                        </option>
                        <option
                          selected={
                            homeData.kabinet == "کابینت فلزی" ? true : false
                          }
                        >
                          کابینت فلزی
                        </option>
                        <option
                          selected={
                            homeData.kabinet == "کابینت ممبران" ? true : false
                          }
                        >
                          کابینت ممبران
                        </option>
                        <option
                          selected={
                            homeData.kabinet == "کابینت هایگلس" ? true : false
                          }
                        >
                          کابینت هایگلس
                        </option>
                        <option
                          selected={homeData.kabinet == "سایر" ? true : false}
                        >
                          سایر
                        </option>
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
                        type="number"
                        value={homeData.tedadvahedkol}
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            tedadvahedkol: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="otagh" className="mb-3 text-white block">
                        تعداد اتاق
                      </label>
                      <Field
                        id="otagh"
                        name="otagh"
                        as="select"
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            otagh: e.target.value,
                          });
                        }}
                        value={homeData.otagh}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={13}>انتخاب کنید</option>
                        <option
                          value={0}
                          selected={homeData.otagh == 0 ? true : false}
                        >
                          0{" "}
                        </option>
                        <option
                          value={1}
                          selected={homeData.otagh == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={homeData.otagh == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={homeData.otagh == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={homeData.otagh == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={homeData.otagh == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={homeData.otagh == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={homeData.otagh == 7 ? true : false}
                        >
                          7{" "}
                        </option>
                        <option
                          value={8}
                          selected={homeData.otagh == 8 ? true : false}
                        >
                          8{" "}
                        </option>
                        <option
                          value={9}
                          selected={homeData.otagh == 9 ? true : false}
                        >
                          9{" "}
                        </option>
                        <option
                          value={10}
                          selected={homeData.otagh == 10 ? true : false}
                        >
                          10{" "}
                        </option>
                        <option
                          value={11}
                          selected={homeData.otagh == 11 ? true : false}
                        >
                          11{" "}
                        </option>
                        <option
                          value={12}
                          selected={homeData.otagh == 12 ? true : false}
                        >
                          12{" "}
                        </option>
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
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            numhamam: e.target.value,
                          });
                        }}
                        value={homeData.numhamam}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={homeData.numhamam == 0 ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          value={1}
                          selected={homeData.numhamam == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={homeData.numhamam == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={homeData.numhamam == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={homeData.numhamam == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={homeData.numhamam == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={homeData.numhamam == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={homeData.numhamam == 7 ? true : false}
                        >
                          7{" "}
                        </option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="num-wc" className="mb-3 text-white block">
                        تعداد دستشویی
                      </label>
                      <Field
                        id="num-wc"
                        name="num-wc"
                        as="select"
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            numwc: e.target.value,
                          });
                        }}
                        value={homeData.numwc}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={homeData.numwc == 0 ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          value={1}
                          selected={homeData.numwc == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={homeData.numwc == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={homeData.numwc == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={homeData.numwc == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={homeData.numwc == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={homeData.numwc == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={homeData.numwc == 7 ? true : false}
                        >
                          7{" "}
                        </option>
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
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            senbana: e.target.value,
                          });
                        }}
                        value={homeData.senbana}
                        rows={10}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={homeData.senbana == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={homeData.senbana == "نوساز" ? true : false}
                        >
                          نوساز{" "}
                        </option>
                        <option
                          selected={
                            homeData.senbana == "1 تا 5 سال" ? true : false
                          }
                        >
                          {" "}
                          1 تا 5 سال{" "}
                        </option>
                        <option
                          selected={
                            homeData.senbana == "5 تا 10 سال" ? true : false
                          }
                        >
                          {" "}
                          5 تا 10 سال
                        </option>
                        <option
                          selected={
                            homeData.senbana == "10 تا 20 سال" ? true : false
                          }
                        >
                          10 تا 20 سال
                        </option>
                        <option
                          selected={
                            homeData.senbana == "20 تا 50 سال" ? true : false
                          }
                        >
                          20 تا 50 سال
                        </option>
                        <option
                          selected={
                            homeData.senbana == "50 سال به بالا" ? true : false
                          }
                        >
                          50 سال به بالا
                        </option>
                        <option
                          selected={homeData.senbana == "کلنگی" ? true : false}
                        >
                          کلنگی
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            sokonat: e.target.value,
                          });
                        }}
                        value={homeData.sokonat}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={homeData.sokonat == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={homeData.sokonat == "تخلیه" ? true : false}
                        >
                          {" "}
                          تخلیه{" "}
                        </option>
                        <option
                          selected={
                            homeData.sokonat == "مستاجر ساکن" ? true : false
                          }
                        >
                          {" "}
                          مستاجر ساکن
                        </option>
                        <option
                          selected={
                            homeData.sokonat == "مالک ساکن" ? true : false
                          }
                        >
                          مالک ساکن{" "}
                        </option>
                      </Field>
                    </div>
                    <div className="w-full">
                      <label htmlFor="nama" className="mb-3 text-white block">
                        نما
                      </label>
                      <Field
                        id="nama"
                        name="nama"
                        as="select"
                        rows={10}
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            nama: e.target.value,
                          });
                        }}
                        value={homeData.nama}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option selected={homeData.nama == "" ? true : false}>
                          انتخاب کنید
                        </option>
                        <option
                          selected={homeData.nama == "سنگ" ? true : false}
                        >
                          {" "}
                          سنگ
                        </option>
                        <option
                          selected={homeData.nama == "سیمان" ? true : false}
                        >
                          سیمان
                        </option>
                        <option
                          selected={homeData.nama == "شیشه" ? true : false}
                        >
                          شیشه{" "}
                        </option>
                        <option
                          selected={homeData.nama == "کامپوزیت" ? true : false}
                        >
                          {" "}
                          کامپوزیت
                        </option>
                        <option
                          selected={homeData.nama == "کلاسیک" ? true : false}
                        >
                          کلاسیک
                        </option>
                        <option
                          selected={homeData.nama == "آجر" ? true : false}
                        >
                          آجر
                        </option>
                        <option
                          selected={homeData.nama == "چوب" ? true : false}
                        >
                          چوب
                        </option>
                        <option
                          selected={homeData.nama == "مدرن" ? true : false}
                        >
                          مدرن
                        </option>
                        <option
                          selected={homeData.nama == "ترکیبی" ? true : false}
                        >
                          ترکیبی
                        </option>
                        <option
                          selected={homeData.nama == "رومی" ? true : false}
                        >
                          رومی
                        </option>
                        <option
                          selected={homeData.nama == "سایر" ? true : false}
                        >
                          سایر
                        </option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        onChange={(e) => {
                          setHomeData({
                            ...homeData,
                            kafposh: e.target.value,
                          });
                        }}
                        value={homeData.kafposh}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={homeData.kafposh == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={homeData.kafposh == "پارکت" ? true : false}
                        >
                          پارکت{" "}
                        </option>
                        <option
                          selected={homeData.kafposh == "سرامیک" ? true : false}
                        >
                          سرامیک{" "}
                        </option>
                        <option
                          selected={homeData.kafposh == "رومی" ? true : false}
                        >
                          رومی{" "}
                        </option>
                        <option
                          selected={homeData.kafposh == "سیمان" ? true : false}
                        >
                          سیمان{" "}
                        </option>
                        <option
                          selected={
                            homeData.kafposh == "موزائیک" ? true : false
                          }
                        >
                          موزائیک{" "}
                        </option>
                        <option
                          selected={homeData.kafposh == "موکت" ? true : false}
                        >
                          موکت{" "}
                        </option>
                        <option
                          selected={homeData.kafposh == "سایر" ? true : false}
                        >
                          سایر{" "}
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
              </>
            ) : shoMelk == "زمین و کلنگی" ? (
              ""
            ) : shoMelk == "اداری و تجاری" ? (
              <>
                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        value={edariData.tabaghe}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            tabaghe: e.target.value,
                          });
                        }}
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
                        type="text"
                        value={edariData.tedadtabaghat}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            tedadtabaghat: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label
                        htmlFor="tedad-vahed-har-tabaghe"
                        className="mb-3 text-white block"
                      >
                        تعداد واحد در هر طبقه
                      </label>
                      <Field
                        id="tedad-vahed-har-tabaghe"
                        name="tedadvahedhartabaghe"
                        type="number"
                        value={edariData.tedadvahedhartabaghe}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            tedadvahedhartabaghe: e.target.value,
                          });
                        }}
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
                        type="number"
                        value={edariData.tedadvahedkol}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            tedadvahedkol: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="otagh" className="mb-3 text-white block">
                        تعداد اتاق
                      </label>
                      <Field
                        id="otagh"
                        name="otagh"
                        as="select"
                        value={edariData.otagh}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            otagh: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option
                          value={0}
                          selected={edariData.otagh == 0 ? true : false}
                        >
                          0{" "}
                        </option>
                        <option
                          value={1}
                          selected={edariData.otagh == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={edariData.otagh == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={edariData.otagh == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={edariData.otagh == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={edariData.otagh == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={edariData.otagh == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={edariData.otagh == 7 ? true : false}
                        >
                          7{" "}
                        </option>
                        <option
                          value={8}
                          selected={edariData.otagh == 8 ? true : false}
                        >
                          8{" "}
                        </option>
                        <option
                          value={9}
                          selected={edariData.otagh == 9 ? true : false}
                        >
                          9{" "}
                        </option>
                        <option
                          value={10}
                          selected={edariData.otagh == 10 ? true : false}
                        >
                          10{" "}
                        </option>
                        <option
                          value={11}
                          selected={edariData.otagh == 11 ? true : false}
                        >
                          11{" "}
                        </option>
                        <option
                          value={12}
                          selected={edariData.otagh == 12 ? true : false}
                        >
                          12{" "}
                        </option>
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
                        value={edariData.numhamam}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            numhamam: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={edariData.numhamam == 0 ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          value={1}
                          selected={edariData.numhamam == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={edariData.numhamam == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={edariData.numhamam == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={edariData.numhamam == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={edariData.numhamam == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={edariData.numhamam == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={edariData.numhamam == 7 ? true : false}
                        >
                          7{" "}
                        </option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="num-wc" className="mb-3 text-white block">
                        تعداد دستشویی
                      </label>
                      <Field
                        id="num-wc"
                        name="numwc"
                        as="select"
                        value={edariData.numwc}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            numwc: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={edariData.numwc == 0 ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          value={1}
                          selected={edariData.numwc == 1 ? true : false}
                        >
                          1{" "}
                        </option>
                        <option
                          value={2}
                          selected={edariData.numwc == 2 ? true : false}
                        >
                          2{" "}
                        </option>
                        <option
                          value={3}
                          selected={edariData.numwc == 3 ? true : false}
                        >
                          3{" "}
                        </option>
                        <option
                          value={4}
                          selected={edariData.numwc == 4 ? true : false}
                        >
                          4{" "}
                        </option>
                        <option
                          value={5}
                          selected={edariData.numwc == 5 ? true : false}
                        >
                          5{" "}
                        </option>
                        <option
                          value={6}
                          selected={edariData.numwc == 6 ? true : false}
                        >
                          6{" "}
                        </option>
                        <option
                          value={7}
                          selected={edariData.numwc == 7 ? true : false}
                        >
                          7{" "}
                        </option>
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
                        value={edariData.senbana}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            senbana: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={edariData.senbana == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={edariData.senbana == "نوساز" ? true : false}
                        >
                          نوساز{" "}
                        </option>
                        <option
                          selected={
                            edariData.senbana == "1 تا 5 سال" ? true : false
                          }
                        >
                          {" "}
                          1 تا 5 سال{" "}
                        </option>
                        <option
                          selected={
                            edariData.senbana == "5 تا 10 سال" ? true : false
                          }
                        >
                          {" "}
                          5 تا 10 سال
                        </option>
                        <option
                          selected={
                            edariData.senbana == "10 تا 20 سال" ? true : false
                          }
                        >
                          10 تا 20 سال
                        </option>
                        <option
                          selected={
                            edariData.senbana == "20 تا 50 سال" ? true : false
                          }
                        >
                          20 تا 50 سال
                        </option>
                        <option
                          selected={
                            edariData.senbana == "50 سال به بالا" ? true : false
                          }
                        >
                          50 سال به بالا
                        </option>
                        <option
                          selected={edariData.senbana == "کلنگی" ? true : false}
                        >
                          کلنگی
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 w-full max-md:flex-col">
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
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
                        value={edariData.sokonat}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            sokonat: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          value={0}
                          selected={edariData.sokonat == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={edariData.sokonat == "تخلیه" ? true : false}
                        >
                          {" "}
                          تخلیه{" "}
                        </option>
                        <option
                          selected={
                            edariData.sokonat == "مستاجر ساکن" ? true : false
                          }
                        >
                          {" "}
                          مستاجر ساکن
                        </option>
                        <option
                          selected={
                            edariData.sokonat == "مالک ساکن" ? true : false
                          }
                        >
                          مالک ساکن{" "}
                        </option>
                      </Field>
                    </div>
                    <div className="w-full">
                      <label htmlFor="nama" className="mb-3 text-white block">
                        نما
                      </label>
                      <Field
                        id="nama"
                        name="nama"
                        as="select"
                        value={edariData.nama}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            nama: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option selected={edariData.nama == "" ? true : false}>
                          انتخاب کنید
                        </option>
                        <option
                          selected={edariData.nama == "سنگ" ? true : false}
                        >
                          {" "}
                          سنگ
                        </option>
                        <option
                          selected={edariData.nama == "سیمان" ? true : false}
                        >
                          سیمان
                        </option>
                        <option
                          selected={edariData.nama == "شیشه" ? true : false}
                        >
                          شیشه{" "}
                        </option>
                        <option
                          selected={edariData.nama == "کامپوزیت" ? true : false}
                        >
                          {" "}
                          کامپوزیت
                        </option>
                        <option
                          selected={edariData.nama == "کلاسیک" ? true : false}
                        >
                          کلاسیک
                        </option>
                        <option
                          selected={edariData.nama == "آجر" ? true : false}
                        >
                          آجر
                        </option>
                        <option
                          selected={edariData.nama == "چوب" ? true : false}
                        >
                          چوب
                        </option>
                        <option
                          selected={edariData.nama == "مدرن" ? true : false}
                        >
                          مدرن
                        </option>
                        <option
                          selected={edariData.nama == "ترکیبی" ? true : false}
                        >
                          ترکیبی
                        </option>
                        <option
                          selected={edariData.nama == "رومی" ? true : false}
                        >
                          رومی
                        </option>
                        <option
                          selected={edariData.nama == "سایر" ? true : false}
                        >
                          سایر
                        </option>
                      </Field>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="area" className="mb-3 text-white block">
                        کف پوش
                      </label>
                      <Field
                        id="kafposh"
                        name="kafposh"
                        as="select"
                        value={edariData.kafposh}
                        onChange={(e) => {
                          setEdariData({
                            ...edariData,
                            kafposh: e.target.value,
                          });
                        }}
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option
                          selected={edariData.kafposh == "" ? true : false}
                        >
                          انتخاب کنید
                        </option>
                        <option
                          selected={edariData.kafposh == "پارکت" ? true : false}
                        >
                          پارکت{" "}
                        </option>
                        <option
                          selected={
                            edariData.kafposh == "سرامیک" ? true : false
                          }
                        >
                          سرامیک{" "}
                        </option>
                        <option
                          selected={edariData.kafposh == "رومی" ? true : false}
                        >
                          رومی{" "}
                        </option>
                        <option
                          selected={edariData.kafposh == "سیمان" ? true : false}
                        >
                          سیمان{" "}
                        </option>
                        <option
                          selected={
                            edariData.kafposh == "موزائیک" ? true : false
                          }
                        >
                          موزائیک{" "}
                        </option>
                        <option
                          selected={edariData.kafposh == "موکت" ? true : false}
                        >
                          موکت{" "}
                        </option>
                        <option
                          selected={edariData.kafposh == "سایر" ? true : false}
                        >
                          سایر{" "}
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
              className="bg-[#4a80bb] items-center   max-lg:w-full m-auto flex   justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
            >
              <RiAncientPavilionFill size={24} />
              ثبت اطلاعات نوع ملک
              {showLoading && <BeatLoader size={10} color="#fff" />}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default PropertyType;
