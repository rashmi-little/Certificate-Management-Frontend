import React, { useState } from "react";
import RecipientsList from "./RecipientsList";
import MiniHeading from "./MiniHeading";
import RemoveRecipientModel from "./RemoveRecipientModel";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_RECIPIENT } from "../../../redux/certificate/ActionType";

const Recipients = () => {
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
    <div className="rounded-[16px] flex flex-col gap-4 p-4 shadow-[6px_6px_12px_rgba(0,0,0,0.06)] bg-[#FFFFFF] overflow-y-auto max-w-full overflow-x-hidden">
      <div>
        <MiniHeading title={"Recipients"} />
      </div>
      <RecipientsList setShowDeleteModal={setShowDeleteModal} />

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

export default Recipients;
