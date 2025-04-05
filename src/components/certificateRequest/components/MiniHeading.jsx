import React from "react";

const MiniHeading = ({ title }) => {
  return (
    <p className="font-roboto font-medium text-[20px] md:text-[16px] lg:text-[20px] leading-[100%] tracking-normal text-[#394555]">
      {title}
    </p>
  );
};

export default MiniHeading;
