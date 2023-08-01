import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../../../server/service";
import { getToken } from "../../../helper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { RiEdit2Line } from "react-icons/ri";
import { GiElevator } from "react-icons/gi";
import { FaParking, FaSignOutAlt } from "react-icons/fa";

import Layout from "../../../Layout";

const EstateDetails = () => {
  const { stateId } = useParams();
  const [stateData, setStateData] = useState({});
  useEffect(() => {
    const token = getToken();
    service.states
      .getState(token, stateId)
      .then((data) => {
        console.log(data);
        setStateData(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
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
                    <div className="col-span-3  max-lg:col-span-12 bg-white h-full rounded-lg py-4  px-2 flex flex-col gap-6">
                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>نام مالک :{stateData.name}</span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>
                          {" "}
                          شماره تماس مالک:
                          {stateData.mobile}{" "}
                        </span>
                      </div>

                      {stateData.moamele == "خرید و فروش" ? (
                        <>
                          <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                            <span>قیمت کل :{stateData["price-kol"]}</span>
                          </div>
                          <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                            <span>قیمت متری :{stateData["price-metri"]}</span>
                          </div>
                        </>
                      ) : stateData.moamele == "رهن و اجاره" ? (
                        <>
                          <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                            <span>قیمت رهن :{stateData["price-rahn"]}</span>
                          </div>
                          <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                            <span>قیمت اجاره :{stateData["price-ejare"]}</span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>آدرس ملک :{stateData.address} </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 mt-10">
                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col  col-span-12 md:col-span-10 lg:col-span-10 w-full p-3 bg-white">
                      <h2 className="mb-2 text-right relative text-[25px]">
                        {stateData.post_title}
                      </h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 mt-10">
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
                      <span className="mb-2 text-[25px]">سال ساخت</span>
                      <hr className="px-12" />
                      <span className="mt-3">1000</span>
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
                    <p className="w-full text-justify text-white">
                      {stateData.post_content}
                    </p>
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
                                <span> {stateData["price-kol"]} </span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-6 gap-4 max-lg:col-span-12">
                            <div className="flex items-center w-full gap-4 mb-4  ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">قیمت متری</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["price-metri"]} </span>
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
                                <span className="text">امکان معاوضه</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span>
                                  {" "}
                                  {stateData.moaveze == "0"
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
                                <span> {stateData["price-rahn"]} </span>
                              </div>
                            </div>
                            <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                              <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                                <span className="text">قیمت اجاره</span>
                              </div>
                              <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                                <span> {stateData["price-ejare"]} </span>
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
                          آسانسور : {stateData.asansor}
                        </span>
                      </div>
                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <FaParking size={24} />
                        <span className="text-lg mr-4">
                          پارکینگ : {stateData.parking}
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
