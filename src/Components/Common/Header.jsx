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
import { getToken, getUserDataOnLocalStorage, toastAlert } from "../helper";
import service from "../../server/service";

const Header = () => {
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    let userData = getUserDataOnLocalStorage();
    let userToken = getToken();
    if (userData == null) {
      navigate("/login");
      return;
    }
    if (userData.role.karbar) {
      window.location.href = "https://amlakarad.com";
    }
    if (!userData) {
      setUsername("نام کاربری");
    } else {
      setUsername(userData.username);
    }
    service.auth
      .loginValidate(userToken)
      .then((data) => {
        if (data.data.data.status != 200) throw new Error();
        return;
      })
      .catch((err) => {
        toastAlert("لطفا ابتدا وارد شوید");
        navigate("/login");
      });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toastAlert("از حساب کاربری خارج شدید", "success");
    navigate("/login");
  };
  return (
    <>
      <div className="relative flex-nowrap max-[320px]:flex-wrap max-[320px]:w-full max-[320px]:justify-center p-3 gap-5 m-auto items-center justify-center rounded-xl px-6 w-full h-max  mt-20 flex items-center justify-between bg-white/5 backdrop-blur-md bg-opacity-50">
        <div className="flex items-center gap-1 lg:gap-10 max-md:flex-col max-md:justify-center max-md:w-full max-sm:w-auto h-auto">
          <Link to={"/"}>
            <img src="/assets/images/logo.png" alt="logo" className="w-16" />
          </Link>
          <div className="flex items-center max-md:hidden py-4 overflow-x-auto whitespace-nowrap">
            <Link
              to="/"
              className="flex items-center text-gray-400 dark:text-gray-200"
            >
              <RiHomeHeartLine size={25} />
              <span className="mx-2">صفحه اصلی</span>
            </Link>
            {pathname == "/settings" && (
              <>
                <span className="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiSettings3Fill size={25} />

                  <span className="mx-2">تنظیمات</span>
                </Link>
              </>
            )}
            {pathname == "/search-personnel" && (
              <>
                <span className="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiUserSearchFill size={25} />

                  <span className="mx-2">جستجو اشخاص</span>
                </Link>
              </>
            )}
            {pathname == "/create-personnel" && (
              <>
                <span className="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiHomeHeartLine size={25} />

                  <span className="mx-2"> ایجاد پرسنل</span>
                </Link>
              </>
            )}
            {pathname == "/create-estate" && (
              <>
                <span className="mx-3 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiAncientPavilionLine size={25} />

                  <span className="mx-2 mt-1"> ثبت املاک</span>
                </Link>
              </>
            )}
            {pathname == "/search-estate" && (
              <>
                <span className="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiSearch2Fill size={25} />

                  <span className="mx-2"> جستجو املاک</span>
                </Link>
              </>
            )}
            {pathname.search("EstateDetails") != -1 ? (
              <>
                <span className="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiSearch2Fill size={25} />

                  <span className="mx-2">جزئیات ملک</span>
                </Link>
              </>
            ) : (
              ""
            )}
            {pathname.search("edit-personnel") != -1 ? (
              <>
                <span className="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiSearch2Fill size={25} />

                  <span className="mx-2">جزئیات کاربر</span>
                </Link>
              </>
            ) : (
              ""
            )}
            {pathname.search("user-estates") != -1 ? (
              <>
                <span className="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiSearch2Fill size={25} />

                  <span className="mx-2">املاک کاربر </span>
                </Link>
              </>
            ) : (
              ""
            )}
            {pathname.search("logger") != -1 ? (
              <>
                <span className="mx-5 text-gray-400 dark:text-gray-300 rtl:-scale-x-100">
                  <RiArrowLeftSLine size={20} />
                </span>

                <Link
                  to="#"
                  className="flex items-center text-blue-600 -px-2 dark:text-blue-400"
                >
                  <RiSearch2Fill size={25} />

                  <span className="mx-2">گزارش فعالیت کاربران</span>
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex items-center max-md:w-full  justify-center ">
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
