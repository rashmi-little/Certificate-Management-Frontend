import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import RequestTable from "./RequestTable";
import { useSelector } from "react-redux";
import { Graphs } from "./Graphs";
import { MobileDashboardHead } from "./MobileView/DashboardHead";
import { DashboardFrame } from "./MobileView/DashboardFrame";
import { MobileRequestTable } from "./MobileView/MobileRequestTable";
import { MobileGraphs } from "./MobileView/MobileGraph";
import { DashboardHead } from "./DashboardHead";
import { FrameComponent } from "./StatisticsFrameComponent";

const DashboardBody = () => {
  const result = useSelector((state) => state.certificate?.data);
  console.log(result);

  const requestsCertificatesdata = result?.graphData.requests.map(
    (blueItem, index) => {
      const orangeItem = result?.graphData.certificates.find(
        (item) => item.date === blueItem.date
      );
      return {
        day: index + 1,
        request: blueItem.count,
        certificate: orangeItem ? orangeItem.count : 0,
      };
    }
  );

  const issuedCertTicketsRecievedData =
    result?.graphData.issuedCertificates.map((blueItem, index) => {
      const orangeItem = result?.graphData.ticketsRecieved.find(
        (item) => item.date === blueItem.date
      );
      return {
        day: index + 1,
        issued: blueItem.count,
        ticket: orangeItem ? orangeItem.count : 0,
      };
    });

  const scheduledFailedCompletedData =
    result?.graphData.scheduledCertificates.map((violetItem, index) => {
      const date = violetItem.date;

      const orangeItem = result?.graphData.failedCertificates.find(
        (item) => item.date === date
      );
      const blueItem = result?.graphData.issuedCertificates.find(
        (item) => item.date === date
      );

      return {
        day: index + 1,
        scheduled: violetItem.count,
        failed: orangeItem ? orangeItem.count : 0,
        delivered: blueItem ? blueItem.count : 0,
      };
    });

  const [rcVisibility, setRcVisibility] = useState({
    request: true,
    certificate: true,
  });
  const [ctVisibility, setCtVisibility] = useState({
    issued: true,
    ticket: true,
  });
  const [deliveryVisibility, setDeliveryVisibility] = useState({
    scheduled: true,
    failed: true,
    delivered: true,
  });

  return (
    <div className="w-full h-full">
      {/* Desktop View */}
      <div className="hidden md:block">
        <DashboardHead />
        <div className="mt-6">
          <FrameComponent />
        </div>
        <div className="mt-6">
          <RequestTable />
        </div>
        <div className="mt-6">
          <Graphs
            title="Requests & Certificates"
            data={requestsCertificatesdata}
            dataKeys={["request", "certificate"]}
            labels={["Requests", "Certificates"]}
            colors={["#408DFF", "#FE924F"]}
            visibilityState={rcVisibility}
            setVisibilityState={setRcVisibility}
          />
        </div>
        <div className="mt-6">
          <Graphs
            title="Scheduled vs Failed vs Delivered"
            data={scheduledFailedCompletedData}
            dataKeys={["scheduled", "failed", "delivered"]}
            labels={["Scheduled", "Failed", "Delivered"]}
            colors={["#9E43EE", "#FE924F", "#408DFF"]}
            visibilityState={deliveryVisibility}
            setVisibilityState={setDeliveryVisibility}
          />
        </div>
        <div className="mt-6">
          <Graphs
            title="Certificates Issued vs Tickets Received"
            data={issuedCertTicketsRecievedData}
            dataKeys={["issued", "ticket"]}
            labels={["Certificates", "Tickets"]}
            colors={["#408DFF", "#FE924F"]}
            visibilityState={ctVisibility}
            setVisibilityState={setCtVisibility}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden flex flex-col w-full h-full">
        <MobileDashboardHead />
        <div className="mt-6">
          <DashboardFrame />
        </div>
        <div className="mt-6">
          <MobileRequestTable />
        </div>
        <div className="mt-6 ">
          <MobileGraphs
            title="Requests & Certificates"
            data={requestsCertificatesdata}
            dataKeys={["request", "certificate"]}
            labels={["Requests", "Certificates"]}
            colors={["#408DFF", "#FE924F"]}
            visibilityState={rcVisibility}
            setVisibilityState={setRcVisibility}
          />
        </div>
        <div className="mt-6">
          <MobileGraphs
            title="Scheduled vs Failed vs Delivered"
            data={scheduledFailedCompletedData}
            dataKeys={["scheduled", "failed", "delivered"]}
            labels={["Scheduled", "Failed", "Delivered"]}
            colors={["#9E43EE", "#FE924F", "#408DFF"]}
            visibilityState={deliveryVisibility}
            setVisibilityState={setDeliveryVisibility}
          />
        </div>
        <div className="mt-6">
          <MobileGraphs
            title="Certificates Issued vs Tickets Received"
            data={issuedCertTicketsRecievedData}
            dataKeys={["issued", "ticket"]}
            labels={["Certificates", "Tickets"]}
            colors={["#408DFF", "#FE924F"]}
            visibilityState={ctVisibility}
            setVisibilityState={setCtVisibility}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
