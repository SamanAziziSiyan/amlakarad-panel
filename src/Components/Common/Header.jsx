import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiShutDownLine } from "react-icons/ri";
import { toastAlert } from "../helper";

const Header = () => {
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let userData = localStorage.getItem("user");
    console.log(userData);
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
        <Link to={"/"}>
          <img src="/assets/images/logo.png" alt="logo" className="w-16" />
        </Link>

        <div className="flex items-center justify-center ">
          <div className="border-[1px] border-white rounded-[5px] flex items-end ml-4 justify-center p-1.5">
            <FaUserTie className="text-[30px] text-white " />
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
