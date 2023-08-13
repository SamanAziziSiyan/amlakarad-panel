import { useState } from "react";
import { createState } from "../../../../validation/formikValidation";
import Layout from "../../../Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";
import { getToken, toastAlert } from "../../../helper";
import service from "../../../../server/service";
import { BeatLoader } from "react-spinners";

const PropertyType = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [shoMelk, setShowMelk] = useState("");
  const handleCreateStateMeta = (values) => {
    setShowLoading(true);
    let userToken = getToken();
    let stateId = localStorage.getItem("stateId");
    if (shoMelk == "آپارتمان") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            melk: shoMelk,
            tabaghe: values.tabaghe,
            tedadtabaghat: String(values.tedadtabaghat),
            tedadvahedhartabaghe: String(values.tedadvahedhartabaghe),
            tedadvahedkol: String(values.tedadvahedkol),
            otagh: values.otagh,
            numhamam: values.numhamam,
            numwc: values.numwc,
            senbana: values.senbana,
            sokonat: values.sokonat,
            nama: values.nama,
            kabinet: values.kabinet,
            kafposh: values.kafposh,
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
            masahatzamin: values.masahatzamin,
            tedadtabaghat: String(values.tedadtabaghat),
            tedadvahedkol: String(values.tedadvahedkol),
            otagh: values.otagh,
            numhamam: values.numhamam,
            numwc: values.numwc,
            senbana: values.senbana,
            sokonat: values.sokonat,
            nama: values.nama,
            kabinet: values.kabinet,
            kafposh: values.kafposh,
          },
        ],
      };

      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          setShowLoading(false);
          toastAlert("اطلاعات نوع ملک با موفقیت ثبت شد", "success");
          toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
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
          setShowLoading(false);
          toastAlert("اطلاعات نوع ملک با موفقیت ثبت شد", "success");
          toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    }
    if (shoMelk == "اداری و تجاری") {
      let stateData = {
        ID: stateId,
        meta: [
          {
            melk: shoMelk,
            tabaghe: values.tabaghe,
            tedadtabaghat: String(values.tedadtabaghat),
            tedadvahedhartabaghe: String(values.tedadvahedhartabaghe),
            tedadvahedkol: String(values.tedadvahedkol),
            otagh: values.otagh,
            numhamam: values.numhamam,
            numwc: values.numwc,
            senbana: values.senbana,
            sokonat: values.sokonat,
            nama: values.nama,
            kafposh: values.kafposh,
          },
        ],
      };

      service.states
        .insertMetaData(userToken, stateData)
        .then((data) => {
          setShowLoading(false);
          toastAlert("اطلاعات نوع ملک با موفقیت ثبت شد", "success");
          toastAlert("روی مرحله اطلاعات اضافی کلیک کنید ", "info");
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
          handleCreateStateMeta(values);
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
                        name="tedadtabaghat"
                        type="text"
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
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="num-wc" className="mb-3 text-white block">
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option> تخلیه </option>
                        <option> مستاجر ساکن</option>
                        <option>مالک ساکن </option>
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
                      <label htmlFor="area" className="mb-3 text-white block">
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
                        name="masahatzamin"
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
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="num-wc" className="mb-3 text-white block">
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option> تخلیه </option>
                        <option> مستاجر ساکن</option>
                        <option>مالک ساکن </option>
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
                        name="tedadtabaghat"
                        type="text"
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
                  <div className="w-full flex items-center justify-between gap-4 max-md:flex-col">
                    <div className="w-full">
                      <label htmlFor="num-wc" className="mb-3 text-white block">
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
                      <label htmlFor="area" className="mb-3 text-white block">
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
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-300  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      >
                        <option value={0}>انتخاب کنید</option>
                        <option> تخلیه </option>
                        <option> مستاجر ساکن</option>
                        <option>مالک ساکن </option>
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
            <button
              type="submit"
              className="bg-[#4a80bb] items-center justify-center max-lg:w-full m-auto flex items-end justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
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
