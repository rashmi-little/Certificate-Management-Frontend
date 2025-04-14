import React from "react";

import ScheduleContainer from './ScheduleContainer';
import SummaryContainer from './SummaryContainer';

const RequestScheduleContainer = () => {
  return (
    <section className="grid grid-cols-2 gap-6 overflow-x-hidden">
      <ScheduleContainer />
      <SummaryContainer />
    </section>
  );
};

export default RequestScheduleContainer;
