import Layout from "../../../Layout";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";

const MediaForm = () => {
  return (
    <>
      <div className="w-full flex justify-center flex-col px-32 max-lg:px-5">
        <label htmlFor="area" className="my-8 text-white block">
          <h2 className=" my-10 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
            افزودن تصویر{" "}
          </h2>
        </label>

        <div className="flex items-center justify-center gap-5 mt-10">
          <div className="col-span-12 border h-36 rounded-lg flex items-center justify-center w-36 border-dashed border-blue-500">
            <RiImageAddLine color="#fff" size={50} />
          </div>
        </div>

        <label htmlFor="area" className="my-8 text-white block">
          <h2 className=" my-10 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
            افزودن فیلم{" "}
          </h2>
        </label>

        <div className="flex text-white gap-4 items-center max-lg:flex-col w-full">
          <span>هیچ پرونده ای انتخاب نشده است</span>
          <button
            type="submit"
            className="bg-blue-700 shadow-sm  shadow-indigo-700 my-4 w-1/6 cursor-pointer max-lg:w-full rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
          >
            {" "}
            انتخاب فیلم
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#4a80bb] max-lg:w-full m-auto flex items-end justify-center gap-2  shadow-sm shadow-indigo-700 my-4 w-2/6 cursor-pointer  rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
        >
          <RiAncientPavilionFill size={24} />
          ثبت نهایی
        </button>
      </div>
    </>
  );
};

export default MediaForm;
