import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// components
import { BasicPortlet } from "./Portlet";

import ChartStatistics from "./ChartStatistics";

const UsersChart = ({ studentSummary }: any) => {
  const [chartKey, setChartKey] = useState<number>(0);

  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    colors: ["#00acc1", "#4b88e4"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
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
            return seriesName;
          },
        },
      },
      marker: {
        show: false,
      },
    },
    labels: ["Last week", "Last month"],
  };

  const series = [(studentSummary && parseInt(studentSummary[0]?.last_week_student)) || 0, (studentSummary && parseInt(studentSummary[0]?.last_month_student)) || 0];

  return (
    <>
      <BasicPortlet cardTitle="Total Users" titleClass="header-title">
        <div className="text-center">
          <Chart key={chartKey} options={options} series={series ? series : []} height={270} type="pie" className="apex-charts mt-0" />

          <Row className="row mt-3">
            <Col className="col-4">
              <ChartStatistics title="Total Students" icon="fe-arrow-up" stats={(studentSummary && studentSummary[0]?.total_student) || 0} variant="success" />
            </Col>
            <Col className="col-4">
              <ChartStatistics title="Last week" icon="fe-arrow-up" stats={(studentSummary && studentSummary[0]?.last_week_student) || 0} variant="success" />
            </Col>
            <Col className="col-4">
              <ChartStatistics title="Last Month" icon="fe-arrow-up" stats={(studentSummary && studentSummary[0]?.last_month_student) || 0} variant="success" />
            </Col>
          </Row>
        </div>
      </BasicPortlet>
    </>
  );
};

export default UsersChart;
