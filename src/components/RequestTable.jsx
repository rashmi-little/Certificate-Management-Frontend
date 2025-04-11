import TableHeader from "./TableHeader";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleRequestInfo } from "../redux/certificate/Action";
import { useNavigate } from "react-router-dom";

const RequestTable = () => {
  const dropdownTriggerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [activeRowId, setActiveRowId] = useState(null); // To track which row is active

  const handleButtonClick = (e, rowId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setActiveRowId(rowId);
    setDropdownVisible(true);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
    setActiveRowId(null);
  };

  useEffect(() => {
    console.log("Inside useEffect ");
    dispatch(getScheduleRequestInfo());
  }, []);

  const handleNavigation = () => {
    navigate("/logs?status=SCHEDULE");
  };

  const handleEditClick = (id) => {
    navigate(`/logs/view-request/${id}`);
  };

  const requests = useSelector(
    (state) => state.certificate?.scheduleRequestInfoData
  );

  const requestSize = requests?.length;
  const countText =
    requestSize < 5 ? `(${requestSize}/${requestSize})` : `(5/${requestSize})`;

  const displayedRequests =
    requests?.length > 5 ? requests?.slice(0, 5) : requests;
  // console.log(requests);
  return (
    <div className="flex flex-col items-start p-4 gap-4 w-auto h-auto bg-white shadow-lg rounded-xl z-1">
      <div className="flex flex-row items-center p-0 gap-4 w-auto h-[24px] self-stretch">
        {/* w-[998px] */}
        <div className="flex flex-row items-baseline p-0 gap-4 w-auto h-[22px] ">
          <span className="w-[183px] h-[20px] font-roboto font-medium text-[20px] leading-[20px] text-[#394555]">
            Scheduled Requests
          </span>
          <span className="w-[45px] h-[20px] font-roboto font-normal text-[16px] leading-[20px] text-[#394555]">
            {countText}
          </span>
        </div>
        <span
          className="w-[74px] font-roboto font-medium text-[16px] leading-[16px]  text-[#0066FF] ml-auto cursor-pointer"
          onClick={handleNavigation}
        >
          View All
        </span>
      </div>
      <div className="flex flex-col items-start w-full h-auto bg-white">
        <TableHeader />{" "}
        {displayedRequests?.map((request) => (
          <div
            key={request.certificateRequestId}
            className="flex flex-row items-center p-[12px_24px] gap-2 w-full h-[56px] border-b-[0.6px] border-[#DEE0E3] rounded-[8px] flex-none order-1 align-self-stretch flex-grow-0 z-1 justify-between "
          >
            <div
              className="flex flex-row items-center p-0 gap-2 w-[91.2px] h-[16px] flex-none order-0 flex-grow-0 cursor-pointer"
              onClick={() => {
                handleEditClick(request.certificateRequestId);
              }}
            >
              {" "}
              <span className="w-[24px] h-[16px] font-roboto font-normal text-[14px] leading-[16px] text-[#394555] opacity-90 flex-none order-0 flex-grow-0">
                {request.certificateRequestId}{" "}
              </span>{" "}
            </div>{" "}
            <div
              className="flex flex-row items-center p-0 gap-1 w-[300px] h-[16px] flex-none order-1 flex-grow-0 cursor-pointer"
              onClick={() => {
                handleEditClick(request.certificateRequestId);
              }}
            >
              {" "}
              <span className="w-full h-[16px] font-roboto font-normal text-[14px] leading-[16px] text-[#394555] opacity-90 flex-none order-0 flex-grow-0">
                {request.templateName}{" "}
              </span>{" "}
            </div>{" "}
            <div
              className="flex flex-row items-center p-0 gap-2 w-[140.2px] h-[16px] flex-none order-2 flex-grow-0 cursor-pointer"
              onClick={() => {
                handleEditClick(request.certificateRequestId);
              }}
            >
              {" "}
              <span className="w-[73px] h-[16px] font-roboto font-normal text-[14px] leading-[16px] text-[#394555] opacity-90">
                {request.noOfCertificates}{" "}
              </span>{" "}
            </div>{" "}
            <div
              className="flex flex-row items-center p-0 gap-2 w-[270.53px] h-[16px] flex-none order-3 flex-grow-0 cursor-pointer"
              onClick={() => {
                handleEditClick(request.certificateRequestId);
              }}
            >
              {" "}
              <span className="w-[128.53px] h-[16px] font-roboto font-normal text-[14px] leading-[16px] text-[#394555] opacity-90">
                {request.categoryName}{" "}
              </span>{" "}
            </div>{" "}
            <div
              className="flex flex-row items-center p-0 gap-2 w-[212.53px] h-[16px] flex-none order-4 flex-grow-0 cursor-pointer"
              onClick={() => {
                handleEditClick(request.certificateRequestId);
              }}
            >
              {" "}
              <span className="w-[154px] h-[16px] font-roboto font-normal text-[14px] leading-[16px] text-[#394555] opacity-90">
                {request.scheduledDate}{" "}
              </span>{" "}
            </div>
            {/* Date Column 2 */}{" "}
            <div
              className="flex flex-row items-center p-0 gap-2 w-[148.53px] h-[16px] flex-none order-5 flex-grow-1 cursor-pointer"
              onClick={() => {
                handleEditClick(request.certificateRequestId);
              }}
            >
              {" "}
              <span
                className={`w-[112px] h-[16px] font-roboto font-normal text-[14px] leading-[16px] text-[#394555] opacity-90`}
              >
                {request.status}{" "}
              </span>{" "}
            </div>{" "}
            <div className="flex flex-row justify-center items-center p-0 gap-2 w-[104px] h-[24px] flex-none order-6 flex-grow-0 relative curser-pointer">
              {" "}
              <span
                ref={dropdownTriggerRef}
                className="flex flex-row justify-center items-center p-1 gap-2 w-6 h-6 bg-gray-100 rounded-full cursor-pointer"
                onClick={(e) =>
                  dropdownVisible
                    ? closeDropdown()
                    : handleButtonClick(e, request.certificateRequestId)
                }
              >
                {" "}
                <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 3.5C2.82843 3.5 3.5 2.82843 3.5 2C3.5 1.17157 2.82843 0.5 2 0.5C1.17157 0.5 0.5 1.17157 0.5 2C0.5 2.82843 1.17157 3.5 2 3.5ZM2 9.5C2.82843 9.5 3.5 8.82843 3.5 8C3.5 7.17157 2.82843 6.5 2 6.5C1.17157 6.5 0.5 7.17157 0.5 8C0.5 8.82843 1.17157 9.5 2 9.5ZM3.5 14C3.5 14.8284 2.82843 15.5 2 15.5C1.17157 15.5 0.5 14.8284 0.5 14C0.5 13.1716 1.17157 12.5 2 12.5C2.82843 12.5 3.5 13.1716 3.5 14Z"
                    fill="#5A6472"
                  />
                </svg>
              </span>{" "}
            </div>{" "}
          </div>
        ))}
        {dropdownVisible && (
          <div
            className="absolute flex flex-col items-start p-1.5 w-[151px] h-auto bg-white border border-[#DEE0E3] shadow-[...] rounded-[12px] z-50"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left - 130}px`,
            }}
          >
            <div
              className="flex flex-row items-center p-[8px_12px] gap-1 w-[103px] h-[32px] bg-white cursor-pointer"
              onClick={() => {
                handleEditClick(activeRowId);
                closeDropdown();
              }}
            >
              <div className="w-[79px] h-[16px] text-[#757D8A] font-roboto text-[14px] leading-[16px]">
                Edit Request
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default RequestTable;
