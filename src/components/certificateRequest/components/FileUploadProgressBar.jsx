import React from "react";

const FileUploadProgressBar = ({
  fileName,
  progress,
  cancelClick,
  isFileProcessingError,
  fileProcessingErrorMessage,
}) => {

    console.log(fileProcessingErrorMessage);
    
  return (
    <div
      className={`p-3.5 flex flex-col gap-2.5 justify-between border rounded-lg
        ${isFileProcessingError ? "bg-[#FCCBCB]" : "bg-[#FAFAFA]"} 
        border-[#DEE0E3]`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {/* Success Check Icon */}
          {progress === 100 && !isFileProcessingError && (
            <div className="rounded-full bg-green-600 p-[2px]" data-testid="success-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 12L10.5 15L13.5 12L16.5 9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* File Name */}
          <p
            className={`font-roboto text-[18px] ${isFileProcessingError ? "text-[#F22C2C]" : "text-[#394555]"}`}
          >
            {fileName}
          </p>
        </div>

        {/* Cancel Button */}
        <button className="cursor-pointer" onClick={cancelClick}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 1.5L9 9M9 9L1.5 1.5M9 9L16.5 16.5M9 9L1.5 16.5"
              stroke={isFileProcessingError ? "#F22C2C" : "#757D8A"}
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-testid="cancel-icon-path"
            />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div
        className={`w-full h-2.5 border rounded-full overflow-hidden 
  ${isFileProcessingError ? "bg-[#F99696] border-[#F99696]" : "bg-white border-[#DEE0E3]"}`}
      >
        <div
          className={`h-full transition-all duration-500 ease-in-out 
      ${isFileProcessingError ? "bg-[#F22C2C]" : "bg-blue-500"}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {fileProcessingErrorMessage !== "" && <p className="font-roboto font-[400] text-[15px] text-[#F22C2C]">{fileProcessingErrorMessage}</p>}
    </div>
  );
};

export default FileUploadProgressBar;
