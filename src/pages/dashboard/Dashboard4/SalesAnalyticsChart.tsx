import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { ApexOptions } from "apexcharts";

interface summary {
  weekly_counts: {
    name: string;
    type: string;
    data: {
      data: string;
    }[];
  }[];
}

interface SeriesData {
  name: string;
  type: string;
  data: number[];
  dates: string[];
}

const SalesAnalyticsChart = ({ summary }: any) => {
  const [series, setSeries] = useState<SeriesData[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [activeButton, setActiveButton] = useState<string>("weekly");

  const apexOpts: ApexOptions = {
    chart: {
      height: 378,
      type: "line",
      offsetY: 10,
    },
    stroke: {
      width: [2, 3],
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    colors: ["#1abc9c", "#4a81d4"],
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: dates,
    xaxis: {
      type: "datetime",
    },
    legend: {
      offsetY: 7,
    },
    grid: {
      padding: {
        bottom: 20,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.75,
        opacityTo: 0.75,
        stops: [0, 0, 0],
      },
    },
    yaxis: [
      {
        title: {
          text: "Number of initiated students",
        },
      },
      {
        opposite: true,
        title: {
          text: "Number of sanctioned students",
        },
      },
    ],
  };

  useEffect(() => {
    handleReport(summary?.weekly_counts);
  }, [summary?.weekly_counts]);

  const handleReport = (reportData: any) => {
    if (!reportData) return;

    const convertedData: SeriesData[] = reportData.map((item: any) => {
      const name: string = item.name;
      const type: string = item.type;
      const data: string = item.data[0]?.data || "[]";

      const dataArray: { [key: string]: string }[] = JSON.parse(data.replace(/\\/g, ""));

      const values: number[] = dataArray.map((entry) => parseInt(Object.values(entry)[0]));
      const dates: string[] = dataArray.map((entry) => Object.keys(entry)[0]);

      return {
        name: name,
        type: type,
        data: values,
        dates: dates,
      };
    });

    const extractedDates: any = convertedData.map((item: any) => item.dates);

    setDates(extractedDates[0]);
    setSeries(convertedData);
  };

  // Example usage
  const handleWeeklyReport = () => {
    handleReport(summary?.weekly_counts);
  };

  const handleMonthlyReport = () => {
    handleReport(summary?.monthly_counts);
  };

  const handleYearlyReport = () => {
    handleReport(summary?.yearly_counts);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="float-end d-none d-md-inline-block">
            <div className="btn-group mb-2">
              <button
                type="button"
                className={`btn btn-xs ${activeButton === "weekly" ? "btn-secondary" : "btn-light"}`}
                onClick={() => [handleWeeklyReport(), setActiveButton("weekly")]}
              >
                Weekly
              </button>
              <button
                type="button"
                className={`btn btn-xs ${activeButton === "monthly" ? "btn-secondary" : "btn-light"}`}
                onClick={() => [handleMonthlyReport(), setActiveButton("monthly")]}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`btn btn-xs ${activeButton === "yearly" ? "btn-secondary" : "btn-light"}`}
                onClick={() => [handleYearlyReport(), setActiveButton("yearly")]}
              >
                Weekly
              </button>
            </div>
          </div>

          <h4 className="header-title mb-3">Students Analytics</h4>

          <div dir="ltr">
            <Chart options={apexOpts} series={series} type="line" height={380} className="apex-charts mt-4" />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SalesAnalyticsChart;
