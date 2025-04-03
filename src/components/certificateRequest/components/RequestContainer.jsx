import React, { useEffect, useState } from "react";
import RequestSelectTemplate from "./RequestSelectTemplate";
import RequestContainerFooter from "./RequestContainerFooter";
import CustomStepper from "./CustomStepper";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/certificate/Action";

const RequestContainer = () => {
  const [selectCategoryDropDownOpen, setSelectCategoryDropDownOpen] =
    useState(false);

  const [selectCategory, setSelectCategory] = useState("Select Category");

  const [stepperCurrentStep, setStepperCurrentStep] = useState(0);

  const dispatch = useDispatch();

  const categories = useSelector((store) => store.certificate?.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const [templates, setTemplates] = useState([
    {
      id: 1,
      templateName: "Achievement Certificate",
      isActive: false,
    },
    {
      id: 2,
      templateName: "Training Completion Certificate",
      isActive: false,
    },
    {
      id: 3,
      templateName: "Outstanding Performance Award",
      isActive: false,
    },
    {
      id: 4,
      templateName: "Employee of the Month",
      isActive: false,
    },
    {
      id: 5,
      templateName: "CTC Letter",
      isActive: false,
    },
    {
      id: 6,
      templateName: "Employment Confirmation Letter",
      isActive: false,
    },
    {
      id: 7,
      templateName: "Monthly Recognition Award",
      isActive: false,
    },
    {
      id: 8,
      templateName: "Rising Star Award",
      isActive: false,
    },
    {
      id: 9,
      templateName: "Attendance Star Award",
      isActive: false,
    },
    {
      id: 10,
      templateName: "Random Template",
      isActive: false,
    },
  ]);

  function handleSelectCategoryToggle() {
    setSelectCategoryDropDownOpen((prevState) => !prevState);
  }

  function handleSelectCategoryChange(selectedCategory) {
    setSelectCategory(() => selectedCategory.name);

    handleSelectCategoryToggle();
  }

  function resetTemplates() {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) => {
        return { ...template, isActive: false };
      })
    );
  }

  return (
    <section className="grid grid-rows-[minmax(158px,_15%)_1fr_minmax(60px,_9%)] h-[calc(100vh-128px)] gap-6">
      <header className="flex flex-col items-start p-4 gap-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold">Generate New Request</h1>
        <CustomStepper
          stepperCurrentStep={stepperCurrentStep}
          setStepperCurrentStep={setStepperCurrentStep}
        />
      </header>
      <RequestSelectTemplate
        handleSelectCategoryToggle={handleSelectCategoryToggle}
        selectCategoryDropDownOpen={selectCategoryDropDownOpen}
        selectCategory={selectCategory}
        categories={categories}
        handleSelectCategoryChange={handleSelectCategoryChange}
        templates={templates}
        setTemplates={setTemplates}
      />
      <RequestContainerFooter
        setSelectCategory={setSelectCategory}
        setSelectCategoryDropDownOpen={setSelectCategoryDropDownOpen}
        resetTemplates={resetTemplates}
      />
    </section>
  );
};

export default RequestContainer;
