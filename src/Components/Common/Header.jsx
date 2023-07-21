import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  const [userName, setUsername] = useState("");
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
  return (
    <>
      <div className="relative rounded-xl px-6 w-full h-max  mt-20 flex items-center justify-between bg-white/20 backdrop-blur-md bg-opacity-50">
        <Link to={"/"}>
          <img src="/assets/images/logo.png" alt="logo" className="w-16" />
        </Link>

        <div className="flex items-end justify-center">
          <FaUserTie className="text-[30px] text-white " />
          <span className="text-white mr-5">{userName}</span>
        </div>
      </div>
    </>
  );
};

export default Header;
