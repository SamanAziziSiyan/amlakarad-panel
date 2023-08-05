import { FaShower } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import service from "../../../server/service";
import {
  getToken,
  getUserDataOnLocalStorage,
  modalStyles,
  toastAlert,
} from "../../helper";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  RiDeleteBin6Line,
  RiEdit2Line,
  RiHomeHeartLine,
  RiReplyAllLine,
} from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";
import ReactPaginate from "react-paginate";

import Layout from "../../Layout";
import moment from "jalali-moment";
import { ClipLoader } from "react-spinners";

const Logger = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const [Logs, setLogs] = useState([]);
  const [filterLog, setFilterLogs] = useState([]);
  const [showFilteredLogs, setShowFilterdLogs] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [getPageCount, setPageCount] = useState(0);
  const handlePageClick = (e) => {
    const newOffset = e.selected * 40;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    let userData = getUserDataOnLocalStorage();

    if (!userData.role.administrator) {
      toastAlert("شما به این بخش دسترسی ندارید");
      navigate("/");
      return;
    }

    let userToken = getToken();
    service.personnel
      .getLogs(userToken)
      .then((data) => {
        console.log(data);
        // if (data.data.status == 403) throw new Error();

        const endOffset = itemOffset + 40;
        const currentLogs = data.data.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(data.data.length / 40);
        setPageCount(pageCount);
        setLogs(currentLogs);
        setShowLoading(false);
      })
      .catch((err) => {
        toastAlert("شما به بخش دسترسی ندارید");
        setShowLoading(false);
      });
  }, [itemOffset]);

  const filterLogs = (value, Type) => {
    setFilterLogs([]);
    setShowFilterdLogs(true);
    if (Type == 1) {
      Logs.map((item) => {
        if (item.action == value) {
          setFilterLogs((log) => [...log, item]);
        }
      });
    } else {
      Logs.map((item) => {
        if (item.object_type == value) {
          setFilterLogs((log) => [...log, item]);
        }
      });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

              <div className="w-full relative  h-auto bg-white/10 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
                <div className="flex items-center w-full justify-between gap-4 max-lg:flex-wrap">
                  <div className="flex items-center w-2/6 justify-start gap-4 flex-wrap w-full">
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        setShowFilterdLogs(false);
                      }}
                    >
                      <span> همه</span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("updated", 1);
                      }}
                    >
                      <span> بروزرسانی</span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("added", 1);
                      }}
                    >
                      <span> افزودن </span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("deleted", 1);
                      }}
                    >
                      <span> حذف شده </span>
                    </button>

                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("created", 1);
                      }}
                    >
                      <span> ساختن</span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("Post", 2);
                      }}
                    >
                      <span> املاک </span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("Attachment", 2);
                      }}
                    >
                      <span> رسانه </span>
                    </button>
                    <button
                      className="bg-transparent  shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("User", 2);
                      }}
                    >
                      <span> کاربران </span>
                    </button>
                  </div>
                </div>
                {showLoading && (
                  <div className="flex-col  mt-6  flex justify-center items-center  m-auto font-medium rounded-xl   ">
                    <ClipLoader size={70} color="#fff" />
                    <span className="text-white mt-6">
                      درحال بارگزاری اطلاعات
                    </span>
                  </div>
                )}

                <div className="flex flex-col">
                  <div className="overflow-x-auto   ">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className=" w-full text-center text-sm font-light">
                          <thead className="border-b bg- font-medium rounded-xl bg-white/20 backdrop-blur-md bg-opacity-50 ">
                            <tr>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                #
                              </th>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                زمان
                              </th>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                کاربر
                              </th>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                آی پی
                              </th>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                نوع
                              </th>

                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                عملیات
                              </th>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                توضیحات
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {showFilteredLogs ? (
                              filterLog.length == 0 ? (
                                <div className="w-full col-span-12 bg-sky-500 rounded-md p-5">
                                  <h1 className="text-white flex items-center justify-between text-[22px] w-full text-center">
                                    گزارشی یافت نشد
                                    <span>
                                      <BsInfoCircleFill
                                        className="justify-center items-center"
                                        color={"#fff"}
                                      />
                                    </span>
                                  </h1>
                                </div>
                              ) : (
                                filterLog.map((item, index) => (
                                  <tr key={index} className="border-b ">
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      {moment
                                        .unix(item.hist_time)
                                        .locale("fa")
                                        .format("MMM/DD")}
                                    </td>
                                    {item.user_id == 0 ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        مهمان
                                      </td>
                                    ) : item.display_name == "" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        {item.user_Name}
                                      </td>
                                    ) : (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        {item.display_name}
                                      </td>
                                    )}
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      {item.hist_ip}
                                    </td>
                                    {item.object_type == "User" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        کاربران
                                      </td>
                                    ) : item.object_type == "Post" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        املاک
                                      </td>
                                    ) : item.object_type == "Attachment" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        رسانه
                                      </td>
                                    ) : (
                                      ""
                                    )}

                                    {item.action == "wrong_password" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        رمز اشتباه
                                      </td>
                                    ) : item.action == "updated" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        بروزرسانی
                                      </td>
                                    ) : item.action == "created" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        ساخته شد
                                      </td>
                                    ) : item.action == "added" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        افزوده شد
                                      </td>
                                    ) : item.action == "logged_in" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        ورود
                                      </td>
                                    ) : item.action == "logged_out" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        خروج
                                      </td>
                                    ) : item.action == "deleted" ? (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        حذف شده
                                      </td>
                                    ) : (
                                      <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                        عملیات نامعلوم
                                      </td>
                                    )}
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      {item.object_name}
                                    </td>
                                  </tr>
                                ))
                              )
                            ) : (
                              Logs.map((item, index) => (
                                <tr key={index} className="border-b ">
                                  <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                    {moment
                                      .unix(item.hist_time)
                                      .locale("fa")
                                      .format("MMM/DD")}
                                  </td>
                                  {item.user_id == 0 ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      مهمان
                                    </td>
                                  ) : item.display_name == "" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      {item.user_Name}
                                    </td>
                                  ) : (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      {item.display_name}
                                    </td>
                                  )}
                                  <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                    {item.hist_ip}
                                  </td>
                                  {item.object_type == "User" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      کاربران
                                    </td>
                                  ) : item.object_type == "Post" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      املاک
                                    </td>
                                  ) : item.object_type == "Attachment" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      رسانه
                                    </td>
                                  ) : (
                                    ""
                                  )}

                                  {item.action == "wrong_password" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      رمز اشتباه
                                    </td>
                                  ) : item.action == "updated" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      بروزرسانی
                                    </td>
                                  ) : item.action == "created" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      ساخته شد
                                    </td>
                                  ) : item.action == "added" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      افزوده شد
                                    </td>
                                  ) : item.action == "logged_in" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      ورود
                                    </td>
                                  ) : item.action == "logged_out" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      خروج
                                    </td>
                                  ) : item.action == "deleted" ? (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      حذف شده
                                    </td>
                                  ) : (
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      عملیات نامعلوم
                                    </td>
                                  )}
                                  <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                    {item.object_name}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!showFilteredLogs && (
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

export default Logger;
