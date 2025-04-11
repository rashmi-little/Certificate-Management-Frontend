import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { FrameItem } from "./StatisticsFrameItem";

export const FrameComponent = () => {
  const data = useSelector((state) => state.certificate?.data);

  useEffect(() => {
    if (data) {
      console.log("Inside useEffect, ", data);
    }
  }, [data]);

  const frameData = [
    {
      title: "Total Requests",
      value: data?.totalRequests,
      growth: data?.requestsGrowth,
    },
    {
      title: "Scheduled Requests",
      value: data?.scheduledRequests,
      growth: data?.scheduledRequestsGrowth,
    },
    {
      title: "Failed Requests",
      value: data?.failedRequests,
      growth: data?.failedRequestGrowth,
    },
    {
      title: "Certificates Issued",
      value: data?.issuedCertificates,
      growth: data?.certificatesGrowth,
    },
    {
      title: "Users Added",
      value: data?.newUsers,
      growth: data?.usersGrowth,
    },
    {
      title: "Tickets Received",
      value: data?.raisedTickets,
      growth: data?.ticketsGrowth,
    },
  ];

  return (
    <div className="w-full h-[232px] flex flex-wrap items-start gap-6 p-0">
      {frameData.map((item, index) => (
        <FrameItem key={index} item={item} />
      ))}
    </div>
  );
};
