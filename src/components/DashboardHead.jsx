import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCertificateStatistics } from "../redux/certificate/Action";
import { useDispatch } from "react-redux";

let initialLoad = true;

export const DashboardHead = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Monthly");
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Select Month");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectOption = (option) => {
    setSelectedOption(option);
    setSelectedPeriod(option === "Monthly" ? "Select Month" : "Select Year");
    setDropdownOpen(false);
  };

  const togglePeriodDropdown = () => setPeriodDropdownOpen(!periodDropdownOpen);
  const selectPeriod = (period) => {
    setSelectedPeriod(period);
    setPeriodDropdownOpen(false);
  };

  const toggleCalendar = () => setCalendarOpen(!calendarOpen);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) =>
    (currentYear - i).toString()
  );
  const getStartAndEndDate = () => {
    // Do nothing if no period is selected

    let startDate, endDate;

    if (selectedOption === "Monthly") {
      const monthIndex = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(selectedPeriod);
      const getFormattedDate = (date) => {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000) // Adjust for timezone
          .toISOString()
          .split("T")[0]; // Get yyyy-mm-dd format
      };
      if (initialLoad) {
        // If no period is selected, default to the current month's start and end dates
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        startDate = getFormattedDate(new Date(currentYear, currentMonth, 1));
        endDate = getFormattedDate(new Date(currentYear, currentMonth + 1, 0));
        initialLoad = false;
        return { startDate, endDate };
      }
      if (monthIndex !== -1) {
        startDate = getFormattedDate(new Date(currentYear, monthIndex, 1)); // First day of the month
        endDate = getFormattedDate(new Date(currentYear, monthIndex + 1, 0)); // Last day of the month
      }
    } else if (selectedOption === "Yearly") {
      if (selectedPeriod != "Select Year") {
        startDate = `${selectedPeriod}-01-01`;
        endDate = `${selectedPeriod}-12-31`;
      }
    }

    return { startDate, endDate };
  };
  const formatDate = (date) => {
    if (!date) return null; // Handle null/undefined case
    if (typeof date === "string") return date.trim(); // If it's already a string, return it

    return new Date(date).toISOString().split("T")[0]; // Ensure conversion to 'yyyy-MM-dd'
  };

  useEffect(() => {
    const dates = getStartAndEndDate(); // Your function that gets the start and end dates
    if (dates && dates.startDate && dates.endDate) {
      const formattedStartDate = formatDate(dates.startDate);
      const formattedEndDate = formatDate(dates.endDate);

      console.log("Fetching Data with:", formattedStartDate, formattedEndDate); // Debugging log

      dispatch(getCertificateStatistics(formattedStartDate, formattedEndDate));
    }
  }, [selectedPeriod]);

  return (
    <div className="w-full h-[72px] gap-4 rounded-xl p-4 bg-white shadow-md flex">
      <div className=" w-full h-[40px] gap-2 flex flex-row  ">
        <h2 className=" h-[36px] font-roboto font-medium text-2xl leading-[150%] tracking-tight text-neutral-800">
          Dashboard
        </h2>
        <div className=" w-full h-[40px] flex  gap-2 justify-end">
          <div className="w-[145px] h-[40px] px-4 flex items-center justify-between border border-[#DEE0E3] rounded-[12px] bg-white gap-2 relative">
            <span className="text-[16px] text-[#9BA2AB] whitespace-nowrap">
              {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
            </span>
            <FiCalendar
              aria-label="calendar-icon"
              className="w-[24px] h-[24px] text-gray-500 cursor-pointer"
              onClick={toggleCalendar}
            />
            {calendarOpen && (
              <div className="absolute top-full left-0 z-10 bg-white shadow-lg p-2 border rounded-md">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                />
              </div>
            )}
          </div>
          <div
            className="relative w-[122px] h-[40px] px-4 flex items-center justify-between border border-[#DEE0E3] rounded-[12px] bg-white gap-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="text-[16px] text-[#9BA2AB] whitespace-nowrap">
              {selectedOption}
            </span>
            <svg
              width="15"
              height="7.5"
              viewBox="0 0 15 7.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7.5 6.5L14 1"
                stroke="#757D8A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {dropdownOpen && (
              <div className="absolute w-[128px] h-[75px] left-0 top-full mt-1 bg-white border border-[#DEE0E3] shadow-md rounded-[12px] flex flex-col p-2 z-20">
                <div
                  className="px-4 py-1 hover:bg-gray-100"
                  onClick={() => selectOption("Monthly")}
                >
                  Monthly
                </div>
                <div
                  className="px-4 py-1 hover:bg-gray-100"
                  onClick={() => selectOption("Yearly")}
                >
                  Yearly
                </div>
              </div>
            )}
          </div>
          <div
            className="relative w-[158px] h-[40px] px-4 flex items-center justify-between border border-[#DEE0E3] rounded-[12px] bg-white gap-2 cursor-pointer"
            onClick={togglePeriodDropdown}
          >
            <span className="text-[16px] text-[#9BA2AB] whitespace-nowrap">
              {selectedPeriod}
            </span>
            <svg
              width="15"
              height="7.5"
              viewBox="0 0 15 7.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7.5 6.5L14 1"
                stroke="#757D8A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {periodDropdownOpen && (
              <div className="absolute w-[128px] h-[392px] left-0 top-full mt-1 bg-white border border-[#DEE0E3] shadow-md rounded-[12px] flex flex-col p-2 z-100 overflow-y-auto">
                {selectedOption === "Monthly"
                  ? [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <div
                        key={month}
                        className="px-4 py-2 hover:bg-gray-100"
                        onClick={() => selectPeriod(month)}
                      >
                        {month}
                      </div>
                    ))
                  : years.map((year) => (
                      <div
                        key={year}
                        className="px-4 py-2 hover:bg-gray-100"
                        onClick={() => selectPeriod(year)}
                      >
                        {year}
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
