import React, { useEffect, useRef } from "react";
import downwardArrow from "../../../assets/vector/downwardArrow.png";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateStructure } from "../../../redux/certificate/Action";
import * as XLSX from 'xlsx';
const DownloadDropDownBox = ({template}) => {
  
  const dispatch = useDispatch();
  
   async function handleDownloadClick() {
    const templateId = template.templateId;
     const structure = await dispatch(getTemplateStructure(templateId));
     console.log(structure);
     exportToExcel(JSON.stringify(structure));
  }

  function exportToExcel(data) {
    const fileName = template.templateId;
    console.log(fileName);
    
    try {
      console.log(data);
      
      const jsonData = JSON.parse(data);
      const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
      const worksheet = XLSX.utils.json_to_sheet(dataArray);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
      console.log("success");
      
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  
  
  return (
    <div className="flex items-center py-3 px-4 gap-2 bg-white border border-[#DEE0E3] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer" onClick={handleDownloadClick}>
      <div className="font-roboto font-normal text-[18px] leading-[16px] text-[#5A6472] flex-none order-0 flex-grow-0 text-nowrap">
        Download Sample data
      </div>
      <div className="flex-none order-1 flex-grow-0">
        <img src={downwardArrow} alt="Icon" className="w-[16px] h-[16px]" />
      </div>
    </div>
  );
};

export default DownloadDropDownBox;
