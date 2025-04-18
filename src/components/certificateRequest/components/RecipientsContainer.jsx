import React, { useEffect } from "react";
import UploadRecipientDetails from "./UploadRecipientDetails";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateStructure } from "../../../redux/certificate/Action";
import Recipients from "./Recipients";

const RecipientsContainer = () => {
  const selectedTemplate = useSelector(
    (store) => store.certificate?.selectedTemplate
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use effect called");
    console.log(selectedTemplate.templateId);

    dispatch(getTemplateStructure(selectedTemplate.templateId));
  }, []);

  // grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-x-hidden overflow-y-hidden

  return (
    <section
      className="
    grid grid-cols-1 lg:grid-cols-2 
    gap-6 
    overflow-x-hidden 
    lg:overflow-y-hidden 
    overflow-y-auto 
    h-full
  "
    >
      <UploadRecipientDetails />
      <Recipients />
    </section>
  );
};

export default RecipientsContainer;
