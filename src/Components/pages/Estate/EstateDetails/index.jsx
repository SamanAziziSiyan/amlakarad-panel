import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../../../server/service";
import {
  formatNumber,
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
} from "../../../helper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { RiCalendarCheckFill, RiEdit2Line } from "react-icons/ri";
import { GiElevator } from "react-icons/gi";
import { FaParking, FaSignOutAlt } from "react-icons/fa";

import Layout from "../../../Layout";
import { ClipLoader } from "react-spinners";
import moment from "jalali-moment";

const EstateDetails = () => {
  const navigate = useNavigate();
  const { stateId } = useParams();
  const [stateData, setStateData] = useState({});
  const [videoSrc, setVideoSrc] = useState("");
  const [userId, setUSerId] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [stateAuthor, setStateAuthor] = useState("");

  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    let userData = getUserDataOnLocalStorage();
    setUserRole(userData.role);
    setUSerId(userData.ID);
    window.scrollTo(0, 0);
    const token = getToken();
    service.states
      .getState(token, stateId)
      .then((data) => {
        if (data.data.length == 0) {
          navigate("/404");
        }
        if (data.data[0].img != 0) {
          data.data[0].img.map((item) => {
            if (item.img.search(".mp4") != -1) {
              setVideoSrc(item);
            }
          });
        } else {
          setVideoSrc("");
        }
        setStateData(data.data[0]);
        setShowLoading(false);
        service.personnel
          .getUser(token, data.data[0].post_author)
          .then((data) => {
            setStateAuthor(data.data.name);
          })
          .catch((err) => {
            toastAlert("سرور مشغول است");
          });
      })
      .catch((err) => {
        if (err.response.status == 404) {
          navigate("/404");
        }
        setShowLoading(false);
      });
  }, []);
  return (
    <>
      <Layout>
        <div className="w-full text-center m-auto mt-20">
          <div className="   grid grid-cols-12  lg:gap-10 px-4 justify-center items-center">
            <div className="col-span-12 xl:col-span-12 relative ">
              <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>
              <div className="w-full relative !pb-[100px] h-auto bg-white/5 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
                <div className="flex items-center justify-between gap-4 max-lg:flex-wrap"></div>
                <div className="w-full h-auto ">
                  {showLoading && (
                    <div className="flex-col mt-6 flex justify-center items-center  m-auto font-medium rounded-xl   ">
                      <ClipLoader size={70} color="#fff" />
                      <span className="text-white mt-6">
                        درحال بارگزاری اطلاعات
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-9 max-lg:col-span-12">
                      <Swiper
                        rewind={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                      >
                        {stateData.img != 0 ? (
                          stateData.img?.map((item, index) => (
                            <SwiperSlide>
                              <img
                                className="!w-full !h-[400px] rounded-lg"
                                src={item.img}
                                alt=""
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          <SwiperSlide>
                            <img
                              className="!w-full !h-[400px] rounded-lg"
                              src="/assets/images/default-state-image.png"
                              alt=""
                            />
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>
                    <div className="col-span-3  max-lg:col-span-12  h-full rounded-lg py-2  px-1 flex flex-col gap-4">
                      {userRole.administrator ||
                      userRole.karmand ||
                      stateData.post_author == userId ? (
                        <>
                          <div className="w-full bg-white h-auto rounded-[5px]   flex items-center justify-center">
                            <span>نام مالک :{stateData.name}</span>
                          </div>
                          <div className="w-full bg-white rounded-[5px] h-auto p-2 flex items-center justify-center">
                            <span>
                              {" "}
                              شماره تماس مالک:
                              {stateData.mobile}{" "}
                            </span>
                          </div>
                          <div className="w-full bg-white rounded-[5px] h-auto p-2 flex items-center justify-center">
                            <span>آدرس ملک :{stateData.address} </span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      {stateData.moamele == "خرید و فروش" ? (
                        <>
                          <div className="w-full bg-white rounded-[5px] h-auto p-2 flex items-center justify-center">
                            <span>
                              قیمت کل :{formatNumber(stateData["price-kol"])}{" "}
                              <span className="text-xs">تومان</span>
                            </span>
                          </div>
                          <div className="w-full bg-white rounded-[5px] h-auto p-2 flex items-center justify-center">
                            <span>
                              قیمت متری :
                              {formatNumber(stateData["price-meteri"])}{" "}
                              <span className="text-xs">تومان</span>
                            </span>
                          </div>
                        </>
                      ) : stateData.moamele == "رهن و اجاره" ? (
                        <>
                          <div className="w-full bg-white rounded-[5px] h-auto p-2 flex items-center justify-center">
                            <span>
                              قیمت رهن :{formatNumber(stateData["price-rahn"])}
                              <span className="text-xs">تومان</span>
                            </span>
                          </div>
                          <div className="w-full bg-white rounded-[5px] h-auto p-2 flex items-center justify-center">
                            <span>
                              قیمت اجاره :
                              {formatNumber(stateData["price-ejare"])}
                              <span className="text-xs">تومان</span>
                            </span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div className="w-full bg-white rounded-[5px] h-auto p-2 flex items-center justify-center">
                        <span>شهر :{stateData.ostan} </span>
                      </div>
                      <div className="w-full bg-white rounded-[5px] h-auto p-2 flex items-center justify-center">
                        <span>منطقه :{stateData.shahr} </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 mt-10">
                    <div className="   rounded-[5px] items-end max-lg:flex-col max-lg:items-center flex justify-between bg-white   col-span-12  w-full p-3">
                      <h2 className="mb-2 flex max-lg:text-lg items-end gap-4 max-lg:flex-col max-lg:items-center text-right relative text-gray-900 text-[25px]  ">
                        <div>
                          <div className="flex items-center">
                            <RiCalendarCheckFill className="text-center text-gray-400 text-md" />
                            <p className="mt-1 mr-1 text-center text-gray-400 text-sm">
                              {moment(stateData.post_date)
                                .locale("fa")
                                .fromNow()}
                            </p>
                          </div>
                          {stateData.post_title}
                        </div>
                        <div className="flex gap-4 max-lg:flex-col">
                          {stateData.post_status == "expired" ? (
                            <div className="flex items-center gap-4 justify-center">
                              <button className="   bg-[#e01e36]  p-2 text-xs text-white   rounded-md">
                                منقضی شده{" "}
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                          {stateData.post_status == "pending" ? (
                            <div className="flex items-center gap-4 justify-center">
                              <button className="    bg-orange-300 p-2 text-xs text-white   rounded-md">
                                در انتظار بررسی{" "}
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                          {stateData.post_status == "publish" ? (
                            <div className="flex items-center gap-4 justify-center">
                              <button className="    bg-green-400 p-2 text-xs text-white   rounded-md">
                                منتشر شده{" "}
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                          {stateData.post_status == "trash" ? (
                            <div className="flex items-center gap-4 justify-center">
                              <button className="    bg-[#e01e36] p-2 text-xs text-white   rounded-md">
                                زباله دان{" "}
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                          {stateData.post_status == "draft" ? (
                            <div className="flex items-center gap-4 justify-center">
                              <button className="  bg-[#0369A1] p-2 text-xs text-white   rounded-md">
                                پیش نویس{" "}
                              </button>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="flex items-center gap-4 justify-center">
                            <button className="   bg-purple-600  p-2 text-xs text-white   rounded-md">
                              {stateAuthor}
                            </button>
                          </div>
                        </div>
                      </h2>

                      <div className="flex gap-2 pb-4 max-[425px]:flex-col ">
                        {stateData.fast == "1" ? (
                          <div className="flex items-center gap-2 justify-center">
                            <button className="   bg-[#e01e36]  p-2 text-xs text-white   rounded-md">
                              فوری{" "}
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                        {stateData.special == "1" ? (
                          <div className="flex items-center gap-4 justify-center">
                            <button className="bg-[#ffca28] p-2 text-xs text-white   rounded-md">
                              ویژه
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 justify-center">
                            <button className="bg-sky-600 p-2 text-xs text-white   rounded-md">
                              عادی{" "}
                            </button>
                          </div>
                        )}

                        {stateData.shahraki == "1" ? (
                          <div className="flex items-center gap-2 justify-center">
                            <button className="   bg-[#e01e36]  p-2 text-xs text-white   rounded-md">
                              شهرکی
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                        {stateData.saheli == "1" ? (
                          <div className="flex items-center gap-4 justify-center">
                            <button className="bg-sky-600 p-2 text-xs text-white   rounded-md">
                              ساحلی
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 justify-center">
                            <button className="bg-sky-600 p-2 text-xs text-white   rounded-md">
                              کوهپایه
                            </button>
                          </div>
                        )}

                        <div className="flex items-center ">
                          {userRole.administrator || userId == stateData.post_author ?(
                            <div className="flex items-center gap-4 justify-center">
                              <Link to={`/edit-estate/${stateData.ID}`}>
                                <button
                                  type="button"
                                  className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                                >
                                  <RiEdit2Line size={18} className="pl-1" />
                                  ویرایش
                                </button>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 mt-10">
                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">کد آگهی</span>
                      <hr className="px-12" />
                      <span className="mt-3">{stateData.ID}</span>
                    </div>
                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">متراژ</span>
                      <hr className="px-12" />
                      <span className="mt-3">{stateData.metrazh}</span>
                    </div>
                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">جهت</span>
                      <hr className="px-12" />
                      <span className="mt-3">
                        {stateData.mg != 0
                          ? stateData.mg?.map((item, index) => item + " - ")
                          : ""}
                      </span>
                    </div>
                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">نوع معامله</span>
                      <hr className="px-12" />
                      <span className="mt-3">{stateData.moamele}</span>
                    </div>{" "}
                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">نوع کاربری</span>
                      <hr className="px-12" />
                      <span className="mt-3">{stateData.karbari}</span>
                    </div>
                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-12 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">نوع ملک</span>
                      <hr className="px-12" />
                      <span className="mt-3">{stateData.melk}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start mt-10 ">
                    <h2 className="  mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white mb-6 ">
                      توضیحات{" "}
                    </h2>
                    <div className="grid grid-cols-12 gap-5 w-full ">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: stateData.post_content,
                        }}
                        className="text-justify text-white col-span-7 max-lg:col-span-12"
                      ></div>
                      <div className="col-span-5 max-lg:col-span-12">
                        {videoSrc != "" ? (
                          <video
                            src={videoSrc.img}
                            controls
                            className="w-full rounded-xl"
                          ></video>
                        ) : (
                          <button className="bg-sky-500 p-5 text-white rounded-md">
                            این ملک ویدیو ندارد
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start mt-10 ">
                    <h2 className="  mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white mb-6 ">
                      مشخصات املاک{" "}
                    </h2>
                    <div className="grid grid-cols-12 w-full gap-2 ">
                      {stateData.moamele == "خرید و فروش" ? (
                        <>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">نوع سند</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.sanad} </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">قیمت کل</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {formatNumber(stateData["price-kol"])}{" "}
                                  <span className="text-xs">تومان</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">قیمت متری</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {formatNumber(stateData["price-meteri"])}{" "}
                                  <span className="text-xs">تومان</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">پیش فروش</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {stateData.pishforosh == "0"
                                    ? "ندارد"
                                    : "دارد"}{" "}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">قیمت متری</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {formatNumber(stateData["price-meteri"])}{" "}
                                  <span className="text-xs">تومان</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">پیش فروش</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {stateData.pishforosh == "0"
                                    ? "ندارد"
                                    : "دارد"}{" "}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تحویل</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {stateData.tahvil == ""
                                    ? "-"
                                    : stateData.tahvil}{" "}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">مشارکت</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {stateData.mosharekat == "0"
                                    ? "ندارد"
                                    : "دارد"}{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : stateData.moamele == "رهن و اجاره" ? (
                        <>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">قیمت رهن</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {formatNumber(stateData["price-rahn"])}
                                  <span className="text-xs">تومان</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">قیمت اجاره</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {formatNumber(stateData["price-ejare"])}
                                  <span className="text-xs">تومان</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">قابلیت تبدیل</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {stateData.tabdil == "0"
                                    ? "ندارد"
                                    : "دارد"}{" "}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد نفرات</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.nafarat}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">امکان اجاره به</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.tahol}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">حیوانات خانگی</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.Pets}</span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">دربست</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.darbast}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">نوع معامله</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.moamele}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : stateData.moamele == "اجاره روزانه" ? (
                        <>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">اجاره شبی</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["price-shabi"]} </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">
                                  اجاره شبی روزهای تعطیل
                                </span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["price-tatilat"]} </span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">دربست</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.darbast}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد نفرات</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.nafarat}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">امکان اجاره به</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.tahol}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">حیوانات خانگی</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.Pets}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      {stateData.melk == "آپارتمان" ? (
                        <>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">طبقه چندم</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.tabaghe} </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد طبقات</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["tedad-tabaghat"]} </span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">
                                  تعداد واحد در هر طبقه{" "}
                                </span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {stateData["tedad-vahed-har-tabaghe"]}{" "}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد واحد کل</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["tedad-vahed-kol"]}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد اتاق</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.otagh}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد حمام</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["num-hamam"]}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد دستشویی</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["num-wc"]}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">سن بنا</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.senbana}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">نما </span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.nama}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">کابینت</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.kabinet}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">کفپوش</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.kafposh}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : stateData.melk == "خانه و ویلا" ? (
                        <>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">مساحت زمین</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["masahat-zamin"]} </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد طبقات</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["tedad-tabaghat"]} </span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد واحد کل </span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["tedad-vahed-kol"]} </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">سکونت</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.sokonat}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد اتاق</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.otagh}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد حمام</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["num-hamam"]}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد دستشویی</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["num-wc"]}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">سن بنا</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.senbana}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">نما </span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.nama}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">کابینت</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.kabinet}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">کفپوش</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.kafposh}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : stateData.melk == "اداری و تجاری" ? (
                        <>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد واحد هر طبقه</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {stateData["tedad-vahed-har-tabaghe"]}{" "}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد طبقات</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["tedad-tabaghat"]} </span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد واحد کل </span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["tedad-vahed-kol"]} </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">کفپوش</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.kafposh}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد اتاق</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.otagh}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد حمام</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["num-hamam"]}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">تعداد دستشویی</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["num-wc"]}</span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">سن بنا</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.senbana}</span>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">نما </span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData.nama}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : stateData.melk == "زمین و کلنگی" ? (
                        ""
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start mt-10 ">
                    <h2 className="  mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white mb-6 ">
                      سایر امکانات{" "}
                    </h2>
                    <div className="grid grid-cols-12 w-full  gap-4">
                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <GiElevator size={24} />
                        <span className="text-lg mr-4">
                          آسانسور :{" "}
                          {stateData.asansor == "0" ? "ندارد" : "دارد"}
                        </span>
                      </div>
                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <FaParking size={24} />
                        <span className="text-lg mr-4">
                          پارکینگ :{" "}
                          {stateData.parking == "0" ? "ندارد" : "دارد"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start mt-10 ">
                    <h2 className="  mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white mb-6 ">
                      دیگر امکانات{" "}
                    </h2>

                    <div className=" bg-transparent h-10 flex flex-wrap items-center text-white ">
                      {stateData["sayer-emkanat"] != 0
                        ? stateData["sayer-emkanat"]?.map((item, index) => (
                            <span className="text-lg mr-4">{item + " - "}</span>
                          ))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EstateDetails;
