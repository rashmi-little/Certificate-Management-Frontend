import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_RECIPIENT,
  ADD_RECIPIENTS,
  RESET_PROGRESS_BAR,
  RESET_RECIPIENT,
  SET_FILE_ANALYZING,
  SET_FILE_PROCESSING_ERROR,
  SET_FILE_PROCESSING_ERROR_MESSAGE,
  SET_PROGRESS,
  SET_SHOW_DROP_ZONE,
  SET_UPLOADED_FILE_NAME,
} from "../../../redux/certificate/ActionType";
import { useDropzone } from "react-dropzone";
import WarningModal from "./WarningModal";
import * as XLSX from "xlsx";
import FileUploadProgressBar from "./FileUploadProgressBar";
import { getAllProfiles } from "../../../redux/certificate/Action";

const RecipentForm = ({ fieldsConfig }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [warningModal, setWarningModal] = useState(false);

  const progress = useSelector((store) => store.certificate?.progress);

  const uploadedFileName = useSelector(
    (store) => store.certificate?.uploadedFileName
  );
  const showDropZone = useSelector((store) => store.certificate?.showDropZone);
  const isFileProcessingError = useSelector(
    (store) => store.certificate?.isFileProcessingError
  );

  const fileProcessingErrorMessage = useSelector(
    (store) => store.certificate?.fileProcessingErrorMessage
  );

  const userList = useSelector((store) => store.certificate?.userList || []);

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

  function handleFileCancelClick() {
    dispatch({ type: RESET_RECIPIENT, payload: [] });
    dispatch({ type: RESET_PROGRESS_BAR, payload: true });
  }

  const onDrop = useCallback((files) => {
    if (files.length === 0) {
      setWarningModal(true);
      return;
    }

    const rawSheet = files[0];

    dispatch({ type: SET_FILE_ANALYZING, payload: true });
    dispatch({ type: SET_SHOW_DROP_ZONE, payload: false });
    dispatch({ type: SET_UPLOADED_FILE_NAME, payload: rawSheet.name });

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded * 100) / event.total);
        dispatch({ type: SET_PROGRESS, payload: progress });
      }
    };

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sampleSheet = workbook.Sheets["sample"];
        const dataSheet = workbook.Sheets["data"];

        if (!sampleSheet || !dataSheet) {
          throw new Error("Missing required sheets: 'sample' or 'data'");
        }

        // Get headers of both sheets
        const sampleHeaders = XLSX.utils.sheet_to_json(sampleSheet, {
          header: 1,
        })[0];
        const dataHeaders = XLSX.utils.sheet_to_json(dataSheet, {
          header: 1,
        })[0];

        console.log("Sample Headers: ", sampleHeaders);
        console.log("Data Headers: ", dataHeaders);

        // Validate headers match
        const isMatching =
          sampleHeaders?.length === dataHeaders?.length &&
          sampleHeaders.every((val, idx) => val === dataHeaders[idx]);

        if (!isMatching) {
          throw new Error("Invalid Excel format: Headers do not match.");
        }

        const jsonData = XLSX.utils.sheet_to_json(dataSheet, { defval: "", raw: false });

        dispatch({ type: ADD_RECIPIENTS, payload: jsonData });
        dispatch({ type: SET_PROGRESS, payload: 100 });
        dispatch({ type: SET_FILE_ANALYZING, payload: false });
      } catch (error) {
        dispatch({ type: SET_FILE_ANALYZING, payload: false });
        dispatch({ type: SET_PROGRESS, payload: 50 });
        dispatch({ type: SET_FILE_PROCESSING_ERROR, payload: true });
        dispatch({
          type: SET_FILE_PROCESSING_ERROR_MESSAGE,
          payload: error.message,
        });
      }
    };

    reader.readAsArrayBuffer(rawSheet);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const watchedFirstName = watch("firstName");

  useEffect(() => {
    if (watchedFirstName && watchedFirstName.trim().length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [watchedFirstName]);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, []);

  const matchingUsers = userList.filter((user) =>
    user.firstName
      ?.toLowerCase()
      .startsWith(watchedFirstName?.toLowerCase() || "")
  );

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
      className="
    flex flex-col gap-4 px-1 w-full h-full 
    overflow-y-visible 
    lg:overflow-y-auto
  "
    >
      {fieldEntries.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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

            const isFirstName = fieldName === "firstName";
            return (
              <div key={fieldName} className="flex flex-col gap-2 relative">
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

                {isFirstName &&
                  showSuggestions &&
                  watchedFirstName &&
                  matchingUsers.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border rounded shadow mt-1 z-10 max-h-40 overflow-y-auto">
                      {matchingUsers.map((user, index) => (
                        <li
                          key={index}
                          className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                          onClick={() => {
                            setValue("firstName", user.firstName);
                            setValue("lastName", user.lastName);
                            setValue("email", user.email);
                            setTimeout(() => {
                              setShowSuggestions(false);
                            }, 0);
                          }}
                        >
                          {user.firstName} {user.lastName} ({user.email})
                        </li>
                      ))}
                    </ul>
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
                defaultValue={""}
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
                defaultValue={""}
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

      <div className="flex justify-center">
        <p className="font-roboto font-[500] text-[#394555]">or</p>
      </div>

      {showDropZone ? (
        <div
          className="py-16 bg-[#FAFAFA] border border-[#9BA2AB] border-dashed rounded-[8px] text-center flex items-center justify-center"
          {...getRootProps()}
        >
          <input
            {...getInputProps()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          {isDragActive ? (
            <p className="font-roboto font-[400] text-[#394555]">
              Drop the files here ...
            </p>
          ) : (
            <p className="font-roboto font-[400] text-[#394555]">
              Upload a csv/excel file containing recipient's data
            </p>
          )}
        </div>
      ) : (
        <FileUploadProgressBar
          fileName={uploadedFileName}
          progress={progress}
          cancelClick={handleFileCancelClick}
          isFileProcessingError={isFileProcessingError}
          fileProcessingErrorMessage={fileProcessingErrorMessage}
        />
      )}

      <WarningModal open={warningModal} setOpenModal={setWarningModal} />
    </form>
  );
};

export default RecipentForm;
