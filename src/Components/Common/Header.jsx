import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  RiAncientPavilionLine,
  RiArrowLeftSLine,
  RiHomeHeartLine,
  RiSearch2Fill,
  RiSettings3Fill,
  RiShutDownLine,
  RiUserSearchFill,
} from "react-icons/ri";
import { toastAlert } from "../helper";

const Header = () => {
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    let userData = localStorage.getItem("user");
    if (!userData) {
      setUsername("نام کاربری");
      return;
    }
    userData = JSON.parse(userData);
    setUsername(userData.username);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toastAlert("از حساب کاربری خارج شدید", "success");
    navigate("/login");
  };
  return (
    <>
      <div className="relative rounded-xl px-6 w-full h-max  mt-20 flex items-center justify-between bg-white/5 backdrop-blur-md bg-opacity-50">
        <div className="flex items-center gap-10">
          <Link to={"/"}>
            <img src="/assets/images/logo.png" alt="logo" className="w-16" />
          </Link>
          <div class="flex items-center py-4 overflow-x-auto whitespace-nowrap">
            <Link
              to="/"
              class="flex items-center text-gray-400 dark:text-gray-200"
            >
              <RiHomeHeartLine size={25} />
              <span class="mx-2">صفحه اصلی</span>
            </Link>
            {pathname == "/settings" && (
              <>
                <span class="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  class="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiSettings3Fill size={25} />

                  <span class="mx-2">تنظیمات</span>
                </Link>
              </>
            )}
            {pathname == "/search-personnel" && (
              <>
                <span class="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  class="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiUserSearchFill size={25} />

                  <span class="mx-2">جستجو اشخاص</span>
                </Link>
              </>
            )}
            {pathname == "/create-personnel" && (
              <>
                <span class="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  class="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiHomeHeartLine size={25} />

                  <span class="mx-2"> ایجاد پرسنل</span>
                </Link>
              </>
            )}
            {pathname == "/create-estate" && (
              <>
                <span class="mx-3 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  class="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiAncientPavilionLine size={25} />

                  <span class="mx-2 mt-1"> ثبت املاک</span>
                </Link>
              </>
            )}
            {pathname == "/search-estate" && (
              <>
                <span class="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  class="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiSearch2Fill size={25} />

                  <span class="mx-2"> جستجو املاک</span>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center ">
          <div className="shadow shadow-sm shadow-sky-600 rounded-[5px] flex items-center ml-4 justify-center p-1.5">
            <FaUserTie className="text-[25px] text-white " />
            <span className="text-white mr-2">{userName}</span>
          </div>
          <div
            onClick={handleLogout}
            className=" flex items-center justify-center bg-red-600 rounded-full p-2 cursor-pointer shadow-sm shadow-red-500"
          >
            <RiShutDownLine size={20} color="#fff" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
