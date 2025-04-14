import React, { useState } from "react";
import MiniHeading from "./MiniHeading";
import { useDispatch, useSelector } from "react-redux";
import RecipientsList from "./RecipientsList";
import RemoveRecipientModel from "./RemoveRecipientModel";
import { REMOVE_RECIPIENT } from "../../../redux/certificate/ActionType";

const SummaryContainer = () => {
  const selectedTemplate = useSelector(
    (store) => store?.certificate?.selectedTemplate
  );
  console.log(selectedTemplate);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const selectedRecipient = useSelector(
    (store) => store?.certificate?.currentSelectedRecipient
  );
  function handleConfirmDelete() {
    console.log("Now data will be deleted");
    dispatch({
      type: REMOVE_RECIPIENT,
      payload: selectedRecipient,
    });
    setShowDeleteModal(false);
  }

  return (
    <div className="rounded-[16px] flex flex-col gap-4 p-4 shadow-[6px_6px_12px_rgba(0,0,0,0.06)] bg-[#FFFFFF] overflow-y-auto">
      <div>
        <MiniHeading title={"Summary"} />
      </div>

      <div className="flex justify-between items-center text-[#394555]">
        <p className="font-roboto font-[400]">Selected template</p>
        <div className="border border-[#408DFF] bg-[#0066FF]/[0.1] p-[2.5px] rounded-[4px] h-[33vh] aspect-[1.38] w-full md:w-[99.6px] md:h-[72px]">
          <img
            src={selectedTemplate.imageLink}
            alt="image"
            className="w-full h-full rounded-[2.23px]"
          />
        </div>
      </div>

      <p className="font-roboto font-[400] text-[#394555]">Added Recipients</p>

      <RecipientsList setShowDeleteModal={setShowDeleteModal}/>

      {showDeleteModal && (
        <RemoveRecipientModel
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default SummaryContainer;

{
  /* <div
      className={template.isActive ? activeStyling : basicStyling}
      // className={selectedTemplate.templateId === template.templateId ? activeStyling : basicStyling}
      data-templateid={template.id}
      onClick={() => handleTemplateClick(template.templateId)}
    >
      <div className="h-full rounded-2xl">
        <img
          src={template.imageLink}
          alt="template image"
          className="w-full h-full rounded-2xl"
        />
      </div> */
}
