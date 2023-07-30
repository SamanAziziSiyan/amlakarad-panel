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

import Layout from "../../Layout";

const Logger = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [Logs, setLogs] = useState([]);
  const [filterLog, setFilterLogs] = useState([]);
  const [showFilteredLogs, setShowFilterdLogs] = useState(false);

  useEffect(() => {
    let userData = getUserDataOnLocalStorage();

    // if (
    //   userData.role.administrator == undefined &&
    //   userData.role.karmand == undefined
    // ) {
    //   toastAlert("شما به این بخش دسترسی ندارید");
    //   navigate("/");
    //   return;
    // }

    let userToken = getToken();
    service.personnel
      .getLogs(userToken)
      .then((data) => {
        console.log(data);
        // if (data.data.status == 403) throw new Error();
        setLogs(data.data);
      })
      .catch((err) => {
        toastAlert("شما به بخش دسترسی ندارید");
      });
  }, []);

  const filterLogs = (role) => {
    setFilterLogs([]);
    setShowFilterdLogs(true);
    Logs.map((item) => {
      // let userRole = item.extra.role[0];
      // if (userRole[role]) {
      //   setFilterLogs((users) => [...users, item]);
      // }
    });
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
          <div className=" bg-white/5 grid grid-cols-12  lg:gap-10 px-2 justify-center items-center">
            <div className="col-span-12 xl:col-span-12 relative ">
              <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>

              <div className="w-full relative  h-auto bg-white/10 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
                <div className="flex items-center w-full justify-between gap-4 max-lg:flex-wrap">
                  <div className="flex items-center w-2/6 justify-start gap-4">
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
                        filterLogs("administrator");
                      }}
                    >
                      <span> مدیر کل</span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("moshaver");
                      }}
                    >
                      <span> مشاور املاک</span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("karmand");
                      }}
                    >
                      <span> کارمند</span>
                    </button>
                    <button
                      className="bg-transparent  shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterLogs("karbar");
                      }}
                    >
                      <span> کاربر عادی</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
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
                                عنوان
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

                {/* <div className="flex items-center justify-center gap-4">
                <div className="w-3/6 h-10 bg-red-100 rounded-lg  bg-white/20 backdrop-blur-md bg-opacity-50 "></div>
                <div className="w-3/6 h-10 bg-red-100"></div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Logger;
