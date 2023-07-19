import { FaShower } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import service from "../../../server/service";
import { getToken, toastAlert } from "../../helper";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SearchPersonnel = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [showFilteredUser, setShowFilterdUser] = useState(false);

  useEffect(() => {
    let userToken = getToken();
    service.personnel
      .getUsers(userToken)
      .then((data) => {
        if (data.data.status == 403) throw new Error();
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
        toastAlert("شما به بخش دسترسی ندارید");
      });

  }, []);

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
  const filterUsers = (xx) => {
    users.map((item) => {
      let userRole = item.extra.role[0];
      if (userRole[xx]) {
        setUsers([...users, item]);
      }
    });
  };

  const searchUserByUsername = (username) => {
    console.log(users);

    if (username.length == 0) {
      setShowFilterdUser(false);
    }
    if (username.length > 2) {
      setShowFilterdUser(true);
      let userToken = getToken();

      service.personnel
        .searchUser(username, userToken)
        .then((data) => {
          // if (data.data.status != 200) throw new Error();
          setFilterUser(data.data);
        })
        .catch((err) => {
          // toastAlert("کاربر یافت نشد");
        });
    }
  };
  return (
    <>
      <div className="w-full text-center m-auto mt-20">
        <div className=" primary-gradient grid grid-cols-12  lg:gap-10 px-2 justify-center items-center">
          <div className="col-span-12 xl:col-span-12 relative ">
            <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
            <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
            <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>

            <div className="w-full relative  h-auto bg-white/20 backdrop-blur-md bg-opacity-50 rounded-lg lg:p-4 p-2">
              <div className="flex items-center justify-between gap-4 max-lg:flex-wrap">
                {/* <div className="flex items-center">
                  <button
                    className="bg-red-500 w-full p-2 rounded-sm text-white mx-4"
                    onClick={() => {
                      filterUsers("administrator");
                    }}
                  >
                    مدیر کل
                  </button>
                  <button
                    className="bg-red-500 w-full p-2 rounded-sm text-white mx-4"
                    onClick={() => {
                      filterUsers("moshaver");
                    }}
                  >
                    مشاور املاک
                  </button>
                  <button
                    className="bg-red-500 w-full p-2 rounded-sm text-white mx-4"
                    onClick={() => {
                      filterUsers("karmand");
                    }}
                  >
                    کارمند
                  </button>
                  <button
                    className="bg-red-500 w-full p-2 rounded-sm text-white mx-4"
                    onClick={() => {
                      filterUsers("karbar");
                    }}
                  >
                    کاربر عادی
                  </button>
                </div> */}

                <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
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

              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full text-center text-sm font-light">
                        <thead class="border-b bg- font-medium rounded-xl bg-white/20 backdrop-blur-md bg-opacity-50 ">
                          <tr>
                            <th scope="col" class=" px-6 py-4 text-gray-950">
                              #
                            </th>
                            <th scope="col" class=" px-6 py-4 text-gray-950">
                              نام و نام خانوادگی
                            </th>
                            <th scope="col" class=" px-6 py-4 text-gray-950">
                              نام کاربری
                            </th>
                            <th scope="col" class=" px-6 py-4 text-gray-950">
                              شماره همراه
                            </th>

                            <th scope="col" class=" px-6 py-4 text-gray-950">
                              سمت
                            </th>
                            <th scope="col" class=" px-6 py-4 text-gray-950">
                              عملیات
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {showFilteredUser
                            ? filterUser.map((item, index) => (
                                <tr key={index} class="border-b ">
                                  <td class="whitespace-nowrap text-white px-6 py-4 font-medium">
                                    {index + 1}
                                  </td>

                                  <td class="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.name}
                                  </td>
                                  <td class="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.extra.username}
                                  </td>
                                  <td class="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.extra.phone[0] != ""
                                      ? item.extra.phone[0]
                                      : "ثبت نشده است"}
                                  </td>

                                  <td class="whitespace-nowrap  px-6 py-4 text-white">
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
                                  <td class="whitespace-nowrap  px-6 py-4 flex items-center justify-center gap-7">
                                    <button
                                      className="bg-red-500 p-2 text-white rounded-xl  shadow-sm shadow-rose-500 "
                                      onClick={() => {
                                        handleDeleteUser(item.id, item.name);
                                      }}
                                    >
                                      حذف
                                    </button>
                                    <button className="bg-sky-600 p-2 text-white rounded-xl  shadow-sm shadow-sky-200-500 ">
                                      ویرایش
                                    </button>
                                  </td>
                                </tr>
                              ))
                            : users.map((item, index) => (
                                <tr key={index} class="border-b ">
                                  <td class="whitespace-nowrap text-white px-6 py-4 font-medium">
                                    {index + 1}
                                  </td>

                                  <td class="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.name}
                                  </td>
                                  <td class="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.extra.username}
                                  </td>
                                  <td class="whitespace-nowrap  px-6 py-4 text-white">
                                    {item.extra.phone[0] != ""
                                      ? item.extra.phone[0]
                                      : "ثبت نشده است"}
                                  </td>

                                  <td class="whitespace-nowrap  px-6 py-4 text-white">
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
                                  <td class="whitespace-nowrap  px-6 py-4 flex items-center justify-center gap-7">
                                    <button
                                      className="bg-red-500 p-2 text-white rounded-xl  shadow-sm shadow-rose-500 "
                                      onClick={() => {
                                        handleDeleteUser(item.id, item.name);
                                      }}
                                    >
                                      حذف
                                    </button>
                                    <button className="bg-sky-600 p-2 text-white rounded-xl  shadow-sm shadow-sky-200-500 ">
                                      ویرایش
                                    </button>
                                  </td>
                                </tr>
                              ))}
                           
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
    </>
  );
};

export default SearchPersonnel;
