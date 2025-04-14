// import React from "react";
// import { useForm } from "react-hook-form";

// const RecipentForm = ({ fieldsConfig }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid, isDirty },
//   } = useForm({
//     mode: "onChange",
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   // convert object key value to this structure ['firstName', 'string']
//   const fieldEntries = Object.entries(fieldsConfig || {});
//   console.log(fieldEntries);

//   const labelStyling = "text-sm font-medium text-gray-700";
//   const inputStyling =
//     "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

//   const buttonBaseStyle = `${inputStyling} text-center text-white font-roboto font-medium text-[16px] transition-colors`;
//   const buttonEnabledStyle = "bg-blue-500 hover:bg-blue-600";
//   const buttonDisabledStyle = "bg-gray-400 cursor-not-allowed";
//   const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex flex-col gap-4 h-full"
//     >
//       {fieldEntries.length > 0 && (
//         <div className="grid grid-cols-2 gap-4">
//           {fieldEntries.slice(0, 2).map(([fieldName, fieldType]) => {
//             const isMonthYear = fieldType.includes("monthYear");
//             const inputType = isMonthYear
//               ? "month"
//               : fieldType.includes("email")
//                 ? "email"
//                 : fieldType.includes("date")
//                   ? "date"
//                   : fieldType.includes("number")
//                     ? "number"
//                     : "text";

//             return (
//               <div key={fieldName} className="flex flex-col gap-2">
//                 <label htmlFor={fieldName} className={labelStyling}>
//                   {fieldName
//                     .replace(/([A-Z])/g, " $1")
//                     .replace(/^./, (str) => str.toUpperCase())
//                     .trim()}
//                   *
//                 </label>
//                 <input
//                   type={inputType}
//                   id={fieldName}
//                   placeholder={
//                     isMonthYear
//                       ? "YYYY-MM"
//                       : inputType === "email"
//                         ? "e.g. johndoe@example.com"
//                         : `${fieldName
//                             .replace(/([A-Z])/g, " $1")
//                             .replace(/^./, (str) => str.toUpperCase())
//                             .trim()}`
//                   }
//                   className={inputStyling}
//                   {...register(fieldName, {
//                     required: true,
//                     pattern: inputType === "email" ? emailPattern : undefined,
//                     min: inputType === "number" ? 0 : undefined,
//                   })}
//                 />
//                 {errors[fieldName] && (
//                   <span className="text-red-500 text-sm">
//                     {errors[fieldName].type === "required" &&
//                       "This field is required"}
//                     {errors[fieldName].type === "pattern" &&
//                       "Please enter a valid email"}
//                     {errors[fieldName].type === "min" &&
//                       "Value must be positive"}
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {fieldEntries.slice(2).map(([fieldName, fieldType]) => {
//         const isMonthYear = fieldType.includes("monthYear");
//         const inputType = isMonthYear
//           ? "month"
//           : fieldType.includes("email")
//             ? "email"
//             : fieldType.includes("date")
//               ? "date"
//               : fieldType.includes("number")
//                 ? "number"
//                 : "text";
//         return (
//           <div key={fieldName} className="flex flex-col gap-2">
//             <label htmlFor={fieldName} className={labelStyling}>
//               {fieldName
//                 .replace(/([A-Z])/g, " $1")
//                 .replace(/^./, (str) => str.toUpperCase())
//                 .trim()}
//               *
//             </label>
//             <input
//               type={inputType}
//               id={fieldName}
//               placeholder={
//                 inputType === "month"
//                   ? "YYYY-MM"
//                   : inputType === "email"
//                     ? "e.g. johndoe@example.com"
//                     : `Enter ${fieldName
//                         .replace(/([A-Z])/g, " $1")
//                         .toLowerCase()
//                         .trim()}`
//               }
//               className={inputStyling}
//               {...register(fieldName, {
//                 required: true,
//                 pattern: inputType === "email" ? emailPattern : undefined,
//                 min: inputType === "number" ? 0 : undefined,
//               })}
//             />
//             {errors[fieldName] && (
//               <span className="text-red-500 text-sm">
//                 {errors[fieldName].type === "required" &&
//                   "This field is required"}
//                 {errors[fieldName].type === "pattern" &&
//                   "Please enter a valid email"}
//                 {errors[fieldName].type === "min" && "Value must be positive"}
//               </span>
//             )}
//           </div>
//         );
//       })}

//       {/* Submit button */}
//       <div>
//         <button
//           type="submit"
//           disabled={!isValid || !isDirty}
//           className={`${buttonBaseStyle} ${
//             !isValid || !isDirty ? buttonDisabledStyle : buttonEnabledStyle
//           }`}
//         >
//           Add Recipient
//         </button>
//       </div>
//     </form>
//   );
// };

// export default RecipentForm;

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ADD_RECIPIENT } from "../../../redux/certificate/ActionType";

const RecipentForm = ({ fieldsConfig }) => {
  const months = [
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
  ];

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch({
      type: ADD_RECIPIENT,
      payload: data,
    });

    reset();
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  };

  const years = generateYears();

  // ... (your other existing code)

  const fieldEntries = Object.entries(fieldsConfig || {});
  console.log(fieldEntries);

  const labelStyling = "text-sm font-medium text-gray-700";
  const inputStyling =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  const buttonBaseStyle = `${inputStyling} text-center text-white font-roboto font-medium text-[16px] transition-colors`;
  const buttonEnabledStyle = "bg-blue-500 hover:bg-blue-600";
  const buttonDisabledStyle = "bg-gray-400 cursor-not-allowed";
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full overflow-y-auto px-1"
    >
      {fieldEntries.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {fieldEntries.slice(0, 2).map(([fieldName, fieldType]) => {
            const isMonth = fieldType.toLowerCase().includes("month");
            const isYear = fieldType.toLowerCase().includes("year");
            const inputType = isMonth
              ? "month-select"
              : isYear
                ? "year-select"
                : fieldType.includes("email")
                  ? "email"
                  : fieldType.includes("date")
                    ? "date"
                    : fieldType.includes("number")
                      ? "number"
                      : "text";

            return (
              <div key={fieldName} className="flex flex-col gap-2">
                <label htmlFor={fieldName} className={labelStyling}>
                  {fieldName
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .trim()}
                  *
                </label>

                {isMonth ? (
                  <select
                    id={fieldName}
                    className={inputStyling}
                    {...register(fieldName, { required: true })}
                  >
                    <option value="" disabled>
                      Select month
                    </option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                ) : isYear ? (
                  <select
                    id={fieldName}
                    className={inputStyling}
                    {...register(fieldName, { required: true })}
                  >
                    <option value="" disabled>
                      Select year
                    </option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={inputType}
                    id={fieldName}
                    placeholder={
                      inputType === "email"
                        ? "e.g. johndoe@example.com"
                        : `${fieldName
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())
                            .trim()}`
                    }
                    className={inputStyling}
                    {...register(fieldName, {
                      required: true,
                      pattern: inputType === "email" ? emailPattern : undefined,
                      min: inputType === "number" ? 0 : undefined,
                    })}
                  />
                )}

                {errors[fieldName] && (
                  <span className="text-red-500 text-sm">
                    {errors[fieldName].type === "required" &&
                      "This field is required"}
                    {errors[fieldName].type === "pattern" &&
                      "Please enter a valid email"}
                    {errors[fieldName].type === "min" &&
                      "Value must be positive"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {fieldEntries.slice(2).map(([fieldName, fieldType]) => {
        const isMonth = fieldType.toLowerCase().includes("month");
        const isYear = fieldType.toLowerCase().includes("year");
        const inputType = isMonth
          ? "month-select"
          : isYear
            ? "year-select"
            : fieldType.includes("email")
              ? "email"
              : fieldType.includes("date")
                ? "date"
                : fieldType.includes("number")
                  ? "number"
                  : "text";

        return (
          <div key={fieldName} className="flex flex-col gap-2">
            <label htmlFor={fieldName} className={labelStyling}>
              {fieldName
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .trim()}
              *
            </label>

            {isMonth ? (
              <select
                id={fieldName}
                className={inputStyling}
                {...register(fieldName, { required: true })}
              >
                <option value="" disabled>
                  Select month
                </option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            ) : isYear ? (
              <select
                id={fieldName}
                className={inputStyling}
                {...register(fieldName, { required: true })}
              >
                <option value="" disabled>
                  Select year
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={inputType}
                id={fieldName}
                placeholder={
                  inputType === "email"
                    ? "e.g. johndoe@example.com"
                    : `Enter ${fieldName
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()
                        .trim()}`
                }
                className={inputStyling}
                {...register(fieldName, {
                  required: true,
                  pattern: inputType === "email" ? emailPattern : undefined,
                  min: inputType === "number" ? 0 : undefined,
                })}
              />
            )}

            {errors[fieldName] && (
              <span className="text-red-500 text-sm">
                {errors[fieldName].type === "required" &&
                  "This field is required"}
                {errors[fieldName].type === "pattern" &&
                  "Please enter a valid email"}
                {errors[fieldName].type === "min" && "Value must be positive"}
              </span>
            )}
          </div>
        );
      })}
      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={!isValid}
          className={`${buttonBaseStyle} ${
            !isValid ? buttonDisabledStyle : buttonEnabledStyle
          }`}
        >
          Add Recipient
        </button>
      </div>
    </form>
  );
};

export default RecipentForm;
