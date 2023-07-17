import { FaShower } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";
import service from "../../../server/service";
const SearchPersonnel = () => {
  useEffect(()=>{
    service.personnel.getUsers()
    .then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
  }, [])
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
                <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3 text-white block">
                      نوع معامله
                    </label>
                    <select
                      id="area"
                      name="area"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option>انتخاب کنید</option>
                      <option>خرید و فروش</option>
                      <option>رهن و اجاره</option>
                      <option>اجاره روزانه</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3 text-white block">
                      نوع ملک
                    </label>
                    <select
                      id="area"
                      name="area"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option>انتخاب کنید</option>
                      <option>آپارتمان</option>
                      <option>خانه و ویلا</option>
                      <option>زمین و کلنگی</option>
                      <option>اداری و تجاری</option>
                    </select>
                  </div>
                </div>

                <div className="w-full flex items-center justify-between max-lg:flex-col gap-4">
                  <div className="w-full">
                    <label htmlFor="area" className="mb-3  text-white block">
                      نوع نمایش قیمت
                    </label>
                    <select
                      id="area"
                      name="area"
                      as="select"
                      rows={10}
                      className="w-full mb-4 backdrop-blur-md bg-opacity-50 outline-none  bg-white/5 rounded-lg	border-[1px] border-gray-400 border-solid p-3 text-gray-900  placeholder-slate-300 focus:border-gray-200  shadow-gray-800 shadow-sm   sm:text-sm"
                    >
                      <option> انتخاب کنید</option>
                      <option>توافقی</option>
                      <option>تماس بگیرید</option>
                    </select>
                  </div>
                  <div className="w-full relative">
                    <label htmlFor="area" className="mb-3 text-white block">
                      منطقه
                    </label>
                    <input
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
                          <tr class="border-b ">
                            <td class="whitespace-nowrap text-white px-6 py-4 font-medium">
                              1
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">09147287477</td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">مدیر کل</td>
                            <td class="whitespace-nowrap  px-6 py-4 flex items-center justify-center gap-7">
                              <button className="bg-red-500 p-2 text-white rounded-xl  shadow-sm shadow-rose-500 ">حذف</button>
                              <button className="bg-sky-600 p-2 text-white rounded-xl  shadow-sm shadow-sky-200-500 ">ویرایش</button>
                            </td>
                          </tr>

                          <tr class="border-b ">
                            <td class="whitespace-nowrap text-white px-6 py-4 font-medium">
                              1
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">09147287477</td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">مدیر کل</td>
                            <td class="whitespace-nowrap  px-6 py-4 flex items-center justify-center gap-7">
                              <button className="bg-red-500 p-2 text-white rounded-xl  shadow-sm shadow-rose-500 ">حذف</button>
                              <button className="bg-sky-600 p-2 text-white rounded-xl  shadow-sm shadow-sky-200-500 ">ویرایش</button>
                            </td>
                          </tr>


                          <tr class="border-b ">
                            <td class="whitespace-nowrap text-white px-6 py-4 font-medium">
                              1
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">09147287477</td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">مدیر کل</td>
                            <td class="whitespace-nowrap  px-6 py-4 flex items-center justify-center gap-7">
                              <button className="bg-red-500 p-2 text-white rounded-xl  shadow-sm shadow-rose-500 ">حذف</button>
                              <button className="bg-sky-600 p-2 text-white rounded-xl  shadow-sm shadow-sky-200-500 ">ویرایش</button>
                            </td>
                          </tr>


                          <tr class="border-b ">
                            <td class="whitespace-nowrap text-white px-6 py-4 font-medium">
                              1
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">09147287477</td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">مدیر کل</td>
                            <td class="whitespace-nowrap  px-6 py-4 flex items-center justify-center gap-7">
                              <button className="bg-red-500 p-2 text-white rounded-xl  shadow-sm shadow-rose-500 ">حذف</button>
                              <button className="bg-sky-600 p-2 text-white rounded-xl  shadow-sm shadow-sky-200-500 ">ویرایش</button>
                            </td>
                          </tr>


                          <tr class="border-b ">
                            <td class="whitespace-nowrap text-white px-6 py-4 font-medium">
                              1
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">09147287477</td>
                            <td class="whitespace-nowrap  px-6 py-4 text-white">مدیر کل</td>
                            <td class="whitespace-nowrap  px-6 py-4 flex items-center justify-center gap-7">
                              <button className="bg-red-500 p-2 text-white rounded-xl  shadow-sm shadow-rose-500 ">حذف</button>
                              <button className="bg-sky-600 p-2 text-white rounded-xl  shadow-sm shadow-sky-200-500 ">ویرایش</button>
                            </td>
                          </tr>
                      
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
