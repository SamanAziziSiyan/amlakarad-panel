import { useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../../../../server/service";
import { getToken } from "../../../helper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
const EstateDetails = () => {
  const { stateId } = useParams();
  useEffect(() => {
    const token = getToken();
    service.states
      .getState(token, stateId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <div className="w-full text-center m-auto mt-20">
        <div className=" bg-white/5 grid grid-cols-12  lg:gap-10 px-2 justify-center items-center">
          <div className="col-span-12 xl:col-span-12 relative ">
            <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
            <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
            <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>
            <div className="w-full relative  h-auto bg-white/5 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
              <div className="flex items-center justify-between gap-4 max-lg:flex-wrap"></div>
              <div className="w-full h-auto ">
                <Swiper
                  rewind={true}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      className="!w-full !h-[400px]"
                      src="https://swiperjs.com/demos/images/nature-2.jpg"
                      alt=""
                    />
                  </SwiperSlide>
                  <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide>
                </Swiper>
                <div className="grid grid-cols-12 gap-4">
                  <div className="border shadow shadow-sky-300 rounded-[5px] flex flex-col items-center col-span-1 md:col-span-6 lg:col-span-2 w-full p-3 bg-white">
                    <span className="mb-2 text-[25px]">متراژ</span>
                    <hr className="px-12" />
                    <span className="mt-3">1000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstateDetails;
