import React from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import SalesChart from "./SalesChart";
import LifeStageStatistics from "./LifeStageStatistics";
import StudentByStaffStatistics from "./StudentByStaffStatistics";

import StudentStatistics from "./StudentStatistics";
import StudentCounts from "./StudentCounts";

const Dashboard4 = () => {
  console.log("Dashboard 4");

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboards", path: "/dashboard" },
          { label: "Dashboard", path: "/dashboard", active: true },
        ]}
        title={"Dashboard"}
      />

      <Row>
        {/* <Col xl={4} md={6}>
          <SalesChart />
        </Col> */}
        <Col xl={4}>
          <StudentStatistics title={"Total Students"} color={"#6658dd"} data={37} totalSales={"29"} target={"480"} lastWeek={"136"} lastMonth={"300"} />
        </Col>

        <Col xl={4} md={6}>
          <StudentCounts />
        </Col>

        <Col xl={4} md={6}>
          <LifeStageStatistics />
        </Col>
      </Row>

      <Row>
        <Col xl={4} md={12}>
          <StudentByStaffStatistics />
        </Col>
        <Col xl={4} md={6}>
          <LifeStageStatistics />
        </Col>
      </Row>

      {/* <Statistics /> */}

      {/* <Row>
        <Col>
          <ProjectsDetails projectsDetails={projectsDetails} />
        </Col>
      </Row> */}
    </>
  );
};

export default Dashboard4;
