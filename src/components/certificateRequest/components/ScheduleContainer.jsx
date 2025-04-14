import React, { useState } from "react";
import MiniHeading from "./MiniHeading";
import DatePicker from "../../../assets/vector/DatePicker.svg";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DECREASE_STEPPER_COUNT } from "../../../redux/certificate/ActionType";
import { useDispatch, useSelector } from "react-redux";
import RequestSuccessModal from "./RequestSuccessModal";
import { makeCertificateRequest } from "../../../redux/certificate/Action";
import ErrorModal from "./ErrorModal";

const ScheduleContainer = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openPicker, setOpenPicker] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const dispatch = useDispatch();

  const currentStep = useSelector((store) => store.certificate?.stepperValue);
  const selectedRecipients = useSelector(
    (store) => store.certificate?.selectedRecipients
  );
  const selectedTemplate = useSelector(
    (store) => store.certificate?.selectedTemplate
  );

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleClose = () => {
    setOpenPicker(false);
  };

  function handleScheduleCancel() {
    dispatch({ type: DECREASE_STEPPER_COUNT, payload: currentStep });
  }

  async function handleScheduleRequestClick() {
    setRequestType(() => "SCHEDULED");

    const requestData = generateRequestPayload("SCHEDULED");

    console.log(requestData);

    const result = await makeCertificateRequest(requestData);
    if (result.success) {
      setShowSaveModal(true);
    } else {
      setErrorModal(true);
    }
  }

  async function handleImmediateRequestClick() {
    setRequestType(() => "Sent");

    const requestData = generateRequestPayload("IMMEDIATE");

    console.log(requestData);

    const result = await makeCertificateRequest(requestData);
    if (result.success) {
      setShowSaveModal(true);
    } else {
      setErrorModal(true);
    }
  }

  function generateRequestPayload(generationType) {
    const backendDateTimeString = selectedDate.format("YYYY-MM-DD");
    const requestData = {
      templateId: selectedTemplate.templateId,
      generationType: generationType,
      scheduledDate: backendDateTimeString,
      recipientsInfo: JSON.stringify(selectedRecipients),
      requestTitle: "first certificate - april",
    };

    return requestData;
  }

  return (
    <div className="rounded-[16px] flex flex-col gap-4 p-4 shadow-[6px_6px_12px_rgba(0,0,0,0.06)] bg-[#FFFFFF] overflow-y-auto relative">
      <div>
        <MiniHeading title={"Schedule the Request"} />
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-roboto font-[400] text-[#394555]">Select Date</p>
        <div className="p-4 border-1 border-[#DEE0E3] rounded-[12px] flex justify-between">
          <p className="font-roboto font-[400] text-[#394555]">
            {selectedDate.format("DD MMM YYYY")}
          </p>
          <div className="cursor-pointer" onClick={() => setOpenPicker(true)}>
            <img src={DatePicker} alt="date-picker icon" />
          </div>
        </div>

        <button
          className="pt-3 pb-4 text-center bg-[#C0D9FF] rounded-xl cursor-pointer"
          onClick={handleScheduleRequestClick}
        >
          <p className="font-roboto font-[500] text-[#0066FF]">
            Schedule Request
          </p>
        </button>

        <p className="self-center font-roboto font-[500] text-[#394555]">or</p>

        <button
          className="pt-3 pb-4 text-center bg-[#0066FF] rounded-xl cursor-pointer"
          onClick={handleImmediateRequestClick}
        >
          <p className="font-roboto font-[500] text-[#FFFFFF]">Send Now</p>
        </button>

        <button
          className="pt-3 pb-4 text-center rounded-xl cursor-pointer border-1 border-[#0066FF]"
          onClick={handleScheduleCancel}
        >
          <p className="font-roboto font-[500] text-[#0066FF]">Cancel</p>
        </button>

        {/* Move DateTimePicker outside the clickable area */}
        {openPicker && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              open={openPicker}
              value={selectedDate}
              onChange={handleDateChange}
              disablePast
              minDate={dayjs()}
              onClose={handleClose}
              onAccept={handleClose}
              closeOnSelect={false} // Don't close when date is selected
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    visibility: "hidden",
                    height: 0,
                    padding: 0,
                    minHeight: 0,
                    minWidth: 0,
                  },
                },
                popper: {
                  placement: "top-end", // Position below the input
                  sx: { zIndex: 9999 }, // Ensure it appears above other elements
                },
              }}
            />
          </LocalizationProvider>
        )}
      </div>

      <RequestSuccessModal
        open={showSaveModal}
        setOpenModal={setShowSaveModal}
        totalCertificate={selectedRecipients.length}
        type={requestType}
      />

      <ErrorModal open={errorModal} setOpenModal={setErrorModal} />
    </div>
  );
};

export default ScheduleContainer;
