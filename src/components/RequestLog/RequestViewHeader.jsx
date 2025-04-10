import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const RequestViewHeader = ({ onBackClick }) => {
  return (
    <div className="h-[72px] flex items-start p-4 gap-8 bg-white shadow-md rounded-xl flex-grow-0 z-0">
      <div className="flex items-center h-[40px] gap-2">
        <span className="w-[24px] h-[24px]">
          <ArrowBackIosIcon
            sx={{ color: "#757D8A", cursor: "pointer" }}
            onClick={onBackClick}
          />
        </span>
        <div className="font-['Roboto'] font-medium text-[24px] leading-[150%] tracking-[-0.01em] align-middle">
          Request
        </div>
      </div>
    </div>
  );
};

export default RequestViewHeader;
