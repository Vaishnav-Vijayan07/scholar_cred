import React from "react";
import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// components
import { BasicPortlet } from "../../../components/Portlet";

import ChartStatistics from "../../../components/ChartStatistics";

const StudentCounts = () => {
  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    colors: ["#00acc1", "#4b88e4"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName: string) => {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
    labels: ["Label 1", "Label 2"],
  };

  const series = [30, 40];

  return (
    <>
      <BasicPortlet cardTitle="Total Users" titleClass="header-title">
        <div className="text-center">
          <Chart options={options} series={series} height={270} type="pie" className="apex-charts mt-0" />

          <Row className="row mt-3">
            <Col className="col-4">
              <ChartStatistics title="Total" stats="18k" variant="danger" />
            </Col>
            <Col className="col-4">
              <ChartStatistics title="Loan sanctioned" stats="3.25k" variant="success" />
            </Col>
            <Col className="col-4">
              <ChartStatistics title="Loan disbursed" stats="2k" variant="success" />
            </Col>
          </Row>
        </div>
      </BasicPortlet>
    </>
  );
};

export default StudentCounts;
