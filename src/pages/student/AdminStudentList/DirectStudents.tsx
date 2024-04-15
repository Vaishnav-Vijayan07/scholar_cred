import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStaff } from "../../../redux/adminStaffs/actions";
import { RootState } from "../../../redux/store";
import { getConsultants, getStudent } from "../../../redux/actions";
import axios from "axios";
import BasicInputElements from "./BasicInputElements";

const DirectStudents = () => {
  const dispatch = useDispatch();
  const [credStaffData, setCredStaffData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [consultantData, setConsultantData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const { state, loading, error, initialLoading } = useSelector(
    (state: RootState) => ({
      state: state.Students.students,
      loading: state?.Students.loading,
      error: state?.Students.error,
      initialLoading: state?.Students.initialLoading,
    })
  );

  const { user, Authloading, credStaff, consultants } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      credStaff: state.AdminStaff.adminStaff.data,
      consultants: state.ConsultantReducer?.consultant?.data,
      Authloading: state.Auth.loading,
    })
  );

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
    dispatch(getConsultants());
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
    if (consultants) {
      const ConsultantsArray = consultants?.map((consultant: any) => ({
        value: consultant.id,
        label: consultant.company_name,
      }));
      setConsultantData(ConsultantsArray);
    }
  }, [credStaff, consultants]);

  console.log(state.length);

  const sendRequest = async () => {
    axios
      .get("get_students_by_cred_admin")
      .then((res) => {
        setStudentData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Student Management", path: "/cred-admin/direct-students" },
          {
            label: "Direct Students",
            path: "/cred-admin/direct-students",
            active: true,
          },
        ]}
        title={"Student Management"}
      />
      <Row>
        <Col>
          <BasicInputElements
            // state={state.filter((item: any) => item.created_by != 0)}
            state={studentData}
            loading={loading}
            error={error}
            user={user}
            credStaffData={credStaffData}
            initialLoading={initialLoading}
            sourceData={sourceData}
            consultantData={consultantData}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default DirectStudents;
