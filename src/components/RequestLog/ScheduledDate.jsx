import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ScheduledDate = ({ requestView, isEditing, onDateChange }) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    requestView?.scheduledDate ? dayjs(requestView.scheduledDate) : null
  );

  useEffect(() => {
    if (isEditing && selectedDate && onDateChange) {
      onDateChange(selectedDate.format("YYYY-MM-DDTHH:mm:ss"));
    }
  }, [isEditing]);
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (onDateChange && newDate) {
      onDateChange(newDate.format("YYYY-MM-DDTHH:mm:ss"));
    }
  };

  return (
    <div className="flex flex-col items-start p-0 gap-2 w-full rounded-lg">
      <span className="w-full text-[#9BA2AB] font-roboto font-normal text-sm leading-4 tracking-[-0.01em]">
        Dated
      </span>

      <div
        className={`w-full h-[48px] flex flex-row items-center px-4 gap-2 rounded-[8px] ${
          isEditing ? "bg-transparent" : "bg-[#FAFAFA]"
        }`}
      >
        {!isEditing ? (
          <span className="text-[#333] font-roboto text-[16px] leading-[19px]">
            {requestView?.scheduledDate}
          </span>
        ) : (
          <>
            {openPicker ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  disablePast
                  onClose={() => setOpenPicker(false)}
                  slotProps={{
                    paperContent: {
                      sx: {
                        width: "100x",
                        height: "200px",
                        padding: 1,
                        overflow: "auto",
                      },
                    },
                    textField: {
                      size: "small",
                      sx: { width: 200 },
                    },
                  }}
                />
              </LocalizationProvider>
            ) : (
              <div
                className="cursor-pointer text-[#0066FF] text-[16px] font-medium"
                onClick={() => setOpenPicker(true)}
              >
                Re-schedule
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduledDate;
