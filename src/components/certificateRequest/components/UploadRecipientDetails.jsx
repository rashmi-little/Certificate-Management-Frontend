import React from "react";
import MiniHeading from "./MiniHeading";

const UploadRecipientDetails = () => {
  const inputStyling =
    "w-full border border-[#DEE0E3] p-4 rounded-[12px] placeholder-[#9CA3AF] placeholder:text-[16px]";
  const labelStyling = "font-roboto font-normal text-[16px]";
  return (
    <div className="rounded-[16px] flex flex-col gap-4 p-4 shadow-[6px_6px_12px_rgba(0,0,0,0.06)] bg-[#FFFFFF] overflow-y-scroll">
      <div>
        <MiniHeading title={"Upload Recipients Details"} />
      </div>

      <div className="flex flex-col gap-4 h-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fName" className={labelStyling}>
              First Name*
            </label>
            <input
              type="text"
              name="fName"
              id="#"
              required
              placeholder="First Name"
              className={inputStyling}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lName" className={labelStyling}>
              Last Name*
            </label>
            <input
              type="text"
              name="lName"
              id="#"
              required
              placeholder="Last Name"
              className={inputStyling}
            />
          </div>
        </div>

        {/* first block first name and last name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelStyling}>
            Email*
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="e.g. johndoe@example.com"
            className={inputStyling}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="f1" className={labelStyling}>
            Data Field n1
          </label>
          <input
            type="text"
            name="f1"
            className={inputStyling}
            placeholder="Data Placeholder n1"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="f2" className={labelStyling}>
            Data Field n2
          </label>
          <input
            type="text"
            name="f2"
            className={inputStyling}
            placeholder="Data Placeholder n2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="f3" className={labelStyling}>
            Data Field n3
          </label>
          <input
            type="text"
            name="f3"
            className={inputStyling}
            placeholder="Data Placeholder n3"
          />
        </div>
        <div>
          <button
            type="submit"
            className={`${inputStyling} text-center text-white bg-blue-500 font-roboto font-medium text-[16px]`}
          >
            Add Recipient
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadRecipientDetails;
