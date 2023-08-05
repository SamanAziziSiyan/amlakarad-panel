import { FaRulerCombined, FaShower } from "react-icons/fa6";
import { FaParking, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import config from "../../../../server/config.json";
import {
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
  formatNumber,
} from "../../../helper";
import service from "../../../../server/service";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  RiCalendarCheckFill,
  RiDeleteBin6Line,
  RiEdit2Line,
  RiReplyAllLine,
  RiSearch2Fill,
} from "react-icons/ri";
import { AiFillFilter } from "react-icons/ai";
import { GiPriceTag } from "react-icons/gi";
import { FaHospitalUser } from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { BsInfoCircleFill } from "react-icons/bs";
import moment from "jalali-moment";
import Layout from "../../../Layout";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

const UserEstate = () => {
  const [states, setStates] = useState([]);
  const [empty, showEmpty] = useState(false);
  const [userRole, setUserRole] = useState("");
  const { authorId } = useParams();
  const [FilterEmpty, showFilterEmpty] = useState(false);
  const [showFilteredState, setShowFilteredState] = useState(false);
  const [FilteredState, setFilteredState] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const [moameleType, setMoameleType] = useState("");

  const [getMinPriceRange, setMinPriceRange] = useState(0);
  const [getMaxPriceRange, setMaxPriceRange] = useState(0);
  const [getInitialMaxPriceRange, setInitialMaxPriceRange] = useState(0);

  const [getMinPriceRahnRange, setMinPriceRahnRange] = useState(0);
  const [getMaxPriceRahnRange, setMaxPriceRahnRange] = useState(0);
  const [getInitialMaxPriceRahnRange, setInitialMaxPriceRahnRange] =
    useState(0);

  const [getMinPriceEjareRange, setMinPriceEjareRange] = useState(0);
  const [getMaxPriceEjareRange, setMaxPriceEjareRange] = useState(0);
  const [getInitialMaxPriceEjareRange, setInitialMaxPriceEjareRange] =
    useState(0);

  const [getMinMetrazhRange, setMinMetrazhRange] = useState(0);
  const [getMaxMetrazhRange, setMaxMetrazhRange] = useState(0);
  const [getInitialMaxMetrazhRange, setInitialMaxMetrazhRange] = useState(0);

  const [userId, setUserId] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const [getPageCount, setPageCount] = useState(0);
  const handlePageClick = (e) => {
    const newOffset = e.selected * 16;
    setItemOffset(newOffset);
  };
  const navigate = useNavigate();

  useEffect(() => {
    let userData = getUserDataOnLocalStorage();
    setUserId(userData.ID);

    if (userData.role.karbar) return navigate("/");
    let userToken = getToken();
    setUserRole(userData.role);
    if (userData.role.administrator || userData.role.karmand) {
      service.states
        .getAutherStates(authorId, userToken)
        .then(async (data) => {
          console.log(data);
          if (data.data.length == 0) {
            showEmpty(true);
            setShowLoading(false);
          } else {
            const endOffset = itemOffset + 16;
            const currentStates = data.data.slice(itemOffset, endOffset);
            const pageCount = Math.ceil(data.data.length / 16);
            setPageCount(pageCount);
            setShowLoading(false);
            setStates(currentStates);

            setMaxPriceRange(data.data[0].extraData[1].maxPrice);
            setMinPriceRange(data.data[0].extraData[1].minPrice);
            setInitialMaxPriceRange(data.data[0].extraData[1].maxPrice);

            setMaxMetrazhRange(data.data[0].extraData[0].maxMetrazh);
            setMinMetrazhRange(data.data[0].extraData[0].minMetrazh);
            setInitialMaxMetrazhRange(data.data[0].extraData[0].maxMetrazh);

            setMaxPriceRahnRange(data.data[0].extraData[2].maxPricerahn);
            setMinPriceRahnRange(data.data[0].extraData[2].minPricerahn);
            setInitialMaxPriceRahnRange(data.data[0].extraData[2].maxPricerahn);

            setMaxPriceEjareRange(data.data[0].extraData[3].maxPriceejare);
            setMinPriceEjareRange(data.data[0].extraData[3].minPriceejare);
            setInitialMaxPriceEjareRange(
              data.data[0].extraData[3].maxPriceejare
            );
          }
        })
        .catch((err) => {
          navigate("/");
          toastAlert("سرور مشغول است");
          setShowLoading(false);
        });
    } else {
      navigate("/");
      toastAlert("شما به این بخش دسترسی ندارید");
    }
  }, [itemOffset]);
  const deleteState = (stateId, stateTitle) => {
    let userToken = getToken();
    Swal.fire({
      title: `آیا از حذف ${stateTitle} مطمئن هستید ؟`,
      text: "این عمل قابل بازگردانی نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!بله حذف شود",
    }).then((result) => {
      if (result.isConfirmed) {
        service.states
          .deleteState(stateId, userToken)
          .then((data) => {
            // if (!data.data.deleted) throw new Error();
            let filteredStates = states.filter((item) => item.ID != stateId);
            setStates(filteredStates);
          })
          .catch((err) => {
            toastAlert("سرور مشغول است");
          });
        Swal.fire("حذف شد!", "ملک مورد نظر حذف شد", "success");
      }
    });
  };
  const filterState = (e) => {
    e.preventDefault();
    setShowLoading(true);
    let userData = getUserDataOnLocalStorage();
    let userToken = getToken();
    if (moameleType == "خرید و فروش") {
      let moamele = e.target[0].value;
      let melk = e.target[1].value;
      let karbari = e.target[2].value;
      let mantaghe = e.target[3].value;
      let price = e.target[4].value;
      let metrazh = e.target[5].value;
      let stateData = {
        authorID: authorId,
        moamele,
        melk,
        karbari,
        mantaghe,
        metrazhFrom: Number(getMinMetrazhRange),
        metrazhTo: Number(metrazh),
        priceFrom: Number(getMinPriceRange),
        priceTo: Number(price),
      };

      service.states
        .filterStateAuthorID(userToken, stateData)
        .then((data) => {
          if (data.data.length == 0) {
            showFilterEmpty(true);
          } else {
            showFilterEmpty(false);
          }
          setShowLoading(false);
          setShowFilteredState(true);
          setFilteredState(data.data);
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
          setShowLoading(false);
          setShowFilteredState(false);
        });
    }

    if (moameleType == "رهن و اجاره") {
      let moamele = e.target[0].value;
      let melk = e.target[1].value;
      let karbari = e.target[2].value;
      let mantaghe = e.target[3].value;
      let priceRahn = e.target[4].value;
      let priceEjare = e.target[5].value;
      let metrazh = e.target[6].value;

      let stateData = {
        authorID: authorId,
        moamele,
        melk,
        karbari,
        mantaghe,
        metrazhFrom: Number(getMinMetrazhRange),
        metrazhTo: Number(metrazh),
        rahnFrom: Number(getMinPriceRahnRange),
        rahnTo: Number(priceRahn),
        ejareFrom: Number(getMinPriceEjareRange),
        ejareTo: Number(priceEjare),
      };
      service.states
        .filterStateAuthorID(userToken, stateData)
        .then((data) => {
          if (data.data.length == 0) {
            showFilterEmpty(true);
          } else {
            showFilterEmpty(false);
          }
          setShowLoading(false);
          setShowFilteredState(true);
          setFilteredState(data.data);
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
          setShowLoading(false);
          setShowFilteredState(false);
        });
    }

    if (moameleType == "اجاره روزانه") {
      let moamele = e.target[0].value;
      let melk = e.target[1].value;
      let karbari = e.target[2].value;
      let mantaghe = e.target[3].value;
      let metrazh = e.target[4].value;

      let stateData = {
        authorID: authorId,
        moamele,
        melk,
        karbari,
        mantaghe,
        metrazhFrom: Number(getMinMetrazhRange),
        metrazhTo: Number(metrazh),
      };

      service.states
        .filterStateAuthorID(userToken, stateData)
        .then((data) => {
          if (data.data.length == 0) {
            showFilterEmpty(true);
          } else {
            showFilterEmpty(false);
          }
          setShowLoading(false);
          setShowFilteredState(true);
          setFilteredState(data.data);
        })
        .catch((err) => {
          toastAlert("سرور مشغول است");
          setShowLoading(false);
          setShowFilteredState(false);
        });
    }
    if (moameleType == "") {
      setFilteredState(states);
      setShowLoading(false);
    }
  };

  const changePriceRange = (e) => {
    setInitialMaxPriceRange(Number(e.target.value));
  };
  const changeMetrazhRange = (e) => {
    setInitialMaxMetrazhRange(Number(e.target.value));
  };
  const changePriceRahnRange = (e) => {
    setInitialMaxPriceRahnRange(Number(e.target.value));
  };

  const changePriceEjareRange = (e) => {
    setInitialMaxPriceEjareRange(Number(e.target.value));
  };

  return (
    <>
      <Layout>
        <div className="w-full text-center m-auto mt-20">
          <div className="   grid grid-cols-12  lg:gap-10 px-2 justify-center items-center">
            <div className="col-span-12 xl:col-span-12 relative ">
              <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>

              <div className="w-full relative  h-auto bg-white/5 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
                <form
                  className="bg-white p-5 rounded-md text-black shadow shadow-sky-500"
                  onSubmit={filterState}
                >
                  <div className="flex items-center justify-between gap-4 max-lg:flex-wrap">
                    <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
                      <div className="w-full">
                        <label htmlFor="area" className="mb-3 block">
                          نوع معامله
                        </label>
                        <select
                          id="area"
                          onChange={(e) => {
                            setMoameleType(e.target.value);
                          }}
                          name="area"
                          as="select"
                          rows={10}
                          className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                        >
                          <option value="">انتخاب کنید</option>
                          <option>خرید و فروش</option>
                          <option>رهن و اجاره</option>
                          <option>اجاره روزانه</option>
                        </select>
                      </div>
                      <div className="w-full">
                        <label htmlFor="area" className="mb-3 block">
                          نوع ملک
                        </label>
                        <select
                          id="area"
                          name="area"
                          as="select"
                          rows={10}
                          className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                        >
                          <option value="">انتخاب کنید</option>
                          <option>آپارتمان</option>
                          <option>خانه و ویلا</option>
                          <option>زمین و کلنگی</option>
                          <option>اداری و تجاری</option>
                        </select>
                      </div>
                    </div>

                    <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
                      <div className="w-full">
                        <label htmlFor="area" className="mb-3 block">
                          کاربری
                        </label>
                        <select
                          id="karbari"
                          name="karbari"
                          as="select"
                          className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                        >
                          <option value="">انتخاب کنید</option>
                          <option value="مسکونی"> مسکونی </option>
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
                        </select>
                      </div>
                      <div className="w-full relative">
                        <label htmlFor="shahr" className="mb-3 block">
                          منطقه
                        </label>
                        <div className="relative">
                          <select
                            id="shahr"
                            name="shahr"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3    placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          >
                            <option value="">همه</option>
                            <option value="اسلام اباد">اسلام اباد</option>
                            <option value="آزادگان"> آزادگان</option>
                            <option value=" ابوذر"> ابوذر</option>
                            <option value="استاد حقیقی">استاد حقیقی</option>
                            <option value="اسکندری">اسکندری</option>
                            <option value="امیر آباد">امیر آباد</option>
                            <option value=" اینگیجه"> اینگیجه</option>
                            <option value="پارک ساحلی">پارک ساحلی</option>
                            <option value="جاده حصار">جاده حصار</option>
                            <option value="چهاراه اطلاعات">
                              چهاراه اطلاعات
                            </option>
                            <option value="چهاراه شهرداری">
                              چهاراه شهرداری
                            </option>
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
                            <option value="کهریزه محمود آباد">
                              کهریزه محمود آباد
                            </option>
                            <option value="کوسه">کوسه</option>
                            <option value="کوی آفتاب">کوی آفتاب</option>
                            <option value="کوی اندیشه">کوی اندیشه</option>
                            <option value="کوی سپاه">کوی سپاه</option>
                            <option value="کوی محمدیه">کوی محمدیه</option>
                            <option value="مجسمه مادر">مجسمه مادر</option>
                            <option value="مسکن مهر">مسکن مهر</option>
                            <option value="ناچیت">ناچیت</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-start justify-start max-lg:flex-col gap-4">
                    {moameleType == "خرید و فروش" ? (
                      <div className="w-full bg-sky-100 p-1 rounded-md flex justify-center flex-col items-center">
                        <label htmlFor="area" className="mb-3 block">
                          قیمت
                        </label>
                        <div className="relative flex items-center w-full max-lg:flex-col">
                          <span className="mx-4 flex gap-1 items-center">
                            {formatNumber(getMinPriceRange)}{" "}
                            <span className="text-xs">تومان</span>
                          </span>
                          <input
                            type="range"
                            id="vol"
                            name="vol2"
                            min={getMinPriceRange}
                            max={getMaxPriceRange}
                            value={getInitialMaxPriceRange}
                            onChange={changePriceRange}
                            className="w-full"
                          />
                          <span className="mx-4 flex gap-1 items-center">
                            {formatNumber(Math.floor(getInitialMaxPriceRange))}
                            <span className="text-xs">تومان</span>
                          </span>
                        </div>
                      </div>
                    ) : moameleType == "رهن و اجاره" ? (
                      <>
                        <div className="w-full flex flex-col gap-4">
                          <div className="w-full flex justify-center flex-col items-center  bg-sky-100 p-1 rounded-md">
                            <label htmlFor="priceRahn" className="mb-3 block">
                              قیمت رهن
                            </label>
                            <div className="relative flex items-center w-full max-lg:flex-col">
                              <span className="mx-4 flex gap-1 items-center">
                                {formatNumber(getMinPriceRange)}{" "}
                                <span className="text-xs">تومان</span>
                              </span>
                              <input
                                type="range"
                                id="priceRahn"
                                name="priceRahn"
                                min={getMinPriceRahnRange}
                                max={getMaxPriceRahnRange}
                                value={getInitialMaxPriceRahnRange}
                                onChange={changePriceRahnRange}
                                className="w-full"
                              />
                              <span className="mx-4 flex gap-1 items-center">
                                {formatNumber(
                                  Math.floor(getInitialMaxPriceRahnRange)
                                )}
                                <span className="text-xs">تومان</span>
                              </span>
                            </div>
                          </div>
                          <div className="w-full flex justify-center flex-col items-center  bg-sky-100 p-1 rounded-md">
                            <label htmlFor="priceEjare" className="mb-3 block">
                              قیمت اجاره
                            </label>
                            <div className="relative flex items-center w-full max-lg:flex-col">
                              <span className="mx-4 flex gap-1 items-center">
                                {formatNumber(getMinPriceEjareRange)}{" "}
                                <span className="text-xs">تومان</span>
                              </span>
                              <input
                                type="range"
                                id="priceEjare"
                                name="priceEjare"
                                min={getMinPriceEjareRange}
                                max={getMaxPriceEjareRange}
                                value={getInitialMaxPriceEjareRange}
                                onChange={changePriceEjareRange}
                                className="w-full"
                              />
                              <span className="mx-4 flex gap-1 items-center">
                                {formatNumber(
                                  Math.floor(getInitialMaxPriceEjareRange)
                                )}
                                <span className="text-xs">تومان</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    <div className="w-full flex justify-center flex-col items-center  bg-sky-100 p-1 rounded-md">
                      <label htmlFor="metrazh" className="mb-3 block">
                        متراژ
                      </label>
                      <div className="relative flex items-center w-full max-lg:flex-col">
                        <span className="mx-4 flex gap-1 items-center">
                          {formatNumber(getMinMetrazhRange)}{" "}
                          <span className="text-xs">متر</span>
                        </span>
                        <input
                          type="range"
                          id="metrazh"
                          name="metrazh"
                          min={getMinMetrazhRange}
                          max={getMaxMetrazhRange}
                          value={getInitialMaxMetrazhRange}
                          onChange={changeMetrazhRange}
                          className="w-full"
                        />
                        <span className="mx-4 flex gap-1 items-center">
                          {formatNumber(Math.floor(getInitialMaxMetrazhRange))}
                          <span className="text-xs">متر</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-sky-500 px-12 py-3  flex items-start  mx-auto  mt-6 rounded-md text-white text-lg "
                  >
                    <AiFillFilter size={22} className="pl-1" />
                    فیلتر{" "}
                  </button>
                </form>

                {showLoading && (
                  <div className="flex-col  mt-6  flex justify-center items-center  m-auto font-medium rounded-xl   ">
                    <ClipLoader size={70} color="#fff" />
                    <span className="text-white mt-6">
                      درحال بارگزاری اطلاعات
                    </span>
                  </div>
                )}

                <div className="w-full h-auto ">
                  <div className="grid grid-cols-12 gap-4 px-2 mt-10">
                    {empty == true ? (
                      <div className="w-full col-span-12 bg-sky-500 rounded-md p-5">
                        <h1 className="text-white flex items-center justify-between text-[22px] w-full text-center">
                          کاربر انتخاب شده هنوز ملکی ثبت نکرده است
                          <span>
                            <BsInfoCircleFill
                              className="justify-center items-center"
                              color={"#fff"}
                            />
                          </span>
                        </h1>
                      </div>
                    ) : showFilteredState == false ? (
                      states.map((item, index) => (
                        <div
                          key={index}
                          className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 2xl:col-span-3 cursor-pointer   h-auto bg-white  backdrop-blur-md rounded-2xl"
                        >
                          <div className="flex flex-col  pb-4 relative h-full justify-between">
                            {item.fast == "1" ? (
                              <button className=" absolute top-[2%] right-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                فوری{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "expired" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                فروخته شده{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "pending" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-orange-300 p-1 text-xs text-white   px-3 rounded-md">
                                در انتظار بررسی{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "publish" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-green-400 p-1 text-xs text-white   px-3 rounded-md">
                                منتشر شده{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "trash" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                زباله دان{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "draft" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#0369A1] p-1 text-xs text-white   px-3 rounded-md">
                                پیش نویس{" "}
                              </button>
                            ) : (
                              ""
                            )}

                            <img
                              src={`${
                                item.img != 0
                                  ? item.img[0].img
                                  : "/assets/images/default-state-image.png"
                              }
                             `}
                              className="w-full rounded-md max-h-[264px] min-h-[264px]"
                            />
                            <div className="flex items-center justify-between w-full px-2 mt-2">
                              <div className="flex items-center">
                                <RiCalendarCheckFill className="text-center text-gray-400 text-md" />
                                <p className="mt-1 mr-1 text-center text-gray-400 text-sm">
                                  {moment(item.post_date)
                                    .locale("fa")
                                    .fromNow()}{" "}
                                </p>
                              </div>
                              {item.special == "1" ? (
                                <button className="bg-[#ffca28] p-1 text-xs text-gray-600 px-3 rounded-md">
                                  ویژه
                                </button>
                              ) : (
                                <button className="bg-sky-200 p-1 text-xs text-gray-600 px-3 rounded-md">
                                  عادی{" "}
                                </button>
                              )}
                            </div>
                            <p className="mt-3 text-center text-[#0c0a5a] ">
                              {item.post_title}
                            </p>

                            <div className=" items-center h-[243px] gap-10 mt-4 justify-center bg-[#fafafa] p-2 flex-wrap  ">
                              {item.moamele == "خرید و فروش" ? (
                                <div className="flex mt-3">
                                  <GiPriceTag
                                    size={19}
                                    className="text-gray-600"
                                  />
                                  <span className="mr-2 text-sm ">
                                    قیمت فروش :{" "}
                                    {formatNumber(item["price-kol"])} تومان
                                  </span>
                                </div>
                              ) : item.moamele == "رهن و اجاره" ? (
                                <>
                                  <div className="flex mt-3">
                                    <GiPriceTag
                                      size={19}
                                      className="text-gray-600"
                                    />
                                    <span className="mr-2 text-sm ">
                                      قیمت رهن :
                                      {formatNumber(item["price-rahn"])} تومان
                                    </span>
                                  </div>

                                  <div className="flex mt-3">
                                    <GiPriceTag
                                      size={19}
                                      className="text-gray-600"
                                    />
                                    <span className="mr-2 text-sm ">
                                      قیمت اجاره :
                                      {formatNumber(item["price-ejare"])} تومان
                                    </span>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}

                              <div className="flex mt-3">
                                <FaHospitalUser
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع کاربری : {item.karbari}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <FaParking
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  پارکینگ : {item.parking}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <FaRulerCombined
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  متراژ : {item.metrazh}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <MdRealEstateAgent
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع ملک : {item.melk}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <GrTransaction
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع معامله : {item.moamele}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 justify-center">
                              {userRole.administrator ? (
                                <>
                                  <button
                                    onClick={() => {
                                      deleteState(item.ID, item.post_title);
                                    }}
                                    type="button"
                                    className="bg-red-500 p-2 flex items-start  rounded-md text-white text-sm "
                                  >
                                    <RiDeleteBin6Line
                                      size={18}
                                      className="pl-1"
                                    />
                                    حذف{" "}
                                  </button>
                                  <Link to={`/edit-estate/${item.ID}`}>
                                    <button
                                      type="button"
                                      className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                                    >
                                      <RiEdit2Line size={18} className="pl-1" />
                                      ویرایش
                                    </button>
                                  </Link>
                                </>
                              ) : (
                                ""
                              )}

                              {item.post_author == userId &&
                              !userRole.administrator ? (
                                <>
                                  <button
                                    onClick={() => {
                                      deleteState(item.ID, item.post_title);
                                    }}
                                    type="button"
                                    className="bg-red-500 p-2 flex items-start  rounded-md text-white text-sm "
                                  >
                                    <RiDeleteBin6Line
                                      size={18}
                                      className="pl-1"
                                    />
                                    حذف{" "}
                                  </button>
                                  <Link to={`/edit-estate/${item.ID}`}>
                                    <button
                                      type="button"
                                      className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                                    >
                                      <RiEdit2Line size={18} className="pl-1" />
                                      ویرایش
                                    </button>
                                  </Link>
                                </>
                              ) : (
                                ""
                              )}

                              <Link to={`/EstateDetails/${item.ID}`}>
                                <button
                                  type="button"
                                  className="bg-green-600 p-2 flex items-center  rounded-md text-white text-sm"
                                >
                                  <RiReplyAllLine size={18} className="pl-1" />
                                  جزئیات
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      ""
                    )}
                    {FilterEmpty == true ? (
                      <div className="w-full col-span-12 bg-sky-500 rounded-md p-5">
                        <h1 className="text-white flex items-center justify-between text-[22px] w-full text-center">
                          ملکی مطابق با فیلتر انتخابی یافت نشد
                          <span>
                            <BsInfoCircleFill
                              className="justify-center items-center"
                              color={"#fff"}
                            />
                          </span>
                        </h1>
                      </div>
                    ) : showFilteredState == true ? (
                      FilteredState.map((item, index) => (
                        <div
                          key={index}
                          className="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 xl:col-span-4 cursor-pointer   h-auto bg-white  backdrop-blur-md rounded-2xl"
                        >
                          <div className="flex flex-col  pb-4 relative">
                            {item.fast == "1" ? (
                              <button className=" absolute top-[2%] right-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                فوری{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "expired" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                منقضی شده{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "pending" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-orange-300 p-1 text-xs text-white   px-3 rounded-md">
                                در انتظار بررسی{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "publish" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-green-400 p-1 text-xs text-white   px-3 rounded-md">
                                منتشر شده{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "trash" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                زباله دان{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.post_status == "draft" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#0369A1] p-1 text-xs text-white   px-3 rounded-md">
                                پیش نویس{" "}
                              </button>
                            ) : (
                              ""
                            )}

                            <img
                              src={`${
                                item.img != 0
                                  ? item.img[0].img
                                  : "/assets/images/default-state-image.png"
                              }
                               `}
                              className="w-full rounded-md max-h-[264px] min-h-[264px]"
                            />
                            <div className="flex items-center justify-between w-full px-2 mt-2">
                              <div className="flex items-center">
                                <RiCalendarCheckFill className="text-center text-gray-400 text-md" />
                                <p className="mt-1 mr-1 text-center text-gray-400 text-sm">
                                  {moment(item.post_date)
                                    .locale("fa")
                                    .fromNow()}{" "}
                                </p>
                              </div>
                              {item.special == "1" ? (
                                <button className="bg-[#ffca28] p-1 text-xs text-gray-600 px-3 rounded-md">
                                  ویژه
                                </button>
                              ) : (
                                <button className="bg-sky-200 p-1 text-xs text-gray-600 px-3 rounded-md">
                                  عادی{" "}
                                </button>
                              )}
                            </div>
                            <p className="mt-3 text-center text-[#0c0a5a] ">
                              {item.post_title}
                            </p>

                            <div className=" items-center gap-10 mt-4 justify-center bg-[#fafafa] p-2 flex-wrap  ">
                              {item.moamele == "خرید و فروش" ? (
                                <div className="flex mt-3">
                                  <GiPriceTag
                                    size={19}
                                    className="text-gray-600"
                                  />
                                  <span className="mr-2 text-sm ">
                                    قیمت فروش :{" "}
                                    {formatNumber(item["price-kol"])} تومان
                                  </span>
                                </div>
                              ) : item.moamele == "رهن و اجاره" ? (
                                <>
                                  <div className="flex mt-3">
                                    <GiPriceTag
                                      size={19}
                                      className="text-gray-600"
                                    />
                                    <span className="mr-2 text-sm ">
                                      قیمت رهن :
                                      {formatNumber(item["price-rahn"])} تومان
                                    </span>
                                  </div>

                                  <div className="flex mt-3">
                                    <GiPriceTag
                                      size={19}
                                      className="text-gray-600"
                                    />
                                    <span className="mr-2 text-sm ">
                                      قیمت اجاره :
                                      {formatNumber(item["price-ejare"])} تومان
                                    </span>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}

                              <div className="flex mt-3">
                                <FaHospitalUser
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع کاربری : {item.karbari}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <FaParking
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  پارکینگ : {item.parking}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <FaRulerCombined
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  متراژ : {item.metrazh}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <MdRealEstateAgent
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع ملک : {item.melk}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <GrTransaction
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع معامله : {item.moamele}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 justify-center">
                              {userRole.administrator ? (
                                <>
                                  <button
                                    onClick={() => {
                                      deleteState(item.ID, item.post_title);
                                    }}
                                    type="button"
                                    className="bg-red-500 p-2 flex items-start  rounded-md text-white text-sm "
                                  >
                                    <RiDeleteBin6Line
                                      size={18}
                                      className="pl-1"
                                    />
                                    حذف{" "}
                                  </button>
                                  <Link to={`/edit-estate/${item.ID}`}>
                                    <button
                                      type="button"
                                      className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                                    >
                                      <RiEdit2Line size={18} className="pl-1" />
                                      ویرایش
                                    </button>
                                  </Link>
                                </>
                              ) : (
                                ""
                              )}

                              {item.post_author == userId &&
                              !userRole.administrator ? (
                                <>
                                  <button
                                    onClick={() => {
                                      deleteState(item.ID, item.post_title);
                                    }}
                                    type="button"
                                    className="bg-red-500 p-2 flex items-start  rounded-md text-white text-sm "
                                  >
                                    <RiDeleteBin6Line
                                      size={18}
                                      className="pl-1"
                                    />
                                    حذف{" "}
                                  </button>
                                  <Link to={`/edit-estate/${item.ID}`}>
                                    <button
                                      type="button"
                                      className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                                    >
                                      <RiEdit2Line size={18} className="pl-1" />
                                      ویرایش
                                    </button>
                                  </Link>
                                </>
                              ) : (
                                ""
                              )}
                              <Link to={`/EstateDetails/${item.ID}`}>
                                <button
                                  type="button"
                                  className="bg-green-600 p-2 flex items-center  rounded-md text-white text-sm"
                                >
                                  <RiReplyAllLine size={18} className="pl-1" />
                                  جزئیات
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {!showFilteredState && (
                <div className="col-span-12 mt-10">
                  <ReactPaginate
                    containerClassName="flex justify-center items-center mt-8 mb-4"
                    pageClassName="block text-white !rounded-full border border-solid border-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-2"
                    activeClassName="bg-white !text-sky-600 border-sky-600 !border-2 text-palette-light !rounded-full   hover:bg-palette-dark"
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={getPageCount}
                    previousLabel={null}
                    nextLabel={null}
                    renderOnZeroPageCount={null}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserEstate;
