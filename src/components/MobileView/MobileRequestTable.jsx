import TableHeader from "../../components/TableHeader";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleRequestInfo } from "../../redux/certificate/Action";
import { useNavigate } from "react-router-dom";

export const MobileRequestTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleNavigation = () => {
    navigate("/logs?status=SCHEDULE");
  };
  const handleEditClick = (id) => {
    navigate(`/logs/view-request/${id}`);
  };

  useEffect(() => {
    console.log("Inside useEffect ");
    dispatch(getScheduleRequestInfo());
  }, []);

  const requests = useSelector(
    (state) => state.certificate?.scheduleRequestInfoData
  );

  const requestSize = requests?.length;
  const countText =
    requestSize < 5 ? `(${requestSize}/${requestSize})` : `(5/${requestSize})`;

  const displayedRequests =
    requests?.length > 5 ? requests?.slice(0, 5) : requests;
  return (
    <div className="flex flex-col items-start  gap-2  w-full h-auto  overflow-x-scroll">
      <div className="flex flex-col items-start p-6 gap-4 w-full h-auto bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.08)] rounded-[16px] flex-none order-0 self-stretch">
        <div className="flex flex-row items-center p-0 gap-4 w-full h-[24px] flex-none order-0 self-stretch">
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
        {displayedRequests?.map((request) => (
          <div
            key={request.certificateRequestId}
            className="flex flex-col items-start p-0 gap-4 w-full h-[319px] flex-none order-1 self-stretch"
          >
            <div className="flex flex-col items-start p-0 gap-4 w-full h-[303px] bg-white opacity-90 flex-none order-0 self-stretch">
              <div className="flex flex-row items-center p-0 gap-2 w-full h-[43px] flex-none order-0 self-stretch">
                <div className="flex flex-col items-start p-0 gap-2 w-auto h-[43px] flex-none order-0 flex-grow">
                  <div className="w-full h-[16px] text-[14px] leading-[16px] font-roboto font-normal text-[#41464D] flex-none order-0 self-stretch">
                    Request Title
                  </div>
                  <div className="w-full h-[19px] text-[16px] leading-[19px] font-roboto font-medium text-[#41464D] flex-none order-1 self-stretch">
                    {request.templateName}
                  </div>
                </div>
                <svg
                  width="67"
                  height="28"
                  viewBox="0 0 67 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="67" height="28" rx="8" fill="#FFE2C0" />
                  <path
                    d="M12.9238 15.0967H10.2646V14.0234H12.9238C13.4388 14.0234 13.8558 13.9414 14.1748 13.7773C14.4938 13.6133 14.7262 13.3854 14.8721 13.0938C15.0225 12.8021 15.0977 12.4694 15.0977 12.0957C15.0977 11.7539 15.0225 11.4326 14.8721 11.1318C14.7262 10.8311 14.4938 10.5895 14.1748 10.4072C13.8558 10.2204 13.4388 10.127 12.9238 10.127H10.5723V19H9.25293V9.04688H12.9238C13.6758 9.04688 14.3115 9.17676 14.8311 9.43652C15.3506 9.69629 15.7448 10.0563 16.0137 10.5166C16.2826 10.9723 16.417 11.4941 16.417 12.082C16.417 12.7201 16.2826 13.2646 16.0137 13.7158C15.7448 14.167 15.3506 14.5111 14.8311 14.748C14.3115 14.9805 13.6758 15.0967 12.9238 15.0967ZM20.8672 19.1367C20.3522 19.1367 19.8851 19.0501 19.4658 18.877C19.0511 18.6992 18.6934 18.4508 18.3926 18.1318C18.0964 17.8128 17.8685 17.4346 17.709 16.9971C17.5495 16.5596 17.4697 16.0811 17.4697 15.5615V15.2744C17.4697 14.6729 17.5586 14.1374 17.7363 13.668C17.9141 13.194 18.1556 12.793 18.4609 12.4648C18.7663 12.1367 19.1126 11.8883 19.5 11.7197C19.8874 11.5511 20.2884 11.4668 20.7031 11.4668C21.2318 11.4668 21.6875 11.5579 22.0703 11.7402C22.4577 11.9225 22.7744 12.1777 23.0205 12.5059C23.2666 12.8294 23.4489 13.2122 23.5674 13.6543C23.6859 14.0918 23.7451 14.5703 23.7451 15.0898V15.6572H18.2217V14.625H22.4805V14.5293C22.4622 14.2012 22.3939 13.8822 22.2754 13.5723C22.1615 13.2624 21.9792 13.0072 21.7285 12.8066C21.4779 12.6061 21.1361 12.5059 20.7031 12.5059C20.416 12.5059 20.1517 12.5674 19.9102 12.6904C19.6686 12.8089 19.4613 12.9867 19.2881 13.2236C19.1149 13.4606 18.9805 13.75 18.8848 14.0918C18.7891 14.4336 18.7412 14.8278 18.7412 15.2744V15.5615C18.7412 15.9124 18.7891 16.2428 18.8848 16.5527C18.985 16.8581 19.1286 17.127 19.3154 17.3594C19.5068 17.5918 19.737 17.7741 20.0059 17.9062C20.2793 18.0384 20.5892 18.1045 20.9355 18.1045C21.3822 18.1045 21.7604 18.0133 22.0703 17.8311C22.3802 17.6488 22.6514 17.4049 22.8838 17.0996L23.6494 17.708C23.4899 17.9495 23.2871 18.1797 23.041 18.3984C22.7949 18.6172 22.4919 18.7949 22.1318 18.9316C21.7764 19.0684 21.3548 19.1367 20.8672 19.1367ZM26.4863 13.1826V19H25.2217V11.6035H26.418L26.4863 13.1826ZM26.1855 15.0215L25.6592 15.001C25.6637 14.4951 25.7389 14.028 25.8848 13.5996C26.0306 13.1667 26.2357 12.7907 26.5 12.4717C26.7643 12.1527 27.0788 11.9066 27.4434 11.7334C27.8125 11.5557 28.2204 11.4668 28.667 11.4668C29.0316 11.4668 29.3597 11.5169 29.6514 11.6172C29.943 11.7129 30.1914 11.8678 30.3965 12.082C30.6061 12.2962 30.7656 12.5742 30.875 12.916C30.9844 13.2533 31.0391 13.6657 31.0391 14.1533V19H29.7676V14.1396C29.7676 13.7523 29.7106 13.4424 29.5967 13.21C29.4827 12.973 29.3164 12.8021 29.0977 12.6973C28.8789 12.5879 28.61 12.5332 28.291 12.5332C27.9766 12.5332 27.6895 12.5993 27.4297 12.7314C27.1745 12.8636 26.9535 13.0459 26.7666 13.2783C26.5843 13.5107 26.4408 13.7773 26.3359 14.0781C26.2357 14.3743 26.1855 14.6888 26.1855 15.0215ZM37.6221 17.5645V8.5H38.8936V19H37.7314L37.6221 17.5645ZM32.6455 15.3838V15.2402C32.6455 14.6751 32.7139 14.1624 32.8506 13.7021C32.9919 13.2373 33.1901 12.8385 33.4453 12.5059C33.7051 12.1732 34.0127 11.918 34.3682 11.7402C34.7282 11.5579 35.1292 11.4668 35.5713 11.4668C36.0361 11.4668 36.4417 11.5488 36.7881 11.7129C37.139 11.8724 37.4352 12.1071 37.6768 12.417C37.9229 12.7223 38.1165 13.0915 38.2578 13.5244C38.3991 13.9574 38.4971 14.4473 38.5518 14.9941V15.623C38.5016 16.1654 38.4036 16.653 38.2578 17.0859C38.1165 17.5189 37.9229 17.888 37.6768 18.1934C37.4352 18.4987 37.139 18.7334 36.7881 18.8975C36.4372 19.057 36.027 19.1367 35.5576 19.1367C35.1247 19.1367 34.7282 19.0433 34.3682 18.8564C34.0127 18.6696 33.7051 18.4076 33.4453 18.0703C33.1901 17.7331 32.9919 17.3366 32.8506 16.8809C32.7139 16.4206 32.6455 15.9215 32.6455 15.3838ZM33.917 15.2402V15.3838C33.917 15.7529 33.9535 16.0993 34.0264 16.4229C34.1038 16.7464 34.2223 17.0312 34.3818 17.2773C34.5413 17.5234 34.7441 17.7171 34.9902 17.8584C35.2363 17.9951 35.5303 18.0635 35.8721 18.0635C36.2913 18.0635 36.6354 17.9746 36.9043 17.7969C37.1777 17.6191 37.3965 17.3844 37.5605 17.0928C37.7246 16.8011 37.8522 16.4844 37.9434 16.1426V14.4951C37.8887 14.2445 37.8089 14.0029 37.7041 13.7705C37.6038 13.5335 37.4717 13.3239 37.3076 13.1416C37.1481 12.9548 36.9499 12.8066 36.7129 12.6973C36.4805 12.5879 36.2048 12.5332 35.8857 12.5332C35.5394 12.5332 35.2409 12.6061 34.9902 12.752C34.7441 12.8932 34.5413 13.0892 34.3818 13.3398C34.2223 13.5859 34.1038 13.873 34.0264 14.2012C33.9535 14.5247 33.917 14.8711 33.917 15.2402ZM42.2363 11.6035V19H40.9648V11.6035H42.2363ZM40.8691 9.6416C40.8691 9.43652 40.9307 9.26335 41.0537 9.12207C41.1813 8.98079 41.3682 8.91016 41.6143 8.91016C41.8558 8.91016 42.0404 8.98079 42.168 9.12207C42.3001 9.26335 42.3662 9.43652 42.3662 9.6416C42.3662 9.83757 42.3001 10.0062 42.168 10.1475C42.0404 10.2842 41.8558 10.3525 41.6143 10.3525C41.3682 10.3525 41.1813 10.2842 41.0537 10.1475C40.9307 10.0062 40.8691 9.83757 40.8691 9.6416ZM45.5312 13.1826V19H44.2666V11.6035H45.4629L45.5312 13.1826ZM45.2305 15.0215L44.7041 15.001C44.7087 14.4951 44.7839 14.028 44.9297 13.5996C45.0755 13.1667 45.2806 12.7907 45.5449 12.4717C45.8092 12.1527 46.1237 11.9066 46.4883 11.7334C46.8574 11.5557 47.2653 11.4668 47.7119 11.4668C48.0765 11.4668 48.4046 11.5169 48.6963 11.6172C48.988 11.7129 49.2363 11.8678 49.4414 12.082C49.651 12.2962 49.8105 12.5742 49.9199 12.916C50.0293 13.2533 50.084 13.6657 50.084 14.1533V19H48.8125V14.1396C48.8125 13.7523 48.7555 13.4424 48.6416 13.21C48.5277 12.973 48.3613 12.8021 48.1426 12.6973C47.9238 12.5879 47.6549 12.5332 47.3359 12.5332C47.0215 12.5332 46.7344 12.5993 46.4746 12.7314C46.2194 12.8636 45.9984 13.0459 45.8115 13.2783C45.6292 13.5107 45.4857 13.7773 45.3809 14.0781C45.2806 14.3743 45.2305 14.6888 45.2305 15.0215ZM56.7969 11.6035H57.9453V18.8428C57.9453 19.4945 57.8132 20.0505 57.5488 20.5107C57.2845 20.971 56.9154 21.3197 56.4414 21.5566C55.972 21.7982 55.4297 21.9189 54.8145 21.9189C54.5592 21.9189 54.2585 21.8779 53.9121 21.7959C53.5703 21.7184 53.2331 21.584 52.9004 21.3926C52.5723 21.2057 52.2965 20.9528 52.0732 20.6338L52.7363 19.8818C53.0462 20.2555 53.3698 20.5153 53.707 20.6611C54.0488 20.807 54.3861 20.8799 54.7188 20.8799C55.1198 20.8799 55.4661 20.8047 55.7578 20.6543C56.0495 20.5039 56.2751 20.2806 56.4346 19.9844C56.5986 19.6927 56.6807 19.3327 56.6807 18.9043V13.2305L56.7969 11.6035ZM51.7041 15.3838V15.2402C51.7041 14.6751 51.7702 14.1624 51.9023 13.7021C52.0391 13.2373 52.2327 12.8385 52.4834 12.5059C52.7386 12.1732 53.0462 11.918 53.4062 11.7402C53.7663 11.5579 54.1719 11.4668 54.623 11.4668C55.0879 11.4668 55.4935 11.5488 55.8398 11.7129C56.1908 11.8724 56.487 12.1071 56.7285 12.417C56.9746 12.7223 57.1683 13.0915 57.3096 13.5244C57.4508 13.9574 57.5488 14.4473 57.6035 14.9941V15.623C57.5534 16.1654 57.4554 16.653 57.3096 17.0859C57.1683 17.5189 56.9746 17.888 56.7285 18.1934C56.487 18.4987 56.1908 18.7334 55.8398 18.8975C55.4889 19.057 55.0788 19.1367 54.6094 19.1367C54.1673 19.1367 53.7663 19.0433 53.4062 18.8564C53.0508 18.6696 52.7454 18.4076 52.4902 18.0703C52.235 17.7331 52.0391 17.3366 51.9023 16.8809C51.7702 16.4206 51.7041 15.9215 51.7041 15.3838ZM52.9688 15.2402V15.3838C52.9688 15.7529 53.0052 16.0993 53.0781 16.4229C53.1556 16.7464 53.2718 17.0312 53.4268 17.2773C53.5863 17.5234 53.7891 17.7171 54.0352 17.8584C54.2812 17.9951 54.5752 18.0635 54.917 18.0635C55.3363 18.0635 55.6826 17.9746 55.9561 17.7969C56.2295 17.6191 56.446 17.3844 56.6055 17.0928C56.7695 16.8011 56.8971 16.4844 56.9883 16.1426V14.4951C56.9382 14.2445 56.8607 14.0029 56.7559 13.7705C56.6556 13.5335 56.5234 13.3239 56.3594 13.1416C56.1999 12.9548 56.0016 12.8066 55.7646 12.6973C55.5277 12.5879 55.2497 12.5332 54.9307 12.5332C54.5843 12.5332 54.2858 12.6061 54.0352 12.752C53.7891 12.8932 53.5863 13.0892 53.4268 13.3398C53.2718 13.5859 53.1556 13.873 53.0781 14.2012C53.0052 14.5247 52.9688 14.8711 52.9688 15.2402Z"
                    fill="#FF8800"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start p-0 w-full h-[140px] flex-none order-1 self-stretch">
                <div className="box-border flex flex-row items-baseline py-2 px-0 gap-[2px] w-full h-[35px] border-b border-[#FAFAFA] flex-none order-0 self-stretch">
                  <div className="w-auto h-[16px] text-[14px] leading-[16px] font-normal text-[#41464D] flex-none order-0 flex-grow">
                    Request ID
                  </div>
                  <div className="w-auto h-[19px] flex-none order-1 flex-grow-0">
                    {request.certificateRequestId}
                  </div>
                </div>
                <div className="box-border flex flex-row items-baseline py-2 px-0 gap-[2px] w-full h-[35px] border-b border-[#FAFAFA] flex-none order-0 self-stretch">
                  <div className="w-auto h-[16px] text-[14px] leading-[16px] font-normal text-[#41464D] flex-none order-0 flex-grow">
                    Certificates
                  </div>
                  <div className="w-auto h-[19px] flex-none order-1 flex-grow-0">
                    {request.noOfCertificates}
                  </div>
                </div>
                <div className="box-border flex flex-row items-baseline py-2 px-0 gap-[2px] w-full h-[35px] border-b border-[#FAFAFA] flex-none order-0 self-stretch">
                  <div className="w-auto h-[16px] text-[14px] leading-[16px] font-normal text-[#41464D] flex-none order-0 flex-grow">
                    Category
                  </div>
                  <div className="w-auto h-[19px] flex-none order-1 flex-grow-0">
                    {request.categoryName}
                  </div>
                </div>
                <div className="box-border flex flex-row items-baseline py-2 px-0 gap-[2px] w-full h-[35px] border-b border-[#FAFAFA] flex-none order-0 self-stretch">
                  <div className="w-auto h-[16px] text-[14px] leading-[16px] font-normal text-[#41464D] flex-none order-0 flex-grow">
                    Dated
                  </div>
                  <div className="w-auto h-[19px] flex-none order-1 flex-grow-0">
                    {request.scheduledDate}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start p-0 gap-2 w-full h-[88px] flex-none order-2 self-stretch">
                <div
                  className="flex flex-row justify-center items-center px-6 py-3 gap-2 w-full h-[40px] bg-[#0066FF] rounded-[12px] flex-none order-0 self-stretch cursor-pointer"
                  onClick={() => {
                    handleEditClick(request.certificateRequestId);
                  }}
                >
                  <div className="w-[98px] h-[16px] text-white text-[16px] leading-[16px] font-medium text-center flex-none order-0 flex-grow-0">
                    View Request
                  </div>
                </div>
                <div
                  className="flex flex-row justify-center items-center px-6 py-3 gap-2 w-full h-[40px] border border-[#0066FF] rounded-[12px] flex-none order-1 self-stretch box-border cursor-pointer"
                  onClick={() => {
                    handleEditClick(request.certificateRequestId);
                  }}
                >
                  <div className="w-[91px] h-[16px] text-[#0066FF] text-[16px] leading-[16px] font-medium text-center flex-none order-0 flex-grow-0">
                    Edit Request
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
