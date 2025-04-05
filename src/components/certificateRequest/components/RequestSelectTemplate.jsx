import React, { useState } from "react";
import CategoryDropDownBox from "./CategoryDropDownBox";
import DropDownMenu from "./DropDownMenu";
import CertificateTemplate from "./CertificateTemplate";
import DownloadDropDownBox from "./DownloadDropDownBox";
import MiniHeading from "./MiniHeading";

const RequestSelectTemplate = ({
  handleSelectCategoryToggle,
  selectCategoryDropDownOpen,
  selectCategory,
  categories,
  handleSelectCategoryChange,
  templates,
  handleTemplateClick,
}) => {
  return (
    <main className="flex flex-col items-start p-4 gap-4 isolation-auto bg-white shadow-[6px_6px_12px_rgba(0,_0,_0,_0.06)] rounded-lg overflow-y-scroll">
      <div className="flex flex-col md:flex-row items-center p-0 gap-2.5 w-[100%] flex-none order-0 self-stretch flex-grow-0 justify-between relative">
        <MiniHeading title="Select Certificate Template" />

        <div className="flex flex-col md:flex-row gap-[10px]">
          {selectCategory !== "Select Category" && <DownloadDropDownBox />}
          <CategoryDropDownBox
            handleSelectCategoryToggle={handleSelectCategoryToggle}
            selectCategory={selectCategory}
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

      {selectCategory === "Select Category" ? (
        <div className="flex flex-col justify-center items-center p-0 gap-4 flex-none order-1 self-stretch flex-grow">
          <p className="font-roboto text-[#394555] text-[14px]">
            Please select a category to view the templates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full md:grid-cols-2">
          {templates &&
            templates.map((template, index) => (
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
