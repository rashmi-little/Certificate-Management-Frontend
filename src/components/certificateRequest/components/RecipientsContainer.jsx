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

  return (
    <section className="grid grid-cols-2 gap-6 overflow-x-hidden">
      <UploadRecipientDetails />
      <Recipients />
    </section>
  );
};

export default RecipientsContainer;
