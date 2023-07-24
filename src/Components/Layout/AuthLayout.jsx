const AuthLauout = ({ children }) => {
  return (
    <>
      <div className="grid  grid-cols-12  items-center">
        <div className="col-span-12 bg-white flex h-screen w-full items-center justify-center  lg:col-span-6">
          <div className="  h-[500px] w-[350px]">{children}</div>
        </div>
        <div className="bg-gradient-light-primary col-span-6 hidden h-screen w-full items-center  justify-center  lg:flex">
          <div className="text-white h-[500px] w-[500px] rounded-3xl bg-[#ffffff33]  shadow-[0_2px_6px_5px_#00000008] transition delay-100 duration-500 ease-in-out hover:-translate-y-1 hover:scale-[1.02]">
            <div className=" h-full flex items-center flex-col justify-center ">
              <div>
                <img src="/assets/images/logo.png" className="w-36 mb-6 " />
              </div>
              <div>
                <h4 className=" text-[40px] 	font-black  ">
                  پنل اختصاصی املاک آراد
                </h4>
                <h5 className=" mt-10   text-xl text-100 ">
                  اولین دفتر مشاور املاک آنلاین
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthLauout;
