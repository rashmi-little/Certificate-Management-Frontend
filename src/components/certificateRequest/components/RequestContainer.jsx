import React, { useEffect, useState } from "react";
import RequestSelectTemplate from "./RequestSelectTemplate";
import RequestContainerFooter from "./RequestContainerFooter";
import CustomStepper from "./CustomStepper";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getAllTemplatesByCategory,
} from "../../../redux/certificate/Action";
import {
  ACTIVE_FOOTER_SUBMIT,
  DECREASE_STEPPER_COUNT,
  FETCH_ALL_TEMPLATE_BY_CATEGORYID,
  INACTIVE_FOOTER_SUBMIT,
  RESET_ALL_TEMPLATES,
  SET_ALL_TEMPLATES,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_TEMPLATE,
} from "../../../redux/certificate/ActionType";
import RecipientsContainer from "./RecipientsContainer";
import RequestScheduleContainer from "./RequestScheduleContainer";

const RequestContainer = () => {
  const [selectCategoryDropDownOpen, setSelectCategoryDropDownOpen] =
    useState(false);

  // const [selectCategory, setSelectCategory] = useState("Select Category");

  const dispatch = useDispatch();

  const categories = useSelector((store) => store.certificate?.categories);

  const currentStep = useSelector((store) => store.certificate?.stepperValue);

  const templates = useSelector((store) => store.certificate?.templates);

  const selectedCategory = useSelector(
    (store) => store.certificate?.selectedCategory
  );
  const selectedTemplate = useSelector(
    (store) => store.certificate?.selectedTemplate
  );

  const footerSubmitStatus = useSelector(
    (store) => store.certificate?.footerSubmitStatus
  );

  // for fetching categories
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, []);

  // for fetching templates based on selected categories
  // useEffect(() => {
  //   if (selectedCategory !== null) {
  //     dispatch(
  //       getAllTemplatesByCategory(selectedCategory.certificateCategoryId)
  //     );

  //     dispatch({ type: SET_SELECTED_TEMPLATE, payload: null });
  //   }
  // }, [selectedCategory]);

  function handleSelectCategoryToggle() {
    setSelectCategoryDropDownOpen((prevState) => !prevState);
  }

  function handleSelectCategoryChange(selectedCategory) {
    console.log(selectedCategory);
    dispatch({ type: SET_SELECTED_CATEGORY, payload: selectedCategory });
    handleSelectCategoryToggle();
  }

  function resetTemplates() {
    dispatch({ type: RESET_ALL_TEMPLATES });
  }

  function handleDoItLater() {
    if (currentStep === 0) {
      dispatch({ type: SET_SELECTED_CATEGORY, payload: null });
      setSelectCategoryDropDownOpen(() => false);
      resetTemplates();
    } else if (currentStep > 0) {
      dispatch({ type: DECREASE_STEPPER_COUNT, payload: currentStep });

      if (selectedTemplate) {
        dispatch({ type: ACTIVE_FOOTER_SUBMIT });
      }
    }
  }

  function handleTemplateClick(templateId) {
    const updatedTemplates = templates.map((template) =>
      template.templateId === templateId
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
      console.log(isAnyTemplateActive, "yes");

      dispatch({ type: ACTIVE_FOOTER_SUBMIT });
    } else if (footerSubmitStatus && !isAnyTemplateActive) {
      dispatch({ type: INACTIVE_FOOTER_SUBMIT });
    }
  }, [templates]);

  const gridLayout =
    currentStep < 2
      ? "grid-rows-[minmax(140px,_15%)_1fr_minmax(60px,_9%)]"
      : "grid-rows-[minmax(140px,_15%)_1fr]";

  return (
    <section className={`grid ${gridLayout} h-[calc(100vh-128px)] gap-6 bg-[#FAFAFA]`}>
      <header className="flex flex-col items-start p-4 gap-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold">Generate New Request</h1>
        <CustomStepper />
      </header>
      {currentStep === 0 ? (
        <RequestSelectTemplate
          handleSelectCategoryToggle={handleSelectCategoryToggle}
          selectCategoryDropDownOpen={selectCategoryDropDownOpen}
          categories={categories}
          handleSelectCategoryChange={handleSelectCategoryChange}
          templates={templates}
          handleTemplateClick={handleTemplateClick}
        />
      ) : currentStep === 1 ? (
        <RecipientsContainer />
      ) : (
        <RequestScheduleContainer />
      )}
      {currentStep < 2 ? (
        <RequestContainerFooter handleDoItLaterClick={handleDoItLater} />
      ) : (
        ""
      )}
    </section>
  );
};

export default RequestContainer;
