import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  createState,
  loginSchema,
} from "../../../../validation/formikValidation";
import MultiStep from "react-multistep";
import service from "../../../../server/service";
import {
  getToken,
  getUserDataOnLocalStorage,
  sendSMSAdminState,
  sendSMSStateOwner,
  toastAlert,
} from "../../../helper";

import Layout from "../../../Layout";
import { useEffect, useState } from "react";
import { RiAncientPavilionFill, RiImageAddLine } from "react-icons/ri";
import InformationForm from "./InformationForm";
import ExtraInfoForm from "./ExtraInfoForm";
import MediaForm from "./MediaForm";
import TradeType from "./TradeType";
import PropertyType from "./PropertyType";
import { useParams } from "react-router-dom";
const EditEstate = () => {
  const [showMantagha, setshowMantagha] = useState(false);
  const [shoMoamele, setShoMoamele] = useState("");
  const [shoMelk, setShowMelk] = useState("");
  const [nextSection, setNextSection] = useState(0);
  const [stateData, setStateData] = useState({});
  const { stateId } = useParams();
  const [informationData, setInformationData] = useState({
    title: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    console.log(stateId);
    let userToken = getToken();
    let userData = getUserDataOnLocalStorage();
    // if (userData.role.administrator == undefined) {
    //   toastAlert("شما به این بخش دسترسی ندارید");
    //   navigate("/");
    //   return;
    // }
    service.states
      .getState(userToken, stateId)
      .then((data) => {
        console.log(data);
        setStateData(data.data);
        setInformationData({
          title: data.data.rendered.title,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Layout>
        <div className="relative w-full h-full mt-20">
          <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
          <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
          <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/10 flex justify-around flex-col ">
            <MultiStep activeStep={nextSection}>
              <InformationForm
                title="اطلاعات اولیه"
                setNextSection={setNextSection}
                stateData={informationData}
              />
              <TradeType
                title="اطلاعات  نوع معامله"
                setNextSection={setNextSection}
                stateData={stateData}
              />
              <PropertyType
                title="اطلاعات نوع ملک"
                setNextSection={setNextSection}
                stateData={stateData}
              />
              <ExtraInfoForm
                title="اطلاعات اضافه"
                setNextSection={setNextSection}
                stateData={stateData}
              />
              <MediaForm title="رسانه" />
            </MultiStep>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default EditEstate;
