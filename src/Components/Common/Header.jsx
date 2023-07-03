import { FaUserTie } from "react-icons/fa";
const Header = () => {
  return (
    <>
      <div className="relative rounded-xl px-6 w-full h-max  mt-20 flex items-center justify-between bg-white/20 backdrop-blur-md bg-opacity-50">
 
        <img src="/assets/images/logo.png" alt="logo" className="w-16" />

        <div className="flex items-end justify-center">
          <FaUserTie className="text-[30px] text-white " />
          <span className="text-white mr-5">09147287477</span>
        </div>
      </div>    
    </>
  );
};

export default Header;
