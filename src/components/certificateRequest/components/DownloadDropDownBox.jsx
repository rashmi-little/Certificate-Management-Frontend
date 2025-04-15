import React, { useEffect, useRef } from "react";
import downwardArrow from "../../../assets/vector/downwardArrow.png";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateStructure } from "../../../redux/certificate/Action";
import * as XLSX from "xlsx";
const DownloadDropDownBox = ({ template }) => {
  const dispatch = useDispatch();
  const linkRef = useRef();

  async function handleDownloadClick() {
    
    if (linkRef.current) {
      linkRef.current.click();
    }
  }

  return (
    <div
      className="flex items-center py-3 px-4 gap-2 bg-white border border-[#DEE0E3] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer"
      onClick={handleDownloadClick}
    >
      <div className="font-roboto font-normal text-[18px] leading-[16px] text-[#5A6472] flex-none order-0 flex-grow-0 text-nowrap">
        Download Sample data
      </div>
      <div className="flex-none order-1 flex-grow-0">
        <img src={downwardArrow} alt="Icon" className="w-[16px] h-[16px]" />
      </div>

      <a
        href={template.sampleDataLink}
        // download={`${template.templateId}-sample.xlsx`}
        ref={linkRef}
        style={{ display: "none" }}
      >
        Download
      </a>
    </div>
  );
};

export default DownloadDropDownBox;
