import { FaShower } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import config from "../../../../server/config.json";
import {
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
} from "../../../helper";
import service from "../../../../server/service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RiDeleteBin6Line, RiEdit2Line, RiReplyAllLine } from "react-icons/ri";

const SearchEstate = () => {
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let userData = getUserDataOnLocalStorage();
    if (!userData.role.administrator) return navigate("/");
    let userToken = getToken();
    // service.states
    //   .filterStates(
    //     {
    //       from: 1,
    //       to: 1000000,
    //     },
    //     userToken
    //   )
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    if (userData.role.administrator) {
      service.states
        .getStates()
        .then(async (data) => {
          for await (const state of data.data) {
            await service.states
              .getStateImage(state.ID, userToken)
              .then((data) => {
                let stateItem = { imageSrc: "", item: {} };
                if (data.data[0]) {
                  stateItem.imageSrc = data.data[0].media_details.file;
                  stateItem.item = state;
                } else {
                  stateItem.imageSrc = "";
                  stateItem.item = state;
                }
                setStates((states) => [...states, stateItem]);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          // data.data.map(async (item) => {

          // });
        })
        .catch((err) => {
          navigate("/");
          toastAlert("سرور مشغول است");
        });
    }
  }, []);
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
            let filteredStates = states.filter((item) => item.id != stateId);
            setStates(filteredStates);
          })
          .catch((err) => {
            console.log(err);
            toastAlert("سرور مشغول است");
          });
        Swal.fire("حذف شد!", "ملک مورد نظر حذف شد", "success");
      }
    });
  };
  return (
    <>
      <div className="w-full text-center m-auto mt-20">
        <div className=" bg-white/5 grid grid-cols-12  lg:gap-10 px-2 justify-center items-center">
          <div className="col-span-12 xl:col-span-12 relative ">
            <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
            <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
            <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>

            <div className="w-full relative  h-auto bg-white/5 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
              <div className="flex items-center justify-between gap-4 max-lg:flex-wrap">
                <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3 text-white block">
                      نوع معامله
                    </label>
                    <select
                      id="area"
                      name="area"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option>انتخاب کنید</option>
                      <option>خرید و فروش</option>
                      <option>رهن و اجاره</option>
                      <option>اجاره روزانه</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3 text-white block">
                      نوع ملک
                    </label>
                    <select
                      id="area"
                      name="area"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option>انتخاب کنید</option>
                      <option>آپارتمان</option>
                      <option>خانه و ویلا</option>
                      <option>زمین و کلنگی</option>
                      <option>اداری و تجاری</option>
                    </select>
                  </div>
                </div>

                <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3  text-white block">
                      نوع نمایش قیمت
                    </label>
                    <select
                      id="area"
                      name="area"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option> انتخاب کنید</option>
                      <option>توافقی</option>
                      <option>تماس بگیرید</option>
                    </select>
                  </div>
                  <div className="w-full relative">
                    <label htmlFor="area" className="mb-3 text-white block">
                      منطقه
                    </label>
                    <input
                      id="area"
                      name="area"
                      type="text"
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-auto ">
                <div className="grid grid-cols-12 gap-4 px-2 mt-10">
                  {states.map((item) => (
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 cursor-pointer   h-auto bg-white  backdrop-blur-md rounded-2xl">
                      <div className="flex flex-col  pb-4 relative">
                        <button className=" absolute top-[2%] right-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                          ویژه
                        </button>

                        <img
                          src={`${
                            item.imageSrc != ""
                              ? config.uploadUrl + item.imageSrc
                              : "/assets/images/default-state-image.png"
                          }
                           `}
                          className="w-full rounded-md max-h-[264px] min-h-[264px]"
                        />
                        <div className="flex items-center justify-between w-full px-2 mt-2">
                          <p className="mt-3 text-center text-gray-400 text-sm">
                            {item.item.post_date}
                          </p>
                          <button className="bg-[#ffca28] p-1 text-xs text-gray-600 px-3 rounded-md">
                            ویژه
                          </button>
                        </div>
                        <p className="mt-3 text-center text-[#0c0a5a] ">
                          {item.item.post_title}
                        </p>

                        <div className=" items-center gap-10 mt-4 justify-center bg-[#fafafa] p-2 flex-wrap  ">
                          <div className="flex mt-3">
                            <FaShower color="#0c0a5a" />
                            <span className="mr-2 text-sm ">
                              آسانسور
                              {item.item.asansor}
                            </span>
                          </div>

                          <div className="flex mt-3">
                            <FaShower color="#0c0a5a" />
                            <span className="mr-2 text-sm ">
                              نوع کاربری
                              {item.item.karbari}
                            </span>
                          </div>

                          <div className="flex mt-3">
                            <FaShower color="#0c0a5a" />
                            <span className="mr-2 text-sm ">
                              پارکینگ {item.item.parking}
                            </span>
                          </div>

                          <div className="flex mt-3">
                            <FaShower color="#0c0a5a" />
                            <span className="mr-2 text-sm ">
                              متراژ {item.item.metrazh}
                            </span>
                          </div>

                          <div className="flex mt-3">
                            <FaShower color="#0c0a5a" />
                            <span className="mr-2 text-sm ">
                              نوع ملک
                              {item.item.melk}
                            </span>
                          </div>

                          <div className="flex mt-3">
                            <FaShower color="#0c0a5a" />
                            <span className="mr-2 text-sm ">
                              معامله {item.item.moamele}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 justify-center">
                          <button
                            onClick={() => {
                              deleteState(item.item.id, item.item.post_title);
                            }}
                            type="button"
                            className="bg-red-500 p-2 flex items-start  rounded-md text-white text-sm "
                          >
                            <RiDeleteBin6Line size={18} className="pl-1" />
                            حذف{" "}
                          </button>

                          <button
                            type="button"
                            className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                          >
                            <RiEdit2Line size={18} className="pl-1" />
                            ویرایش
                          </button>
                          <button
                            type="button"
                            className="bg-green-600 p-2 flex items-center  rounded-md text-white text-sm"
                          >
                            <RiReplyAllLine size={18} className="pl-1" />
                            جزئیات
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchEstate;
