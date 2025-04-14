import React from "react";
import MiniHeading from "./MiniHeading";
import { useSelector } from "react-redux";
import RecipentForm from "./RecipentForm";

const UploadRecipientDetails = () => {
  const templateStructure = useSelector(
    (store) => store.certificate?.currentTemplateStructure
  );

  const inputStyling =
    "w-full border border-[#DEE0E3] p-4 rounded-[12px] placeholder-[#9CA3AF] placeholder:text-[16px]";
  const labelStyling = "font-roboto font-normal text-[16px]";
  return (
    <div className="rounded-[16px] flex flex-col gap-4 p-4 shadow-[6px_6px_12px_rgba(0,0,0,0.06)] bg-[#FFFFFF] overflow-y-auto">
      <div>
        <MiniHeading title={"Upload Recipients Details"} />
      </div>

      <RecipentForm fieldsConfig={templateStructure} />
    </div>
  );
};

export default UploadRecipientDetails;
