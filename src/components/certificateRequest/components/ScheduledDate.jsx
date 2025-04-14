import React, { useState } from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ScheduledDate = ({ onChange }) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setOpenPicker(false); // Close the picker after selection
    if (onChange && newDate) {
      onChange(newDate.format("YYYY-MM-DD"));
    }
  };

  return (
    <div className="flex flex-col items-start p-0 gap-2 w-full rounded-lg">

      <div className="w-full h-[48px] flex flex-row items-center px-4 gap-2 rounded-[8px] bg-[#FAFAFA]">
        {openPicker ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              open
              value={selectedDate}
              onChange={handleDateChange}
              disablePast
              minDate={dayjs()}
              onClose={() => setOpenPicker(false)}
              slotProps={{
                textField: {
                  size: "small",
                  sx: { width: "100%" },
                },
              }}
            />
          </LocalizationProvider>
        ) : (
          <div
            className="cursor-pointer text-[#0066FF] text-[16px] font-medium"
            onClick={() => setOpenPicker(true)}
          >
            {selectedDate ? selectedDate.format("MMM DD, YYYY") : "Set schedule"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledDate;