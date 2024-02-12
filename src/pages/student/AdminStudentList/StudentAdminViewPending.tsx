import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStaff } from "../../../redux/adminStaffs/actions";
import { RootState } from "../../../redux/store";
import { getStudent } from "../../../redux/actions";
import axios from "axios";
import BasicInputElements from "./BasicInputElements";

const IntakeStudents = () => {
  const dispatch = useDispatch();
  const [credStaffData, setCredStaffData] = useState([]);
  const [sourceData, setSourceData] = useState([]);

  const { state, loading, error, initialLoading } = useSelector((state: RootState) => ({
    state: state.Students.students,
    loading: state?.Students.loading,
    error: state?.Students.error,
    initialLoading: state?.Students.initialLoading,
  }));

  const { user, Authloading, credStaff } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    credStaff: state.AdminStaff.adminStaff.data,
    Authloading: state.Auth.loading,
  }));

  const getSourceData = () => {
    axios
      .get("sourceOptions")
      .then((res) => {
        setSourceData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getStudent());
    dispatch(getAdminStaff());
    getSourceData();
  }, []);

  useEffect(() => {
    if (credStaff) {
      const CredStaffArray = credStaff?.map((staff: any) => ({
        value: staff.user_id,
        label: staff.first_name + " " + staff.last_name,
      }));
      setCredStaffData(CredStaffArray);
    }
  }, [credStaff]);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Student Management", path: "/users/students" },
          {
            label: "Students",
            path: "/users/students",
            active: true,
          },
        ]}
        title={"Student Management"}
      />
      <Row>
        <Col>
          <BasicInputElements
            state={state.filter((item: any) => item.status == false)}
            loading={loading}
            error={error}
            user={user}
            credStaffData={credStaffData}
            initialLoading={initialLoading}
            sourceData={sourceData}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default IntakeStudents;
