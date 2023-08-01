import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative flex flex-col items-center justify-center gap-10">
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
            <div class="text-white">
              <h2 className="text-[30px]">چیزی پیدا نشد !</h2>
              <Link to={`/`}>
                <button className="sm:w-full flex items-center gap-3 lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-[#0C0A5A] text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  <AiOutlineHome size={20} className="pl-1" />
                  <span>رفتن به خانه</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img
            className="rounded-lg shadow shadow-sky-500"
            src="/assets/images/404.gif"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
