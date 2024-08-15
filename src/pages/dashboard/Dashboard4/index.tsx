import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import LifeStageStatistics from "./LifeStageStatistics";
import StudentByStaffStatistics from "./StudentByStaffStatistics";

import StudentStatistics from "./StudentStatistics";
import StudentCounts from "./StudentCounts";
import Statuses from "./Statuses";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import StaffWiseStudentList from "./StaffWiseStudentList";
import avatar1 from "../../../assets/images/users/user-2.jpg";
import AnalyticsChart from "./AnalyticsChart";
import RevenueChart from "./RevenueChart";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import SalesChart from "./SalesChart";
import IncomeChart from "../../../components/IncomeChart";
import UsersChart from "../../../components/UsersChart";
import StatisticsChartWidget2 from "../../../components/StatisticsChartWidget2";

const balances = [
  {
    id: 1,
    avatar: avatar1,
    name: "Tomaslau",
    approved: 29,
    pending: 1,
    total: 30,
  },
  {
    id: 2,
    avatar: avatar1,
    name: "Erwin E. Brown",
    approved: 20,
    pending: 5,
    total: 25,
  },
  {
    id: 3,
    avatar: avatar1,
    name: "Margeret V. Ligon",
    approved: 15,
    pending: 8,
    total: 23,
  },
  {
    id: 4,
    avatar: avatar1,
    name: "Jose D. Delacruz",
    approved: 25,
    pending: 10,
    total: 35,
  },
  {
    id: 5,
    avatar: avatar1,
    name: "Luke J. Sain",
    approved: 20,
    pending: 4,
    total: 24,
  },
];

const Dashboard4 = () => {
  const [dashboardData, setDashboardData] = useState<any>([]);

  const { user } = useSelector((state: RootState) => ({
    user: state.Auth.user,
  }));

  useEffect(() => {
    if (user?.role !== 8) getDashboardValues();
  }, []);

  const getDashboardValues = () => {
    axios
      .get("getConsultentDashBoard")
      .then((res: any) => {
        setDashboardData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* <PageTitle breadCrumbItems={[]} title={"Dashboard"} /> */}
      <div className="page-title-box">
        <h4 className="page-title">Dashboard</h4>
      </div>

      {user.role == "7" || user.role == "4" ? (
        <Row>
          <Row>
            <Statuses dashboardData={dashboardData?.statusWithCount} />
          </Row>

          {/* <Row> */}
          {user.role == "7" && (
            // <Row>
            <Col xl={4} md={12}>
              <StudentCounts
                studentCount={dashboardData?.studentsCount || []}
              />
            </Col>
          )}

          {user.role == "4" && (
            <>
              <Col xl={5} md={12}>
                <StudentCounts studentCount={dashboardData?.itemCount || []} />
              </Col>
              <Col xl={7} md={12}>
                <AnalyticsChart />
              </Col>
            </>
          )}

          {user.role == "7" && (
            <Col xl={8} md={12}>
              <StaffWiseStudentList
                staffList={dashboardData?.studentCountByStaff}
              />
            </Col>
          )}
          {/* </Row> */}
        </Row>
      ) : (
        ""
      )}

      {user.role == "1" || user.role == "2" ? (
        <Row>
          <Statuses dashboardData={dashboardData?.statusWithCount} />
          <Row>
            <Col md={5} xl={4}>
              <UsersChart studentSummary={dashboardData?.studentSummary} />
            </Col>
            <Col lg={7} xl={8}>
              <SalesAnalyticsChart summary={dashboardData?.summary} />
            </Col>
          </Row>

          {/* <Row>
            <Col md={12} xl={4}>
              <SalesChart />
            </Col>
            <Col md={6} xl={4}>
              <IncomeChart />
            </Col>
            <Col md={6} xl={4}>
              <UsersChart />
            </Col>
          </Row> */}
        </Row>
      ) : (
        ""
      )}

      {/* {user.role == "7" || user.role == "4" ? (
          <Col xl={4} md={6}>
            <StudentStatistics
              title={"Total Students"}
              color={"#6658dd"}
              data={dashboardData.studentCount[0]?.value[0]?.total_students || 0}
              totalSales={dashboardData.studentCount[0]?.value[0]?.total_students || 0}
              target={dashboardData.studentCount[0]?.value[0]?.total_students || 0}
              lastWeek={dashboardData.studentCount[1]?.value[0]?.total_students_this_week || 0}
              lastMonth={dashboardData.studentCount[2]?.value[0]?.total_students_this_month || 0}
            />
          </Col>
        ) : (
        )} */}

      {/* <Col xl={4} md={6}>
          <LifeStageStatistics />
        </Col> */}

      {/* <Row>
        <Col xl={4} md={12}>
          <StudentByStaffStatistics studentCountByStaff={dashboardData?.studentCountByStaff} />
        </Col>
        <Col xl={4} md={6}>
          <LifeStageStatistics />
        </Col>
      </Row> */}

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
