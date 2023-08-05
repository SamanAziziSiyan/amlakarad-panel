import { useEffect, useRef, useState } from "react";
import Layout from "../../../Layout";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";
import service from "../../../../server/service";
import {
  getUserDataOnLocalStorage,
  getToken,
  toastAlert,
} from "../../../helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const MediaForm = () => {
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [stateImages, setStateImages] = useState([]);
  const navigate = useNavigate();
  const { stateId } = useParams();
  const [showLoading, setShowLoading] = useState(false);

  const uploadImageRef = useRef();
  const handleUploadImage = (e) => {
    setShowLoading(true);

    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();
    let imageData = {
      title: "ملک",
      author: userData.ID,
      alt_text: "ملک",
      post: stateId,
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
          setStateImages([
            ...stateImages,
            { img: data.data.source_url, ID: data.data.id },
          ]);
          toastAlert("عکس با موفقیت ذخیره شد", "success");
          setShowLoading(false);
        } else {
          let videoData = {
            ID: stateId,
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
                { img: data.data.source_url, ID: data.data.id },
              ]);
              toastAlert("فیلم با موفقیت ذخیره شد", "success");
              setShowLoading(false);
            })
            .catch((err) => {
              toastAlert("سرور مشغول است");
              setShowLoading(false);
            });
        }
      })
      .catch((err) => {
        toastAlert("سرور مشغول است");
        setShowLoading(false);
      });
  };
  const deleteUploadedImage = (id, type) => {
    let userToken = getToken();
    service.media
      .deleteImage(userToken, id)
      .then((data) => {
        if (type == 1) {
          toastAlert("عکس با موفقیت حذف شد", "success");
          let newUploadedImageItems = stateImages.filter(
            (item) => item.ID != id
          );
          setStateImages(newUploadedImageItems);
        } else {
          toastAlert("فیلم با موفقیت حذف شد", "success");
          let newUploadedVideoItems = uploadedVideos.filter(
            (item) => item.ID != id
          );
          setUploadedVideos(newUploadedVideoItems);
        }
      })
      .catch((err) => {
        toastAlert("سرور مشغول است");
      });
  };
  useEffect(() => {
    let userToken = getToken();

    service.states
      .getState(userToken, stateId)
      .then((data) => {
        let images = data.data[0].img == 0 ? [] : data.data[0].img;
        let stateImage = [];
        let videos = [];
        images.map((item) => {
          if (item.img.search(".mp4") != -1) {
            videos.push(item);
          } else {
            stateImage.push(item);
          }
        });
        setStateImages(stateImage);
        setUploadedVideos(videos);
      })
      .catch((err) => {
        toastAlert("سرور مشغول است");
      });
  }, []);
  const redirectToDetails = () => {
    navigate(`/estateDetails/${stateId}`);
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
          {stateImages.map((item) => (
            <div className="flex gap-5 items-center justify-between h-full flex-col">
              <img src={item.img} className="max-w-xs" />
              <button
                onClick={() => {
                  deleteUploadedImage(item.ID, 1);
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
              <video src={item.img} className="max-w-xs" controls />
              <button
                onClick={() => {
                  deleteUploadedImage(item.ID, 2);
                }}
                className="bg-red-500 rounded-lg text-white p-2"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
        {showLoading && (
          <div className="flex-col my-2  flex justify-center items-center  m-auto font-medium rounded-xl   ">
            <ClipLoader size={70} color="#fff" />
            <span className="text-white mt-6">درحال آپلود رسانه </span>
          </div>
        )}

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
