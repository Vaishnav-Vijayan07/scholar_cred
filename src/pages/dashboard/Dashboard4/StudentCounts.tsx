import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// components
import { BasicPortlet } from "../../../components/Portlet";

import ChartStatistics from "../../../components/ChartStatistics";

const StudentCounts = ({ studentCount }: any) => {
  const [chartKey, setChartKey] = useState<number>(0);

  const apexOpts: ApexOptions = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              formatter: (val: string) => {
                return val;
              },
            },
            value: {
              show: true,
              formatter: (val: string) => {
                return val;
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    // colors: ["#4fc6e1", "#6658dd", "#ebeff2"],
    colors: ["#4fc6e1", "#6658dd"],
    legend: {
      show: false,
    },
    labels: ["Initiated", "Pending"],
    tooltip: {
      enabled: false,
    },
  };
  const series = [parseInt(studentCount[0]?.initiated_count) || 0, parseInt(studentCount[0]?.pending_count) || 0];

  return (
    <>
      <BasicPortlet cardTitle="User Statistics" titleClass="header-title">
        <div className="text-center">
          {/* <Chart key={chartKey} options={options} series={series ? series : []} height={270} type="pie" className="apex-charts mt-0" /> */}
          <Chart key={chartKey} options={apexOpts} series={series ? series : []} height={270} type="donut" className="apex-charts mt-0" />

          <Row className="row mt-3">
            <Col className="col-4">
              <ChartStatistics title="Total" stats={studentCount[0]?.total_count || 0} variant="danger" />
            </Col>
            <Col className="col-4">
              <ChartStatistics title="Initiated" stats={studentCount[0]?.initiated_count || 0} variant="success" />
            </Col>
            <Col className="col-4">
              <ChartStatistics title="Pending" stats={studentCount[0]?.pending_count || 0} variant="success" />
            </Col>
          </Row>
        </div>
      </BasicPortlet>
    </>
  );
};

export default StudentCounts;
