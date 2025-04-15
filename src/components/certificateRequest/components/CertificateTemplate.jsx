import React from "react";
import dummyTemplate from "../../../assets/vector/certificate-dummy-template.png";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTIVE_FOOTER_SUBMIT,
  INACTIVE_FOOTER_SUBMIT,
} from "../../../redux/certificate/ActionType";

const CertificateTemplate = ({ template, handleTemplateClick }) => {
  const selectedTemplate = useSelector(
    (store) => store.certificate?.selectedTemplate
  );
  const basicStyling =
    "border border-[#DEE0E3] bg-[#FAFAFA] p-2 rounded-2xl relative h-[258.31px] w-[357.33px] max-h-[33vh] max-w-[33vw] aspect-[1.38] w-full flex justify-center items-center";
  const activeStyling =
    "border border-[#408DFF] bg-[#0066FF]/[0.1] p-2 rounded-2xl relative h-[258.31px] w-[357.33px] max-h-[33vh] max-w-[33vw] aspect-[1.38] w-full flex justify-center items-center";

  // if (selectedTemplate && template.templateId === selectedTemplate.templateId) {
  //   template.isActive = true;
  // }
  return (
    <div
      className={template.isActive ? activeStyling : basicStyling}
      // className={selectedTemplate.templateId === template.templateId ? activeStyling : basicStyling}
      data-templateid={template.id}
      onClick={() => handleTemplateClick(template.templateId)}
    >
      <div className="h-full w-full rounded-2xl" style={{ aspectRatio: 1.38 }}>
        <img
          src={template.imageLink}
          alt="template image"
          className="h-full w-full rounded-2xl object-contain"
        />
      </div>
      <div className="flex justify-between absolute w-[92%] left-[20px] top-[20px]">
        {template.isActive ? (
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.757812" width="32" height="32" rx="16" fill="#408DFF" />
            <rect
              x="8.75781"
              y="8"
              width="16"
              height="16"
              rx="8"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.75781 16C1.75781 7.71573 8.47354 1 16.7578 1C25.0421 1 31.7578 7.71573 31.7578 16C31.7578 24.2843 25.0421 31 16.7578 31C8.47354 31 1.75781 24.2843 1.75781 16Z"
              stroke="#5A6472"
              strokeWidth="2"
            />
          </svg>
        )}

        <div className="w-8 h-8 rounded-full border border-[#004DC0] flex items-center justify-center bg-[#FAFAFA]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5001 2.5L13.0001 6.49365M13.5001 2.5L9.5 3M13.5001 2.5L9.5 6.5M2.50015 13.5L3 9.5M2.50015 13.5L6.5 13M2.50015 13.5L6.5 9.50635M13.4999 13.5L13 9.5M13.4999 13.5L9.5 13M13.4999 13.5L9.5 9.5M2.5 2.5L3 6.5M2.5 2.5L6.5 3M2.5 2.5L6.5 6.5"
              stroke="#004DC0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
