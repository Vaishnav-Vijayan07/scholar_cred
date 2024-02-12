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

const Dashboard4 = () => {
  const [dashboardData, setDashboardData] = useState<any>([]);

  const { user } = useSelector((state: RootState) => ({
    user: state.Auth.user,
  }));
  useEffect(() => {
    getDashboardValues();
  }, []);

  const getDashboardValues = () => {
    axios
      .get("getConsultentDashBoard")
      .then((res: any) => {
        setDashboardData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("dashboardData", dashboardData);

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
        <Statuses dashboardData={dashboardData?.statusWithCount} />

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
          ""
        )} */}

        <Col xl={4} md={6}>
          <StudentCounts studentCount={dashboardData?.studentCount} />
        </Col>

        <Col xl={4} md={6}>
          <LifeStageStatistics />
        </Col>
      </Row>

      <Row>
        <Col xl={4} md={12}>
          <StudentByStaffStatistics studentCountByStaff={dashboardData?.studentCountByStaff} />
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
