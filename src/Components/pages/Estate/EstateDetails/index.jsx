import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../../../server/service";
import { getToken } from "../../../helper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { RiEdit2Line } from "react-icons/ri";
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
        setStateData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <Layout>
        <div className="w-full text-center m-auto mt-20">
          <div className="   grid grid-cols-12  lg:gap-10 px-4 justify-center items-center">
            <div className="col-span-12 xl:col-span-12 relative ">
              <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>
              <div className="w-full relative  h-auto bg-white/5 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
                <div className="flex items-center justify-between gap-4 max-lg:flex-wrap"></div>
                <div className="w-full h-auto ">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-10 max-lg:col-span-12">
                      <Swiper
                        rewind={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                      >
                        <SwiperSlide>
                          <img
                            className="!w-full !h-[400px] rounded-lg"
                            src="https://swiperjs.com/demos/images/nature-2.jpg"
                            alt=""
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            className="!w-full !h-[400px] rounded-lg"
                            src="https://swiperjs.com/demos/images/nature-2.jpg"
                            alt=""
                          />
                        </SwiperSlide>

                        <SwiperSlide>
                          <img
                            className="!w-full !h-[400px] rounded-lg"
                            src="https://swiperjs.com/demos/images/nature-2.jpg"
                            alt=""
                          />
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <div className="col-span-2  max-lg:col-span-12 bg-white h-full rounded-lg py-4  px-2 flex flex-col gap-6">
                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>نام مالک : سلیمان نادری </span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>نام مالک : سلیمان نادری </span>
                      </div>

                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>نام مالک : سلیمان نادری </span>
                      </div>

                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>نام مالک : سلیمان نادری </span>
                      </div>

                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>نام مالک : سلیمان نادری </span>
                      </div>

                      <div className="w-full bg-purple-200 rounded-[5px] h-10 flex items-center justify-center">
                        <span>نام مالک : سلیمان نادری </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 mt-10">
                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-1 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">متراژ</span>
                      <hr className="px-12" />
                      <span className="mt-3">1000</span>
                    </div>

                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-1 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">متراژ</span>
                      <hr className="px-12" />
                      <span className="mt-3">1000</span>
                    </div>

                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-1 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">متراژ</span>
                      <hr className="px-12" />
                      <span className="mt-3">1000</span>
                    </div>

                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-1 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">متراژ</span>
                      <hr className="px-12" />
                      <span className="mt-3">1000</span>
                    </div>

                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-1 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">متراژ</span>
                      <hr className="px-12" />
                      <span className="mt-3">1000</span>
                    </div>

                    <div className="border shadow shadow-gray-300 hover:scale-[1.02]  rounded-[5px] flex flex-col items-center col-span-1 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                      <span className="mb-2 text-[25px]">متراژ</span>
                      <hr className="px-12" />
                      <span className="mt-3">1000</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start mt-10 ">
                    <h3 className="  mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white mb-6 ">
                      توضیحات{" "}
                    </h3>
                    <p className="w-5/6 text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repellendus quidem dignissimos eligendi reprehenderit,
                      inventore iste vitae illum saepe, id, nesciunt repudiandae
                      ab. Aut earum natus labore magnam repellat fuga
                      voluptates.
                    </p>
                  </div>

                  <div className="flex flex-col items-start mt-10 ">
                    <h3 className="  mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white mb-6 ">
                      مشخصات املاک{" "}
                    </h3>
                    <div className="grid grid-cols-12 w-full gap-2 ">
                      <div className=" col-span-6 gap-4 max-lg:col-span-12">
                        <div className="flex items-center w-full gap-4 mb-4  ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                        <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                      </div>
                      <div className=" col-span-6 gap-4 max-lg:col-span-12">
                        <div className="flex items-center w-full gap-4 mb-4  ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                        <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                      </div>

                      <div className=" col-span-6 gap-4 max-lg:col-span-12">
                        <div className="flex items-center w-full gap-4 mb-4  ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                        <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                      </div>
                      <div className=" col-span-6 gap-4 max-lg:col-span-12">
                        <div className="flex items-center w-full gap-4 mb-4  ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                        <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                      </div>

                      <div className=" col-span-6 gap-4 max-lg:col-span-12">
                        <div className="flex items-center w-full gap-4 mb-4  ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                        <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                      </div>
                      <div className=" col-span-6 gap-4 max-lg:col-span-12">
                        <div className="flex items-center w-full gap-4 mb-4  ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                        <div className="flex items-center w-full gap-4 col-span-6  mb-4    ">
                          <div className="w-full h-10 rounded-md flex bg-gray-400 items-center justify-center  border border-gray-100 ">
                            <span className="text">نوع سند</span>
                          </div>
                          <div className="w-full h-10 rounded-md flex bg-white  items-center justify-center  border border-gray-100 ">
                            <span> عادی </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start mt-10 ">
                    <h3 className="  mt-4 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white mb-6 ">
                      سایر امکانات{" "}
                    </h3>
                    <div className="grid grid-cols-12 w-full  gap-4">
                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>
                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>
                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>

                      <div className="col-span-6 lg:col-span-2 bg-transparent h-10 flex items-center text-white ">
                        <RiEdit2Line size={24} />
                        <span className="text-lg mr-4">آسانسور</span>
                      </div>
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
