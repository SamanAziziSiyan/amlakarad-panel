import {
  RiAncientPavilionFill,
  RiDownloadCloud2Fill,
  RiMindMap,
  RiSearch2Fill,
  RiSettings3Fill,
  RiUserAddFill,
  RiUserSearchFill,
} from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getToken,
  getUserDataOnLocalStorage,
  getUserSettinOnLocalStorage,
  toastAlert,
} from "../../helper";
import Layout from "../../Layout";
import service from "../../../server/service";
import config from "../../../server/config.json";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toastAlert("از حساب کاربری خارج شدید", "success");
    navigate("/login");
  };
  const handleBackoupSQL = () => {
    let userData = getUserDataOnLocalStorage();
    if (userData.role.administrator == undefined) {
      toastAlert("شما به این بخش دسترسی ندارید");
    } else {
      try {
        window.location.href = `${config.api}/wp-json/wp/v1/backup/`;
        toastAlert("فایل پشتیبان کل املاک با موفقیت دانلود شد", "success");
      } catch (err) {
        toastAlert(
          "دانلود فایل پشتیبان با مشکل مواجه شد لطفا دوباره امتحان کنید"
        );
      }
    }
  };
  return (
    <>
      <Layout>
        <div className="w-full text-center m-auto mt-20">
          <div className="bg-white/0 grid grid-cols-12  lg:gap-10 px-2 justify-center items-center">
            <div className="col-span-12 xl:col-span-12 relative ">
              <div className="w-20 h-20 bg-purple-800  rounded-full absolute  drop-shadow-md "></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  right-[-2%] drop-shadow-md"></div>
              <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-0  left-[20%] top-[20%] drop-shadow-md"></div>

              <div className="w-full flex items-center gap-2 mt-5 max-md:flex-col ">
                <Link
                  to={"/create-estate"}
                  className="w-1/3 max-md:w-full max-lg:w-1/3 "
                >
                  <div className="bg-white/10 max-md:w-full  h-52 hover:scale-[1.02] cursor-pointer  backdrop-blur-md bg-opacity-50 rounded-xl flex items-center flex-col justify-between py-8">
                    <RiAncientPavilionFill
                      className="text-white max-md:w-[50px]"
                      size={80}
                    />
                    <span className="font-bold text-base xl:text-lg text-white">
                      ثبت ملک جدید
                    </span>
                  </div>
                </Link>

                <Link
                  to={"/search-estate"}
                  className="w-1/3 max-md:w-full max-lg:w-1/3"
                >
                  <div className="bg-green-500 h-52 max-md:w-full backdrop-blur-md bg-opacity-50 hover:scale-[1.02] cursor-pointer rounded-xl flex items-center flex-col justify-between py-8">
                    <RiSearch2Fill
                      className="text-white max-md:w-[50px]"
                      size={80}
                    />
                    <span className="font-bold text-base xl:text-lg text-white">
                      جستجو ملک
                    </span>
                  </div>
                </Link>

                <div className=" w-1/3  max-md:w-full h-52 flex items-center gap-2 ">
                  <Link to={"/search-personnel"} className="h-full  w-3/6">
                    <div className="bg-white/10 backdrop-blur-md bg-opacity-50  h-full hover:scale-[1.02] cursor-pointer rounded-xl flex items-center flex-col justify-between py-8">
                      <RiUserSearchFill
                        className="text-white max-md:w-10"
                        size={60}
                      />
                      <span className="font-bold text-base xl:text-lg text-white">
                        جستجو اشخاص
                      </span>
                    </div>
                  </Link>
                  <Link to={"/settings"} className="h-full  w-3/6">
                    <div className="bg-white/10 backdrop-blur-md bg-opacity-50 h-full rounded-xl hover:scale-[1.02] cursor-pointer flex items-center flex-col justify-between py-8">
                      <RiSettings3Fill
                        className="text-white max-md:w-10"
                        size={60}
                      />
                      <span className="font-bold text-base xl:text-lg text-white">
                        تنظیمات
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="w-full flex items-center gap-2 mt-5 max-md:flex-col ">
                <Link
                  to={"/create-personnel"}
                  className="w-1/3 max-md:w-full max-lg:w-1/3 "
                >
                  <div className="bg-white/10  h-52 max-md:w-full hover:scale-[1.02] cursor-pointer  backdrop-blur-md bg-opacity-50 rounded-xl flex items-center flex-col justify-between py-8">
                    <RiUserAddFill
                      className="text-white max-md:w-[50px]"
                      size={80}
                    />
                    <span className="font-bold text-base xl:text-lg text-white">
                      ایجاد پرسنل
                    </span>
                  </div>
                </Link>
                <Link
                  to={"/logger"}
                  className="w-1/3 max-md:w-full max-lg:w-1/3 "
                >
                  <div className="bg-white/10  h-52 max-md:w-full backdrop-blur-md bg-opacity-50 hover:scale-[1.02] cursor-pointer rounded-xl flex items-center flex-col justify-between py-8">
                    <RiMindMap
                      className="text-white max-md:w-[50px]"
                      size={80}
                    />
                    <span className="font-bold text-base xl:text-lg text-white">
                      گزارش فعالیت کاربران
                    </span>
                  </div>
                </Link>
                <div
                  className=" w-1/3   max-md:w-full h-52 flex items-center gap-2 "
                  onClick={handleBackoupSQL}
                >
                  <div className="bg-white/10 backdrop-blur-md bg-opacity-50 w-3/6 h-full hover:scale-[1.02] cursor-pointer rounded-xl flex items-center flex-col justify-between py-8">
                    <RiDownloadCloud2Fill
                      className="text-white max-md:w-10"
                      size={60}
                    />
                    <span className="font-bold text-base xl:text-lg text-white">
                      پشتیبان گیری
                    </span>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="bg-red-600 b w-3/6 backdrop-blur-md bg-opacity-60 h-full rounded-xl hover:scale-[1.02] cursor-pointer flex items-center flex-col justify-between py-8"
                  >
                    <FaSignOutAlt
                      className="text-white max-md:w-10"
                      size={50}
                    />
                    <span className="font-bold text-base xl:text-lg text-white">
                      خروج
                    </span>
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

export default Home;
