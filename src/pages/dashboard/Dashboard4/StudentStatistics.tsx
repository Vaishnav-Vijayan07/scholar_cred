import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// components
import ChartStatistics from "../../../components/ChartStatistics";

interface StatisticsChartWidgetProps {
  title: string;
  color: string;
  data: number;
  totalSales: string;
  target: string;
  lastWeek: string;
  lastMonth: string;
}

const StudentStatistics = ({
  title,
  color,
  data,
  totalSales,
  target,
  lastWeek,
  lastMonth,
}: StatisticsChartWidgetProps) => {
  const apexOpts: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "67%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "24px",
            offsetY: 12,
            formatter: (val: number) => {
              return String(val);
            },
          },
        },
      },
    },
    colors: [color],
    stroke: {
      lineCap: "round",
    },
  };

  const apexData = [data];

  return (
    <>
      <Card>
        <Card.Body>
          <h4 className="header-title mb-2">{title}</h4>

          <div className="widget-chart text-center" dir="ltr">
            <Chart
              options={apexOpts}
              series={apexData}
              type="radialBar"
              height={205}
              className="apex-charts mt-0"
            />

            <h5 className="text-muted mt-0">Total students joined today</h5>
            <h2>{totalSales}</h2>

            <Row className="row mt-5">
              <Col className="col-4">
                <ChartStatistics
                  title="Total students"
                  stats={target}
                  variant="danger"
                />
              </Col>
              <Col className="col-4">
                <ChartStatistics
                  title="Last week"
                  stats={lastWeek}
                  variant="success"
                />
              </Col>
              <Col className="col-4">
                <ChartStatistics
                  title="Last Month"
                  stats={lastMonth}
                  variant="danger"
                />
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StudentStatistics;