import React from "react";
import MiniHeading from "./MiniHeading";
import UploadRecipientDetails from "./UploadRecipientDetails";
import Recipients from "./Recipients";

const RecipientsContainer = () => {
  return (
    <section className="grid grid-cols-2 gap-6 overflow-x-hidden">
      <UploadRecipientDetails />
      <Recipients />
    </section>
  );
};

export default RecipientsContainer;
