import React, { useEffect, useState } from "react";
import CategoryDropDownBox from "./CategoryDropDownBox";
import DropDownMenu from "./DropDownMenu";
import CertificateTemplate from "./CertificateTemplate";
import DownloadDropDownBox from "./DownloadDropDownBox";
import MiniHeading from "./MiniHeading";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemplatesByCategory } from "../../../redux/certificate/Action";
import { SET_SELECTED_TEMPLATE } from "../../../redux/certificate/ActionType";

const RequestSelectTemplate = ({
  handleSelectCategoryToggle,
  selectCategoryDropDownOpen,
  categories,
  handleSelectCategoryChange,
  templates,
  handleTemplateClick,
}) => {
  const selectedCategory = useSelector(
    (store) => store.certificate?.selectedCategory
  );

  const activeTemplate = templates.find((template) => template.isActive);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(
        getAllTemplatesByCategory(selectedCategory.certificateCategoryId)
      );

      // dispatch({ type: SET_SELECTED_TEMPLATE, payload: null });
    }
  }, [selectedCategory]);

  return (
    <main className="flex flex-col items-start p-4 gap-4 isolation-auto bg-white shadow-[6px_6px_12px_rgba(0,_0,_0,_0.06)] rounded-lg overflow-auto sm:overflow-y-scroll">
      <div className="flex flex-col sm:flex-row items-start md:items-center p-0 gap-2.5 w-full flex-none order-0 self-stretch flex-grow-0 justify-between relative">
        <MiniHeading title="Select Certificate Template" />

        <div className="flex flex-col sm:flex-row gap-[10px] w-full sm:w-auto">
          {selectedCategory !== null && activeTemplate && (
            <DownloadDropDownBox template={activeTemplate} />
          )}
          <CategoryDropDownBox
            handleSelectCategoryToggle={handleSelectCategoryToggle}
            selectedCategory={selectedCategory}
            selectCategoryDropDownOpen={selectCategoryDropDownOpen}
          />
        </div>

        {selectCategoryDropDownOpen && (
          <DropDownMenu
            categories={categories}
            handleSelectCategoryChange={handleSelectCategoryChange}
          />
        )}
      </div>

      {selectedCategory === null || templates.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-0 gap-4 flex-none order-1 self-stretch flex-grow">
          <p className="font-roboto text-[#394555] text-[14px]">
            {selectedCategory === null
              ? "Please select a category to view the templates."
              : "Currently no template available"}
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-[repeat(auto-fit,357.33px)] gap-4 justify-center xl:justify-start">
          {templates?.map((template, index) => (
            <CertificateTemplate
              key={index}
              template={template}
              handleTemplateClick={handleTemplateClick}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default RequestSelectTemplate;

// grid grid-cols-1 lg:grid-cols-3 gap-4 w-full md:grid-cols-2"
