import { FaRulerCombined, FaShower } from "react-icons/fa6";
import { FaParking, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import config from "../../../../server/config.json";
import {
  getToken,
  getUserDataOnLocalStorage,
  toastAlert,
} from "../../../helper";
import service from "../../../../server/service";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  RiCalendarCheckFill,
  RiDeleteBin6Line,
  RiEdit2Line,
  RiReplyAllLine,
  RiSearch2Fill,
} from "react-icons/ri";
import { AiFillFilter } from "react-icons/ai";
import { GiElevator } from "react-icons/gi";
import { FaHospitalUser } from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { BsInfoCircleFill } from "react-icons/bs";
import moment from "jalali-moment";
import Layout from "../../../Layout";
const SearchEstate = () => {
  const [states, setStates] = useState([]);
  const [empty, showEmpty] = useState(false);
  const [FilteredState, setFilteredState] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let userData = getUserDataOnLocalStorage();
    if (userData.role.karbar) return navigate("/");
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
        .getStates(userToken)
        .then(async (data) => {
          let stateItems = [];
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
                stateItems.push(stateItem);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          if (stateItems.length == 0) {
            showEmpty(true);
          }
          stateItems.map((item) => {
            setStates(stateItems);
          });
        })
        .catch((err) => {
          navigate("/");
          toastAlert("سرور مشغول است");
        });
    } else {
      service.states
        .getAutherStates(userData.ID, userToken)
        .then(async (data) => {
          let stateItems = [];
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
                stateItems.push(stateItem);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          if (stateItems.length == 0) {
            showEmpty(true);
          }
          stateItems.map((item) => {
            console.log(item);
            setStates(stateItems);
          });
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
            let filteredStates = states.filter((item) => item.ID != stateId);
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
  const filterState = (values) => {
    setShowLoading(true);
    let userToken = getToken();
    let stateData = {
      moamele: "خرید و فروش",
    };
    console.log(stateData);
    service.states
      .filterStates(userToken, stateData)
      .then((data) => {
        console.log(data);
        setShowLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
  };
  return (
    <>
      <Layout>
        <div className="w-full text-center m-auto mt-20">
          <div className=" bg-white/5 grid grid-cols-12  lg:gap-10 px-2 justify-center items-center">
            <div className="col-span-12 xl:col-span-12 relative ">
              <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>

              <div className="w-full relative  h-auto bg-white/5 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
                <form
                  className="bg-white p-5 rounded-md text-black shadow shadow-sky-500"
                  onSubmit={(values) => {
                    filterState(values);
                  }}
                >
                  <div className="flex items-center justify-between gap-4 max-lg:flex-wrap">
                    <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
                      <div className="w-full">
                        <label htmlFor="area" className="mb-3 block">
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
                        <label htmlFor="area" className="mb-3 block">
                          کاربری
                        </label>
                        <select
                          id="karbari"
                          name="karbari"
                          as="select"
                          className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                        >
                          <option value={0}>انتخاب کنید</option>
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
                        <label htmlFor="area" className="mb-3 block">
                          منطقه
                        </label>
                        <div className="relative">
                          <input
                            id="area"
                            name="area"
                            type="text"
                            className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
                      <div className="w-full">
                        <label htmlFor="area" className="mb-3 block">
                          قیمت
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            id="vol"
                            name="vol"
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                      <div className="w-full relative">
                        <label htmlFor="area" className="mb-3 block">
                          متراژ
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            id="vol"
                            name="vol"
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="bg-sky-500 p-2 flex items-start  rounded-md text-white text-sm "
                    >
                      <AiFillFilter size={18} className="pl-1" />
                      فیلتر{" "}
                    </button>
                  </div>
                </form>
                <div className="w-full h-auto ">
                  <div className="grid grid-cols-12 gap-4 px-2 mt-10">
                    {empty == true ? (
                      <div className="w-full col-span-12 bg-sky-500 rounded-md p-5">
                        <h1 className="text-white flex items-center justify-between text-[22px] w-full text-center">
                          هنوز ملکی ثبت نکرده اید
                          <span>
                            <BsInfoCircleFill
                              className="justify-center items-center"
                              color={"#fff"}
                            />
                          </span>
                        </h1>
                      </div>
                    ) : (
                      states.map((item, index) => (
                        <div
                          key={index}
                          className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 cursor-pointer   h-auto bg-white  backdrop-blur-md rounded-2xl"
                        >
                          <div className="flex flex-col  pb-4 relative">
                            {item.item.fast == "1" ? (
                              <button className=" absolute top-[2%] right-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                فوری{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.item.post_status == "expired" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                منقضی شده{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.item.post_status == "pending" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-orange-300 p-1 text-xs text-white   px-3 rounded-md">
                                در انتظار بررسی{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.item.post_status == "publish" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-green-400 p-1 text-xs text-white   px-3 rounded-md">
                                منتشر شده{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.item.post_status == "trash" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#e01e36] p-1 text-xs text-white   px-3 rounded-md">
                                زباله دان{" "}
                              </button>
                            ) : (
                              ""
                            )}
                            {item.item.post_status == "draft" ? (
                              <button className=" absolute top-[2%] left-[5%] bg-[#0369A1] p-1 text-xs text-white   px-3 rounded-md">
                                پیش نویس{" "}
                              </button>
                            ) : (
                              ""
                            )}

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
                              <div className="flex items-center">
                                <RiCalendarCheckFill className="text-center text-gray-400 text-md" />
                                <p className="mt-1 mr-1 text-center text-gray-400 text-sm">
                                  {moment(item.item.post_date)
                                    .locale("fa")
                                    .format("DDD") + " روز پیش"}
                                </p>
                              </div>
                              {item.item.special == "1" ? (
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
                              {item.item.post_title}
                            </p>

                            <div className=" items-center gap-10 mt-4 justify-center bg-[#fafafa] p-2 flex-wrap  ">
                              <div className="flex mt-3">
                                <GiElevator
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  آسانسور : {item.item.asansor}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <FaHospitalUser
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع کاربری : {item.item.karbari}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <FaParking
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  پارکینگ : {item.item.parking}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <FaRulerCombined
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  متراژ : {item.item.metrazh}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <MdRealEstateAgent
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع ملک : {item.item.melk}
                                </span>
                              </div>

                              <div className="flex mt-3">
                                <GrTransaction
                                  size={19}
                                  className="text-gray-600"
                                />
                                <span className="mr-2 text-sm ">
                                  نوع معامله : {item.item.moamele}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4 justify-center">
                              <button
                                onClick={() => {
                                  deleteState(
                                    item.item.ID,
                                    item.item.post_title
                                  );
                                }}
                                type="button"
                                className="bg-red-500 p-2 flex items-start  rounded-md text-white text-sm "
                              >
                                <RiDeleteBin6Line size={18} className="pl-1" />
                                حذف{" "}
                              </button>
                              <Link to={`/edit-estate/${item.item.ID}`}>
                                <button
                                  type="button"
                                  className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                                >
                                  <RiEdit2Line size={18} className="pl-1" />
                                  ویرایش
                                </button>
                              </Link>
                              <Link to={`/EstateDetails/${item.item.ID}`}>
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
                    )}
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

export default SearchEstate;
