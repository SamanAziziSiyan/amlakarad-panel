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
import { useState } from "react";
import InformationForm from "./InformationForm";
import ExtraInfoForm from "./ExtraInfoForm";
import MediaForm from "./MediaForm";
import TradeType from "./TradeType";
import PropertyType from "./PropertyType";
const EditEstate = () => {
  const [nextSection, setNextSection] = useState(0);

  return (
    <>
      <Layout>
        <div className="relative w-full h-full mt-20">
          <div className="w-20 h-20 bg-purple-800 left-[-8%] rounded-full absolute top-[-7%] drop-shadow-md "></div>
          <div className="w-20 h-20 bg-blue-800  rounded-full absolute bottom-[-8%]  right-[-7%] drop-shadow-md"></div>
          <div className="w-full h-full rounded-2xl backdrop-blur-md bg-opacity-50 shadow-blue-800 shadow-sm bg-white/10 flex justify-around flex-col ">
            <MultiStep showNavigation={false} activeStep={nextSection}>
              <InformationForm
                title="اطلاعات اولیه"
                setNextSection={setNextSection}
              />
              <TradeType
                title="اطلاعات  نوع معامله"
                setNextSection={setNextSection}
              />
              <PropertyType
                title="اطلاعات نوع ملک"
                setNextSection={setNextSection}
              />
              <ExtraInfoForm
                title="اطلاعات اضافه"
                setNextSection={setNextSection}
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
