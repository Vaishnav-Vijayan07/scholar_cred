import React from "react";
import { Card, Dropdown, Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// components
import ChartStatistics from "../../../components/ChartStatistics";

const RevenueChart = ({ studentSummary }: any) => {
  console.log("studentSummary---->", studentSummary[0]);

  const apexOpts: ApexOptions = {
    chart: {
      height: 242,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%",
        },
      },
    },
    colors: ["#f1556c"],
    labels: ["Students"],
  };

  const apexData = [68];

  return (
    <>
      <Card>
        <Card.Body>
          <h4 className="header-title mb-0">Total Students</h4>

          <div className="widget-chart text-center" dir="ltr">
            <Chart options={apexOpts} series={apexData} type="radialBar" height={242} className="apex-charts mt-0" />

            <h5 className="text-muted mt-0">Total students in this week</h5>
            <h2>{studentSummary[0]?.total_student || 0}</h2>

            <p className="text-muted w-75 mx-auto sp-line-2"></p>

            <Row className="row mt-3">
              <Col className="col-4">
                <ChartStatistics title="Total" icon="fe-arrow-down" stats={studentSummary[0]?.total_student} variant="danger" />
              </Col>
              <Col className="col-4">
                <ChartStatistics title="Last week" icon="fe-arrow-up" stats={studentSummary[0]?.total_student} variant="success" />
              </Col>
              <Col className="col-4">
                <ChartStatistics title="Last Month" icon="fe-arrow-down" stats={studentSummary[0]?.total_student} variant="danger" />
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RevenueChart;
