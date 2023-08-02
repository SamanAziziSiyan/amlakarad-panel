import { FaShower } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import service from "../../../../server/service";
import {
  getToken,
  getUserDataOnLocalStorage,
  modalStyles,
  toastAlert,
} from "../../../helper";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  RiDeleteBin6Line,
  RiEdit2Line,
  RiHomeHeartLine,
  RiReplyAllLine,
  RiLoginCircleLine,
} from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

import Layout from "../../../Layout";

const SearchPersonnel = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [getPageCount, setPageCount] = useState(0);

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [showFilteredUser, setShowFilterdUser] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  // const [userDataRole, setUserDataRole] = useState(false);

  const handlePageClick = (e) => {
    const newOffset = e.selected * 20;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    //  console.log(hash);
    let userData = getUserDataOnLocalStorage();
    // if (userData.role.karbar) {
    //   setUserDataRole(true);
    // }
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
      .getUsers(userToken)
      .then((data) => {
        if (data.data.status == 403) throw new Error();
        setAllUsers(data.data);

        const endOffset = itemOffset + 20;
        const currentUser = data.data.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(data.data.length / 20);
        setPageCount(pageCount);
        setUsers(currentUser);
        setShowLoading(false);
      })
      .catch((err) => {
        toastAlert("شما به بخش دسترسی ندارید");
        setShowLoading(false);
      });
  }, [itemOffset]);

  const handleDeleteUser = (id, name) => {
    let userToken = getToken();
    Swal.fire({
      title: `آیا از حذف ${name} مطمئن هستید ؟`,
      text: "این عمل قابل بازگردانی نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!بله حذف شود",
    }).then((result) => {
      if (result.isConfirmed) {
        service.personnel
          .deleteUser(id, userToken)
          .then((data) => {
            console.log(data.data);
            if (!data.data.deleted) throw new Error();
            let filteredUsers = users.filter((item) => item.id != id);
            setUsers(filteredUsers);
          })
          .catch((err) => {
            console.log(err);
            toastAlert("سرور مشغول است");
          });
        Swal.fire("حذف شد!", "اطلاعات کاربر به مدیر انتقال داده شد", "success");
      }
    });
  };
  const filterUsers = (role) => {
    setFilterUser([]);
    setShowFilterdUser(true);

    allUsers.map((item) => {
      let userRole = item.extra.role[0];
      if (userRole[role]) {
        setFilterUser((users) => [...users, item]);
      }
    });
  };

  const searchUserByUsername = (username) => {
    if (username.length == 0) {
      setShowFilterdUser(false);
    }
    if (username.length > 2) {
      setShowFilterdUser(true);
      let userToken = getToken();

      service.personnel
        .searchUser(username, userToken)
        .then((data) => {
          setShowFilterdUser(true);
          data.data.map((item) => {
            return setFilterUser((users) => [item]);
          });
        })
        .catch((err) => {
          toastAlert("کاربر یافت نشد");
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
                <div className="flex items-center w-full max-lg:flex-col justify-between gap-4 max-lg:flex-wrap">
                  <div className="flex items-center w-full flex-wrap justify-start gap-4">
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        setShowFilterdUser(false);
                      }}
                    >
                      <span> همه</span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterUsers("administrator");
                      }}
                    >
                      <span> مدیر کل</span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterUsers("moshaver");
                      }}
                    >
                      <span> مشاور املاک</span>
                    </button>
                    <button
                      className="bg-transparent border-l-2 border-white shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterUsers("karmand");
                      }}
                    >
                      <span> کارمند</span>
                    </button>
                    <button
                      className="bg-transparent  shadow-sm  pl-4  rounded-sm flex items-center  text-white"
                      onClick={() => {
                        filterUsers("karbar");
                      }}
                    >
                      <span> کاربر عادی</span>
                    </button>
                  </div>

                  <div className="w-3/6 max-lg:w-full max-lg:mt-6 max-lg:px-2 flex items-center justify-between max-lg:flex-col gap-4">
                    <div className="w-full relative">
                      <label htmlFor="area" className="mb-3 text-white block">
                        جستجو بر اساس نام کاربری
                      </label>
                      <input
                        onChange={(e) => {
                          searchUserByUsername(e.target.value);
                        }}
                        id="area"
                        name="area"
                        type="text"
                        className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                {showLoading && (
                  <div className="flex-col mt-6  flex justify-center items-center  m-auto font-medium rounded-xl   ">
                    <ClipLoader size={70} color="#fff" />
                    <span className="text-white mt-6">
                      درحال بارگزاری اطلاعات
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="overflow-x-auto ">
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
                                نام و نام خانوادگی
                              </th>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                نام کاربری
                              </th>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                شماره همراه
                              </th>

                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                سمت
                              </th>
                              <th
                                scope="col"
                                className=" px-6 py-4 text-gray-950"
                              >
                                عملیات
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {showFilteredUser ? (
                              filterUser.length == 0 ? (
                                <div className="w-full col-span-12 bg-sky-500 rounded-md p-5">
                                  <h1 className="text-white flex items-center justify-between text-[22px] w-full text-center">
                                    کاربری یافت نشد
                                    <span>
                                      <BsInfoCircleFill
                                        className="justify-center items-center"
                                        color={"#fff"}
                                      />
                                    </span>
                                  </h1>
                                </div>
                              ) : (
                                filterUser.map((item, index) => (
                                  <tr key={index} className="border-b ">
                                    <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                      {index + 1}
                                    </td>

                                    <td className="whitespace-nowrap  px-6 py-4 text-white">
                                      {item.name}
                                    </td>
                                    <td className="whitespace-nowrap  px-6 py-4 text-white">
                                      {item.extra.username}
                                    </td>
                                    <td className="whitespace-nowrap  px-6 py-4 text-white">
                                      {item.extra.phone[0] != ""
                                        ? item.extra.phone[0]
                                        : "ثبت نشده است"}
                                    </td>

                                    <td className="whitespace-nowrap  px-6 py-4 text-white">
                                      {item.extra.role.length == 0
                                        ? "نقش یافت نشد"
                                        : item.extra.role[0].moshaver
                                        ? " مشاور املاک"
                                        : item.extra.role[0].administrator
                                        ? "مدیرکل"
                                        : item.extra.role[0].karbar
                                        ? "کاربر عادی"
                                        : item.extra.role[0].karmand
                                        ? "کارمند"
                                        : "نقش یافت نشد"}
                                    </td>
                                    <td className="whitespace-nowrap  px-6 py-4 flex items-center justify-center gap-7">
                                      <button
                                        className="bg-red-500 p-2 text-white rounded-xl  shadow-sm shadow-rose-500 "
                                        onClick={() => {
                                          handleDeleteUser(item.id, item.name);
                                        }}
                                      >
                                        حذف
                                      </button>
                                      <Link to={`/edit-personnel/${item.id}`}>
                                        <button
                                          type="button"
                                          className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                                        >
                                          <RiEdit2Line
                                            size={18}
                                            className="pl-1"
                                          />
                                          ویرایش
                                        </button>
                                      </Link>

                                      {item.extra.role[0].karbar ? (
                                        ""
                                      ) : (
                                        <Link to={`/user-estates/${item.id}`}>
                                          <button
                                            type="button"
                                            className="bg-green-600 p-2 flex items-center  rounded-md text-white text-sm"
                                          >
                                            <RiHomeHeartLine
                                              size={20}
                                              className="pl-1"
                                            />
                                            مشاهده املاک
                                          </button>
                                        </Link>
                                      )}
                                    </td>
                                  </tr>
                                ))
                              )
                            ) : (
                              users.map((item, index) => (
                                <tr key={index} className="border-b ">
                                  <td className="whitespace-nowrap text-white px-6 py-4 font-medium">
                                    {index + 1}
                                  </td>

                                  <td className="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.name}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.extra.username}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.extra.phone[0] != ""
                                      ? item.extra.phone[0]
                                      : "ثبت نشده است"}
                                  </td>

                                  <td className="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.extra.role.length == 0
                                      ? "نقش یافت نشد"
                                      : item.extra.role[0].moshaver
                                      ? " مشاور املاک"
                                      : item.extra.role[0].administrator
                                      ? "مدیرکل"
                                      : item.extra.role[0].karbar
                                      ? "کاربر عادی"
                                      : item.extra.role[0].karmand
                                      ? "کارمند"
                                      : "نقش یافت نشد"}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4 flex items-center justify-start gap-7">
                                    <button
                                      className="bg-red-500 p-2 flex items-start  rounded-md text-white text-sm "
                                      onClick={() => {
                                        handleDeleteUser(item.id, item.name);
                                      }}
                                    >
                                      <RiDeleteBin6Line
                                        size={18}
                                        className="pl-1"
                                      />
                                      حذف
                                    </button>
                                    <Link to={`/edit-personnel/${item.id}`}>
                                      <button
                                        type="button"
                                        className="bg-sky-700 p-2 flex items-center  rounded-md text-white text-sm"
                                      >
                                        <RiEdit2Line
                                          size={18}
                                          className="pl-1"
                                        />
                                        ویرایش
                                      </button>
                                    </Link>

                                    {item.extra.role[0].karbar ? (
                                      ""
                                    ) : (
                                      <Link to={`/user-estates/${item.id}`}>
                                        <button
                                          type="button"
                                          className="bg-green-600 p-2 flex items-center  rounded-md text-white text-sm"
                                        >
                                          <RiHomeHeartLine
                                            size={20}
                                            className="pl-1"
                                          />
                                          مشاهده املاک
                                        </button>
                                      </Link>
                                    )}
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

              {!showFilteredUser && (
                <div className="col-span-12 mt-10">
                  <ReactPaginate
                    containerClassName="flex justify-center items-center mt-8 mb-4"
                    pageClassName="block text-white !rounded-full border border-solid border-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-2"
                    activeClassName="bg-white text-sky-600 border-sky-600 !border-2 text-palette-light !rounded-full   hover:bg-palette-dark"
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

export default SearchPersonnel;
