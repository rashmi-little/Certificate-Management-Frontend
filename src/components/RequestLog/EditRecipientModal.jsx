import React, { useState, useEffect } from "react";

import { X } from "lucide-react";

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

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
};

const years = generateYears();

const EditRecipientModal = ({ open, onClose, recipient, onSave }) => {
  const parsedData = JSON.parse(recipient.certificateData);
  const [formData, setFormData] = useState(parsedData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  useEffect(() => {
    if (open && recipient?.certificateData) {
      const parsed = JSON.parse(recipient.certificateData);
      setFormData(parsed);
      setErrors({});
      setTouched({});
    }
  }, [open, recipient]);

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return "This field is required";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    if (name === "firstName" || name === "lastName") {
      if (value.length < 2) {
        return "Must be at least 2 characters";
      }
      if (!/^[a-zA-Z\s-]+$/.test(value)) {
        return "Only letters, spaces and hyphens allowed";
      }
    }

    if (name === "salary") {
      const number = parseFloat(value);
      if (isNaN(number) || number <= 0) {
        return "Please enter a valid salary";
      }
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== "registrationNumber") {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "registrationNumber") {
        allTouched[key] = true;
      }
    });
    setTouched(allTouched);

    if (validateForm()) {
      const updatedData = {
        ...parsedData,
        ...formData,
      };

      onSave({
        ...recipient,
        certificateData: JSON.stringify(updatedData),
      });
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0    flex justify-end items-center z-50  mr-28 mt-5">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[400px] max-w-md relative  ">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={30} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Recipient Details</h2>

        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[70vh] overflow-y-auto pr-2 "
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name*
              </label>
              <input
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.firstName && errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name*
              </label>
              <input
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.lastName && errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="user@example.com"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {Object.entries(parsedData).map(([key, value]) => {
            if (
              ["registrationNumber", "firstName", "lastName", "email"].includes(
                key
              )
            )
              return null;

            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());

            if (key.toLowerCase().includes("month")) {
              return (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium mb-1">
                    {label}*
                  </label>
                  <select
                    value={formData[key] || ""}
                    onChange={(e) => handleSelectChange(key, e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {touched[key] && errors[key] && (
                    <p className="mt-1 text-sm text-red-600">{errors[key]}</p>
                  )}
                </div>
              );
            }

            if (key.toLowerCase().includes("year")) {
              return (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium mb-1">
                    {label}*
                  </label>
                  <select
                    value={formData[key] || ""}
                    onChange={(e) => handleSelectChange(key, e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {touched[key] && errors[key] && (
                    <p className="mt-1 text-sm text-red-600">{errors[key]}</p>
                  )}
                </div>
              );
            }

            return (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium mb-1">
                  {label}*
                </label>
                <input
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  type={key === "salary" ? "number" : "text"}
                  disabled={key === "department"}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched[key] && errors[key] && (
                  <p className="mt-1 text-sm text-red-600">{errors[key]}</p>
                )}
              </div>
            );
          })}

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 border border-red-500 text-red-500 rounded-xl hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipientModal;
