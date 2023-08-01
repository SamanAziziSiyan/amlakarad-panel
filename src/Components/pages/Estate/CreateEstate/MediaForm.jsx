import { useEffect, useRef, useState } from "react";
import Layout from "../../../Layout";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";
import service from "../../../../server/service";
import {
  getUserDataOnLocalStorage,
  getToken,
  toastAlert,
  sendSMSStateOwner,
  sendSMSAdminState,
} from "../../../helper";
import { Link, useNavigate } from "react-router-dom";

const MediaForm = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [stateID, setStateID] = useState(0);
  const navigate = useNavigate();

  const uploadImageRef = useRef();

  const handleUploadImage = (e) => {
    let userToken = getToken();
    console.log(e.target.files[0]);
    let userData = getUserDataOnLocalStorage();
    let imageData = {
      title: "ملک",
      author: userData.ID,
      alt_text: "ملک",
      post: localStorage.getItem("stateId"),
      status: "publish",
      file: e.target.files[0],
    };
    if (e.target.files[0].type == "video/mp4" && uploadedVideos.length != 0) {
      toastAlert("فقط یک فیلم می توانید اپلود کنید");
      return;
    }
    service.media
      .uploadImage(userToken, imageData)
      .then((data) => {
        if (e.target.files[0].type != "video/mp4") {
          setUploadedImages([
            ...uploadedImages,
            { src: data.data.source_url, id: data.data.id },
          ]);
          toastAlert("عکس با موفقیت ذخیره شد", "success");
        } else {
          let videoData = {
            ID: localStorage.getItem("stateId"),
            meta: [
              {
                video: data.data.id,
              },
            ],
          };
          service.states
            .insertMetaData(userToken, videoData)
            .then((dataMeta) => {
              setUploadedVideos([
                ...uploadedVideos,
                { src: data.data.source_url, id: data.data.id },
              ]);
              toastAlert("فیلم با موفقیت ذخیره شد", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUploadedImage = (id, type) => {
    let userToken = getToken();
    service.media
      .deleteImage(userToken, id)
      .then((data) => {
        if (type == 1) {
          toastAlert("عکس با موفقیت حذف شد", "success");
          let newUploadedImageItems = uploadedImages.filter(
            (item) => item.id != id
          );
          setUploadedImages(newUploadedImageItems);
        } else {
          toastAlert("فیلم با موفقیت حذف شد", "success");
          let newUploadedVideoItems = uploadedVideos.filter(
            (item) => item.id != id
          );
          setUploadedVideos(newUploadedVideoItems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
  };
  useEffect(() => {
    setStateID(localStorage.getItem("stateId"));
  }, []);
  const redirectToDetails = () => {
    let stateTitle = localStorage.getItem("stateTitle");
    let ownerMobile = localStorage.getItem("ownerMobile");
    let moshaverName = localStorage.getItem("moshaverName");
    sendSMSStateOwner(ownerMobile, stateTitle)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    sendSMSAdminState(moshaverName, stateTitle)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.removeItem("stateId");
    localStorage.removeItem("stateTitle");
    localStorage.removeItem("ownerMobile");
    localStorage.removeItem("moshaverName");
    navigate(`/estateDetails/${stateID}`);
  };
  return (
    <>
      <div className="w-full flex justify-center flex-col px-32 max-lg:px-5">
        <label htmlFor="area" className="my-8 text-white block">
          <h2 className=" my-10 font-bold text-2xl border-b-[3px] pb-1 border-white inline w-max text-white ">
            افزودن تصویر{" "}
          </h2>
        </label>

        <div
          className="flex items-center justify-center gap-5 mt-10"
          onClick={() => {
            uploadImageRef.current.click();
          }}
        >
          <div className="col-span-12 border h-36 rounded-lg flex items-center justify-center w-36 border-dashed border-blue-500">
            <RiImageAddLine color="#fff" size={50} />
          </div>
          <input
            type="file"
            className="opacity-0 w-1"
            ref={uploadImageRef}
            onChange={(e) => {
              handleUploadImage(e);
            }}
          />
        </div>

        <div className="flex items-center gap-6 flex-wrap h-full  mt-10">
          {uploadedImages.map((item) => (
            <div className="flex items-center justify-between h-full flex-col">
              <img src={item.src} className="max-w-xs" />
              <button
                onClick={() => {
                  deleteUploadedImage(item.id, 1);
                }}
                className="bg-red-500 rounded-lg text-white p-2"
              >
                حذف
              </button>
            </div>
          ))}
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
            onClick={() => {
              uploadImageRef.current.click();
            }}
            className="bg-blue-700 shadow-sm  shadow-indigo-700 my-4 w-1/6 cursor-pointer max-lg:w-full rounded-lg  py-2.5 text-center text-gray-100  hover:scale-105"
          >
            {" "}
            انتخاب فیلم
          </button>
        </div>

        <div className="flex items-center gap-6 flex-wrap h-full  mt-10">
          {uploadedVideos.map((item) => (
            <div className="flex items-center justify-between h-full flex-col">
              <video src={item.src} className="max-w-xs" controls />
              <button
                onClick={() => {
                  deleteUploadedImage(item.id, 2);
                }}
                className="bg-red-500 rounded-lg text-white p-2"
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={redirectToDetails}
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
