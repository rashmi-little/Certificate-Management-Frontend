import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCertificateStatistics } from "../../redux/certificate/Action";
import { useDispatch, useSelector } from "react-redux";

let initialLoad = true;

export const MobileDashboardHead = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropDown, setDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Monthly");
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Select Month");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const alterDropDown = () => setDropdown(!dropDown);
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
    <div className="flex flex-col items-start gap-2  w-full h-auto">
      <div className="flex flex-col items-start p-4 gap-4 w-full h-auto bg-white shadow-[6px_6px_12px_rgba(0,0,0,0.06)] rounded-[16px] self-stretch flex-none order-0">
        <div className="flex flex-row items-center p-0 gap-2 w-full h-[24px] self-stretch flex-none order-0">
          <h2 className="w-full h-[19px] flex items-center text-[#394555] font-medium text-[16px] leading-[19px] tracking-[-0.01em] font-['Roboto'] flex-grow order-1">
            Dashboard
          </h2>
          <div className="flex flex-row justify-center items-center p-0 gap-2 w-[24px] h-[24px] flex-none order-6 flex-grow-0 relative curser-pointer">
            <span className="flex flex-row justify-center items-center p-1 gap-2 w-6 h-6 bg-gray-100 rounded-full cursor-pointer ">
              <svg
                width="4"
                height="16"
                viewBox="0 0 4 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={alterDropDown}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 3.5C2.82843 3.5 3.5 2.82843 3.5 2C3.5 1.17157 2.82843 0.5 2 0.5C1.17157 0.5 0.5 1.17157 0.5 2C0.5 2.82843 1.17157 3.5 2 3.5ZM2 9.5C2.82843 9.5 3.5 8.82843 3.5 8C3.5 7.17157 2.82843 6.5 2 6.5C1.17157 6.5 0.5 7.17157 0.5 8C0.5 8.82843 1.17157 9.5 2 9.5ZM3.5 14C3.5 14.8284 2.82843 15.5 2 15.5C1.17157 15.5 0.5 14.8284 0.5 14C0.5 13.1716 1.17157 12.5 2 12.5C2.82843 12.5 3.5 13.1716 3.5 14Z"
                  fill="#5A6472"
                />
              </svg>
            </span>
          </div>
        </div>
        {dropDown && (
          <div class="flex flex-col justify-center items-start p-0 gap-[5px] w-full h-[130px] flex-none order-2 self-stretch">
            <div className="w-full h-[40px] px-4 flex items-center justify-between border border-[#DEE0E3] rounded-[12px] bg-white gap-2 relative">
              <span className="text-[16px] text-[#9BA2AB] whitespace-nowrap">
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "Select Date"}
              </span>
              <FiCalendar
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
              className="relative w-full h-[40px] px-4 flex items-center justify-between border border-[#DEE0E3] rounded-[12px] bg-white gap-2 cursor-pointer"
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
              className="relative w-full h-[40px] px-4 flex items-center justify-between border border-[#DEE0E3] rounded-[12px] bg-white gap-2 cursor-pointer"
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
        )}
      </div>
    </div>
  );
};
