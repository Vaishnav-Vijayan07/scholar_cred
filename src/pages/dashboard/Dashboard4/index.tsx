import React from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import SalesChart from "./SalesChart";
import StatisticsChart from "./StatisticsChart";
import IncomeChart from "./IncomeChart";
import Statistics from "./Statistics";
import ProjectsDetails from "./ProjectsDetails";

// dummy data
import { projectsDetails } from "./data";

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
        <Col xl={4} md={6}>
          <SalesChart />
        </Col>
        <Col xl={4} md={6}>
          <StatisticsChart />
        </Col>
        <Col xl={4} md={12}>
          <IncomeChart />
        </Col>
      </Row>

      <Statistics />

      <Row>
        <Col>
          <ProjectsDetails projectsDetails={projectsDetails} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard4;
