import React, { useEffect, useState } from "react";
import RequestSelectTemplate from "./RequestSelectTemplate";
import RequestContainerFooter from "./RequestContainerFooter";
import CustomStepper from "./CustomStepper";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/certificate/Action";
import {
  ACTIVE_FOOTER_SUBMIT,
  DECREASE_STEPPER_COUNT,
  INACTIVE_FOOTER_SUBMIT,
  RESET_ALL_TEMPLATES,
  SET_ALL_TEMPLATES,
} from "../../../redux/certificate/ActionType";
import RecipientsContainer from "./RecipientsContainer";

const RequestContainer = () => {
  const [selectCategoryDropDownOpen, setSelectCategoryDropDownOpen] =
    useState(false);

  const [selectCategory, setSelectCategory] = useState("Select Category");

  const dispatch = useDispatch();

  const categories = useSelector((store) => store.certificate?.categories);

  const currentStep = useSelector((store) => store.certificate?.stepperValue);

  const templates = useSelector((store) => store.certificate?.templates);

  const footerSubmitStatus = useSelector(
    (store) => store.certificate?.footerSubmitStatus
  );

  useEffect(() => {
    dispatch(getAllCategories());

    const payload = [
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
    ];
    dispatch({ type: SET_ALL_TEMPLATES, payload: payload });
  }, [selectCategory]);

  function handleSelectCategoryToggle() {
    setSelectCategoryDropDownOpen((prevState) => !prevState);
  }

  function handleSelectCategoryChange(selectedCategory) {
    setSelectCategory(() => selectedCategory.name);

    handleSelectCategoryToggle();
  }

  function resetTemplates() {
    dispatch({ type: RESET_ALL_TEMPLATES });
  }

  function handleDoItLater() {
    if (currentStep === 0) {
      setSelectCategory(() => "Select Category");
      setSelectCategoryDropDownOpen(() => false);
      resetTemplates();
    } else if (currentStep > 0) {
      dispatch({ type: DECREASE_STEPPER_COUNT, payload: currentStep });
      dispatch({ type: ACTIVE_FOOTER_SUBMIT });
    }
  }

  function handleTemplateClick(templateId) {
    const updatedTemplates = templates.map((template) =>
      template.id === templateId
        ? { ...template, isActive: !template.isActive }
        : { ...template, isActive: false }
    );

    dispatch({ type: SET_ALL_TEMPLATES, payload: updatedTemplates });
  }
  useEffect(() => {
    const isAnyTemplateActive = templates?.some(
      (template) => template.isActive
    );

    if (isAnyTemplateActive && footerSubmitStatus === false) {
      dispatch({ type: ACTIVE_FOOTER_SUBMIT });
    } else if (footerSubmitStatus && !isAnyTemplateActive) {
      dispatch({ type: INACTIVE_FOOTER_SUBMIT });
    }
  }, [templates]);

  return (
    <section className="grid grid-rows-[minmax(158px,_15%)_1fr_minmax(60px,_9%)] h-[calc(100vh-128px)] gap-6">
      <header className="flex flex-col items-start p-4 gap-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold">Generate New Request</h1>
        <CustomStepper />
      </header>
      {currentStep === 0 ? (
        <RequestSelectTemplate
          handleSelectCategoryToggle={handleSelectCategoryToggle}
          selectCategoryDropDownOpen={selectCategoryDropDownOpen}
          selectCategory={selectCategory}
          categories={categories}
          handleSelectCategoryChange={handleSelectCategoryChange}
          templates={templates}
          handleTemplateClick={handleTemplateClick}
        />
      ) : currentStep === 1 ? (
        <RecipientsContainer />
      ) : (
        <div></div>
      )}
      <RequestContainerFooter handleDoItLaterClick={handleDoItLater} />
    </section>
  );
};

export default RequestContainer;
